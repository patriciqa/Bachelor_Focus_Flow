import { addElement } from "@/db/Actions";
import { Cause } from "@/types/Timer";
import Link from "next/link";
import { useState } from "react";

export default function CreateCause({}) {
  const [createdCause, setCreatedCause] = useState<Cause>({
    id: 0,
    title: "",
    icon: "",
    goodCause: true,
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
            if (createdCause) {
              createdCause.title = i.target.value;
            }
          }}
        />
      </div>
      <Link
        href={"/settings/causes/"}
        onClick={() => {
          addElement("causes", createdCause);
        }}
      >
        Save
      </Link>
    </>
  );
}
