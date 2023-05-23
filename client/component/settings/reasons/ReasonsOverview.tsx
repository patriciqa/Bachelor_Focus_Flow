import { ColorType } from "@/component/CancellButton";
import CustomButton from "@/component/CustomButton";
import { ButtonVariant } from "@/component/icon/ButtonList";
import TextWithIcon from "@/component/icon/TextWithIcon";
import CreateView from "@/component/timer/CreateView";
import EditView from "@/component/timer/EditView";
import { getElement } from "@/db/Actions";
import { Reason } from "@/types/Timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ModalPage from "./ModalPage";

export default function ReasonsOverview({ good }: { good: boolean }) {
  const [studyReasons, setStudyReasons] = useState<Reason[]>();
  const reasons: Reason[] = [];
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [activeReason, setActiveReason] = useState<Reason>();
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);
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
      <div className="flex flex-col p-4">
        {studyReasons !== undefined &&
          studyReasons.map((p) => (
            <button
              onClick={() => {
                setOpenEdit(true);
                setActiveReason(p);
              }}
              className="flex justify-between w-[90vw] py-1"
            >
              {initialRenderComplete && (
                <>
                  <TextWithIcon
                    variant={ButtonVariant.STUDY}
                    icon={p.icon}
                    text={p.title}
                  />
                  <FontAwesomeIcon
                    icon={["fas", "ellipsis-vertical"]}
                    size="xl"
                  />
                </>
              )}
            </button>
          ))}
        <div className="flex items-end justify-center ">
          <CustomButton
            variant="dark"
            onClick={() => {
              setOpen(true);
            }}
          >
            add cause
          </CustomButton>
        </div>
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
                isBreak={false}
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
