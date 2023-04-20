import { getElement } from "@/db/Actions";
import { Activity, Break, PageComponent, Study } from "@/types/Timer";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

export const BreakView = ({
  breakEntryy,
  setBreakEntryy,
}: {
  breakEntryy: Break;
  setBreakEntryy: (s: Break) => void;
}) => {
  const [startTimer, setStartTimer] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);
  let duration = 3;

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

  const [activities, setActivities] = useState<Activity[]>();
  const breakActivities: Activity[] = [];

  const getActivities = async (): Promise<Activity[]> => {
    const a = (await getElement("activities", "all").then((result) => {
      return result;
    })) as Activity[];
    return a;
  };

  useEffect(() => {
    getActivities().then((a: Activity[]) => {
      a.forEach((p) => {
        breakActivities.push(p);
        setActivities(a);
      });
    });
  });

  return (
    <>
      <div>Break</div>
      <div>
        {state.minutes}:
        {state.seconds <= 10 ? `0${state.seconds}` : state.seconds}
      </div>
      {activities?.map((a) => {
        <button
          onClick={() => {
            const s = { ...breakEntryy };
            s.breakActivity = a;
            console.log(s);
            setBreakEntryy(s);
          }}
        >
          {a.title}
        </button>;
      })}

      <Link href="/mood/break"> finished</Link>
    </>
  );
};
