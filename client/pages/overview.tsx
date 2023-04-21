import Settings from "@/component/settings/Settings";
import { Modal } from "@/component/transitions/Modal";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";

const Overview = () => {
  let [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen">
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
