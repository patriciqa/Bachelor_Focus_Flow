import { PageComponent } from "@/types/Timer";
import { DEFAULT_MIN_VERSION } from "tls";

export default function CreateExamPhase({
  setShowComponent,
}: {
  setShowComponent: (D: PageComponent) => void;
}) {
  return (
    <div className="flex flex-col justify-center">
      <p>Start a new exam phase to track your data.</p>
      <button
        className="bg-tahiti"
        onClick={() => setShowComponent(PageComponent.EXAMPHASEINPUT)}
      >
        create exam phase{" "}
      </button>
    </div>
  );
}
