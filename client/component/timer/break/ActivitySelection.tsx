import CustomButton from "@/component/CustomButton";
import TextWithIcon from "@/component/icon/TextWithIcon";
import ModalPage from "@/component/settings/reasons/ModalPage";
import { getElement } from "@/db/Actions";
import { Activity } from "@/types/Timer";
import { useEffect, useState } from "react";
import CreateView from "../CreateView";

export default function ActivitySelection({
  selected,
  setSelected,
}: {
  selected: number;
  setSelected: (d: number) => void;
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
  }); //todo renders too much

  return (
    <div className="flex flex-col justify-center">
      {activities !== undefined &&
        activities.map((c) => (
          <button
            key={c.id}
            className={
              "w-full  p-2 align-center  justify-center flex " +
              (c.id !== undefined && selected === c.id && "bg-metal")
            }
            onClick={() => {
              let selectedActivity = -1;
              if (c.id !== undefined) {
                selectedActivity = c.id;
              }
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
        component={<CreateView setOpen={setOpen} />}
      />
    </div>
  );
}
