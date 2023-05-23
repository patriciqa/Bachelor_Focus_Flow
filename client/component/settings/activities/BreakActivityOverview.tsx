import { ColorType } from "@/component/CancellButton";
import CustomButton from "@/component/CustomButton";
import { ButtonVariant } from "@/component/icon/ButtonList";
import TextWithIcon from "@/component/icon/TextWithIcon";
import CreateView from "@/component/timer/CreateView";
import EditView from "@/component/timer/EditView";
import { getElement } from "@/db/Actions";
import { Activity } from "@/types/Timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ModalPage from "../reasons/ModalPage";

export default function BreakActivityOverview() {
  const [activities, setActivities] = useState<Activity[]>();
  const activityArray: Activity[] = [];
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [activeEntry, setActiveEntry] = useState<Activity>();
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);
  async function getData(): Promise<Activity[]> {
    const data: Activity[] = await getElement("activities", "all");
    return data;
  }

  useEffect(() => {
    getData().then((c) => {
      c.map((a) => {
        // console.log(a);
        activityArray.push(a);
        setActivities(activityArray);
      });
    });
  });

  return (
    <div>
      <div className="flex flex-col justify-center p-4">
        {activities !== undefined &&
          // eslint-disable-next-line react/jsx-key
          activities.map((c) => (
            <button
              onClick={() => {
                setOpenEdit(true);
                setActiveEntry(c);
              }}
              className="flex justify-between w-[90vw] py-1"
            >
              {initialRenderComplete && (
                <>
                  <TextWithIcon
                    variant={ButtonVariant.BREAK}
                    icon={c.icon}
                    text={c.title}
                  />
                  <FontAwesomeIcon
                    icon={["fas", "ellipsis-vertical"]}
                    size="xl"
                  />
                </>
              )}
            </button>
          ))}
      </div>
      <div className="flex items-end justify-center ">
        <CustomButton
          variant="dark"
          onClick={() => {
            setOpen(true);
          }}
        >
          add activity
        </CustomButton>
      </div>
      <ModalPage
        colorType={ColorType.BREAK}
        isStudy={false}
        open={open}
        setOpen={setOpen}
        component={<CreateView setOpen={setOpen} isBreak={true} />}
      />{" "}
      {activeEntry !== undefined && (
        <ModalPage
          colorType={ColorType.BREAK}
          isStudy={false}
          open={openEdit}
          setOpen={setOpenEdit}
          component={
            <EditView setOpen={setOpenEdit} activeEntry={activeEntry} isBreak />
          }
        />
      )}
    </div>
  );
}
