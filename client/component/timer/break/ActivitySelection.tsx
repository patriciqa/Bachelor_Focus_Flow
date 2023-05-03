import ModalPage from "@/component/settings/causes/ModalPage";
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
  let [open, setOpen] = useState(false);

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
            className={
              "w-full  p-2 align-center  justify-center flex " +
              (includes(selected, c.title) === true && "bg-metal")
            }
            onClick={() => {
              let selectedActivity;
              selectedActivity = c.title;
              setSelected(selectedActivity);
            }}
          >
            {c.title}
          </button>
        ))}
      <button
        onClick={() => {
          setOpen(true);
        }}
      >
        create new activity
      </button>

      <ModalPage
        open={open}
        setOpen={setOpen}
        component={<CreateActivity setOpen={setOpen} />}
      />
    </div>
  );
}
