"use client";

import { DrawerWrapper } from "@/components/drawer";
import JobDetail from "@/components/job/detail";
import Filter from "@/components/job/filter";
import JobList from "@/components/job/list";
import { useAppDispatch, useAppSelector } from "@/store";
import { JobState, jobActions } from "@/store/slice/job";
import { Card, CardBody, Divider } from "@nextui-org/react";

interface QueryData {
  description?: string;
  location?: string;
  full_time?: string;
}

export default function Home() {
  const dispatch = useAppDispatch();
  const { query, data, detail, isLoading }: JobState = useAppSelector(
    (state) => state.job
  );

  const isQuery = () => {
    const _query = Object.keys(query)
      .map((key) => {
        if (query[key as keyof QueryData]) {
          return `${key}=${query[key as keyof QueryData]}`;
        }
        return "";
      })
      .filter((item) => item !== "");

    return _query.length;
  };

  return (
    <section className="flex flex-col gap-8">
      <Filter />

      <Card>
        <CardBody className="p-0">
          {!isLoading && (
            <>
              <h2 className="px-5 py-6 text-xl font-medium">
                {isQuery() > 1
                  ? data.length > 0
                    ? `Showing ${data.length} Data`
                    : "No Result"
                  : "Job List"}
              </h2>
              <Divider />
            </>
          )}
          <JobList />
        </CardBody>
      </Card>

      <DrawerWrapper
        visible={detail ? true : false}
        onClose={() => {
          dispatch(jobActions.clearDetail({}));
        }}
      >
        <JobDetail />
      </DrawerWrapper>
    </section>
  );
}
