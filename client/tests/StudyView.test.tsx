import { StudyView } from "@/component/timer/study/StudyView";
import { Mood, WhichTimer } from "@/types/Timer";
import { fireEvent, render, screen } from "@testing-library/react";
import { expect } from "vitest";

const entry = {
  mood: Mood.GOOD,
  id: 0,
  timer: { startTime: 0, duration: 1 },
  studyTimer: true,
};

beforeEach(async () => {
  render(
    <StudyView
      setWhichTimer={() => WhichTimer.STUDY}
      studyEntry={entry}
      setStudyEntry={() => entry}
    />
  );
});
describe("Study Timer View Test", () => {
  it("Check if the  Timer starts when Start Timer button  is clicked", async () => {
    const button = screen.getAllByRole("button", { name: /start timer/i });
    fireEvent.click(button[0]);
    expect(screen.getAllByRole("button", { name: /stop timer/i })).toBeDefined;
  });
});
