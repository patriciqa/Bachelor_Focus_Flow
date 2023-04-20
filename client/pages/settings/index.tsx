import IndexedDb from "@/component/archive/IndexedDb";
import Link from "next/link";
import React, { useContext, useEffect } from "react";

const settings = (): React.ReactElement => {
  return (
    <div className="flex flex-col ">
      <div>settings</div>
      <Link href="/settings/exam-phase">Exam Phases</Link>
      <Link href="/settings/causes">Causes</Link>
    </div>
  );
};

export default settings;
