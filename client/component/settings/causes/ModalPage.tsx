import { Modal } from "@/component/transitions/Modal";
import { AnimatePresence } from "framer-motion";

export default function ModalPage({
  open,
  setOpen,
  component,
}: {
  open: boolean;
  setOpen: (o: boolean) => void;
  component: React.ReactElement;
}) {
  return (
    <AnimatePresence>
      {open && (
        <Modal onClose={() => setOpen(false)}>
          <button className="" onClick={() => setOpen(false)}>
            Cancel
          </button>
          {component}
          {/* <CreateReason setOpen={setOpen} goodReason={good ? true : false} /> */}
        </Modal>
      )}
    </AnimatePresence>
  );
}
