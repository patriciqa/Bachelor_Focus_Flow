import { TimerViewState } from "@/types/Timer";
import CircularSlider from "@fseehawer/react-circular-slider";
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
  //   if (!("Notification" in window)) {
  //     alert("This browser does not support desktop notification");
  //   } else if (Notification.permission === "granted") {
  //     var notification = new Notification("Timer Expired", {
  //       body: "Your timer has expired!",
  //     });
  //   } else if (Notification.permission !== "denied") {
  //     Notification.requestPermission().then(function (permission) {
  //       if (permission === "granted") {
  //         var notification = new Notification("Timer Expired", {
  //           body: "Your timer has expired!",
  //         });
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
        if (duration === 0) {
          setRunningTimer(TimerViewState.FINISHED);
          return;
        }

        setDuration(duration - 1);
      }, 1000);
    }
  }, [duration, runningTimer]);

  const toMinutesSeconds = (totalSeconds: number): string => {
    const seconds = Math.floor(totalSeconds % 60);
    let minutes = Math.floor((totalSeconds - 1) / 60);
    if (minutes === -1) {
      minutes = 0;
    }

    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  };

  return (
    <>
      <div className="z-0 ">
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
          <CircularSlider
            min={0}
            max={5400}
            dataIndex={duration}
            hideLabelValue
            labelBottom={true}
            knobColor={isStudy ? "#5A55F4" : "#48B065"}
            knobSize={runningTimer === TimerViewState.START ? 60 : undefined}
            progressColorFrom={isStudy ? "#5A55F4" : "#48B065"}
            progressColorTo={isStudy ? "#5A55F4" : "#48B065"}
            progressSize={20}
            trackColor="#eeeeee"
            trackSize={16}
            onChange={(value: number) => {
              setDuration(value);
            }}
            // isDragging={(value: number) => {
            //   console.log(value);
            //   if (value) {
            //     while (duration % 30 !== 0) {
            //       duration++;
            //     }
            //     setDuration(duration);
            //   }
            // }}
          >
            <div></div>
          </CircularSlider>
        )}
      </div>
      <div className="absolute">
        <div className="z-10 flex items-center content-center justify-center w-20 h-20 pb-10 text-4xl ">
          {toMinutesSeconds(duration)}
        </div>
      </div>
    </>
  );
}
