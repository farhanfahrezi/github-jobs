import { AxiosError } from "axios";
import { AppDispatch } from "..";
import http from "../../utils/http";
import { JobType, jobActions } from "../slice/job";

export interface JobData {
  description?: string;
  location?: string;
  full_time?: string;
  page?: number;
}

export const getJobList = (jobData: JobData) => {
  return async (dispatch: AppDispatch) => {
    dispatch(jobActions.setLoading(true));
    try {
      const query = Object.keys(jobData)
        .map((key) => {
          if (jobData[key as keyof JobData]) {
            return `${key}=${jobData[key as keyof JobData]}`;
          }
          return "";
        })
        .filter((item) => item !== "")
        .join("&");

      const { data, status } = await http.get(
        `/recruitment/positions.json?${query}`
      );

      // delay for loading just to see loading indicator
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (status === 200) {
        dispatch(
          jobActions.setData(data?.filter((item: JobType) => item !== null))
        );
        if (data?.length < 10) {
          dispatch(jobActions.setCanNext(false));
        } else {
          dispatch(jobActions.incrementPage({}));
        }
      } else {
        dispatch(jobActions.setError(data?.message));
      }

      dispatch(jobActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(jobActions.setError(err.response?.data.message));
        dispatch(jobActions.setLoading(false));
      }
    }
  };
};
