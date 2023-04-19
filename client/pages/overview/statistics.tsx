import { PageComponent } from "@/types/Timer";
import Link from "next/link";

export default function Statistics() {
  return (
    <>
      {/* <button onClick={() => setShowComponent(PageComponent.SETTINGS)}>
        Settings
      </button> */}
      <Link href="overview/settings">Settings</Link>
      <div>Statistics</div>
    </>
  );
}
