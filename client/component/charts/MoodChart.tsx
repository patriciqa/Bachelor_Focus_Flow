// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { Mood } from "@/types/Timer";
import { CategoryScale, TickOptions } from "chart.js";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import moment from "moment";
import Images from "next/image";
import { Line } from "react-chartjs-2";

Chart.register(CategoryScale);
Chart.register(ChartDataLabels);
// Chart.defaults.font.family =
//   "'FontAwesome', Helvetica Neue','Helvetia', 'Arial','sans-serif'";
Chart.defaults.font.family = "'Arial, 'FontAwesome'";
Chart.defaults.font.size = 16;

const val =
  "https://upload.wikimedia.org/wikipedia/commons/8/8f/Example_image.svg";
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
          moment(date.timer.startTime).format("hHHmm")
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
  interface ImageTickOptions extends TickOptions {
    images?: string[];
  }
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
            images: [
              "https://fastly.picsum.photos/id/768/200/200.jpg?hmac=CZCVsqJECKhkvl5gzeCA0O5iSMmRn_RVFzVrREOE7ws",
            ],
          },
        ],
      }}
      options={{
        plugins: {
          datalabels: {
            // anchor: "end",
            // align: "start",
          },
          labels: {
            render: "image",
            images: [
              {
                src: "https://www.chartjs.org/docs/latest/favicon.ico",
                width: 100,
                height: 100,
              },
              {
                src: "https://www.chartjs.org/docs/latest/favicon.ico",
                width: 100,
                height: 100,
              },
              {
                src: "https://www.chartjs.org/docs/latest/favicon.ico",
                width: 100,
                height: 100,
              },
              {
                src: "https://www.chartjs.org/docs/latest/favicon.ico",
                width: 100,
                height: 100,
              },
              {
                src: "https://www.chartjs.org/docs/latest/favicon.ico",
                width: 100,
                height: 100,
              },
            ],
          },

          // datalabels: {
          //   color: "#000",
          //   font: {
          //     size: 14,
          //   },
          //   formatter: function (value, context) {
          //     // const imageUrl =
          //     //   "https://fastly.picsum.photos/id/768/200/200.jpg?hmac=CZCVsqJECKhkvl5gzeCA0O5iSMmRn_RVFzVrREOE7ws";
          //     const imageUrl = context.dataset.images[context.dataIndex];
          //     // Create an image element with the URL
          //     const img = new Image();
          //     img.src = val;
          //     img.style.width = "20px"; // Set the size of the image
          //     // Return the image element as the tick label
          //     return <img src={val} />;
          //   },
          // },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        // scales: {
        //   y: {
        //     ticks: {
        //       // Pass the image URLs as an array
        //       images: [
        //         "https://fastly.picsum.photos/id/768/200/200.jpg?hmac=CZCVsqJECKhkvl5gzeCA0O5iSMmRn_RVFzVrREOE7ws",
        //         "https://fastly.picsum.photos/id/768/200/200.jpg?hmac=CZCVsqJECKhkvl5gzeCA0O5iSMmRn_RVFzVrREOE7ws",
        //       ],
        //     },
        //   },
        // },
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
        {/* <div>{lineChart}</div> */}
        <div style={{ width: "800px", height: "400px" }}>{ll}</div>
        <img src={val} />
        <Images src="/images/smile.svg" width={500} height={500} />
      </div>
    </>
  );
};
export default MoodChart;

rodeola;
withinia;
