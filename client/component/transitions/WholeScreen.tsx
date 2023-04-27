import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";

export function WholeScreen({ onClose, children }: { onClose: any; children: any }) {
  return (
    <Dialog className="fixed inset-0 z-10" onClose={onClose} open={true}>
      <div className="flex flex-col justify-center h-full px-1 pt-4 text-center sm:block sm:p-0">
        <Dialog.Overlay
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
          }}
          className="fixed inset-0 "
        />

        <motion.div
          // initial={{ x: "100%" }}
          animate={{
            // x: 0,
            transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
          }}
          exit={{
            // x: "100%",
            transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
          }}
          className="z-0 flex flex-col w-full h-full bg-white rounded-md shadow-xl rounded-t-lgp-5"
        >
          {children}
        </motion.div>
      </div>
    </Dialog>
  );
}
