import TextWithIcon from "@/component/icon/TextWithIcon";
import WeekCalendar from "@/component/statistics/WeekCalendar";
import { getElement } from "@/db/Actions";
import { ExamPhase } from "@/types/Timer";
import { format } from "date-fns";
import { sortBy } from "lodash";
import { useEffect, useState } from "react";

const Overview = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [studySummary, setStudySummary] = useState(0);
  const [breakSummary, setBreakSummary] = useState(0);
  const [entries, setEntries] = useState<any>([]);
  const allE: any = [];

  async function getData(): Promise<ExamPhase[]> {
    const data: ExamPhase[] = await getElement("examPhases", "all");
    return data;
  }

  useEffect(() => {
    getEntries();
    console.log(entries);
  }, [selectedDate]);

  const getEntries = (): void => {
    const choosenDate = selectedDate.setHours(0, 0, 0, 0); //choosen date
    getData().then((phases) => {
      phases.map((phase) => {
        console.log(phase);
        calculateSummary(phase, choosenDate);
      });
    });
  };

  const getReasons = (ids: string[]): any => {
    const reason = [{ title: "", icon: "" }];
    for (let i = 0; i < ids.length; i++) {
      getElement("reasons", ids[i]).then((result: any) => {
        reason[i].title = result.title;
        reason[i].icon = result.icon;
      });
    }

    console.log(reason);
    return "hi";
  };

  const calculateSummary = (phase: ExamPhase, choosenDate: number): void => {
    let totalStudySeconds = 0;
    let totalBreakSeconds = 0;
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
    console.log("all", allE);
    setEntries(sortBy(allE, "timer.startTime"));
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen">
        Overview
        <WeekCalendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <div className="bg-silver">
          Total Study today: {studySummary} seconds
        </div>
        <div className="bg-bubble-gum">
          Total Break today: {breakSummary} seconds
        </div>
        {entries !== undefined &&
          entries.map((entry: any) => (
            <>
              <button
                className={
                  " p-2  w-screen justify-center  flex flex-col " +
                  (entry.studyTimer === true
                    ? "bg-silver  items-start"
                    : "bg-bubble-gum  items-end")
                }
              >
                <div>duration: {entry.timer.duration} seconds</div>
                <div>
                  startTime:
                  {format(new Date(entry.timer.startTime), "HH:mm dd/LL/yyyy")}
                </div>
                <div>mood: {entry.mood}</div>
                {/* {entry.reasonIds !== undefined && (
                  <>
                    <div>Reason: {entry.reasonIds}</div>
                    <div>{getReasons(entry.reasonIds)}</div>
                  </>
                )} */}
                {entry.breakActivityId !== undefined && (
                  <>
                    <div>Activity: {entry.breakActivityId}</div>
                    <>
                      <TextWithIcon text="idk" icon="icon" />
                    </>
                  </>
                )}
              </button>
            </>
          ))}
      </div>
    </>
  );
};
export default Overview;
