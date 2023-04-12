import IndexedDb from "@/pages/db/IndexedDb";
import { useEffect } from "react";
export enum Mood {
  GOOD = "1",
  NEUTRAL = "0",
  BAD = "-1",
}

export default function MoodCheckIn() {
  const indexedDb = new IndexedDb("timer");

  useEffect(() => {
    const runIndexDb = async () => {
      await indexedDb.createObjectStore(["mood"]);
      // await indexedDb.getValue("study", 62).then((d: Timestamp) => {
      //   console.log(d);
      //   setDuration(d.duration);
      // });
      //       await indexedDb.getAllValue("study");
      //     //   await indexedDb.deleteValue("books", 1);
    };
    runIndexDb();
  }, []);
  return (
    <>
      <button
        onClick={
          () => indexedDb.updateValue("study", { mood: "hi" }, 1681297899603)
          // indexedDb.putValue("study", {
          //   mood: Mood.GOOD,
          // }, 1681297899603)
        }
      >
        good
      </button>
      <button
        onClick={() =>
          indexedDb.putValue("mood", {
            mood: Mood.NEUTRAL,
          })
        }
      >
        neutral
      </button>
      <button
        onClick={() =>
          indexedDb.putValue("mood", {
            mood: Mood.BAD,
          })
        }
      >
        bad
      </button>
    </>
  );
}
