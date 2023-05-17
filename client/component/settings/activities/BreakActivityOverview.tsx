import TextWithIcon from "@/component/icon/TextWithIcon";
import CreateView from "@/component/timer/CreateView";
import EditView from "@/component/timer/EditView";
import { getElement } from "@/db/Actions";
import { Activity } from "@/types/Timer";
import { useEffect, useState } from "react";
import ModalPage from "../reasons/ModalPage";

export default function BreakActivityOverview() {
  const [activities, setActivities] = useState<Activity[]>();
  const activityArray: Activity[] = [];
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [activeEntry, setActiveEntry] = useState<Activity>();

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
      <div className="flex flex-col justify-center">
        {activities !== undefined &&
          // eslint-disable-next-line react/jsx-key
          activities.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setOpenEdit(true);
                setActiveEntry(c);
              }}
            >
              <TextWithIcon text={c.title} icon={c.icon} />
            </button>
          ))}
      </div>
      <button onClick={() => setOpen(true)}>Create Activity </button>
      <ModalPage
        isStudy={false}
        open={open}
        setOpen={setOpen}
        component={<CreateView setOpen={setOpen} isBreak />}
      />{" "}
      {activeEntry !== undefined && (
        <ModalPage
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
