import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export enum ColorType {
  STUDY,
  BREAK,
  NEUTRAL,
}

export default function BackButton({
  setOpen,
  colorType,
}: {
  setOpen: (d: boolean) => void;
  colorType?: ColorType;
}) {
  const getColor = (color: ColorType): string => {
    let c = "";
    switch (color) {
      case ColorType.STUDY:
        c = "text-study";
        break;
      case ColorType.BREAK:
        c = "text-break";
        break;
      case ColorType.NEUTRAL:
        c = "text-dark";
        break;
    }
    return c;
  };
  return (
    <button
      className="flex justify-start pl-5 pt-9"
      onClick={() => setOpen(false)}
    >
      <FontAwesomeIcon
        icon={["fas", "arrow-left-long"]}
        className={colorType !== undefined ? getColor(colorType) + "mt-4" : ""}
        size="xl"
      />
    </button>
  );
}
