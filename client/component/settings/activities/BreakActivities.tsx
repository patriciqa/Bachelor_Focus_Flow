import { getElement } from "@/db/Actions";
import { Activity } from "@/types/Timer";
import { useEffect } from "react";

export default function BreakActivities() {
  async function getData(): Promise<Activity[]> {
    const data: Activity[] = await getElement("activities", "all");
    return data;
  }

  useEffect(() => {
    getData();
    // if(result as Activity){
    //     result.
    // }
    // result.
  });
  return <div></div>;
}
