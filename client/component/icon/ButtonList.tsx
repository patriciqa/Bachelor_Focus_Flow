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
  selected: number[] | null | number;
  whenClicked: () => void;
  icon?: string;
  text: string | Promise<string>;
  buttonVariant?: ButtonVariant;
}) {
  const getBackground = (): string => {
    if (
      buttonVariant === ButtonVariant.STUDY &&
      includes(selected, reason.id) === true &&
      selected !== null
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
    if (buttonVariant === ButtonVariant.STUDY && selected !== null) {
      return "text-study";
    } else if (buttonVariant === ButtonVariant.BREAK && selected !== null) {
      return "text-break";
    } else if (selected === null) {
      return "text-inactiveGrey";
    }
  };

  const getBorderColor = (): string => {
    if (buttonVariant === ButtonVariant.STUDY && selected !== null) {
      return "border-study";
    } else if (buttonVariant === ButtonVariant.BREAK && selected !== null) {
      return "border-break";
    } else if (selected === null) {
      return "border-inactiveGrey";
    }
  };

  return (
    <button
      onClick={whenClicked}
      className={
        "flex flex-row items-center justify-center flex-grow w-full p-3 my-2 border rounded-[32px] h-12 " +
        getBorderColor() +
        " " +
        getBackground()
      }
    >
      <div className="basis-[15%] pr-3">
        {icon !== undefined && (
          <>
            {icon !== "" ? (
              <FontAwesomeIcon
                icon={icon !== null && icon}
                className={getIconColor()}
              />
            ) : (
              <div>
                <FontAwesomeIcon
                  icon={["fas", "plus"]}
                  color={"hsla(0, 100%, 90%, 0)"}
                />
              </div>
            )}
          </>
        )}
      </div>
      <div
        className={
          "grow-[5] flex items-left text-left leading-5	 " +
          (selected === null && "text-inactiveGrey")
        }
      >
        {text}
      </div>
    </button>
  );
}
