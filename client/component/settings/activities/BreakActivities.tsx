import { getElement } from "@/db/Actions";
import { Activity } from "@/types/Timer";
import { useEffect, useState } from "react";

export default function BreakActivities() {
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
          activities.map((c) => <button>{c.title}</button>)}
      </div>
    </div>
  );
}
