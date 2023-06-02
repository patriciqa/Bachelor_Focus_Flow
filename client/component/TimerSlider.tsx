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
    let endTime = moment().startOf("day").add(3600000);
    //Times
    let allTimes = [];

    //Loop over the times - only pushes time with 30 minutes interval
    while (startTime < endTime) {
      //Push times
      allTimes.push(startTime.format("HH:mm:ss"));
      startTime.add(defaultMin, "seconds");
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
      {/* <button onClick={() => playActive()}>Click Me</button> */}

      {initialRenderComplete && (
        <div className="">
          <CircularSlider
            min={0}
            max={3600}
            dataIndex={1}
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
              setDuration(convertTimeToSeconds(value));
            }}
          >
            <div></div>
          </CircularSlider>
        </div>
      )}
      <div className="absolute">
        <div className="z-10 flex items-center content-center justify-center w-20 h-20 pb-4 text-4xl ">
          {toMinutesSeconds(duration)}
        </div>
      </div>
    </div>
  );
}
