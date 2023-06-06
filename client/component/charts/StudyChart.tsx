// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { getElement } from "@/db/Actions";
import { Reason } from "@/types/Timer";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { VictoryPie } from "victory";

const grin = "./image/grin.svg";
const smile = "./image/smile.svg";
const meh = "./image/meh.svg";
const frown = "./image/frown.svg";

export default function StudyChart({
  good,
  topThree,
  badTopThree,
  badTopThreeId,
  topThreeId,
}: {
  good: boolean;
  topThree?: number[] | undefined;
  topThreeId?: string[];
  badTopThree?: number[];
  badTopThreeId?: string[];
}) {
  const [reasons, setReasons] = useState<Reason[]>();

  useEffect(() => {
    getAllReasons();
  }, []);
  const getAllReasons = async () => {
    const data: Reason[] = await getElement("reasons", "all");
    setReasons(data);
  };

  const getReason = (id: number): React.ReactElement => {
    let entry = <div />;
    reasons?.map((reason: Reason) => {
      if (reason.id === id) {
        entry = (
          <div className="flex flex-row items-center" key={reason.id}>
            {reason.icon !== undefined && (
              <FontAwesomeIcon icon={reason.icon as IconProp} />
            )}
            <div className="pl-2">{reason.title}</div>
          </div>
        );
      }
    });
    return entry;
  };
  const showReason = (id: string) => {
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
          <div className="pt-[2vh] -translate-x-1/2 ">
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
              colorScale={["#332CF2", "#7571F2", "#B5B3F5"]}
            />
          </div>
          <div className="absolute flex flex-col justify-center w-[70vw] translate-x-[15vw] ">
            <div className={"flex justify-around mb-2 "}>
              <div className={"basis-[70%]"}></div>
              <div className="basis-[15%] justify-center flex">
                <img className="h-[25px]" src={smile} />
              </div>
              <div className="basis-[15%] justify-center flex">
                <img className="h-[px]" src={grin} />
              </div>
            </div>
            {checkIfEmpty(topThree) ? (
              <div className="flex justify-center   text-h14 items-center h-[12vh] text-pieGrey">
                no data available
              </div>
            ) : (
              <>
                {topThreeId?.map((reason: any, index) => (
                  <div key={reason} className={"flex "}>
                    <div
                      className={
                        "" +
                        ((index === 0 &&
                          "text-studyChart1 py-1 text-h16 basis-[70%]") ||
                          (index === 1 &&
                            "text-studyChart2  py-1 text-h16 basis-[70%]") ||
                          (index === 2 &&
                            "text-studyChart3 py-1  text-h16 basis-[70%]	"))
                      }
                    >
                      {showReason(reason.id) || index === 1 ? (
                        <p> {getReason(parseInt(reason.id))}</p>
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
                          "text-studyChart1 py-1 justify-center flex text-h16 basis-[15%]") ||
                          (index === 1 &&
                            "text-studyChart2 py-1 justify-center flex text-h16 basis-[15%]") ||
                          (index === 2 &&
                            "text-studyChart3   py-1 justify-center flex text-h16 basis-[15%]"))
                      }
                    >
                      {reason.ratherGood[0] !== 0 ? reason.ratherGood : ""}
                    </div>
                    <div
                      className={
                        "" +
                        ((index === 0 &&
                          "text-studyChart1 py-1  justify-center flex text-h16 basis-[15%]") ||
                          (index === 1 &&
                            "text-studyChart2 py-1 justify-center flex text-h16 basis-[15%]") ||
                          (index === 2 &&
                            "text-studyChart3  py-1  justify-center flex text-h16 basis-[15%]"))
                      }
                    >
                      {reason.good[0] !== 0 ? reason.good : ""}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="pt-[2vh] -translate-x-1/2 ">
            <VictoryPie
              innerRadius={110}
              data={checkIfEmpty(badTopThree) ? [0] : badTopThree}
              startAngle={0}
              endAngle={180}
              width={1200}
              colorScale={["#332CF2", "#7571F2", "#B5B3F5"]}
              style={{
                labels: {
                  fill: "transparent",
                },
              }}
            />
          </div>
          <div className="absolute flex flex-col justify-center w-[70vw] translate-x-[15vw] ">
            <div className={"flex justify-around  mb-2"}>
              <div className={"basis-[70%]"}></div>
              <div className="basis-[15%] justify-center flex">
                <img className="h-[25px]" src={meh} />
              </div>
              <div className="basis-[15%] justify-center flex">
                <img className="h-[26px]" src={frown} />
              </div>
            </div>

            {checkIfEmpty(badTopThree) ? (
              <div className="flex justify-center   text-h14 items-center h-[12vh] text-pieGrey">
                no data available
              </div>
            ) : (
              <>
                {badTopThreeId?.map((reason: any, index: number) => (
                  <>
                    <div key={reason} className={"flex justify-around "}>
                      <div
                        className={
                          "" +
                          ((index === 0 &&
                            "text-studyChart1 py-1 text-h16 basis-[70%]") ||
                            (index === 1 &&
                              "text-studyChart2  py-1 text-h16 basis-[70%]") ||
                            (index === 2 &&
                              "text-studyChart3 py-1  text-h16 basis-[70%]	"))
                        }
                      >
                        {showReason(reason.id) || index === 1 ? (
                          <p>{getReason(parseInt(reason.id))}</p>
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
                            "text-studyChart1 py-1  justify-center flex text-h16 basis-[15%]") ||
                            (index === 1 &&
                              "text-studyChart2 py-1 justify-center flex text-h16 basis-[15%]") ||
                            (index === 2 &&
                              "text-studyChart3  py-1  justify-center flex text-h16 basis-[15%]"))
                        }
                      >
                        {reason.ratherBad[0] !== 0 ? reason.ratherBad : ""}
                      </div>
                      <div
                        className={
                          "" +
                          ((index === 0 &&
                            "text-studyChart1 py-1  justify-center flex text-h16 basis-[15%]") ||
                            (index === 1 &&
                              "text-studyChart2 py-1 justify-center flex text-h16 basis-[15%]") ||
                            (index === 2 &&
                              "text-studyChart3  py-1  justify-center flex text-h16 basis-[15%]"))
                        }
                      >
                        {reason.bad[0] !== 0 ? reason.bad : ""}
                      </div>
                    </div>
                  </>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
