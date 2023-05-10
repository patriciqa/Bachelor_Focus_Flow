import { Mood } from "@/types/Timer";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import moment from "moment";
import { Line } from "react-chartjs-2";
Chart.register(CategoryScale);
Chart.register(ChartDataLabels);
// Chart.defaults.font.family =
//   "'FontAwesome', Helvetica Neue','Helvetia', 'Arial','sans-serif'";
Chart.defaults.font.family = "'Arial, 'FontAwesome'";
Chart.defaults.font.size = 16;
const MoodChart = ({ entries }: { entries: any }) => {
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
        datasets: [
          {
            data: entries.map((date: any) => getMood(date.mood)),
            label: "Mood\uf580",
            borderColor: "rgb(0, 217, 255)",
            fill: false,
            backgroundColor: ["#007D9C"],
          },
        ],
      }}
      // plugins={[ChartDataLabels]},
      options={{
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value, index) {
                switch (value) {
                  case 0:
                    return "\uf119";
                  case 1:
                    return "\uf11a";
                  case 2:
                    return "\uf118";
                  case 3:
                    return "good\uf16d";
                }
                return "";
              },
            },
          },
        },
        // f11a

        plugins: {
          legend: {
            labels: {
              font: {
                size: 20,
                family: '"Font Awesome 5 Free"',
              },
            },
          },
        },
      }}
    />
  );
  const ll = (
    <Line
      data={{
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Sales",
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: "#0074D9",
            tension: 0.1,
          },
        ],
      }}
      // plugins={[ChartDataLabels]},
      options={{
        scales: {
          yAxis: {
            ticks: {
              callback: (value: any) => {
                return ` <img src="https://upload.wikimedia.org/wikipedia/commons/8/8f/Example_image.svg" />`;
              },
            },
          },
        },
        // f11a

        plugins: {
          legend: {
            labels: {
              font: {
                size: 20,
                family: '"Font Awesome 5 Free"',
              },
            },
          },
        },
      }}
    />
  );
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "#0074D9",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            callback: (value: any) => {
              return `<img src="${value}" alt="y-axis label" />`;
            },
          },
        },
      ],
    },
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen m-10">
        <div>{lineChart}</div>
        <div>{ll}</div>
      </div>
    </>
  );
};
export default MoodChart;
