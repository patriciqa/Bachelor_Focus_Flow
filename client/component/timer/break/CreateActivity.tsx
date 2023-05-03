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
    id: "",
    title: "",
    icon: "",
    archived: false,
  });
  
  const onIconChange = (icon: string) => {
    seticon(icon);
    console.log(icon);
    const a = { ...activities };
    a.icon = icon;
    setActivities(a);
  };

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
            a.id = i.target.value;
            setActivities(a);
          }}
        />
      </div>
      <IconPicker value={icon} onChange={onIconChange} />

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
