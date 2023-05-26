import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";

export function Pop({ onClose, children }: { onClose: any; children: any }) {
  return (
    <Dialog className="fixed inset-0 z-20 " onClose={onClose} open={true}>
      <div className="flex flex-col justify-center h-full text-center">
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
          className="z-0 flex flex-col w-full h-full bg-white "
        >
          {children}
        </motion.div>
      </div>
    </Dialog>
  );
}
