// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import MoodChart from "@/component/charts/MoodChart";
import WeekCalendar from "@/component/overview/WeekCalendar";
import { getElement } from "@/db/Actions";
import sToM from "@/hooks/SecondsToMinutes";
import { Activity, ExamPhase, Mood, Reason } from "@/types/Timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sortBy } from "lodash";
import moment from "moment";
import "moment/locale/de-ch";
import { useEffect, useState } from "react";

export function getIcon(mood: Mood): React.ReactElement {
  let icon;
  switch (mood) {
    case Mood.BAD:
      icon = <FontAwesomeIcon icon={["fas", "face-frown"]} />;
      break;
    case Mood.RATHER_BAD:
      icon = <FontAwesomeIcon icon={["fas", "face-meh"]} />;
      break;
    case Mood.RATHER_GOOD:
      icon = <FontAwesomeIcon icon={["fas", "face-smile"]} />;
      break;
    case Mood.GOOD:
      icon = <FontAwesomeIcon icon={["fas", "face-grin"]} />;
      break;
  }
  return icon;
}

const Overview = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [studySummary, setStudySummary] = useState(0);
  const [breakSummary, setBreakSummary] = useState(0);
  const [reasons, setReasons] = useState<Reason[]>();
  const [activites, setActivities] = useState<Activity>();
  const [entries, setEntries] = useState<any>([]);
  const [activePhase, setActivePhase] = useState<ExamPhase>();
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
    getAllReasons();
    getAllActivites();
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
    }
    setEntries(sortBy(allE, "timer.startTime"));
  };

  const getAllReasons = async () => {
    const data: Reason[] = await getElement("reasons", "all");
    setReasons(data);
  };

  const getAllActivites = async () => {
    const data: Activity[] = await getElement("activities", "all");
    setActivities(data);
  };
  const getReason = (id: number): React.ReactElement => {
    let entry = <div />;
    reasons?.map((reason: Reason) => {
      if (reason.id === id) {
        entry = (
          <div className="flex flex-row" key={reason.id}>
            {reason.icon !== undefined && (
              <FontAwesomeIcon icon={reason.icon} />
            )}
            {reason.title}
          </div>
        );
      }
    });
    return entry;
  };

  const getActivity = (id: number): React.ReactElement => {
    let entry = <div />;
    activites?.map((activity: Activity) => {
      if (activity.id === id) {
        entry = (
          <div className="flex flex-row" key={activity.id}>
            {activity.icon !== undefined && (
              <FontAwesomeIcon icon={activity.icon} />
            )}
            {activity.title}
          </div>
        );
      }
    });
    return entry;
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen">
        <WeekCalendar
          activePhase={activePhase}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <div className="flex justify-between w-full ">
          <div className="bg-study">Study {sToM(studySummary)} min</div>
          <div className="bg-break">Break: {sToM(breakSummary)} min</div>
        </div>
        <MoodChart entries={entries} />
        <>
          {entries !== undefined &&
            entries.map((entry: any) => (
              <div key={entry.timer.startTime}>
                <button
                  className={
                    " p-2  w-screen justify-center  flex flex-col " +
                    (entry.studyTimer === true
                      ? "bg-study  items-start"
                      : "bg-break  items-end")
                  }
                >
                  <div className="flex">
                    <div> {getIcon(entry.mood)}</div>
                    <div>
                      <div>{sToM(entry.timer.duration)} min</div>
                      <div>
                        {moment(new Date(entry.timer.startTime)).format(
                          " HH:mm "
                        )}{" "}
                        -
                        {moment(new Date(entry.timer.startTime))
                          .add(entry.timer.duration)
                          .format("HH:mm")}
                      </div>
                      <div className="flex ">
                        {entry.reasonIds !== undefined &&
                          entry.reasonIds !== null &&
                          entry.reasonIds.map((reason: number) => (
                            <div
                              key={reason}
                              className="border-2 border-white border-solid rounded-md"
                            >
                              {getReason(reason)}
                            </div>
                          ))}
                      </div>
                      <div className="flex">
                        {entry.breakActivityId !== undefined && (
                          <>
                            <div className="border-2 border-white border-solid rounded-md">
                              {getActivity(entry.breakActivityId)}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            ))}
        </>
      </div>
    </>
  );
};
export default Overview;
