import IndexedDb from "@/component/archive/IndexedDb";
import { PageComponent } from "@/types/Timer";
import Link from "next/link";
import React, { useContext, useEffect } from "react";

const settings = (): React.ReactElement => {
  return (
    <div>
      <div>settings</div>
      {/* <button
        className="bg-tahiti"
        onClick={() => setShowComponent(PageComponent.SETTINGS_EXAMPHASES)}
      >
        Exam Phases
      </button> */}
      <Link href="/settings/exam-phase">Exam Phases</Link>
    </div>
  );
};

export default settings;
