import { addElement } from "@/db/Actions";
import { Activity, Reason } from "@/types/Timer";
import { useState } from "react";

export default function CreateReason({
  setOpen,
  goodReason,
}: {
  setOpen: (d: boolean) => void;
  goodReason: boolean;
}) {
  const [reasons, setReasons] = useState<Reason>({
    id: '',
    title: "",
    icon: "",
    archived: false,
    goodReason: true,
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
            const a = { ...reasons };
            a.title = i.target.value;
            a.archived = false;
            a.id = i.target.value;
            if (goodReason) {
              a.goodReason = true;
            } else {
              a.goodReason = false;
            }
            setReasons(a);
          }}
        />
      </div>

      <button
        onClick={() => {
          addElement("reasons", reasons);
          setOpen(false);
        }}
      >
        save reason
      </button>
    </>
  );
}
