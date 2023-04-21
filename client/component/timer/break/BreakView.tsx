import { Modal } from "@/component/transitions/Modal";
import { getElement } from "@/db/Actions";
import { BreakComponent } from "@/types/Components";
import { Activity, Break, ShowPage } from "@/types/Timer";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import ActivitySelection from "./ActivitySelection";
import BreakMoodCheckIn from "./BreakMoodCheckIn.tsx";
import ExtendBreak from "./ExtendBreak";

export const BreakView = ({
  shownPage: showPage,
  setShownPage: setShowPage,
  breakEntryy,
  setBreakEntryy,
}: {
  shownPage: ShowPage;
  setShownPage: (d: ShowPage) => void;
  breakEntryy: Break;
  setBreakEntryy: (s: Break) => void;
}) => {
  let [open, setOpen] = useState(false);
  let [openActivites, setOpenActivites] = useState(false);
  let [showComponent, setShowComponent] = useState(BreakComponent.NO_COMPONENT);
  const [startTimer, setStartTimer] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);
  const [duration, setDuration] = useState(3);

  const [state, setState] = useState({
    time: duration,
    minutes: Math.floor((duration - 1) / 60),
    seconds: duration - Math.floor((duration - 1) / 60) * 60 - 1,
  });

  useEffect(() => {
    if (startTimer) {
      setTimeout(() => {
        if (state.time === 0) {
          setTimerFinished(true);
          return;
        }

        setState({
          time: state.time - 1,
          minutes: Math.floor((state.time - 1) / 60),
          seconds: state.time - Math.floor((state.time - 1) / 60) * 60 - 1,
        });
      }, 1000);
    }
  }, [state.time, startTimer]);

  // // const [activities, setActivities] = useState<Activity[]>();
  // const breakActivities: Activity[] = [];

  // const getActivities = async (): Promise<Activity[]> => {
  //   const a = (await getElement("activities", "all").then((result) => {
  //     return result;
  //   })) as Activity[];
  //   return a;
  // };

  // useEffect(() => {
  //   getActivities().then((a: Activity[]) => {
  //     a.forEach((p) => {
  //       breakActivities.push(p);
  //       setActivities(a);
  //     });
  //   });
  // });

  const showBreakPage = (): React.ReactElement | null => {
    let component = null;
    switch (showComponent) {
      case BreakComponent.NO_COMPONENT:
        component = null;
        break;
      case BreakComponent.MOODCHECKIN:
        component = (
          <BreakMoodCheckIn
            breakEntryy={breakEntryy}
            setBreakEntryy={setBreakEntryy}
            setShowComponent={setShowComponent}
          />
        );
        break;
      case BreakComponent.EXTEND_BREAK:
        component = (
          <ExtendBreak
            showPage={showPage}
            setShownPage={setShowPage}
            setShowComponent={setShowComponent}
          />
        );
        break;
    }
    return component;
  };

  return (
    <>
      <div>Break</div>
      <div>
        {state.minutes}:
        {state.seconds <= 10 ? `0${state.seconds}` : state.seconds}
      </div>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="duration (number)"
        required
        className="bg-silver"
        onChange={(i) => {
          const e = { ...breakEntryy };
          const d = parseInt(i.target.value);
          e.timer.duration = d;
          setBreakEntryy(e);
          setDuration(d);
        }}
      />
      {/* {activities?.map((a) => {
        <button
          onClick={() => {
            const s = { ...breakEntryy };
            s.breakActivityId = a.id;
            console.log(s);
            setBreakEntryy(s);
          }}
        >
          {a.title}
        </button>;
      })} */}
      <div
        onClick={() => {
          setOpenActivites(true);
        }}
      >
        select activity
      </div>
      <button
        onClick={() => {
          const e = { ...breakEntryy };
          e.timer.startTime = Date.now();
          setBreakEntryy(e);
        }}
      >
        start
      </button>
      <button
        onClick={() => {
          setOpen(true);
          setShowComponent(BreakComponent.MOODCHECKIN);
        }}
      >
        modal
      </button>
      <AnimatePresence>
        {open && (
          <Modal onClose={() => setOpen(false)}>
            <button
              className="mr-1 text-blue-500 focus:outline-none"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            {showBreakPage() !== null ? showBreakPage() : setOpen(false)}
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {openActivites && (
          <Modal onClose={() => setOpen(false)}>
            <button className="" onClick={() => setOpenActivites(false)}>
              Cancel
            </button>
            <ActivitySelection />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};
