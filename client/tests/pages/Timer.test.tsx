import Timer from "@/pages";
import { Mood, WhichTimer } from "@/types/Timer";
import { render } from "@testing-library/react";
const entry = {
  mood: Mood.GOOD,
  id: 0,
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
//GIVEN was ich habe (activetimer break oder study) (state setzen )
//WHEN (click auf button) rerenderen (methode aufrufen)
//THEN wurde methode aufgerufen, eventhandler (meisten in given spy methode setzen) (richtiger inhalt ausgeführt)

//describe "show page" it for every case (
//render page, see when button clicked, class active, or whichTimer state, will be called (spyobject)

// it('should get the latest message with a spy', () => {
//     const spy = vi.spyOn(messages, 'whichTimer')
//     expect(spy.getMockName()).toEqual('getLatest')

//     expect(messages.getLatest()).toEqual(
//       messages.items[messages.items.length - 1],
//     )

//     expect(spy).toHaveBeenCalledTimes(1) --> toHaveBeenCalledWith(WhichTimer.Study..)

//     spy.mockImplementationOnce(() => 'access-restricted')
//     expect(messages.getLatest()).toEqual('access-restricted')

//     expect(spy).toHaveBeenCalledTimes(2)
//   })

describe("Study Timer View Test", () => {
  it("Check if the  Timer starfts when Start Timer button  is clicked", async () => {
    // const button = screen.getAllByRole("button", { name: "break" });
    // fireEvent.click(button[0]);
  });
});
