import CustomButton from "@/component/CustomButton";
import IconPicker from "@/component/icon/IconPicker";
import { addElement } from "@/db/Actions";
import { Reason } from "@/types/Timer";
import { useState } from "react";

export default function CreateReason({
  setOpen,
  goodReason,
}: {
  setOpen: (d: boolean) => void;
  goodReason: boolean;
}) {
  const [icon, seticon] = useState("fa fa-home");
  const onIconChange = (icon: string) => {
    seticon(icon);
    console.log(icon);
    const a = { ...reasons };
    a.icon = icon;
    setReasons(a);
  };
  const [reasons, setReasons] = useState<Reason>({
    title: "",
    icon: "",
    archived: false,
    goodReason: true,
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="bg-silver"
          onChange={(i) => {
            const a = { ...reasons };
            a.title = i.target.value;
            a.archived = false;
            // a.id = i.target.value;
            if (goodReason) {
              a.goodReason = true;
            } else {
              a.goodReason = false;
            }
            setReasons(a);
          }}
        />
      </div>
      <IconPicker value={icon} onChange={onIconChange} />
      <CustomButton
        onClick={() => {
          addElement("reasons", reasons);
          setOpen(false);
        }}
      >
        save reason
      </CustomButton>
    </div>
  );
}
