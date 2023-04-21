import { addElement } from "@/db/Actions";
import { Activity, Reason } from "@/types/Timer";
import Link from "next/link";
import { useState } from "react";

export default function CreateActivity({
  setOpen,
}: {
  setOpen: (d: boolean) => void;
}) {
  const [activities, setActivities] = useState<Activity>({
    id: 0,
    title: "",
    icon: "",
    archived: false,
  });
  return (
    <>
      <div>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="bg-silver"
          onChange={(i) => {
            const a = { ...activities };
            a.title = i.target.value;
            a.archived = false;
            a.id = Math.random();
            setActivities(a);
          }}
        />
      </div>
      <button
        onClick={() => {
          addElement("activities", activities);
          setOpen(false);
        }}
      >
        save activity
      </button>
    </>
  );
}
