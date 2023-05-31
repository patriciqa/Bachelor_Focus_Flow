import { TimerViewState } from "@/types/Timer";
import CircularSlider from "@fseehawer/react-circular-slider";
import moment from "moment";
import { useEffect, useState } from "react";

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
  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);

  useEffect(() => {
    if (runningTimer === TimerViewState.EXTEND) {
      setTimeout(() => {
        if (extend === 1) {
          setExtend(0);
          setRunningTimer(TimerViewState.FINISHED);
          return;
        }

        setExtend(extend - 1);
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
    let endTime = moment().startOf("day").add(1260000);
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
    var parts = time.split(":");
    var hours = parseInt(parts[0]);
    var minutes = parseInt(parts[1]);
    var seconds = parseInt(parts[2]);
    var totalSeconds = hours * 3600 + minutes * 60 + seconds;
    return totalSeconds;
  }

  return (
    <div className="flex items-center justify-center scale-[0.9]">
      <div className="">
        {/* <div>
          <button onClick={showNotification}>Show Notification</button>
          <button onClick={stopTimer}>Stop Timer</button>
          <button onClick={startTimer}>Start Timer</button>
          {isRunning ? (
            <button onClick={stopTimer}>Stop Timer</button>
          ) : (
            <button onClick={startTimer}>Start Timer</button>
          )}
        </div> */}
        {initialRenderComplete && (
          <div className="">
            <CircularSlider
              min={0}
              max={1200}
              dataIndex={0}
              // dataIndex={1} //default start maybw 25min?
              hideLabelValue
              labelBottom={true}
              knobColor={isStudy ? "#5A55F4" : "#48B065"}
              knobSize={runningTimer === TimerViewState.START ? 60 : undefined}
              progressColorFrom={isStudy ? "#5A55F4" : "#48B065"}
              progressColorTo={isStudy ? "#5A55F4" : "#48B065"}
              progressSize={20}
              data={timeArr}
              trackColor="#E5F0FF"
              trackSize={12}
              knobDraggable={
                runningTimer !== TimerViewState.RUNNING ? true : false
              }
              onChange={(value: any) => {
                setExtend(convertTimeToSeconds(value));
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
