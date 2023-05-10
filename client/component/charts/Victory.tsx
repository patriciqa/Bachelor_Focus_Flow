// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Mood } from "@/types/Timer";
import { useEffect } from "react";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryScatter,
} from "victory";

export default function Victory({ entries }: { entries: any }) {
  //   const YAxisIcon = ({ x, y, datum }) => (
  //     <image
  //       x={x - 10} // adjust position of icon relative to tick
  //       y={y - 10}
  //       width={20}
  //       height={20}
  //       xlinkHref={datum.iconUrl} // URL of image to display
  //     />
  //   );
  //   const data = [
  //     { x: 1, y: 1, iconUrl: "https://example.com/icon1.png" },
  //     { x: 2, y: 2, iconUrl: "https://example.com/icon2.png" },
  //     { x: 3, y: 3, iconUrl: "https://example.com/icon3.png" },
  //     { x: 4, y: 4, iconUrl: "https://example.com/icon4.png" },
  //   ];

  const getText = (text: number): string => {
    let moodText;
    switch (text) {
      case 1:
        moodText = "bad";
        break;
      case 2:
        moodText = "rather bad";
        break;
      case 3:
        moodText = "rather good";
        break;
      case 4:
        moodText = "good";
        break;
    }
    return moodText;
  };
  const YAxisLabel = ({ x, y, text }) => (
    <g>
      <text x={x} y={y} fontSize={10} textAnchor="end">
        {getText(text)}
      </text>
    </g>
  );

  const allEntries = (): [] => {
    const newOb = [];
    console.log(entries);
    const yAxis: [] = entries.map((date: any) => {
      return getMood(date.mood);
    });
    const xAxis: [] = entries.map((date: any) => {
      let d = new Date(date.timer.startTime); // Convert Unix timestamp to JavaScript Date object
      let hour = d.getHours();
      console.log(hour);
      //   return moment(date.timer.startTime).format("HH:mm");
      return hour;
    });

    const zAxis: [] = entries.map((date: any) => {
      return date.studyTimer;
    });
    for (let i = 0; i < yAxis.length; i++) {
      newOb.push({ x: xAxis[i], y: yAxis[i], z: zAxis[i] });
    }
    return newOb;
  };

  useEffect(() => {
    console.log(allEntries());
  });

  const getMood = (mood: string): number => {
    let moodNr = 0;
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

  const colorScale = (value) => {
    if (value === true) {
      return "#5A55F4";
    } else {
      return "#48B065";
    }
  };

  const getXAxisValue = (value) => {
    const date = new Date(value); // Convert Unix timestamp to JavaScript Date object
    const hour = date.getHours();
    console.log(hour);
    return hour;
  };

  return (
    <VictoryChart>
      <VictoryScatter
        data={allEntries()}
        bubbleProperty={30}
        style={{
          data: {
            fill: ({ datum }) => colorScale(datum.z),
            stroke: ({ datum }) => colorScale(datum.z),
            strokeWidth: 10,
          },
        }}
        events={[
          {
            target: "data",
            eventHandlers: {
              onClick: ({ datum }) => {
                console.log(datum);
                return [
                  {
                    target: "data",
                    mutation: (props) => {
                      console.log(props.datum.x);
                      const fill = props.style && props.style.fill;
                      return fill === "red" ? null : { style: { fill: "red" } };
                    },
                  },
                ];
              },
            },
          },
        ]}
        // labels={({ datum }) => `x: ${datum.x}, y: ${datum.y}, z: ${datum.z}`}
      />
      <VictoryAxis
        dependentAxis
        tickValues={[1, 2, 3, 4]}
        // tickLabelComponent={<YAxisIcon />}
        tickLabelComponent={<YAxisLabel />}
        style={{
          axis: { stroke: "transparent" },

          tickLabels: {
            fontSize: 10,
            padding: 5,
          },
        }}
      />
      <VictoryAxis
        tickValues={allEntries().map((datum) => getXAxisValue(datum.x))}
        tickValues={[6, 10, 14, 18]} // set custom tick values
        // tickFormat={["one", "two", "three", "four", "five"]} // set custom tick labels
        // tickValues={["06:00", "10:00", "14:00", "18:00"]}
        style={{
          //   axis: { stroke: "transparent" },
          ticks: { stroke: "transparent" },
        }}
      />
      <VictoryLabel
        x={50}
        y={20}
        text="Mood"
        textAnchor="middle"
        style={{ fontSize: 16 }}
      />
      <VictoryLine data={allEntries()} x="x" y="y" />
    </VictoryChart>
  );
}
