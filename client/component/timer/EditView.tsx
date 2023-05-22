import IconPicker from "@/component/icon/IconPicker";
import { editElement } from "@/db/Actions";
import { Activity, Reason } from "@/types/Timer";
import { useState } from "react";

export default function EditView({
  setOpen,
  goodReason,
  isBreak,
  activeEntry: activeEntry,
}: {
  setOpen: (d: boolean) => void;
  goodReason?: boolean;
  isBreak?: boolean;
  activeEntry: Reason | Activity;
}) {
  const [newEntry, setNewEntry] = useState<Reason | Activity>(activeEntry);

  const onIconChange = (icon: string) => {
    const a = { ...newEntry };
    a.icon = icon;
    setNewEntry(a);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div>add new break activity</div>
        <input
          type="text"
          id="name"
          className="pl-2 bg-white border-2 rounded-md border-darkGrey"
          required
          value={newEntry.title}
          onChange={(i) => {
            if (isBreak) {
              const a = { ...newEntry };
              a.title = i.target.value;
              a.archived = false;
              setNewEntry(a);
            } else {
              const a: any = { ...newEntry };
              console.log(typeof a);

              a.title = i.target.value;
              a.archived = false;
              if (goodReason === true) {
                a.goodReason = true;
              } else {
                a.goodReason = false;
              }
              setNewEntry(a);
            }
          }}
        />
        <IconPicker
          value={newEntry.icon !== "" ? newEntry.icon : "fa fa-home"}
          onChange={onIconChange}
          isBreak
        />
        <button
          onClick={() => {
            if (isBreak) {
              if (newEntry.id !== undefined) {
                editElement("activities", newEntry.id, newEntry);
              }
            } else {
              if (newEntry.id !== undefined) {
                editElement("reasons", newEntry.id, newEntry);
              }
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
