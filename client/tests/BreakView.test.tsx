import { BreakView } from "@/component/timer/break/BreakView";
import { Mood, WhichTimer } from "@/types/Timer";
import { fireEvent, render, screen } from "@testing-library/react";
import { expect } from "vitest";

const entry = {
  mood: Mood.GOOD,
  id: "id",
  timer: { startTime: 0, duration: 1 },
  studyTimer: false,
};
beforeEach(async () => {
  render(
    <BreakView
      whichTimer={WhichTimer.BREAK}
      setWhichTimer={() => WhichTimer.BREAK}
      breakEntryy={entry}
      setBreakEntryy={() => entry}
    />
  );
});
describe("Break Timer View Test", () => {
  it("Check if timer slider shows after clicking the set timer button", async () => {
    const button = screen.getAllByRole("button", { name: "set timer" });
    fireEvent.click(button[0]);
    expect(screen.getAllByRole("button", { name: /start timer/i })).toBeDefined;
  });
});
