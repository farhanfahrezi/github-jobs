import { useAppDispatch, useAppSelector } from "@/store";
import { JobState, jobActions } from "@/store/slice/job";
import { Button, Checkbox, Input } from "@nextui-org/react";
import { useState } from "react";
import { SearchIcon } from "../icons";

export default function JobFilter() {
  const dispatch = useAppDispatch();
  const { data, query, page, isLoading, canNext }: JobState = useAppSelector(
    (state) => state.job
  );

  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [fullTime, setFullTime] = useState("false");

  const onSubmit = () => {
    dispatch(jobActions.reset({}));
    dispatch(
      jobActions.setQuery({
        description,
        location,
        full_time: fullTime,
      })
    );
  };

  return (
    <form className="flex md:items-center gap-4 md:gap-6 flex-col md:flex-row">
      <Input
        label="Job Description"
        placeholder="Filter by title, benefits, companies, expertise"
        labelPlacement="outside"
        size="lg"
        value={description}
        onChange={(e) => setDescription(e.currentTarget.value)}
        startContent={
          <SearchIcon className="text-md text-default-400 pointer-events-none flex-shrink-0" />
        }
      />
      <Input
        label="Location"
        placeholder="Filter by city, state, zip code or country"
        labelPlacement="outside"
        size="lg"
        value={location}
        onChange={(e) => setLocation(e.currentTarget.value)}
        startContent={
          <SearchIcon className="text-md text-default-400 pointer-events-none flex-shrink-0" />
        }
      />
      <div className="min-w-fit w-96 mt-2 md:mt-6">
        <Checkbox
          width={200}
          value={fullTime.toString()}
          onChange={(e) => setFullTime(e.currentTarget.value)}
        >
          Full Time Only
        </Checkbox>
      </div>
      <Button
        size="lg"
        color="primary"
        variant="shadow"
        className="w-full md:w-72 mt-2 md:mt-6"
        endContent={
          <SearchIcon className="text-md  pointer-events-none flex-shrink-0" />
        }
        onClick={() => onSubmit()}
      >
        Search
      </Button>
    </form>
  );
}
