/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from "clsx";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

export type buttonVariant =
  | "study"
  | "break"
  | "disabled"
  | "study-unfilled"
  | "break-unfilled"
  | "dark";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: buttonVariant;
  children: ReactNode;
}

const CustomButton = ({
  variant = "study",
  children,
  className,
  ...props
}: Props) => {
  return (
    <button
      disabled={variant === "disabled" ? true : false}
      className={clsx(
        "h-fit w-fit rounded   transition-all",
        variant === "study" &&
          "  bg-study text-white flex w-3/4	 items-center p-4 justify-center h-[56px] text-h24 font-normal ",
        variant === "study-unfilled" &&
          "  bg-white text-study  flex w-3/4	items-center p-4 justify-center h-[56px] text-h24 font-normal ",
        variant === "break" &&
          "  bg-break text-white flex w-3/4	items-center p-4 justify-center h-[56px] text-h24 font-normal ",
        variant === "dark" &&
          "  bg-dark text-white flex w-[80vw]	items-center p-4 justify-center h-[56px] text-h24 font-normal ",
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
