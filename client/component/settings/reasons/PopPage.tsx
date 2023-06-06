import BackButton, { ColorType } from "@/component/BackButton";
import { Pop } from "@/component/transitions/Pop";
import { AnimatePresence } from "framer-motion";

export default function PopPage({
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
        <Pop onClose={() => setOpen(false)}>
          <BackButton setOpen={setOpen} colorType={colorType} />

          {component}
        </Pop>
      )}
    </AnimatePresence>
  );
}
