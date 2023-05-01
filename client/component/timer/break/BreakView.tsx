import { Modal } from "@/component/transitions/Modal";
import { getElement } from "@/db/Actions";
import { BreakComponent } from "@/types/Components";
import { Activity, Break, WhichTimer } from "@/types/Timer";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import ActivitySelection from "./ActivitySelection";
import BreakMoodCheckIn from "./BreakMoodCheckIn.tsx";
import ExtendBreak from "./ExtendBreak";

export const BreakView = ({
  whichTimer: whichTimer,
  setWhichTimer: setWhichTimer,
  breakEntryy,
  setBreakEntryy,
}: {
  whichTimer: WhichTimer;
  setWhichTimer: (d: WhichTimer) => void;
  breakEntryy: Break;
  setBreakEntryy: (s: Break) => void;
}) => {
  let [open, setOpen] = useState(false);
  let [openActivites, setOpenActivites] = useState(false);
  let [showComponent, setShowComponent] = useState(BreakComponent.NO_COMPONENT);
  const [startTimer, setStartTimer] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);
  const [duration, setDuration] = useState(3);

  useEffect(() => {
    if (startTimer) {
      setTimeout(() => {
        if (duration === 0) {
          setTimerFinished(true);
          return;
        }
      }, 1000);
    }
  }, [duration, startTimer]);

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
            whichTimer={whichTimer}
            setWhichTimer={setWhichTimer}
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
          e.studyTimer = false;
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
          e.studyTimer = false;
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
