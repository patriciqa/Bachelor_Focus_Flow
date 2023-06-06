import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

enum ColorType {
  STUDY,
  BREAK,
  NEUTRAL,
}
export default function CancelButton({
  setOpen,
}: {
  setOpen: (d: boolean) => void;
}) {
  return (
    <button className="flex justify-end p-5" onClick={() => setOpen(false)}>
      <FontAwesomeIcon
        icon={["fas", "xmark"]}
        className="text-dark"
        size="2x"
      />
    </button>
  );
}
