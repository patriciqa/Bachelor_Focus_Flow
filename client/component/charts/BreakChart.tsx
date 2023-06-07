// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { getElement } from "@/db/Actions";
import { Activity } from "@/types/Timer";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { VictoryPie } from "victory";

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
  const checkIfEmpty = (val: number[] | undefined | null) => {
    if (val !== null && val !== undefined && val[0] === 0) {
      return true;
    }
    if (val === undefined || val === null || val === [0]) {
      return true;
    }
    return false;
  };

  return (
    <div className="flex">
      {good ? (
        <>
          <div className="-translate-x-1/2 ">
            <VictoryPie
              innerRadius={110}
              data={checkIfEmpty(topThree) ? [0] : topThree}
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
            {checkIfEmpty(topThree) ? (
              <div className="flex justify-start   text-h14 items-center h-[12vh] text-pieGrey">
                no data available
              </div>
            ) : (
              <>
                {topThreeId?.map((activity: any, index) => (
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
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="-translate-x-1/2 ">
            <VictoryPie
              innerRadius={110}
              data={checkIfEmpty(badTopThree) ? [0] : badTopThree}
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
            {checkIfEmpty(badTopThree) ? (
              <div className="flex justify-start   text-h14 items-center h-[12vh] text-pieGrey">
                no data available
              </div>
            ) : (
              <>
                {badTopThreeId?.map((activity: any, index) => (
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
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
