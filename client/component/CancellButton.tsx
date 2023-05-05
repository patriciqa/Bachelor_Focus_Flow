import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CancelButton({
  setOpen,
  isStudy,
}: {
  setOpen: (d: boolean) => void;
  isStudy?: boolean;
}) {
  return (
    <button className="flex justify-end p-5" onClick={() => setOpen(false)}>
      <FontAwesomeIcon
        icon={["fas", "xmark"]}
        color={isStudy ? "#5A55F4" : "#48B065"}
        size="2x"
      />
    </button>
  );
}
