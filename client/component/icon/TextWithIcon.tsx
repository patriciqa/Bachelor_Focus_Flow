//@ts-nocheck
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonVariant } from "./ButtonList";

export default function TextWithIcon({
  icon,
  text,
  variant,
}: {
  icon?: string;
  text: string | Promise<string>;
  variant: ButtonVariant;
}) {
  const getColor = (): string => {
    switch (variant) {
      case ButtonVariant.BREAK:
        return "text-break";
        break;
      case ButtonVariant.STUDY:
        return "text-study";
        break;
      default:
        return "text-dark;";
    }
  };
  return (
    <div className="flex flex-row items-center justify-center">
      {icon !== "" && (
        <FontAwesomeIcon icon={icon as IconProp} className={getColor()} />
      )}
      <div className="px-3"> {text}</div>
    </div>
  );
}
