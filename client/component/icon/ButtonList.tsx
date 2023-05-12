// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { includes } from "lodash";

export enum ButtonVariant {
  STUDY,
  BREAK,
  GREY,
}

export default function ButtonList({
  reason,
  selected,
  whenClicked,
  icon,
  text,
  buttonVariant,
}: {
  reason: any;
  selected: number[] | undefined | number;
  whenClicked: () => void;
  icon?: string;
  text: string | Promise<string>;
  buttonVariant?: ButtonVariant;
}) {
  const getBackground = (): string => {
    if (
      buttonVariant === ButtonVariant.STUDY &&
      includes(selected, reason.id) === true
    ) {
      return "bg-study text-white";
    } else if (
      buttonVariant === ButtonVariant.BREAK &&
      reason.id !== undefined &&
      selected === reason.id
    ) {
      return "bg-break text-white";
    }
    return "";
  };

  const getIconColor = (): string => {
    if (
      buttonVariant === ButtonVariant.STUDY &&
      includes(selected, reason.id) === true
    ) {
      return "#fffff";
    } else if (
      buttonVariant === ButtonVariant.BREAK &&
      reason.id !== undefined &&
      selected === reason.id
    ) {
      return "#fffff";
    }
    if (buttonVariant === ButtonVariant.STUDY) {
      return "#5A55F4";
    } else if (buttonVariant === ButtonVariant.BREAK) {
      return "#48B065";
    }
  };

  const getBorderColor = (): string => {
    if (buttonVariant === ButtonVariant.STUDY) {
      return "border-study";
    } else if (buttonVariant === ButtonVariant.BREAK) {
      return "border-break";
    }
  };

  return (
    <button
      onClick={whenClicked}
      className={
        "flex flex-row items-center justify-center flex-grow w-full p-3 my-2 border rounded-[32px] " +
        getBorderColor() +
        " " +
        getBackground()
      }
    >
      <div className="grow-[1] pr-3">
        {icon !== undefined ? (
          <FontAwesomeIcon icon={icon} color={getIconColor()} />
        ) : (
          <div>
            <FontAwesomeIcon
              icon={["fas", "circle-chevron-right"]}
              color={"hsla(0, 100%, 90%, 0)"}
            />
          </div>
        )}
      </div>
      <div className="grow-[5] flex items-left w-[180px]"> {text}</div>
    </button>
  );
}
