import { getElement } from "@/db/Actions";
import { Reason } from "@/types/Timer";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ReasonsOverview({ good }: { good: boolean }) {
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
        if (good) {
          if (p.goodReason) {
            reasons.push(p);
            setStudyReasons(reasons);
          }
        } else {
          if (!p.goodReason) {
            reasons.push(p);
            setStudyReasons(reasons);
          }
        }
        console.log(studyReasons);
      });
    });
  }, [studyReasons]);

  return (
    <div>
      <div>
        {studyReasons !== undefined &&
          studyReasons.map((p) => <div key={p.title}>{p.title}</div>)}
      </div>
    </div>
  );
}
