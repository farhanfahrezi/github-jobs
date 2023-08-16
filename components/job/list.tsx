import { useAppDispatch, useAppSelector } from "@/store";
import { JobState } from "@/store/slice/job";
import { getJobList } from "@/store/thunk/job";
import { Divider, Spinner } from "@nextui-org/react";
import { useEffect } from "react";
import JobListItem from "./list-item";

export default function JobList() {
  const dispatch = useAppDispatch();
  const { data, query, page, isLoading, canNext }: JobState = useAppSelector(
    (state) => state.job
  );

  const getJobListHandler = () => {
    if (!canNext) return;
    if (isLoading) return;

    dispatch(
      getJobList({
        ...query,
        page: page,
      })
    );
  };

  useEffect(() => {
    getJobListHandler();
  }, [query]);

  return (
    <div className="gap-6">
      {data?.map(
        (item, index) =>
          item?.id && (
            <JobListItem
              {...item}
              isLast={index === data.length - 1}
              loadMore={() => getJobListHandler()}
            />
          )
      )}

      {isLoading && (
        <>
          <Divider />
          <div className="p-10 flex items-center justify-center">
            <Spinner color="primary" />
          </div>
        </>
      )}
    </div>
  );
}
