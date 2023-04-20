import { getElement } from "@/db/Actions";
import { Cause, Study } from "@/types/Timer";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function GoodCauses({
  studyEntryy,
  setStudyEntryy,
}: {
  studyEntryy: Study;
  setStudyEntryy: (s: Study) => void;
}) {
  const [causes, setCauses] = useState<Cause[]>();
  // const [selected, setSelected] = useState<Cause[]>();
  const selectedCause: Cause[] = [];

  const getCauses = async (): Promise<Cause[]> => {
    const a = (await getElement("causes", "all").then((result) => {
      return result;
    })) as Cause[];
    return a;
  };

  useEffect(() => {
    getCauses().then((a: Cause[]) => {
      a.forEach((p) => {
        selectedCause.push(p);
        setCauses(a);
        console.log(a);
      });
    });
  });

  useEffect(() => {
    console.log(causes);
  });
  return (
    <>
      <div>Great! Why did it go well?</div>
      <div>{causes !== undefined && causes[0].title}</div>
      {/*TODO GET CAUSES*/}
      {causes?.forEach((a) => {
        <div>why</div>;
        {
          a.goodCause === true && (
            <>
              <div> a</div>
              <button
                onClick={() => {
                  console.log();
                  const s = { ...studyEntryy };
                  selectedCause.push(a);
                  s.causeIds = selectedCause.map((e) => {
                    return e.id;
                  });
                  console.log(s);
                  setStudyEntryy(s);
                }}
              >
                {a.title} hi
              </button>
            </>
          );
        }
      })}
      <Link href="/">complete</Link>
    </>
  );
}
