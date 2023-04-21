import { addElement } from "@/db/Actions";
import { Reason } from "@/types/Timer";
import Link from "next/link";
import { useState } from "react";

export default function CreateReason({}) {
  const [createdReason, setCreatedReason] = useState<Reason>({
    id: 0,
    title: "",
    icon: "",
    goodReason: true,
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
            if (createdReason) {
              createdReason.title = i.target.value;
            }
          }}
        />
      </div>
      <Link
        href={"/settings/reasons/"}
        onClick={() => {
          addElement("reasons", createdReason);
        }}
      >
        Save
      </Link>
    </>
  );
}
