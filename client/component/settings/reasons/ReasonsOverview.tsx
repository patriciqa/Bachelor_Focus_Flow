import { ColorType } from "@/component/CancellButton";
import TextWithIcon from "@/component/icon/TextWithIcon";
import CreateView from "@/component/timer/CreateView";
import EditView from "@/component/timer/EditView";
import { getElement } from "@/db/Actions";
import { Reason } from "@/types/Timer";
import { useEffect, useState } from "react";
import ModalPage from "./ModalPage";

export default function ReasonsOverview({ good }: { good: boolean }) {
  const [studyReasons, setStudyReasons] = useState<Reason[]>();
  const reasons: Reason[] = [];
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [activeReason, setActiveReason] = useState<Reason>();

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
      <div className="flex flex-col">
        {studyReasons !== undefined &&
          studyReasons.map((p) => (
            <button
              onClick={() => {
                setOpenEdit(true);
                setActiveReason(p);
              }}
              key={p.title}
            >
              <TextWithIcon icon={p.icon} text={p.title} />
            </button>
          ))}
        <button onClick={() => setOpen(true)}>Create Reason </button>
        <ModalPage
          isStudy={false}
          colorType={ColorType.STUDY}
          open={open}
          setOpen={setOpen}
          component={
            <CreateView
              setOpen={setOpen}
              isBreak={false}
              goodReason={good ? true : false}
            />
          }
        />{" "}
        {activeReason !== undefined && (
          <ModalPage
            colorType={ColorType.STUDY}
            isStudy={false}
            open={openEdit}
            setOpen={setOpenEdit}
            component={
              <EditView
                setOpen={setOpenEdit}
                goodReason={good ? true : false}
                activeEntry={activeReason}
              />
            }
          />
        )}
      </div>
    </div>
  );
}
