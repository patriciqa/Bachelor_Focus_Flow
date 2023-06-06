import CancelButton from "@/component/CancellButton";
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
          <CancelButton setOpen={setOpen} />

          {component}
        </Modal>
      )}
    </AnimatePresence>
  );
}
