import Link from "next/link";

export default function CreatePhaseView(
  
) {
  return (
    <div className="flex flex-col justify-center">
      <p>Start a new exam phase to track your data.</p>
      <Link href="/settings/exam-phase/create">Create Exam Phase</Link>
    </div>
  );
}
