import TextWithIcon from "@/component/icon/TextWithIcon";
import { getElement } from "@/db/Actions";
import { Activity } from "@/types/Timer";
import { useEffect, useState } from "react";

export default function BreakActivityOverview() {
  const [activities, setActivities] = useState<Activity[]>();
  const activityArray: Activity[] = [];

  async function getData(): Promise<Activity[]> {
    const data: Activity[] = await getElement("activities", "all");
    return data;
  }

  useEffect(() => {
    getData().then((c) => {
      c.map((a) => {
        console.log(a);
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
          activities.map((c) => <TextWithIcon text={c.title} icon={c.icon} />)}
      </div>
    </div>
  );
}
