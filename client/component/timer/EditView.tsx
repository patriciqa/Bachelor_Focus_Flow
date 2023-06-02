import IconPicker from "@/component/icon/IconPicker";
import { editElement } from "@/db/Actions";
import { Activity, Reason } from "@/types/Timer";
import { useState } from "react";
import CustomButton, { buttonVariant } from "../CustomButton";

export default function EditView({
  setOpen,
  goodReason,
  isBreak,
  activeEntry,
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
  const getVariant = (): string => {
    if (newEntry.title !== "" && newEntry.icon !== "") {
      return "dark";
    } else {
      return "disabled";
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {!isBreak && goodReason && (
          <div className="pt-8 pb-8">add positive cause</div>
        )}
        {!isBreak && !goodReason && <div>add negative cause</div>}
        {isBreak && <div>add break activity</div>}
        <p
          className="flex justify-end w-4/5 text-chartGrey text-h16"
          id="characterCount"
        >
          <span id="count">{activeEntry.title.length}</span>/32
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
          value={newEntry.icon !== "" ? newEntry.icon : "fa fa-star"}
          onChange={onIconChange}
          isBreak={isBreak}
        />
        <div className={"flex justify-center w-full pt-2 px-14 pb-2	"}>
          <div>
            <button
              onClick={() => {
                const a = { ...newEntry };
                a.archived = false;
                setNewEntry(a);
                console.log(a);
              }}
              className={
                "w-1/2 rounded-l-lg text-white p-2  " +
                (!newEntry.archived ? "bg-dark rounded  " : "bg-inactiveGrey")
              }
            >
              active
            </button>
            <button
              onClick={() => {
                const a = { ...newEntry };
                a.archived = true;
                setNewEntry(a);
              }}
              className={
                "w-1/2 rounded-r-lg text-white p-2  " +
                (newEntry.archived ? "bg-dark rounded  " : "bg-inactiveGrey")
              }
            >
              archive
            </button>
            <div className="mt-2 text-left text-chartGrey text-h14">
              {`*archived ${
                isBreak ? "activities" : "causes"
              } won’t be shown in the list anymore`}
            </div>
          </div>
        </div>
        <div className="pt-4">
          <CustomButton
            variant={getVariant() as buttonVariant}
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
