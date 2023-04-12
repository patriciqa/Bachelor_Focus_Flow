import MoodCheckIn from "@/component/timer/MoodCheckIn";
import { PageComponent } from "@/types/Timer";
import React, { useState } from "react";
import TimerView from "../component/timer/TimerView";
import IndexedDb from "./db/IndexedDb";

const Timer = () => {
  const indexedDb = new IndexedDb("timer");

  const [showComponent, setShowComponent] = useState<PageComponent>(
    PageComponent.TIMER
  );
  const show = (): React.ReactElement => {
    if (showComponent === PageComponent.TIMER) {
      return <TimerView db={indexedDb} setShowComponent={setShowComponent} />;
    } else if (showComponent === PageComponent.MOOD) {
      return <MoodCheckIn />;
    }
    return <TimerView db={indexedDb} setShowComponent={setShowComponent} />;
  };
  return (
    <div className="flex w-screen justify-center flex-col	items-center">
      {show()}
    </div>
  );
};
export default Timer;
