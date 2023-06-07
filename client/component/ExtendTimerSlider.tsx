import { TimerViewState } from "@/types/Timer";
import CircularSlider from "@fseehawer/react-circular-slider";
import moment from "moment";
import { useEffect, useState } from "react";
import useSound from "use-sound";

export default function ExtendTimerSlider({
  isStudy,
  runningTimer,
  setRunningTimer,
  extend,
  setExtend,
}: {
  isStudy: boolean;
  runningTimer: TimerViewState;
  setRunningTimer: (t: TimerViewState) => void;
  extend: number;
  setExtend: (d: number) => void;
}) {
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  const [secondsIndex, setSecondsIndex] = useState(0);
  const [timerRuns, setTimerRuns] = useState(false);

  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);
  const [playActive] = useSound("/notification_sound.mp3", { volume: 1 });

  useEffect(() => {
    if (runningTimer === TimerViewState.EXTEND) {
      setTimeout(() => {
        if (extend === 1) {
          setExtend(0);
          playActive();
          setRunningTimer(TimerViewState.FINISHED);
          return;
        }
        setTimerRuns(true);
        setExtend(extend - 1);

        if (extend % 300 === 0) {
          setSecondsIndex(secondsIndex - 1);
        }
      }, 1000);
    }
  }, [extend, runningTimer]);

  const toMinutesSeconds = (totalSeconds: number): string => {
    const seconds = Math.floor(totalSeconds % 60);
    let minutes = Math.floor(totalSeconds / 60);
    if (minutes === -1) {
      minutes = 0;
    }

    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  };

  function getTime(m: number) {
    const defaultMin = m || 5;
    let startTime = moment().startOf("D");
    let endTime = moment().startOf("day").add(1300000);
    //Times
    let allTimes = [];

    //Loop over the times - only pushes time with 30 minutes interval
    while (startTime < endTime) {
      //Push times
      allTimes.push(startTime.format("HH:mm:ss"));
      startTime.add(defaultMin, "minutes");
    }
    return allTimes;
  }

  const timeArr = getTime(5);

  function convertTimeToSeconds(time: any) {
    const parts = time.split(":");
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);
    const seconds = parseInt(parts[2]);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    return totalSeconds;
  }

  const findIndex = (arr: any, value: any) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === value) {
        return i;
      }
    }
    return -1;
  };

  return (
    <div className="flex items-center justify-center scale-[0.9]">
      <div className="">
        {initialRenderComplete && (
          <div className="">
            <CircularSlider
              min={0}
              max={1200}
              dataIndex={secondsIndex}
              hideLabelValue
              labelBottom={true}
              knobColor={isStudy ? "#6A65F5" : "#5AB874"}
              knobSize={
                runningTimer === TimerViewState.FINISHED ? 60 : undefined
              }
              progressColorFrom={isStudy ? "#6A65F5" : "#5AB874"}
              progressColorTo={isStudy ? "#6A65F5" : "#5AB874"}
              progressSize={20}
              data={timeArr}
              trackColor="#E5F0FF"
              trackSize={12}
              knobDraggable={timerRuns ? false : true}
              onChange={(value: any) => {
                if (runningTimer === TimerViewState.FINISHED) {
                  setSecondsIndex(findIndex(timeArr, value));
                  setExtend(convertTimeToSeconds(value));
                }
              }}
            >
              <div></div>
            </CircularSlider>
          </div>
        )}
      </div>
      <div className="absolute">
        <div className="z-10 flex items-center content-center justify-center w-20 h-20 text-4xl ">
          {toMinutesSeconds(extend)}
        </div>
      </div>
    </div>
  );
}
