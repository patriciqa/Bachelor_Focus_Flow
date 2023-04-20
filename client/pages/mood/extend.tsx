import { ShowPage } from "@/types/Timer";
import Link from "next/link";

export default function ExtendBreak({
  showPage,
  setShownPage,
}: {
  showPage: ShowPage;
  setShownPage: (p: ShowPage) => void;
}) {
  return (
    <div>
      <div>Need a longer break?</div>

      <Link
        href="/"
        onClick={() => {
          setShownPage(ShowPage.BREAK);
        }}
      >
        extend break
      </Link>
      <Link
        href="/"
        onClick={() => {
          setShownPage(ShowPage.STUDY);
        }}
      >
        extend break
      </Link>
    </div>
  );
}
