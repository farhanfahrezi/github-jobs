import { useAppDispatch } from "@/store";
import { JobType, jobActions } from "@/store/slice/job";
import { Chip, Divider, Spacer } from "@nextui-org/react";
import moment from "moment";
import { useEffect, useRef } from "react";

export default function JobListItem(
  props: JobType & { isLast: boolean; loadMore: () => void }
) {
  const dispatch = useAppDispatch();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (props.isLast && entry.isIntersecting) {
        props.loadMore();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(cardRef.current);
  }, [props.isLast]);

  return (
    <>
      <div
        ref={cardRef}
        className="p-5 gap-6 cursor-pointer hover:bg-primary-50 dark:hover:bg-default-300 hover:bg-opacity-50 dark:hover:bg-opacity-20"
        onClick={() => {
          dispatch(jobActions.setDetail(props));
        }}
      >
        <div className="flex items-center">
          <div className="flex flex-1 flex-col">
            <div className="text-xs opacity-50">
              {moment(props.created_at).fromNow()}
            </div>
            <Spacer />
            <div className="light:text-primary-500 dark:text-white font-medium">
              {props.title}
            </div>
            <Spacer y={2} />
            <div className="flex gap-2">
              <div className="text-small opacity-70">{props.location}</div>
              <div className="text-small opacity-70">•</div>
              <div className="text-small opacity-70">{props.company}</div>
            </div>
          </div>

          <Chip color="success" size="sm" className="text-white text-xs">
            Full Time
          </Chip>
        </div>
      </div>
      {!props.isLast && <Divider />}
    </>
  );
}
