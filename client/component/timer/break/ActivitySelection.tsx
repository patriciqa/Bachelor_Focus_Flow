import CustomButton from "@/component/CustomButton";
import TextWithIcon from "@/component/icon/TextWithIcon";
import ModalPage from "@/component/settings/reasons/ModalPage";
import { getElement } from "@/db/Actions";
import { Activity } from "@/types/Timer";
import { includes } from "lodash";
import { useEffect, useState } from "react";
import CreateActivity from "./CreateActivity";

export default function ActivitySelection({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (d: string) => void;
}) {
  const [activities, setActivities] = useState<Activity[]>();
  const activityArray: Activity[] = [];
  const [open, setOpen] = useState(false);

  async function getData(): Promise<Activity[]> {
    const data: Activity[] = await getElement("activities", "all");
    return data;
  }

  useEffect(() => {
    getData().then((c) => {
      c.map((a) => {
        console.log(a);
        activityArray.push(a);
        setActivities(activityArray);
      });
    });
  });

  return (
    <div className="flex flex-col justify-center">
      {activities !== undefined &&
        activities.map((c) => (
          <button
            key={c.id}
            className={
              "w-full  p-2 align-center  justify-center flex " +
              (includes(selected, c.title) === true && "bg-metal")
            }
            onClick={() => {
              let selectedActivity = "";
              selectedActivity = c.title;
              setSelected(selectedActivity);
            }}
          >
            <TextWithIcon text={c.title} icon={c.icon} />
          </button>
        ))}
      <CustomButton
        variant="break"
        onClick={() => {
          setOpen(true);
        }}
      >
        create new activity
      </CustomButton>
      <ModalPage
        open={open}
        setOpen={setOpen}
        component={<CreateActivity setOpen={setOpen} />}
      />
    </div>
  );
}
