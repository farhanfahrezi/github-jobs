import { useAppDispatch, useAppSelector } from "@/store";
import { JobState, jobActions } from "@/store/slice/job";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Spacer,
  Image,
  CardBody,
} from "@nextui-org/react";
import { BackIcon, LocationIcon } from "../icons";
import moment from "moment";

export default function JobDetail() {
  const dispatch = useAppDispatch();
  const { detail }: JobState = useAppSelector((state) => state.job);

  const removePreTag = (str: string) => {
    return str.replace(/<pre>/g, "").replace(/<\/pre>/g, "");
  };

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <div className="py-6 px-10">
        <Button
          isIconOnly
          variant="shadow"
          aria-label="Like"
          className="bg-white pr-1"
          onPress={() => {
            dispatch(jobActions.clearDetail({}));
          }}
        >
          <BackIcon />
        </Button>
      </div>

      <Divider />

      {detail && (
        <div className="flex p-10 gap-20">
          <div className="flex flex-1 flex-col">
            <div className="flex gap-4">
              {detail.type === "Full Time" && (
                <Chip color="success" size="sm" className="text-white text-xs">
                  Full Time
                </Chip>
              )}
              <div className="flex gap-2 items-center text-medium opacity-70">
                <LocationIcon size={16} /> {detail.location}
              </div>
            </div>
            <Spacer y={2} />
            <div className="text-2xl light:text-primary-500 dark:text-white font-medium">
              {detail.title}
            </div>
            <div className="text-small opacity-50">
              Posted {moment(detail.created_at).fromNow()}
            </div>

            <Spacer y={8} />

            <Divider />

            <div
              className="[&>p]:mt-6 [&>p]:mb-1 [&>ul]:list-disc [&>ul>li]:ml-4 [&>code]:my-4"
              dangerouslySetInnerHTML={{
                __html: removePreTag(detail.description),
              }}
            ></div>
          </div>

          <div className="flex flex-col w-1/3 gap-6">
            <Card
              isFooterBlurred
              className="w-full h-[250px] col-span-12 sm:col-span-7"
            >
              <Image
                removeWrapper
                alt="Relaxing app background"
                className="z-1 w-full h-full object-cover"
                src={detail.company_logo}
              />
              <Image
                removeWrapper
                alt="Relaxing app background"
                className="absolute z-0 w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29tcGFueXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
              />
              <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                  <div className="flex flex-col">
                    <p className="text-tiny text-white/70">Company</p>
                    <Spacer />
                    <p className="text-tiny text-white">{detail.company}</p>
                  </div>
                </div>
                <Button
                  as="a"
                  href={detail.company_url}
                  radius="full"
                  size="sm"
                  target="_blank"
                >
                  Website
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex gap-3">
                <p className="text-sm font-bold">How to Apply</p>
              </CardHeader>
              <Divider />
              <CardBody className="p-4">
                <div
                  className="[&>ul]:list-disc [&>ul>li]:ml-4"
                  dangerouslySetInnerHTML={{ __html: detail.how_to_apply }}
                ></div>
              </CardBody>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
