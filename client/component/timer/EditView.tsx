import IconPicker from "@/component/icon/IconPicker";
import { editElement } from "@/db/Actions";
import { Activity, Reason } from "@/types/Timer";
import { useState } from "react";
import CustomButton from "../CustomButton";

export default function EditView({
  setOpen,
  goodReason,
  isBreak,
  activeEntry: activeEntry,
}: {
  setOpen: (d: boolean) => void;
  goodReason?: boolean;
  isBreak: boolean;
  activeEntry: Reason | Activity;
}) {
  const [newEntry, setNewEntry] = useState<Reason | Activity>(activeEntry);
  const onIconChange = (icon: string) => {
    const a = { ...newEntry };
    a.icon = icon;
    setNewEntry(a);
  };

  const input = document.getElementById("myInput") as HTMLInputElement;
  const countSpan = document.getElementById("count");
  if (input !== null && countSpan !== null) {
    input.addEventListener("input", function () {
      const remainingChars = input.maxLength - input.value.length;
      countSpan.textContent = input.value.length.toString();
    });
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {!isBreak && goodReason && (
          <div className="pt-12 pb-12 ">add positive cause</div>
        )}
        {!isBreak && !goodReason && <div>add negative cause</div>}
        {isBreak && <div>add break activity</div>}
        <p
          className="flex justify-end w-4/5 text-chartGrey text-h16"
          id="characterCount"
        >
          <span id="count">0</span>/32
        </p>

        <input
          type="text"
          id="myInput"
          value={newEntry.title}
          maxLength={32}
          className="w-4/5 h-10 pl-2 mb-12 bg-white border-2 rounded-md border-chartGrey"
          required
          placeholder={isBreak ? "activity..." : "cause..."}
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
          isBreak={isBreak}
        />
        <div className="pt-20">
          <CustomButton
            size="regular"
            variant={isBreak ? "break" : "study"}
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
            {isBreak ? "save activity" : " save reason"}{" "}
          </CustomButton>
        </div>
      </div>
    </>
  );
}
