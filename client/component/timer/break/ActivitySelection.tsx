import { Modal } from "@/component/transitions/Modal";
import { getElement } from "@/db/Actions";
import { Activity } from "@/types/Timer";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import CreateActivity from "./CreateActivity";

export default function ActivitySelection() {
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
        activities.map((c) => <button>{c.title}</button>)}
      <button
        onClick={() => {
          setOpen(true);
        }}
      >
        create new activity
      </button>

      <AnimatePresence>
        {open && (
          <Modal onClose={() => setOpen(false)}>
            <button className="" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <CreateActivity setOpen={setOpen} />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
