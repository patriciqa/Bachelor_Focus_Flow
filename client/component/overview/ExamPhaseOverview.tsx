import { getElement } from "@/db/Actions";

export default function ExamPhaseOverview() {
  const getPhases = (): string => {
    let phases = "";
    getElement("examPhases", "all").then((result) => {
      if (result) {
        console.log(result);
        // phases = result;
      }
    });
    return phases;
  };

  return <div>{getPhases()}</div>;
}
