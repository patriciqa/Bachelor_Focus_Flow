import { Break, Mood, Study } from "@/types/Timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function MoodIcon({
  entry,
  setEntry,
  isStudy,
}: {
  entry: Study | Break;
  setEntry: (e: Study | Break) => void;
  isStudy: boolean;
}) {
  const [color, setColor] = useState("");

  useEffect(() => {
    if (!isStudy) {
      setColor("bg-break");
    } else {
      setColor("bg-study");
    }
  });

  return (
    <>
      <button
        className={
          "p-2 rounded-md m-3 " +
          (entry.mood === Mood.BAD ? color : "bg-inactiveGrey")
        }
        onClick={() => {
          const s = { ...entry };
          s.mood = Mood.BAD;
          setEntry(s);
        }}
      >
        <FontAwesomeIcon icon={["fas", "face-frown"]} color="white" size="2x" />
      </button>
      <button
        className={
          "p-2 rounded-md m-3 " +
          (entry.mood === Mood.RATHER_BAD ? color : "bg-inactiveGrey")
        }
        onClick={() => {
          const s = { ...entry };
          s.mood = Mood.RATHER_BAD;
          setEntry(s);
        }}
      >
        <FontAwesomeIcon icon={["fas", "face-meh"]} color="white" size="2x" />
      </button>
      <button
        className={
          "p-2 rounded-md m-3 " +
          (entry.mood === Mood.RATHER_GOOD ? color : "bg-inactiveGrey")
        }
        onClick={() => {
          const s = { ...entry };
          s.mood = Mood.RATHER_GOOD;
          setEntry(s);
        }}
      >
        <FontAwesomeIcon icon={["fas", "face-smile"]} color="white" size="2x" />
      </button>
      <button
        className={
          "p-2 rounded-md  m-3 " +
          (entry.mood === Mood.GOOD ? color : "bg-inactiveGrey")
        }
        onClick={() => {
          const s = { ...entry };
          s.mood = Mood.GOOD;
          setEntry(s);
        }}
      >
        <FontAwesomeIcon icon={["fas", "face-grin"]} color="white" size="2x" />
      </button>
    </>
  );
}
