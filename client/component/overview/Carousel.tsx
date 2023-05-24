// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { getElement } from "@/db/Actions";
import { Activity, Mood, Reason } from "@/types/Timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Tag from "./Tag";
const HorizontalCarousel = ({
  entries,
  selectedDate,
  jumpId,
}: {
  entries: any;
  selectedDate: Date;
  jumpId: number;
}) => {
  const [reasons, setReasons] = useState<Reason[]>();
  const [activites, setActivities] = useState<Activity>();

  useEffect(() => {
    getAllReasons();
    getAllActivites();
  }, [selectedDate]);

  function getIcon(mood: Mood): React.ReactElement {
    let icon;
    switch (mood) {
      case Mood.BAD:
        icon = <FontAwesomeIcon icon={["fas", "face-frown"]} size="2x" />;
        break;
      case Mood.RATHER_BAD:
        icon = <FontAwesomeIcon icon={["fas", "face-meh"]} size="2x" />;
        break;
      case Mood.RATHER_GOOD:
        icon = <FontAwesomeIcon icon={["fas", "face-smile"]} size="2x" />;
        break;
      case Mood.GOOD:
        icon = <FontAwesomeIcon icon={["fas", "face-grin"]} size="2x" />;
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
            className="flex flex-row items-center border border-white rounded-[32px] py-1 px-1"
            key={reason.id}
          >
            <div className="pr-2">
              {reason.icon !== undefined && (
                <FontAwesomeIcon icon={reason.icon} />
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

  const getAllReasons = async () => {
    const data: Reason[] = await getElement("reasons", "all");
    setReasons(data);
  };

  const getAllActivites = async () => {
    const data: Activity[] = await getElement("activities", "all");
    setActivities(data);
  };

  return (
    <div className="w-full overflow-x-auto horizontal-carousel snap-x snap-mandatory ">
      <div className="flex carousel-container">
        {entries !== undefined &&
          entries.map((entry: any) => (
            <div key={entry.timer.startTime}>
              <Tag entry={entry} />
              {/* <button
                id={entry.timer.startTime}
                className={
                  "flex-none carousel-item snap-center m-3  py-4  h-[25vh] flex flex-col  rounded w-[80vw] text-white " +
                  (entry.studyTimer === true ? "bg-study " : "bg-break ")
                }
              >
                <div className="flex justify-center">
                  <div className="flex flex-col items-center w-[25vw]">
                    <div>{getIcon(entry.mood)}</div>
                    <div className="flex items-center justify-center w-4 text-center text-h12">
                      {entry.mood}
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-h24">
                      {sToM(entry.timer.duration)} min
                    </div>
                    <div className="flex text-h16">
                      {moment(new Date(entry.timer.startTime)).format("HH:mm ")}
                      -
                      {moment(new Date(entry.timer.startTime))
                        .add(entry.timer.duration)
                        .format("HH:mm")}
                    </div>
                    <div className="flex flex-col ">
                      {entry.reasonIds?.map((reason: number) => (
                        <div key={reason} className="flex items-center py-1">
                          {getReason(reason)}
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      {entry.breakActivityId !== undefined && (
                        <>
                          <div className="flex items-center ">
                            {getActivity(entry.breakActivityId)}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </button> */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default HorizontalCarousel;
