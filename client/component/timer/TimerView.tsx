import { PageComponent } from "@/types/Timer";
import { useEffect, useState } from "react";
import IndexedDb from "../../pages/db/IndexedDb";

export default function TimerView({
  db,
  setShowComponent,
}: {
  db: IndexedDb;
  setShowComponent: (d: PageComponent) => void;
}) {
  let duration = 3;

  const [state, setState] = useState({
    time: duration,
    minutes: Math.floor((duration - 1) / 60),
    seconds: duration - Math.floor((duration - 1) / 60) * 60 - 1,
  });

  const [studyTimer, setStudyTimer] = useState(true);
  const [startTimer, setStartTimer] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);

  useEffect(() => {
    const runIndexDb = async () => {
      await db.createObjectStore(["study"]);
      // await indexedDb.getValue("study", 62).then((d: Timestamp) => {
      //   console.log(d);
      //   setDuration(d.duration);
      // });
      //       await indexedDb.getAllValue("study");
      //     //   await indexedDb.deleteValue("books", 1);
    };
    runIndexDb();
  }, []);

  useEffect(() => {
    if (startTimer) {
      setTimeout(() => {
        if (state.time === 0) {
          setTimerFinished(true);
          return;
        }

        setState({
          time: state.time - 1,
          minutes: Math.floor((state.time - 1) / 60),
          seconds: state.time - Math.floor((state.time - 1) / 60) * 60 - 1,
        });
      }, 1000);
    }
  }, [state.time, startTimer]);

  useEffect(() => {});

  return (
    <>
      <div className="bg-violet-300 p-5">
        <button onClick={() => setStudyTimer(true)} className="bg-pink-300">
          timer
        </button>
        <button onClick={() => setStudyTimer(false)}>break</button>
      </div>
      {/* <h1 className="text-3xl font-bold underline">timer</h1> */}
      {/* <input
        type="time"
        id="appt"
        name="appt"
        min="09:00"
        max="18:00"
        required
        onChange={() => {
          let inputValue = (document.getElementById("appt") as HTMLInputElement)
            .value;
          setState({
            time: parseInt(inputValue) - 1,
            minutes: Math.floor((parseInt(inputValue) - 1) / 60),
            seconds:
              parseInt(inputValue) -
              Math.floor((parseInt(inputValue) - 1) / 60) * 60 -
              1,
          });
          console.log(parseInt(inputValue));
        }}
      /> */}
      {studyTimer ? (
        <div>
          <div>study</div>
          <button
            onClick={() => {
              db.putValue("study", {
                // id: Date.now(),
                startTime: Date.now(),
                // timer: {
                //   startTime: Date.now(),
                //   duration: state.time,
                // },
                // timer: {
                //   startTime: Date.now(),
                //   duration: state.time,
                //   endTime: Date.now() + state.time,
                // },
              });
              setStartTimer(true);
            }}
          >
            Start Timer
          </button>{" "}
          <button
            onClick={() => {
              db.putValue(
                "study",
                {
                  // id: Date.now(),
                  startTime: 11231,
                  // timer: {
                  //   startTime: Date.now(),
                  //   duration: state.time,
                  // },
                  // timer: {
                  //   startTime: Date.now(),
                  //   duration: state.time,
                  //   endTime: Date.now() + state.time,
                  // },
                },
                1
              );
              setStartTimer(true);
            }}
          >
            Start Timer
          </button>
        </div>
      ) : (
        <div>break</div>
      )}
      <div>
        {state.minutes}:
        {state.seconds <= 10 ? `0${state.seconds}` : state.seconds}
      </div>
      {/* <button
        onClick={() => {
          indexedDb.putValue("study", {
            startTime: Date.now(),
            duration: state.time,
          });
          setStartTimer(true);
        }}
      >
        Start Timer
      </button>{" "} */}
      {timerFinished && (
        <button
          onClick={() => {
            setShowComponent(PageComponent.MOOD);
          }}
        >
          Take a break
        </button>
      )}
    </>
  );
}
