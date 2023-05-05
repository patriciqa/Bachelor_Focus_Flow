import CancelButton from "@/component/CancellButton";
import { Modal } from "@/component/transitions/Modal";
import { AnimatePresence } from "framer-motion";

export default function ModalPage({
  isStudy,
  open,
  setOpen,
  component,
}: {
  isStudy?: boolean;
  open: boolean;
  setOpen: (o: boolean) => void;
  component: React.ReactElement;
}) {
  return (
    <AnimatePresence>
      {open && (
        <Modal onClose={() => setOpen(false)}>
          <CancelButton setOpen={setOpen} isStudy={isStudy} />

          {component}
        </Modal>
      )}
    </AnimatePresence>
  );
}
