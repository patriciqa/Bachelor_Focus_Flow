import CancelButton, { ColorType } from "@/component/CancellButton";
import { Modal } from "@/component/transitions/Modal";
import { AnimatePresence } from "framer-motion";

export default function ModalPage({
  isStudy,
  colorType,
  open,
  setOpen,
  component,
}: {
  isStudy?: boolean;
  colorType?: ColorType;
  open: boolean;
  setOpen: (o: boolean) => void;
  component: React.ReactElement;
}) {
  return (
    <AnimatePresence>
      {open && (
        <Modal onClose={() => setOpen(false)}>
          <CancelButton setOpen={setOpen} colorType={colorType} />

          {component}
        </Modal>
      )}
    </AnimatePresence>
  );
}
