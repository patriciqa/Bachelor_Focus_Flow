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
        " rounded w-[80vw] flex items-center p-4  h-[56px] justify-center text-h24 font-regular  ",
        variant === "study" && "  bg-study text-white ",
        variant === "study-unfilled" && "  bg-white text-study font-light  ",
        variant === "break" && "  bg-break text-white ",
        variant === "dark" && "  bg-dark text-white   ",
        variant === "break-unfilled" && "  bg-white text-break font-light ",
        variant === "disabled" && "  bg-inactiveGrey text-white "
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;
