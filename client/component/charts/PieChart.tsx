import { getElement } from "@/db/Actions";
import { ExamPhase, Mood, Study } from "@/types/Timer";
import { useEffect, useState } from "react";
import { VictoryPie } from "victory";

export default function PieChart() {
  const [activePhase, setActivePhase] = useState<ExamPhase>();
  const [topThree, setTopThree] = useState<number[]>();
  const [badTopThree, setBadTopThree] = useState<number[]>();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [entries, setEntries] = useState<{ [x: string]: number }[]>();

  const getData = async (): Promise<ExamPhase[]> => {
    const data: ExamPhase[] = await getElement("examPhases", "all");
    data.map((phase) => {
      const choosenDate = selectedDate.setHours(0, 0, 0, 0); //choosen date

      if (phase.startDate <= choosenDate && choosenDate < phase.endDate) {
        setActivePhase(phase);
      }
    });
    return data;
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (activePhase !== undefined) {
      getGood(activePhase);
    }
  }, [activePhase]);

  interface MoodCount {
    id?: number;
    mood?: number;
  }

  const getGood = (phase: ExamPhase) => {
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
    const sortedArrAsc = createdArray.sort((a, b) => {
      const aValue = Object.values(a)[0];
      const bValue = Object.values(b)[0];
      return bValue - aValue;
    });
    console.log("sortedArrAsc", sortedArrAsc);

    let good = [0];
    if (sortedArrAsc !== undefined) {
      for (let i = 0; i < 3; i++) {
        if (good.length === 1 && good[0] === 0) {
          good = [Object.values(sortedArrAsc[i])[0]];
        } else {
          good.push(Object.values(sortedArrAsc[i])[0]);
        }
      }
    }
    console.log("good", good);
    setTopThree(good);
    const sortedArrDesc = createdArray.sort((a, b) => {
      const aValue = Object.values(a)[0];
      const bValue = Object.values(b)[0];
      return aValue - bValue;
    });
    let bad = [0];
    if (sortedArrAsc !== undefined) {
      for (let i = 0; i < 3; i++) {
        if (Object.values(sortedArrAsc[i])[0] < 0) {
          if (bad.length === 1 && bad[0] === 0) {
            bad = [Object.values(sortedArrAsc[i])[0]];
          } else {
            bad.push(Object.values(sortedArrAsc[i])[0]);
          }
        }
      }
    }
    console.log(sortedArrDesc);
    console.log(bad);
    const badToPositive = bad.map((num) => Math.abs(num));

    setBadTopThree(badToPositive);
  };

  //   useEffect(() => {
  //     getTop();
  //   }, [entries]);

  //   const getTop = () => {};

  return (
    <div>
      <VictoryPie
        innerRadius={90}
        data={topThree}
        startAngle={90}
        endAngle={-90}
      />
      <VictoryPie
        innerRadius={90}
        data={badTopThree}
        startAngle={90}
        endAngle={-90}
      />
    </div>
  );
}
