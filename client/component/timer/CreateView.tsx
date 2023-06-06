import IconPicker from "@/component/icon/IconPicker";
import { addElement } from "@/db/Actions";
import { Activity, Reason } from "@/types/Timer";
import { useState } from "react";
import CustomButton, { buttonVariant } from "../CustomButton";

export default function CreateView({
  setOpen,
  goodReason,
  isBreak,
}: {
  setOpen: (d: boolean) => void;
  goodReason?: boolean;
  isBreak: boolean;
}) {
  const [icon, seticon] = useState("fa fa-star");
  const [activities, setActivities] = useState<Activity>({
    title: "",
    icon: "fa-star",
    archived: false,
  });

  const [reasons, setReasons] = useState<Reason>({
    title: "",
    icon: "fa-star",
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

  const getVariant = (): string => {
    if (isBreak) {
      if (activities.title! === "" || activities.icon === "") {
        return "disabled";
      }
    } else {
      if (reasons.title === "" || reasons.icon === "") {
        return "disabled";
      }
    }
    return "dark";
  };
  const input = document.getElementById("myInput") as HTMLInputElement;
  const countSpan = document.getElementById("count");
  if (input !== null && countSpan !== null) {
    input.addEventListener("input", function () {
      countSpan.textContent = input.value.length.toString();
    });
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {!isBreak && goodReason && (
          <div className="pt-8 pb-8 ">add positive cause</div>
        )}
        {!isBreak && !goodReason && (
          <div className="pt-8 pb-8 "> add negative cause</div>
        )}
        {isBreak && <div className="pt-8 pb-8 ">add break activity</div>}
        <p
          className="flex justify-end w-4/5 pb-1 text-chartGrey text-h16"
          id="characterCount"
        >
          <span id="count">0</span>/32
        </p>

        <input
          type="text"
          id="myInput"
          maxLength={32}
          className="w-4/5 h-10 pl-2 mb-12 bg-white border-2 rounded-md border-chartGrey"
          required
          placeholder={isBreak ? "activity..." : "cause..."}
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
        <IconPicker value={icon} onChange={onIconChange} isBreak={isBreak} />
        <div className="pt-10">
          <CustomButton
            variant={getVariant() as buttonVariant}
            onClick={() => {
              if (isBreak) {
                addElement("activities", activities);
              } else {
                addElement("reasons", reasons);
              }
              setOpen(false);
            }}
          >
            add to list
          </CustomButton>
        </div>
      </div>
    </>
  );
}
