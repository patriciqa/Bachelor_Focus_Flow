import { ColorType } from "@/component/CancellButton";
import ButtonList, { ButtonVariant } from "@/component/icon/ButtonList";
import ModalPage from "@/component/settings/reasons/ModalPage";
import { getElement } from "@/db/Actions";
import { Activity } from "@/types/Timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import CreateView from "../CreateView";

export default function ActivitySelection({
  selected,
  setSelected,
}: {
  selected: number | null;
  setSelected: (d: number | null) => void;
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
        // console.log(a);
        activityArray.push(a);
        setActivities(activityArray);
      });
    });
  }); //todo renders too much

  return (
    <div className="flex flex-col justify-center">
      <div className="h-[50vh] relative py-4">
        <div className="max-h-full overflow-auto">
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
          <button
            onClick={() => {
              setSelected(null);
              console.log(selected);
            }}
            className={
              "flex flex-row items-center justify-center flex-grow w-full p-3 my-2 border rounded-[32px] border-inactiveGrey " +
              (selected === null && "bg-inactiveGrey text-white")
            }
          >
            set no activity
          </button>
          <button
            className="flex items-center justify-center w-full my-6 text-break"
            onClick={() => {
              setOpen(true);
            }}
          >
            <FontAwesomeIcon
              className="pr-2 text-break"
              icon={["fas", "plus"]}
            />
            add new activity
          </button>
        </div>
      </div>
      <ModalPage
        colorType={ColorType.BREAK}
        open={open}
        setOpen={setOpen}
        component={<CreateView setOpen={setOpen} isBreak />}
      />
    </div>
  );
}
