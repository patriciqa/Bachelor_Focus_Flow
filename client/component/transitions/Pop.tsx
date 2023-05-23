import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";

export function Pop({ onClose, children }: { onClose: any; children: any }) {
  return (
    <Dialog className="fixed inset-0 z-10" onClose={onClose} open={true}>
      <div className="z-0 h-[90vh] ">
        <motion.div
          initial={{ x: "100%" }}
          animate={{
            x: 0,
            transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
          }}
          exit={{
            x: "100%",
            transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
          }}
          className="z-0 flex flex-col w-full h-full rounded-md shadow-xl bg-background "
        >
          {children}
        </motion.div>
      </div>
    </Dialog>
  );
}
