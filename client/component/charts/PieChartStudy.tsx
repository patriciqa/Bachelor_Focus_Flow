// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { getElement } from "@/db/Actions";
import { ExamPhase, Mood, Reason, Study } from "@/types/Timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { VictoryPie } from "victory";
interface MoodCount {
  id?: number;
  mood?: number;
}
export default function PieChartStudy({
  activePhase,
}: {
  activePhase: ExamPhase;
}) {
  // const [activePhase, setActivePhase] = useState<ExamPhase>();
  const [topThree, setTopThree] = useState<number[]>();
  const [topThreeId, setTopThreeId] = useState<string[]>();
  const [badTopThree, setBadTopThree] = useState<number[]>();
  const [badTopThreeId, setBadTopThreeId] = useState<string[]>();
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const [reasons, setReasons] = useState<Reason[]>();

  // const getData = async (): Promise<ExamPhase[]> => {
  //   const data: ExamPhase[] = await getElement("examPhases", "all");
  //   data.map((phase) => {
  //     const choosenDate = selectedDate.setHours(0, 0, 0, 0); //choosen date

  //     if (phase.startDate <= choosenDate && choosenDate < phase.endDate) {
  //       setActivePhase(phase);
  //     }
  //   });
  //   return data;
  // };

  // useEffect(() => {
  //   getData();
  //   getAllReasons();
  // }, []);

  useEffect(() => {
    getAllReasons();
  }, []);

  useEffect(() => {
    if (activePhase !== undefined) {
      getGoodAndBadReasons(activePhase);
    }
  }, [activePhase]);

  const getGoodAndBadReasons = (phase: ExamPhase) => {
    let moodReason: [MoodCount] = [{}];
    phase.studyEntries?.map((entry: Study) => {
      entry.reasonIds?.map((reason) => {
        let count;
        switch (entry.mood) {
          case Mood.GOOD: {
            count = 2;
            break;
          }
          case Mood.RATHER_GOOD: {
            count = 1;
            break;
          }
          case Mood.RATHER_BAD: {
            count = -1;
            break;
          }
          case Mood.BAD: {
            count = -2;
            break;
          }
        }

        moodReason.push({ id: reason, mood: count });
      });
    });
    console.log("moodReason", moodReason);
    if (moodReason.length !== 1) {
      const summarize: { [key: number]: number } = moodReason.reduce(
        (acc: any, curr) => {
          const { id, mood } = curr;
          if (id !== undefined) {
            if (!acc[id]) {
              acc[id] = mood;
            } else {
              acc[id] += mood;
            }
          }

          return acc;
        },
        {}
      );
      console.log("result", summarize);

      const createdArray = Object.entries(summarize).map(([key, value]) => ({
        [key]: value,
      }));
      getTopThree(createdArray);
    }
  };

  const getTopThree = (
    createdArray: {
      [x: string]: number;
    }[]
  ) => {
    const ascArray = sortArrayDependingOnMood(true, createdArray);
    setThree(true, ascArray);
    const descArray = sortArrayDependingOnMood(false, createdArray);
    setThree(false, descArray);
  };

  const sortArrayDependingOnMood = (
    asc: boolean,
    array: {
      [x: string]: number;
    }[]
  ): {
    [x: string]: number;
  }[] => {
    let sortedArray;
    if (asc) {
      sortedArray = array.sort((a, b) => {
        const aValue = Object.values(a)[0];
        const bValue = Object.values(b)[0];
        return bValue - aValue;
      });
    } else {
      sortedArray = array.sort((a, b) => {
        const aValue = Object.values(a)[0];
        const bValue = Object.values(b)[0];
        return aValue - bValue;
      });
    }
    return sortedArray;
  };

  const setThree = (
    positive: boolean,
    mutatedArray: {
      [x: string]: number;
    }[]
  ) => {
    if (positive) {
      let good = [0];
      let goodId = [""];
      console.log(mutatedArray, "asdf");
      if (mutatedArray !== undefined) {
        for (let i = 0; i < 3; i++) {
          if (mutatedArray[i] !== undefined) {
            if (Object.values(mutatedArray[i])[0] > 0) {
              if (good.length === 1 && good[0] === 0) {
                good = [Object.values(mutatedArray[i])[0]];
              } else {
                good.push(Object.values(mutatedArray[i])[0]);
              }
              if (goodId.length === 1 && goodId[0] === "") {
                goodId = [Object.keys(mutatedArray[i])[0]];
              } else {
                goodId.push(Object.keys(mutatedArray[i])[0]);
              }
            }
          }
        }
      }
      setTopThree(good);
      setTopThreeId(goodId);
    } else {
      let bad = [0];
      let badId = [""];

      if (mutatedArray !== undefined) {
        for (let i = 0; i < 3; i++) {
          if (mutatedArray[i] !== undefined) {
            if (Object.values(mutatedArray[i])[0] < 0) {
              if (bad.length === 1 && bad[0] === 0) {
                bad = [Object.values(mutatedArray[i])[0]];
              } else {
                bad.push(Object.values(mutatedArray[i])[0]);
              }
              if (badId.length === 1 && badId[0] === "") {
                badId = [Object.keys(mutatedArray[i])[0]];
              } else {
                badId.push(Object.keys(mutatedArray[i])[0]);
              }
            }
          }
        }
      }
      console.log(bad);
      console.log(badId);
      const badToPositive = bad.map((num) => Math.abs(num));
      setBadTopThree(badToPositive);
      setBadTopThreeId(badId);
    }
  };
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
              <FontAwesomeIcon icon={reason.icon} />
            )}
            <div className="pl-2">{reason.title}</div>
          </div>
        );
      }
    });
    return entry;
  };

  return (
    <div className="-translate-x-1/3 ">
      <div className="flex">
        <VictoryPie
          innerRadius={110}
          data={topThree}
          startAngle={0}
          endAngle={180}
          width={600}
          style={{
            labels: {
              fill: "transparent",
            },
          }}
          colorScale={["#332CF2", "#7571F2", "#B5B3F5"]}
        />
        <div className="flex flex-col justify-center w-1/2">
          {topThreeId !== undefined &&
            topThreeId.map((reason: string, index) => (
              <div
                key={reason}
                className={
                  (index === 0 && "text-studyChart1") ||
                  (index === 1 && "text-studyChart2") ||
                  (index === 2 && "text-studyChart3")
                }
              >
                {getReason(parseInt(reason))}
              </div>
            ))}
        </div>
      </div>{" "}
      <div className="flex">
        <VictoryPie
          innerRadius={110}
          data={badTopThree}
          startAngle={0}
          endAngle={180}
          width={600}
          colorScale={["#332CF2", "#7571F2", "#B5B3F5"]}
          style={{
            labels: {
              fill: "transparent",
            },
          }}
          colo
        />
        <div className="flex flex-col justify-center w-1/2">
          {badTopThreeId !== undefined &&
            badTopThreeId.map((reason: string, index) => (
              <div
                key={reason}
                className={
                  (index === 0 && "text-studyChart1") ||
                  (index === 1 && "text-studyChart2") ||
                  (index === 2 && "text-studyChart3")
                }
              >
                {getReason(parseInt(reason))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
