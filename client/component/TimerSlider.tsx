import { TimerViewState } from "@/types/Timer";
import CircularSlider from "@fseehawer/react-circular-slider";
import moment from "moment";
import { useEffect, useState } from "react";
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
  // const [timerDuration, setTimerDuration] = useState(2000);
  // const [isRunning, setIsRunning] = useState(true);
  // const [notificationSent, setNotificationSent] = useState(false);

  // const workerRef = useRef<Worker>();

  // useEffect(() => {
  //   workerRef.current = new Worker(new URL("../worker.ts", import.meta.url));
  //   workerRef.current.onmessage = (event: MessageEvent) =>
  //     alert(`WebWorker Response => ${event.data.type}`);
  //   return () => {
  //     workerRef.current?.terminate();
  //   };
  // }, []);

  // const startTimer = () => {
  //   setIsRunning(true);
  //   console.log("start", timerDuration);
  //   workerRef.current?.postMessage({ type: "start", duration: timerDuration });
  // };

  // const stopTimer = () => {
  //   setIsRunning(false);
  //   workerRef.current?.postMessage({ type: "stop" });
  // };

  // useEffect(() => {
  //   workerRef.current?.addEventListener("message", (event: MessageEvent) => {
  //     if (event.data.type === "timerExpired") {
  //       setNotificationSent(true);
  //       console.log("noti");
  //       new Notification("Timer Expired", {
  //         body: "Your timer has expired!",
  //       });
  //     }
  //   });
  //   return () => {
  //     workerRef.current?.removeEventListener("message", () =>
  //       console.log("ji")
  //     );
  //   };
  // }, []);

  // function showNotification() {
  // if (Notification.permission == "granted") {
  //   navigator.serviceWorker.getRegistration().then(function (reg) {
  //     var options = {
  //       body: "Here is a notification body!",
  //     };
  //     reg?.showNotification("Hello world!", options);
  //   });
  // }
  //   if (!("Notification" in window)) {
  //     alert("This browser does not support desktop notification");
  //   } else if (Notification.permission === "granted") {
  //     var notification = new Notification("Timer Expired", {
  //       body: "Your timer ",
  //     });
  //   } else if (Notification.permission !== "denied") {
  //     Notification.requestPermission().then(function (permission) {
  //       if (permission === "granted") {
  //         var notification = new Notification("Timer Expired", {
  //           body: "Your timer",
  //         });
  //       } else {
  //         //todo app doesnt word
  //         //should happen in index.tsx
  //       }
  //     });
  //   }
  // }

  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);

  useEffect(() => {
    if (runningTimer === TimerViewState.RUNNING) {
      setTimeout(() => {
        if (duration === 1) {
          setDuration(0);
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
    let endTime = moment().startOf("day").add(5400000);
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
      {initialRenderComplete && (
        <div className="">
          <CircularSlider
            min={0}
            max={5400}
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
