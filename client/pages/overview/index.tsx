import { Modal } from "@/component/Modal";
import ExamPhaseOverview from "@/component/settings/exam-phase/ExamPhaseOverview";
import Settings from "@/component/settings/Settings";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Overview = () => {
  let [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen">
        {/* <Link href="/settings">settings</Link> */}
        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          settings
        </button>
        <AnimatePresence>
          {open && (
            <Modal onClose={() => setOpen(false)}>
              <button
                className="mr-1 text-blue-500 focus:outline-none"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <Settings />
            </Modal>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
export default Overview;
