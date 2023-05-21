// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import MoodChart from "@/component/charts/MoodChart";
import HorizontalCarousel from "@/component/overview/Carousel";
import WeekCalendar from "@/component/overview/WeekCalendar";
import { getElement } from "@/db/Actions";
import sToH from "@/hooks/SecondsToHours";
import { ExamPhase } from "@/types/Timer";
import { sortBy } from "lodash";
import "moment/locale/de-ch";
import { useEffect, useState } from "react";

const Overview = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [studySummary, setStudySummary] = useState(0);
  const [breakSummary, setBreakSummary] = useState(0);
  const [entries, setEntries] = useState<any>([]);
  const [activePhase, setActivePhase] = useState<ExamPhase>();
  const [jumpId, setJumpId] = useState<number>();
  const allE: any = [];

  const getData = async (): Promise<ExamPhase[]> => {
    const choosenDate = selectedDate.setHours(0, 0, 0, 0); //choosen date
    const data: ExamPhase[] = await getElement("examPhases", "all");
    data.map((phase) => {
      if (phase.startDate <= choosenDate && choosenDate < phase.endDate) {
        setActivePhase(phase);
      }
      calculateSummary(phase, choosenDate);
    });
    return data;
  };

  useEffect(() => {
    getData();
  }, [selectedDate]);

  const calculateSummary = (
    phase: ExamPhase | undefined,
    choosenDate: number
  ): void => {
    let totalStudySeconds = 0;
    let totalBreakSeconds = 0;
    if (phase !== undefined) {
      phase.studyEntries?.map((e) => {
        const thatDay = new Date(e.timer.startTime).setHours(0, 0, 0, 0);
        if (choosenDate === thatDay) {
          totalStudySeconds += e.timer.duration;
          allE.push(e);
        }
        setStudySummary(totalStudySeconds);
      });
      phase.breakEntries?.map((e) => {
        const thatDay = new Date(e.timer.startTime).setHours(0, 0, 0, 0);
        if (choosenDate === thatDay) {
          totalBreakSeconds += e.timer.duration;
          allE.push(e);
        }
        setBreakSummary(totalBreakSeconds);
      });
      console.log(totalBreakSeconds);
    }
    setEntries(sortBy(allE, "timer.startTime"));
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen bg-background">
        <WeekCalendar
          activePhase={activePhase}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <MoodChart
          entries={entries}
          studyEntry={sToH(studySummary)}
          breakEntry={sToH(breakSummary)}
          setJumpId={setJumpId}
        />
        <HorizontalCarousel
          entries={entries}
          selectedDate={selectedDate}
          jumpId={jumpId}
        />
      </div>
    </>
  );
};
export default Overview;
