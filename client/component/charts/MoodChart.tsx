// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Mood } from "@/types/Timer";
import { useEffect, useId, useState } from "react";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryScatter,
} from "victory";

export const useIsServerSide = () => {
  const [isServerSide, setIsServerSide] = useState(true);

  useEffect(() => {
    setIsServerSide(false);
  }, [setIsServerSide]);

  return isServerSide;
};

export default function MoodChart({
  entries,
  studyEntry,
  breakEntry,
}: {
  entries: any;
  studyEntry: string;
  breakEntry: string;
}) {
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

  const allEntries = (): [] => {
    const newOb = [];
    if (entries !== undefined) {
      const yAxis: [] = entries.map((date: any) => {
        return getMood(date.mood);
      });
      const xAxis: [] = entries.map((date: any) => {
        const unixTimestamp = date.timer.startTime;
        const d = new Date(unixTimestamp);
        const startOfDay = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        const secondsSinceStartOfDay = Math.floor(
          (d.getTime() - startOfDay.getTime()) / 1000
        );

        return secondsSinceStartOfDay;
      });

      const zAxis: [] = entries.map((date: any) => {
        return date.studyTimer;
      });

      const id: [] = entries.map((date: any) => {
        return date.timer.startTime;
      });
      for (let i = 0; i < yAxis.length; i++) {
        newOb.push({ x: xAxis[i], y: yAxis[i], z: zAxis[i], id: id[i] });
      }
    }

    return newOb;
  };

  useEffect(() => {
    console.log(allEntries());
    // const now = new Date();
    // const startOfDay = new Date(
    //   now.getFullYear(),
    //   now.getMonth(),
    //   now.getDate()
    // );
    // const sixAM = new Date(
    //   now.getFullYear(),
    //   now.getMonth(),
    //   now.getDate(),
    //   21
    // );
    // const secondsSinceStartOfDay = Math.floor(
    //   (sixAM.getTime() - startOfDay.getTime()) / 1000
    // );

    // console.log("18", secondsSinceStartOfDay);
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
    const date = new Date(value * 1000);
    const startOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const secondsSinceStartOfDay = Math.floor(
      (date.getTime() - startOfDay.getTime()) / 1000
    );
    return secondsSinceStartOfDay;
  };

  const YAxisLabel = ({ x, y, text }) => (
    <g>
      <text x={x} y={y} fontSize={10} textAnchor="end">
        {getText(text)}
      </text>
    </g>
  );

  const isServerSide = useIsServerSide();
  if (isServerSide) return null;
  return (
    <div className="flex flex-col p-2 shadow-[1px_4px_16px_rgba(39,37,37,0.15)] bg-white rounded h-[35vh] w-[95vw]">
      <div className="flex flex-row items-center justify-center w-full ">
        <div className="flex items-center px-4 py-4">
          <div className="mr-2 text-h16 text-study">Study:</div>
          <div className="font-bold text-h20 text-study">{studyEntry}</div>
        </div>{" "}
        <div className="flex items-center">
          <div className="mr-2 text-h16 text-break">Break:</div>
          <div className="font-bold text-h20 text-break">{breakEntry}</div>
        </div>
      </div>
      <VictoryChart>
        <VictoryScatter
          bubbleProperty={"30"}
          data={allEntries()}
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
                onClick: () => {
                  return [
                    {
                      target: "data",
                      mutation: (props) => {
                        console.log(props.datum.id);
                        const fill = props.style && props.style.fill;
                        return fill === "red"
                          ? null
                          : { style: { fill: "red" } };
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
              fontSize: 5,
              padding: 5,
            },
          }}
        />
        <VictoryAxis
          tickValues={allEntries().map((datum) => getXAxisValue(datum.x))}
          tickValues={[21600, 36000, 50400, 64800]} // set custom tick values
          tickFormat={["6:00", "10:00", "14:00", "18:00"]} // set custom tick labels
          style={{
            axis: { stroke: "transparent" },
            ticks: { stroke: "transparent" },
            tickLabels: {
              // this changed the color of my numbers to white
              fill: "#C0C3C8",
            },
            axisLabel: {
              fill: "pink",
            },
          }}
        />
        <VictoryLabel
          x={50}
          y={20}
          textAnchor="middle"
          style={{ fontSize: 16 }}
        />
        <VictoryLine
          id="test"
          key={useId}
          instanceId={useId}
          data={allEntries()}
        />
      </VictoryChart>
    </div>
  );
}
