import { getElement } from "@/db/Actions";
import { StudyComponent } from "@/types/Components";
import { Reason, Study } from "@/types/Timer";
import React, { useEffect, useState } from "react";
import { Button } from "react-onsenui";

export default function GoodReasons({
  showComponent,
  setShowComponent,
  studyEntry,
  setStudyEntry,
}: {
  showComponent: StudyComponent;
  setShowComponent: (p: StudyComponent) => void;
  studyEntry: Study;
  setStudyEntry: (s: Study) => void;
}) {
  const [reasons, setReasons] = useState<Reason[]>();
  // const [selected, setSelected] = useState<Reason[]>();
  const selectedReason: Reason[] = [];

  async function getData(): Promise<Reason[]> {
    const data: Reason[] = await getElement("reasons", "all");
    return data;
  }

  useEffect(() => {
    getData().then((c) => {
      c.map((a) => {
        console.log(a);
        selectedReason.push(a);
        setReasons(selectedReason);
      });
    });
  });

  return (
    <>
      <div>Great! Why did it go well?</div>
      <div>
        {reasons !== undefined &&
          reasons.map((c) => (
            <>
              <button>{c.title}</button>
              <button>{c.goodReason}</button>
            </>
          ))}
      </div>
      
      <div>Add </div>
      {/* <div>{reasons !== undefined && reasons[0].title}</div> */}
      {/*TODO GET CAUSES*/}
      {/* {reasons?.forEach((a) => {
        <div>why</div>;
        {
          a.goodReason === true && (
            <>
              <div> a</div>
              <button
                onClick={() => {
                  console.log();
                  const s = { ...studyEntry };
                  selectedReason.push(a);
                  s.reasonIds = selectedReason.map((e) => {
                    return e.id;
                  });
                  console.log(s);
                  setStudyEntry(s);
                }}
              >
                {a.title} hi
              </button>
            </>
          );
        }
      })} */}
      <button onClick={() => setShowComponent(StudyComponent.NO_COMPONENT)}>
        complete
      </button>
    </>
  );
}
