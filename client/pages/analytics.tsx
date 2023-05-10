import { Mood } from "@/types/Timer";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import moment from "moment";
import { Line } from "react-chartjs-2";

Chart.register(CategoryScale);

const Analytics = ({ entries }: { entries: any }) => {
  const getMood = (mood: string): number => {
    let moodNr = -1;
    switch (mood) {
      case Mood.GOOD:
        moodNr = 4;
        break;
      case Mood.RATHER_GOOD:
        moodNr = 3;
        break;
      case Mood.RATHER_BAD:
        moodNr = 2;
        break;
      case Mood.BAD:
        moodNr = 1;
        break;
    }
    return moodNr;
  };

  const lineChart = (
    <Line
      data={{
        labels: entries.map((date: any) =>
          moment(date.timer.startTimer).format("hh:mm")
        ),
        // labels: entries.map((date: any) => new Date(date.timer.startTimer)),
        datasets: [
          {
            data: entries.map((date: any) => getMood(date.mood)),
            label: "Mood",
            borderColor: "rgb(0, 217, 255)",
            fill: true,
            backgroundColor: [
              "#007D9C",
              "#244D70",
              "#D123B3",
              "#F7E018",
              "#fff",
              "#FE452A",
            ],
          },
          {
            data: entries.map((date: any) =>
              date.studyTimer === true ? 1 : 0
            ),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgb(255, 0, 0)",
            fill: true,
          },
        ],
      }}
    />
  );

  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen">
        Analytics
        {/* <LineChart chartData={chartData}  /> */}
        <div>{lineChart}</div>
      </div>
    </>
  );
};
export default Analytics;
