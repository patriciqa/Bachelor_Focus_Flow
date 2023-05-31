// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import MoodChart from "@/component/charts/MoodChart";
import HorizontalCarousel from "@/component/overview/Carousel";
import WeekCalendar from "@/component/overview/WeekCalendar";
import CreatePhaseView from "@/component/timer/CreatePhaseView";
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
  const [phases, setPhases] = useState<ExamPhase[]>();
  const [visibleComponentId, setVisibleComponentId] = useState(null);

  const getData = async (): Promise<ExamPhase[]> => {
    const choosenDate = selectedDate.setHours(0, 0, 0, 0); //choosen date
    const data: ExamPhase[] = await getElement("examPhases", "all");
    setPhases(data);
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
  let totalStudySeconds = 0;
  let totalBreakSeconds = 0;
  const calculateSummary = (
    phase: ExamPhase | undefined,
    choosenDate: number
  ): void => {
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
    }
    setEntries(sortBy(allE, "timer.startTime"));
  };

  return (
    <>
      {phases?.length === 0 && <CreatePhaseView />}
      <div className="flex flex-col items-center  w-screen h-[100vh] bg-background mb-20">
        <WeekCalendar
          activePhase={activePhase}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <div className="relative">
          <MoodChart
            visibleComponentId={visibleComponentId}
            entries={entries}
            studyEntry={studySummary !== 0 ? sToH(studySummary) : null}
            breakEntry={breakSummary !== 0 ? sToH(breakSummary) : null}
            setJumpId={setJumpId}
          />
          {studySummary === 0 && breakSummary === 0 && (
            <div className="absolute w-full text-center text-pieGrey text-h16 bottom-28 ">
              no data available
            </div>
          )}
        </div>
        <HorizontalCarousel
          entries={entries}
          setVisibleComponentId={setVisibleComponentId}
        />
      </div>
    </>
  );
};
export default Overview;
