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
  const [active, setActive] = useState(true);

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
        activityArray.push(a);
        setActivities(activityArray);
      });
    });
  });

  return (
    <div className="flex flex-col items-center w-full h-[100vh] px-6">
      <div className="relative h-[58px] w-[70%] flex justify-center items-center mb-2 bg-chartGrey rounded-2xl">
        <button
          onClick={() => setActive(true)}
          className={
            "w-[52%] rounded-2xl left-0  absolute text-white  h-[60px] font-medium  " +
            (active && "bg-dark rounded  z-10 ")
          }
        >
          active
        </button>
        <button
          onClick={() => setActive(false)}
          className={
            "w-[52%] rounded-2xl right-0  absolute text-white  h-[60px] font-medium  " +
            (!active && "bg-dark rounded  z-10 ")
          }
        >
          archive
        </button>
      </div>
      <div className="h-[65%] relative w-full py-4 overflow-auto mb-4 ">
        <div className="text-left text-chartGrey text-h14">
          {active
            ? "edit, archive or create new activities"
            : "archived activities won’t be shown in the list anymore"}
        </div>
        {activities !== undefined &&
          activities.map((c) => (
            <>
              {active ? (
                <>
                  {c.archived === false && (
                    <button
                      onClick={() => {
                        setOpenEdit(true);
                        setActiveEntry(c);
                      }}
                      className="flex justify-between w-full py-2 "
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
                            className="pr-4"
                          />
                        </>
                      )}
                    </button>
                  )}
                </>
              ) : (
                <>
                  {c.archived === true && (
                    <button
                      onClick={() => {
                        setOpenEdit(true);
                        setActiveEntry(c);
                      }}
                      className="flex justify-between w-full py-2 "
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
                            className="pr-4"
                          />
                        </>
                      )}
                    </button>
                  )}
                </>
              )}
            </>
          ))}
      </div>
      <div className="absolute flex items-end justify-center bottom-[3%] ">
        {active && (
          <CustomButton
            variant="dark"
            onClick={() => {
              setOpen(true);
            }}
          >
            add activity
          </CustomButton>
        )}
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
