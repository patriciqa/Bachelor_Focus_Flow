import TextWithIcon from "@/component/icon/TextWithIcon";
import CreateView from "@/component/timer/CreateView";
import { getElement } from "@/db/Actions";
import { Reason } from "@/types/Timer";
import { useEffect, useState } from "react";
import ModalPage from "./ModalPage";

export default function ReasonsOverview({ good }: { good: boolean }) {
  const [studyReasons, setStudyReasons] = useState<Reason[]>();
  const reasons: Reason[] = [];
  const [open, setOpen] = useState(false);

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
      });
    });
  }, [studyReasons]);

  return (
    <div>
      <div>
        {studyReasons !== undefined &&
          studyReasons.map((p) => (
            <div key={p.title}>
              <TextWithIcon icon={p.icon} text={p.title} />
            </div>
          ))}
        <button onClick={() => setOpen(true)}>Create Reason </button>
        <ModalPage
          isStudy={false}
          open={open}
          setOpen={setOpen}
          component={
            <CreateView setOpen={setOpen} goodReason={good ? true : false} />
          }
        />
      </div>
    </div>
  );
}
