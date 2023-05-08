import IconPicker from "@/component/icon/IconPicker";
import { addElement } from "@/db/Actions";
import { Activity } from "@/types/Timer";
import { useState } from "react";

export default function CreateActivity({
  setOpen,
}: {
  setOpen: (d: boolean) => void;
}) {
  const [icon, seticon] = useState("fa fa-home");
  const [activities, setActivities] = useState<Activity>({
    title: "",
    icon: "",
    archived: false,
  });

  const onIconChange = (icon: string) => {
    seticon(icon);
    const a = { ...activities };
    a.icon = icon;
    setActivities(a);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div>add new break activity</div>
        <input
          type="text"
          id="name"
          className="bg-white border-2 rounded-md border-darkGrey"
          required
          onChange={(i) => {
            const a = { ...activities };
            a.title = i.target.value;
            a.archived = false;
            setActivities(a);
          }}
        />
        <IconPicker value={icon} onChange={onIconChange} />
        <button
          onClick={() => {
            console.log(activities);
            addElement("activities", activities);
            setOpen(false);
          }}
        >
          save activity
        </button>
      </div>
    </>
  );
}
