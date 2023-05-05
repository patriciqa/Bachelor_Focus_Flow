import Timer from "@/pages";
import { Mood, WhichTimer } from "@/types/Timer";
import { render } from "@testing-library/react";
const entry = {
  mood: Mood.GOOD,
  id: "id",
  timer: { startTime: 0, duration: 1 },
  studyTimer: true,
};

beforeEach(async () => {
  render(
    <Timer
      whichTimer={WhichTimer.STUDY}
      setWhichTimer={() => WhichTimer.STUDY}
      studyEntry={entry}
      setStudyEntry={() => entry}
      breakEntryy={entry}
      setBreakEntryy={() => entry}
    />
  );
});
describe("Study Timer View Test", () => {
  //   it("Check if the  Timer starfts when Start Timer button  is clicked", async () => {
  //     const button = screen.getAllByRole("button", { name: "break" });
  //     fireEvent.click(button[0]);
  //   });
});
