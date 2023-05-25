// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { ExamPhase, Mood, Study } from "@/types/Timer";
import { includes } from "lodash";
import { useEffect, useState } from "react";
import BreakChart from "./BreakChart";
import StudyChart from "./StudyChart";

interface MoodCount {
  id?: number;
  mood?: number;
}

const grin = "./image/grin.svg";
const smile = "./image/smile.svg";
const meh = "./image/meh.svg";
const frown = "./image/frown.svg";

export default function PieChartBoosters({
  activePhase,
}: {
  activePhase: ExamPhase;
}) {
  const [topThree, setTopThree] = useState<number[]>();
  const [topThreeId, setTopThreeId] = useState<string[]>();
  const [topThreeBreak, setTopThreeBreak] = useState<number[]>();
  const [topThreeBreakId, setTopThreeBreakId] = useState<string[]>();

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

  const countMood = (id) => {
    let good = 0;
    let ratherGood = 0;

    activePhase.studyEntries?.forEach((e) => {
      if (includes(e.reasonIds, parseInt(id))) {
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

  const setThree = (
    positive: boolean,
    mutatedArray: {
      [x: string]: number;
    }[]
  ) => {
    if (positive) {
      let good = [0];
      let goodId = [""];
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
    }
  };

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
        const aValue = Object.values(a)[0];
        const bValue = Object.values(b)[0];
        return aValue - bValue;
      });
    }
    return sortedArray;
  };

  const countMoodBreak = (id) => {
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

  const setThreeBreak = (
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

        const results = [
          countMoodBreak(id1),
          countMoodBreak(id2),
          countMoodBreak(id3),
        ];

        results.forEach((result, index) => {
          topThree.push({
            id: goodId[index],
            good: [result.good],
            ratherGood: [result.ratherGood],
          });
        });
        console.log(topThree);
      }
      setTopThreeBreak(good);
      setTopThreeBreakId(topThree);
      console.log(topThree);
    }
  };

  return (
    <div className="">
      <div className="pt-3 pl-3 font-bold text-h14 text-chartGrey">
        while studying{" "}
      </div>
      <StudyChart good={true} topThree={topThree} topThreeId={topThreeId} />

      <div className="pt-8 pl-3 font-bold text-h14 text-chartGrey">
        whilte taking breaks
      </div>
      <BreakChart
        good={true}
        topThree={topThreeBreak}
        topThreeId={topThreeBreakId}
      />
    </div>
  );
}
