import { getElement } from "@/db/Actions";
import { Reason } from "@/types/Timer";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function ReasonsOverview() {
  const [studyReasons, setStudyReasons] = useState<Reason[]>();
  const reasons: Reason[] = [];

  const getPhases = async (): Promise<Reason[]> => {
    const a = (await getElement("reasons", "all").then((result) => {
      return result;
    })) as Reason[];
    return a;
  };

  useEffect(() => {
    getPhases().then((c: Reason[]) => {
      c.forEach((p) => {
        reasons.push(p);
        setStudyReasons(c);
      });
    });
  });

  return (
    <div>
      <div>
        {studyReasons !== undefined &&
          studyReasons.map((p) => <div key={p.title}>{p.title}</div>)}
      </div>
      {/* <button>Create Reason</button> */}
    </div>
  );
}
