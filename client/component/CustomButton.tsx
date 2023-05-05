/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from "clsx";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

type buttonVariant = "study" | "break" | "ghost" | "link";
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
        "h-fit w-fit rounded-lg text-xs font-medium transition-all",
        "disabled:cursor-not-allowed disabled:opacity-50",
        size === "large" && "px-5 py-3 text-base",
        size === "regular" && "px-4 py-2 text-sm",
        size === "small" && "px-2 py-2",
        variant === "study" &&
          "bg-brand-study text-white hover:bg-brand disabled:hover:bg-brand",
        variant === "break" &&
          "bg-brand-break text-white hover:bg-brand disabled:hover:bg-brand",
        variant === "ghost" &&
          "text-brand hover:bg-brand-light disabled:hover:bg-transparent",
        variant === "link" && "text-brand hover:underline disabled:no-underline"
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;
