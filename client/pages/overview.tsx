import { Modal } from "@/component/transitions/Modal";
import { getElement } from "@/db/Actions";
import { ExamPhase } from "@/types/Timer";
import { AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";

const Overview = () => {
  const [studySummary, setStudySummary] = useState(0);
  const [breakSummary, setBreakSummary] = useState(0);
  async function getData(): Promise<ExamPhase[]> {
    const data: ExamPhase[] = await getElement("examPhases", "all");
    return data;
  }

  const toDate = (unixTimestamp: number): Date => {
    return new Date(unixTimestamp * 1000);
  };

  useEffect(() => {
    getEntries();
  });

  const getTodaysEntries = (): void => {
    console.log(getElement("examPhases", "all"));
    getElement("examPhases", "all").then((entries) => {});
  };

  const getEntries = (): void => {
    let totalSeconds = 0;

    var today = new Date().setHours(0, 0, 0, 0); //choosen date
    getData().then((phases) => {
      phases.map((phase) => {
        calculateSummary(phase, today);
        // phase.studyEntries?.map((e) => {
        //   var thatDay = new Date(e.timer.startTime).setHours(0, 0, 0, 0);
        //     totalSeconds += e.timer.duration;
        //   }
        //   setStudySummary(totalSeconds);
        // });
      });
    });
  };

  const calculateSummary = (phase: ExamPhase, choosenDate: number): void => {
    let totalSeconds = 0;
    let totalBreakSeconds = 0;
    phase.studyEntries?.map((e) => {
      var thatDay = new Date(e.timer.startTime).setHours(0, 0, 0, 0);
      if (choosenDate === thatDay) {
        totalSeconds += e.timer.duration;
      }
      setStudySummary(totalSeconds);
    });
    phase.breakEntries?.map((e) => {
      var thatDay = new Date(e.timer.startTime).setHours(0, 0, 0, 0);
      if (choosenDate === thatDay) {
        totalBreakSeconds += e.timer.duration;
      }
      setBreakSummary(totalBreakSeconds);
    });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen">
        Overview (Entries)
        <div>Total Study today: {studySummary} seconds</div>
        <div>Total Break today: {breakSummary} seconds</div>
      </div>
    </>
  );
};
export default Overview;
