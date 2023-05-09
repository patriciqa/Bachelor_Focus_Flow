import IconPicker from "@/component/icon/IconPicker";
import { addElement } from "@/db/Actions";
import { Activity, Reason } from "@/types/Timer";
import { useState } from "react";

export default function CreateView({
  setOpen,
  goodReason,
  isBreak,
}: {
  setOpen: (d: boolean) => void;
  goodReason?: boolean;
  isBreak?: boolean;
}) {
  const [icon, seticon] = useState("fa fa-home");
  const [activities, setActivities] = useState<Activity>({
    title: "",
    icon: "",
    archived: false,
  });

  const [reasons, setReasons] = useState<Reason>({
    title: "",
    icon: "",
    archived: false,
    goodReason: false,
  });

  const onIconChange = (icon: string) => {
    seticon(icon);

    if (isBreak) {
      const a = { ...activities };
      a.icon = icon;
      setActivities(a);
    } else {
      const a = { ...reasons };
      a.icon = icon;
      setReasons(a);
    }
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
            if (isBreak) {
              const a = { ...activities };
              a.title = i.target.value;
              a.archived = false;
              setActivities(a);
            } else {
              const a = { ...reasons };
              a.title = i.target.value;
              a.archived = false;
              if (goodReason === true) {
                a.goodReason = true;
              } else {
                a.goodReason = false;
              }
              setReasons(a);
            }
          }}
        />
        <IconPicker value={icon} onChange={onIconChange} />
        <button
          onClick={() => {
            console.log(activities);
            if (isBreak) {
              addElement("activities", activities);
            } else {
              addElement("reasons", reasons);
            }
            setOpen(false);
          }}
        >
          {isBreak ? "save activity" : " save reason"}
        </button>
      </div>
    </>
  );
}
