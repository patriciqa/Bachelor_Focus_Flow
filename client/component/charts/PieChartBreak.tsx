// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { getElement } from "@/db/Actions";
import { Activity, ExamPhase, Mood } from "@/types/Timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { VictoryPie } from "victory";
interface MoodCount {
  id?: number;
  mood?: number;
}
export default function PieChartBreak({
  activePhase,
}: {
  activePhase: ExamPhase;
}) {
  const [topThree, setTopThree] = useState<number[]>();
  const [topThreeId, setTopThreeId] = useState<string[]>();
  const [badTopThree, setBadTopThree] = useState<number[]>();
  const [badTopThreeId, setBadTopThreeId] = useState<string[]>();
  const [activities, setActivities] = useState<Activity[]>();

  useEffect(() => {
    getAllActivities();
  }, []);

  useEffect(() => {
    if (activePhase !== undefined) {
      getGoodAndBadActivities(activePhase);
    }
  }, [activePhase]);

  const getGoodAndBadActivities = (phase: ExamPhase) => {
    let moodReason: [MoodCount] = [{}];
    phase.breakEntries?.map((entry: Activity) => {
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

      moodReason.push({ id: entry.breakActivityId, mood: count });
    });

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

  const countMood = (id) => {
    let good = 0;
    let ratherGood = 0;

    activePhase.breakEntries?.forEach((e) => {
      if (e.breakActivityId === parseInt(id)) {
        console.log(e);
        if (e.mood === Mood.RATHER_GOOD) {
          ratherGood += 1;
        } else {
          good += 1;
        }
      }
    });

    return { good, ratherGood };
  };

  const countBadMood = (id) => {
    let bad = 0;
    let ratherBad = 0;

    activePhase.breakEntries?.forEach((e) => {
      if (e.breakActivityId === parseInt(id)) {
        console.log(e);
        if (e.mood === Mood.RATHER_BAD) {
          ratherBad += 1;
        } else {
          bad += 1;
        }
      }
    });

    return { bad, ratherBad };
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

      let topThree = [];

      if (goodId?.length >= 1) {
        const [id1, id2, id3] = goodId;

        const results = [countMood(id1), countMood(id2), countMood(id3)];

        results.forEach((result, index) => {
          topThree.push({
            id: goodId[index],
            good: [result.good],
            ratherGood: [result.ratherGood],
          });
        });
        console.log(topThree);
      }
      setTopThree(good);
      setTopThreeId(topThree);
      console.log(topThree);
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

      let badThree = [];

      if (badId?.length >= 1) {
        const [id1, id2, id3] = badId;

        const results = [
          countBadMood(id1),
          countBadMood(id2),
          countBadMood(id3),
        ];

        results.forEach((result, index) => {
          badThree.push({
            id: badId[index],
            bad: [result.bad],
            ratherBad: [result.ratherBad],
          });
        });
        console.log(badThree);
      }
      const badToPositive = bad.map((num) => Math.abs(num));
      setBadTopThree(badToPositive);
      setBadTopThreeId(badThree);
    }
  };
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
            {b.icon !== undefined && <FontAwesomeIcon icon={b.icon} />}
            <div className="pl-2">{b.title}</div>
          </div>
        );
      }
    });
    return entry;
  };

  return (
    <div className="">
      <div className="pt-3 pl-3 text-pieGrey">boosters</div>
      <div className="flex">
        <div className="-translate-x-1/2 ">
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
            colorScale={["#307B45", "#4CB66A", "#96CDA5"]}
          />
        </div>

        <div className="absolute flex flex-col justify-center w-[50vw] translate-x-[60%] pt-[5vh]">
          <div className={"flex justify-around  "}>
            <div className={"basis-3/4"}></div>
            <div className="basis-1/8">
              <FontAwesomeIcon
                icon={["fas", "face-smile"]}
                className={"text-break"}
              />
            </div>
            <div className="basis-1/8">
              <FontAwesomeIcon
                icon={["fas", "face-grin"]}
                className={"text-break"}
              />
            </div>
          </div>
          {topThreeId !== undefined &&
            topThreeId.map((activity: string, index) => (
              <div key={activity} className={"flex justify-around	"}>
                <div
                  className={
                    (index === 0 && "text-breakChart1 basis-3/4 ") ||
                    (index === 1 && "text-breakChart2 basis-3/4") ||
                    (index === 2 && "text-breakChart3 basis-3/4	")
                  }
                >
                  {getActivity(parseInt(activity.id))}
                </div>
                <div
                  className={
                    (index === 0 && "text-breakChart1 1/8") ||
                    (index === 1 && "text-breakChart2 1/8") ||
                    (index === 2 && "text-breakChart3  1/8")
                  }
                >
                  {activity.good}
                </div>
                <div
                  className={
                    (index === 0 && "text-breakChart1 1/8") ||
                    (index === 1 && "text-breakChart2 1/8") ||
                    (index === 2 && "text-breakChart3 break-words 1/8")
                  }
                >
                  {activity.ratherGood}
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="pt-3 pl-3 text-pieGrey">downers</div>
      <div className="flex">
        <div className="-translate-x-1/2 ">
          <VictoryPie
            innerRadius={110}
            data={badTopThree}
            startAngle={0}
            endAngle={180}
            width={600}
            colorScale={["#307B45", "#4CB66A", "#96CDA5"]}
            style={{
              labels: {
                fill: "transparent",
              },
            }}
          />
        </div>
        <div className="absolute flex flex-col justify-center w-[50vw] translate-x-[60%] pt-[5vh]">
          <div className={"flex justify-around "}>
            <div className={"basis-3/4"}></div>
            <div className="basis-1/8">
              <FontAwesomeIcon
                icon={["fas", "face-meh"]}
                className={"text-break"}
              />
            </div>
            <div className="basis-1/8">
              <FontAwesomeIcon
                icon={["fas", "face-frown"]}
                className={"text-break"}
              />
            </div>
          </div>
          {badTopThreeId !== undefined &&
            badTopThreeId.map((activity: string, index) => (
              <div key={activity} className={"flex justify-around "}>
                <div
                  className={
                    (index === 0 && "text-breakChart1 basis-3/4") ||
                    (index === 1 && "text-breakChart2 basis-3/4") ||
                    (index === 2 && "text-breakChart3 break-words basis-3/4	")
                  }
                >
                  {getActivity(parseInt(activity.id))}
                </div>
                <div
                  className={
                    (index === 0 && "text-breakChart1 1/8") ||
                    (index === 1 && "text-breakChart2 1/8") ||
                    (index === 2 && "text-breakChart3 break-words 1/8")
                  }
                >
                  {activity.bad}
                </div>
                <div
                  className={
                    (index === 0 && "text-breakChart1 1/8") ||
                    (index === 1 && "text-breakChart2 1/8") ||
                    (index === 2 && "text-breakChart3 break-words 1/8")
                  }
                >
                  {activity.ratherBad}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
