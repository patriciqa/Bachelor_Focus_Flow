import { getElement } from "@/db/Actions";
import { Activity } from "@/types/Timer";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { VictoryPie } from "victory";

const grin = "./image/study-grin.svg";
const smile = "./image/study-smile.svg";
const meh = "./image/study-meh.svg";
const frown = "./image/study-frown.svg";

export default function BreakChart({
  good,
  topThree,
  badTopThree,
  badTopThreeId,
  topThreeId,
}: {
  good: boolean;
  topThree?: number[];
  topThreeId?: string[];
  badTopThree?: number[];
  badTopThreeId?: string[];
}) {
  const [activities, setActivities] = useState<Activity[]>();
  useEffect(() => {
    getAllActivities();
  }, []);

  const getAllActivities = async () => {
    const data: Activity[] = await getElement("activities", "all");
    setActivities(data);
  };

  const getActivity = (id: number): React.ReactElement => {
    let entry = <div />;
    activities?.map((b: Activity) => {
      if (b.id === id) {
        entry = (
          <div className="flex flex-row items-center" key={b.id}>
            {b.icon !== undefined && (
              <FontAwesomeIcon icon={b.icon as IconProp} />
            )}
            <div className="pl-2">{b.title}</div>
          </div>
        );
      }
    });
    return entry;
  };

  const showActivity = (id: string) => {
    if (id === "null" || id === undefined) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="flex">
      {good ? (
        <>
          <div className="-translate-x-1/2 ">
            <VictoryPie
              innerRadius={110}
              data={topThree}
              startAngle={0}
              endAngle={180}
              width={1200}
              style={{
                labels: {
                  fill: "transparent",
                },
              }}
              colorScale={["#307B45", "#4CB66A", "#96CDA5"]}
            />
          </div>

          <div className="absolute flex flex-col justify-center w-[70vw] translate-x-[15vw] pt-4 ">
            {topThreeId !== undefined &&
              topThreeId.map((activity: any, index) => (
                <div key={activity} className={"flex  	"}>
                  <div
                    className={
                      "" +
                      ((index === 0 &&
                        "text-breakChart1 py-1 text-h16 basis-[70%]") ||
                        (index === 1 &&
                          "text-breakChart2  py-1 text-h16 basis-[70%]") ||
                        (index === 2 &&
                          "text-breakChart3 py-1  text-h16 basis-[70%]	"))
                    }
                  >
                    {showActivity(activity.id) || index === 1 ? (
                      <p> {getActivity(parseInt(activity.id))}</p>
                    ) : (
                      <div className="font-medium  text-chartGrey text-h14">
                        no additional data available
                      </div>
                    )}
                  </div>
                  <div
                    className={
                      "" +
                      ((index === 0 &&
                        "text-breakChart1 py-1 justify-center flex text-h16 basis-[15%]") ||
                        (index === 1 &&
                          "text-breakChart2 py-1 justify-center flex text-h16 basis-[15%]") ||
                        (index === 2 &&
                          "text-breakChart3   py-1 justify-center flex text-h16 basis-[15%]"))
                    }
                  >
                    {activity.ratherGood[0] !== 0 ? activity.ratherGood : ""}
                  </div>
                  <div
                    className={
                      "" +
                      ((index === 0 &&
                        "text-breakChart1 py-1 justify-center flex text-h16 basis-[15%]") ||
                        (index === 1 &&
                          "text-breakChart2 py-1 justify-center flex text-h16 basis-[15%]") ||
                        (index === 2 &&
                          "text-breakChart3   py-1 justify-center flex text-h16 basis-[15%]"))
                    }
                  >
                    {activity.good[0] !== 0 ? activity.good : ""}
                  </div>
                </div>
              ))}
          </div>
        </>
      ) : (
        <>
          <div className="-translate-x-1/2 ">
            <VictoryPie
              innerRadius={110}
              data={badTopThree}
              startAngle={0}
              endAngle={180}
              width={1200}
              colorScale={["#307B45", "#4CB66A", "#96CDA5"]}
              style={{
                labels: {
                  fill: "transparent",
                },
              }}
            />
          </div>
          <div className="absolute flex flex-col justify-center w-[70vw] translate-x-[15vw] pt-4">
            {badTopThreeId !== undefined &&
              badTopThreeId.map((activity: any, index) => (
                <div key={activity} className={"flex justify-around "}>
                  <div
                    className={
                      "" +
                      ((index === 0 &&
                        "text-breakChart1 py-1 text-h16 basis-[70%]") ||
                        (index === 1 &&
                          "text-breakChart2  py-1 text-h16 basis-[70%]") ||
                        (index === 2 &&
                          "text-breakChart3 py-1  text-h16 basis-[70%]	"))
                    }
                  >
                    {showActivity(activity.id) || index === 1 ? (
                      <p> {getActivity(parseInt(activity.id))}</p>
                    ) : (
                      <div className="font-medium text-chartGrey text-h14">
                        no additional data available
                      </div>
                    )}
                  </div>
                  <div
                    className={
                      "" +
                      ((index === 0 &&
                        "text-breakChart1 py-1 justify-center flex text-h16 basis-[15%]") ||
                        (index === 1 &&
                          "text-breakChart2 py-1 justify-center flex text-h16 basis-[15%]") ||
                        (index === 2 &&
                          "text-breakChart3   py-1 justify-center flex text-h16 basis-[15%]"))
                    }
                  >
                    {activity.ratherBad[0] !== 0 ? activity.ratherBad : ""}
                  </div>

                  <div
                    className={
                      "" +
                      ((index === 0 &&
                        "text-breakChart1 py-1 justify-center flex text-h16 basis-[15%]") ||
                        (index === 1 &&
                          "text-breakChart2 py-1 justify-center flex text-h16 basis-[15%]") ||
                        (index === 2 &&
                          "text-breakChart3   py-1 justify-center flex text-h16 basis-[15%]"))
                    }
                  >
                    {activity.bad[0] !== 0 ? activity.bad : ""}
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
