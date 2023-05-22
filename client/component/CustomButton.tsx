/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from "clsx";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

type buttonVariant =
  | "study"
  | "break"
  | "disabled"
  | "study-unfilled"
  | "break-unfilled";
type buttonSize = "regular" | "large" | "small";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: buttonSize;
  variant?: buttonVariant;
  children: ReactNode;
}

const CustomButton = ({
  size = "regular",
  variant = "study",
  children,
  className,
  ...props
}: Props) => {
  return (
    <button
      className={clsx(
        "h-fit w-fit rounded   transition-all",
        size === "large" && "px-5 py-3",
        size === "regular" && "px-4 py-2",
        size === "small" && "px-2 py-2",
        variant === "study" &&
          "  bg-study text-white flex w-3/4	 items-center p-4 justify-center h-[56px] text-h24 font-normal ",
        variant === "study-unfilled" &&
          "  bg-white text-study  flex w-3/4	items-center p-4 justify-center h-[56px] text-h24 font-normal ",
        variant === "break" &&
          "  bg-break text-white flex w-3/4	items-center p-4 justify-center h-[56px] text-h24 font-normal ",
        variant === "break-unfilled" &&
          "  bg-white text-break  flex w-3/4	items-center p-4 justify-center h-[56px] text-h24 font-normal ",
        variant === "disabled" &&
          "  bg-inactiveGrey text-white flex w-3/4	items-center p-4 justify-center h-[56px] text-h24 font-normal "
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;
