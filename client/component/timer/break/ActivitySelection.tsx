import CustomButton from "@/component/CustomButton";
import ButtonList, { ButtonVariant } from "@/component/icon/ButtonList";
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
        activities.map((activity) => (
          <>
            <ButtonList
              text={activity.title}
              icon={activity.icon}
              reason={activity}
              selected={selected}
              whenClicked={() => {
                let selectedActivity = -1;
                if (activity.id !== undefined) {
                  selectedActivity = activity.id;
                }
                setSelected(selectedActivity);
              }}
              buttonVariant={ButtonVariant.BREAK}
            />
          </>
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
        component={<CreateView setOpen={setOpen} isBreak />}
      />
    </div>
  );
}
