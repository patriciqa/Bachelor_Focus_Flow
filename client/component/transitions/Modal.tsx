import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";

export function Modal({ onClose, children }: { onClose: any; children: any }) {
  return (
    <Dialog className="fixed inset-0 z-20" onClose={onClose} open={true}>
      <div className="flex flex-col justify-center h-full px-1 text-center pt-14 sm:block sm:p-0">
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
          className="fixed inset-0 bg-background"
        />

        <motion.div
          initial={{ y: "100%" }}
          animate={{
            y: 0,
            transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
          }}
          exit={{
            y: "100%",
            transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
          }}
          className="z-0 flex flex-col w-full h-full bg-white rounded-3xl   shadow-[1px_-4px_16px_rgba(39,37,37,0.15)] rounded-t-lgp-5"
        >
          {children}
        </motion.div>
      </div>
    </Dialog>
  );
}
