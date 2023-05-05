// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TextWithIcon({
  icon,
  text,
}: {
  icon: string;
  text: string | Promise<string>;
}) {
  return (
    <div className="flex flex-row items-center justify-center">
      <FontAwesomeIcon icon={icon} />
      <div className="px-3"> {text}</div>
    </div>
  );
}
