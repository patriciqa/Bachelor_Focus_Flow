import { getElement } from "@/db/Actions";
import sToM from "@/hooks/SecondsToMinutes";
import { Activity, Mood, Reason } from "@/types/Timer";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useEffect, useState } from "react";

export default function Tag({ entry }: { entry: any }) {
  const [reasons, setReasons] = useState<Reason[]>();
  const [activites, setActivities] = useState<Activity[]>();

  useEffect(() => {
    getAllReasons();
    getAllActivites();
  }, []);

  const nonSelected = (): string | null => {
    if (entry.reasonIds === undefined && entry.studyTimer === true) {
      return "no cause selected";
    } else if (
      (entry.breakActivityId === undefined ||
        entry.breakActivityId === -1 ||
        entry.breakActivityId === null) &&
      entry.studyTimer === false
    ) {
      return "no activity selected";
    }
    return null;
  };

  function getIcon(mood: Mood): React.ReactElement {
    let icon;
    switch (mood) {
      case Mood.BAD:
        icon = <FontAwesomeIcon icon={["fas", "face-frown"]} size="xl" />;
        break;
      case Mood.RATHER_BAD:
        icon = <FontAwesomeIcon icon={["fas", "face-meh"]} size="xl" />;
        break;
      case Mood.RATHER_GOOD:
        icon = <FontAwesomeIcon icon={["fas", "face-smile"]} size="xl" />;
        break;
      case Mood.GOOD:
        icon = <FontAwesomeIcon icon={["fas", "face-grin"]} size="xl" />;
        break;
      case undefined:
        icon = <FontAwesomeIcon icon={["fas", "circle-question"]} size="xl" />;
        break;
    }

    return icon;
  }
  const getReason = (id: number): React.ReactElement => {
    let entry = <div />;
    reasons?.map((reason: Reason) => {
      if (reason.id === id) {
        entry = (
          <div
            className="flex flex-row items-center border border-white rounded-[32px] py-1 px-2"
            key={reason.id}
          >
            <div className="pr-2">
              {reason.icon !== undefined && (
                <FontAwesomeIcon icon={reason.icon as IconProp} />
              )}
            </div>

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
          <div
            className="flex flex-row items-center border border-white rounded-[32px] py-1 px-2"
            key={activity.id}
          >
            <div className="pr-2">
              {activity.icon !== undefined && (
                <FontAwesomeIcon icon={activity.icon as IconProp} />
              )}
            </div>
            {activity.title}
          </div>
        );
      }
    });
    return entry;
  };

  const getAllReasons = async () => {
    const data: Reason[] = await getElement("reasons", "all");
    setReasons(data);
  };

  const getAllActivites = async () => {
    const data: Activity[] = await getElement("activities", "all");
    setActivities(data);
  };
  return (
    <div>
      <button
        id={entry.timer.startTime}
        className={
          "flex justify-center h-full carousel-item snap-center m-3  py-4    rounded w-[80vw] md:w-[50vw] text-white " +
          (entry.studyTimer === true ? "bg-study " : "bg-break ")
        }
      >
        <div className="flex flex-col items-center w-1/4 ">
          <div>{getIcon(entry.mood)}</div>
          <div className="flex items-center justify-center w-4 pt-3 text-center text-h14">
            {entry.mood}
          </div>
        </div>
        <div className="flex flex-col w-3/4">
          <div className="font-bold text-left text-h24">
            {sToM(entry.timer.duration)} min
          </div>
          <div className="flex text-h14">
            {moment(new Date(entry.timer.startTime)).format("HH:mm ")}-
            {moment(new Date(entry.timer.startTime))
              .add(entry.timer.duration)
              .format("HH:mm")}
          </div>
          <div className="flex flex-wrap pt-5 ">
            {entry.reasonIds?.map((reason: number) => (
              <div
                key={reason}
                className="flex items-center pt-2 mx-1 text-left py-2s text-h14 "
              >
                {getReason(reason)}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap">
            {entry.breakActivityId !== undefined && (
              <>
                <div className="flex items-center py-1 pt-2 mx-1 text-left text-h14 ">
                  {getActivity(entry.breakActivityId)}
                </div>
              </>
            )}
          </div>{" "}
          {nonSelected() !== null && (
            <div className="flex flex-wrap">
              <>
                <div className="flex items-center py-1 pt-2 mx-1 text-left text-white text-opacity-75 text-h14 ">
                  {nonSelected()}
                </div>
              </>
            </div>
          )}
        </div>
      </button>
    </div>
  );
}
