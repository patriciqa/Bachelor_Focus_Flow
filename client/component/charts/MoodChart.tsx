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
  visibleComponentId,
}: {
  entries: any;
  studyEntry: string | null;
  breakEntry: string | null;
  visibleComponentId: number;
}) {
  const grin = "./image/mood.grin.svg";
  const smile = "./image/mood.smile.svg";
  const question = "./image/skip.svg";
  const meh = "./image/mood.meh.svg";
  const frown = "./image/mood.frown.svg";

  const getIcon = (text: number): string => {
    let moodText;
    switch (text) {
      case 0:
        moodText = frown;
        break;
      case 1:
        moodText = meh;
        break;
      case 2:
        moodText = question;
        break;
      case 3:
        moodText = smile;
        break;
      case 4:
        moodText = grin;
        break;
    }
    return moodText;
  };
  console.log(visibleComponentId);

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
    allEntries();
  }, [allEntries]);

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
        moodNr = 1;
        break;
      case Mood.BAD:
        moodNr = 0;
        break;
      case undefined:
        moodNr = 2;
    }
    return moodNr;
  };

  const colorScale = (value, id) => {
    if (value === true) {
      if (id === parseInt(visibleComponentId)) {
        return "#6A65F5";
      } else {
        return "rgba(106, 101, 245, 0.15)";
      }
    } else {
      if (id === parseInt(visibleComponentId)) {
        return "#5AB874";
      } else {
        return "rgba(90, 184, 116, 0.3)";
      }
    }
  };

  const getXAxisValue = (value: number) => {
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
      <image
        x={text === 2 ? x + 1 : x}
        y={y}
        href={getIcon(text)}
        width={text === 2 ? 25 : 20}
        height={text === 2 ? 25 : 20}
      />
    </g>
  );

  const isServerSide = useIsServerSide();
  if (isServerSide) return null;

  const scrollToDiv = (id: number) => {
    const element = document.getElementById(id);
    console.log(id);
    console.log("active", element);
    console.log("self", parseInt(visibleComponentId));
    console.log("hihi", visibleComponentId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col md:w-[50vw]  p-2 shadow-[1px_4px_16px_rgba(39,37,37,0.15)] bg-white rounded pb-7  w-[95vw]">
      <div className="flex flex-row items-center justify-center w-full ">
        <div className="flex items-center px-4 py-4">
          <div className="mr-2 text-h16 text-study">Study:</div>
          <div className="font-bold text-h20 text-study">
            {studyEntry !== null ? studyEntry : "-"}
          </div>
        </div>{" "}
        <div className="flex items-center">
          <div className="mr-2 text-h16 text-break">Break:</div>
          <div className="font-bold text-h20 text-break">
            {breakEntry !== null ? breakEntry : "-"}
          </div>
        </div>
      </div>
      <div className="border-t-2 border-b-2 border-inactiveGrey">
        <VictoryChart>
          <VictoryAxis
            dependentAxis
            tickValues={[1, 2, 0, 3, 4]}
            tickLabelComponent={<YAxisLabel />}
            style={{
              axis: { stroke: "transparent" },
              tickLabels: {
                fontSize: 5,
                padding: 35,
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
            }}
            offsetY={30}
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
            style={{
              data: {
                stroke: "black",
                opacity: 0.3,
                strokeWidth: 3,
              },
            }}
          />
          <VictoryScatter
            bubbleProperty={"30"}
            data={allEntries()}
            size={10} // Set size based on the y-value of each data point
            style={{
              data: {
                fill: ({ datum }) => colorScale(datum.z, datum.id),
                // fill: ({ datum }) =>
                //   datum.id === parseInt(visibleComponentId) ? "red" : "pink",
                strokeWidth: 15,
                zIndex: 100,
                position: "relative",
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
                          scrollToDiv(props.datum.id);
                          const fill = props.style && props.style.fill;
                          //   return fill === "red"
                          //     ? null
                          //     : { style: { fill: "red" } };
                        },
                      },
                    ];
                  },
                },
              },
            ]}
            // labels={({ datum }) => ` ${datum.id}`}
          />
        </VictoryChart>
        <div className="absolute pt-2 text-pieGrey text-h14">
          *when you skipped the mood check-in
        </div>
      </div>
    </div>
  );
}
