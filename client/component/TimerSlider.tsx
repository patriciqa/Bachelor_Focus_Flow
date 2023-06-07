import { TimerViewState } from "@/types/Timer";
import CircularSlider from "@fseehawer/react-circular-slider";
import moment from "moment";
import { useEffect, useState } from "react";
import useSound from "use-sound";

export default function TimerSlider({
  isStudy,
  runningTimer,
  setRunningTimer,
  duration,
  setDuration,
}: {
  isStudy: boolean;
  runningTimer: TimerViewState;
  setRunningTimer: (t: TimerViewState) => void;
  duration: number;
  setDuration: (d: number) => void;
}) {
  const [playActive] = useSound("/notification_sound.mp3", { volume: 1 });
  const [secondsIndex, setSecondsIndex] = useState(1);

  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);

  useEffect(() => {
    if (runningTimer === TimerViewState.RUNNING) {
      setTimeout(() => {
        if (duration === 1) {
          setDuration(0);
          playActive();
          setRunningTimer(TimerViewState.FINISHED);

          return;
        }

        setDuration(duration - 1);
        if (duration % 5 === 0) {
          setSecondsIndex(secondsIndex - 1);
        }
      }, 1000);
    }
  }, [duration, runningTimer]);

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
    let endTime = moment().startOf("day").add(3600100);
    let allTimes = [];

    while (startTime < endTime) {
      //Push times
      allTimes.push(startTime.format("HH:mm:ss"));
      startTime.add(defaultMin, "seconds");
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
      {initialRenderComplete && (
        <div className="">
          <CircularSlider
            min={0}
            max={3600}
            // dataIndex={1}
            dataIndex={secondsIndex}
            hideLabelValue
            labelBottom={true}
            knobColor={isStudy ? "#6A65F5" : "#5AB874"}
            knobSize={runningTimer === TimerViewState.START ? 60 : undefined}
            progressColorFrom={isStudy ? "#6A65F5" : "#5AB874"}
            progressColorTo={isStudy ? "#6A65F5" : "#5AB874"}
            progressSize={20}
            data={timeArr}
            trackColor="#E5F0FF"
            trackSize={12}
            knobDraggable={
              runningTimer !== TimerViewState.RUNNING ? true : false
            }
            onChange={(value: any) => {
              if (runningTimer === TimerViewState.START) {
                setSecondsIndex(findIndex(timeArr, value));
                setDuration(convertTimeToSeconds(value));
              }
            }}
          >
            <div></div>
          </CircularSlider>
        </div>
      )}
      <div className="absolute">
        <div className="z-10 flex items-center content-center justify-center w-20 h-20 pb-4 text-[36px] ">
          {toMinutesSeconds(duration)}
        </div>
      </div>
    </div>
  );
}
