import { ExamPhase, Mood, Study } from "@/types/Timer";
import { filter, includes } from "lodash";
import { useEffect, useState } from "react";
import BreakChart from "./BreakChart";
import StudyChart from "./StudyChart";

interface MoodCount {
  id?: number;
  mood?: number;
  good?: boolean;
}

export default function PieChartDowners({
  activePhase,
}: {
  activePhase: ExamPhase;
}) {
  const [badTopThree, setBadTopThree] = useState<number[] | null>();
  const [badTopThreeId, setBadTopThreeId] = useState<string[]>();

  const [badTopThreeBreak, setBadTopThreeBreak] = useState<number[] | null>();
  const [badTopThreeIdBreak, setBadTopThreeIdBreak] = useState<string[]>();

  useEffect(() => {
    if (activePhase !== undefined) {
      getGoodAndBadReasons(activePhase);
    }
  }, [activePhase]);

  const getGoodAndBadReasons = (phase: ExamPhase) => {
    setBadTopThree(null);
    setBadTopThreeId([]);
    setBadTopThreeBreak(null);
    setBadTopThreeIdBreak([]);
    let moodReason: [MoodCount] = [{}];
    phase.studyEntries?.map((entry: Study) => {
      entry.reasonIds?.map((reason) => {
        let count;
        let good;
        switch (entry.mood) {
          case Mood.GOOD: {
            count = 2;
            good = true;
            break;
          }
          case Mood.RATHER_GOOD: {
            count = 1;
            good = true;

            break;
          }
          case Mood.RATHER_BAD: {
            count = -1;
            good = false;
            break;
          }
          case Mood.BAD: {
            count = -2;
            good = false;
            break;
          }
        }

        moodReason.push({ id: reason, mood: count, good: good });
      });
    });
    let good = filter(moodReason, (e) => !e.good);
    if (moodReason.length !== 1) {
      const summarize: { [key: number]: number } = good.reduce(
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
      const createdArray = Object.entries(summarize).map(([key, value]) => ({
        [key]: value,
      }));
      const sortedArray = createdArray.sort((a, b) => {
        const aValue = Object.values(a)[0];
        const bValue = Object.values(b)[0];
        return aValue - bValue;
      });
      setThree(false, sortedArray);
    }
  };

  const countBadMood = (id: string) => {
    let bad = 0;
    let ratherBad = 0;

    activePhase.studyEntries?.forEach((e) => {
      if (includes(e.reasonIds, parseInt(id))) {
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
    if (!positive) {
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

      let badThree: any = [];

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
      }
      const badToPositive = bad.map((num) => Math.abs(num));
      setBadTopThree(badToPositive);
      setBadTopThreeId(badThree);
    }
  };

  useEffect(() => {
    if (activePhase !== undefined) {
      getGoodAndBadActivities(activePhase);
    }
  }, [activePhase]);

  const getGoodAndBadActivities = (phase: ExamPhase) => {
    let moodReason: [MoodCount] = [{}];
    phase.breakEntries?.map((entry) => {
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
      if (entry.breakActivityId) {
        moodReason.push({ id: entry.breakActivityId, mood: count });
      }
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
      const createdArray = Object.entries(summarize).map(([key, value]) => ({
        [key]: value,
      }));
      getTopThreeBreaks(createdArray);
    }
  };

  const getTopThreeBreaks = (
    createdArray: {
      [x: string]: number;
    }[]
  ) => {
    const ascArray = sortArrayDependingOnMoodBreak(true, createdArray);
    setThreeBreak(true, ascArray);
    const descArray = sortArrayDependingOnMoodBreak(false, createdArray);
    setThreeBreak(false, descArray);
  };

  const sortArrayDependingOnMoodBreak = (
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
        const aValue: any = Object.values(a)[0];
        const bValue: any = Object.values(b)[0];
        return aValue - bValue;
      });
    }
    return sortedArray;
  };

  const countBadMoodBreak = (id: string) => {
    let bad = 0;
    let ratherBad = 0;

    activePhase.breakEntries?.forEach((e) => {
      if (e.breakActivityId === parseInt(id)) {
        if (e.mood === Mood.RATHER_BAD) {
          ratherBad += 1;
        } else {
          bad += 1;
        }
      }
    });

    return { bad, ratherBad };
  };

  const setThreeBreak = (
    positive: boolean,
    mutatedArray: {
      [x: string]: number;
    }[]
  ) => {
    if (!positive) {
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

      let badThree: any = [];

      if (badId?.length >= 1) {
        const [id1, id2, id3] = badId;

        const results = [
          countBadMoodBreak(id1),
          countBadMoodBreak(id2),
          countBadMoodBreak(id3),
        ];

        results.forEach((result, index) => {
          badThree.push({
            id: badId[index],
            bad: [result.bad],
            ratherBad: [result.ratherBad],
          });
        });
      }
      const badToPositive = bad.map((num) => Math.abs(num));
      setBadTopThreeBreak(badToPositive);
      setBadTopThreeIdBreak(badThree);
    }
  };

  const checkIfEmpty = (val: number[] | undefined | null) => {
    if (val === undefined || val === null) {
      return true;
    }
    return false;
  };

  const empty = (): boolean => {
    if (
      (badTopThree === null && badTopThreeBreak === null) ||
      badTopThree === undefined ||
      badTopThreeBreak === undefined
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className="">
      {empty() ? (
        <div className="flex justify-center  shadow-[1px_4px_16px_rgba(39,37,37,0.15)]  text-h14 items-center h-[12vh] text-pieGrey">
          no data available
        </div>
      ) : (
        <>
          <div className="pt-3 pl-3 font-medium text-h14 text-chartGrey">
            while studying
          </div>
          {checkIfEmpty(badTopThree) ? (
            <div className="flex justify-center   text-h14 items-center h-[12vh] text-pieGrey">
              no data available
            </div>
          ) : (
            <div className="flex">
              <StudyChart
                good={false}
                badTopThree={badTopThree !== null ? badTopThree : undefined}
                badTopThreeId={badTopThreeId}
              />
            </div>
          )}
          <div className="pt-3 pl-3 font-medium text-h14 text-chartGrey">
            while taking breaks
          </div>
          {checkIfEmpty(badTopThreeBreak) ? (
            <div className="flex justify-center   text-h14 items-center h-[12vh] text-pieGrey">
              no data available
            </div>
          ) : (
            <BreakChart
              good={false}
              badTopThree={
                badTopThreeBreak !== null ? badTopThreeBreak : undefined
              }
              badTopThreeId={badTopThreeIdBreak}
            />
          )}
        </>
      )}
    </div>
  );
}
