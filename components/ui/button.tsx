import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "destructive" | "outline";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex h-9 items-center justify-center border px-4 text-[13px] font-bold transition-colors disabled:pointer-events-none disabled:opacity-50",
          variant === "default" &&
            "border-[#2968af] bg-gradient-to-b from-[#3d85d7] to-[#2369bb] text-white hover:from-[#498fdd] hover:to-[#2d74c6]",
          variant === "secondary" &&
            "border-[#6f9ccc] bg-gradient-to-b from-[#f8fbff] to-[#d8e7f8] text-[#1b4f95] hover:from-white hover:to-[#e1edfa]",
          variant === "destructive" &&
            "border-[#a74242] bg-gradient-to-b from-[#de7171] to-[#c55050] text-white hover:from-[#e17c7c] hover:to-[#ce5b5b]",
          variant === "outline" && "border-[#9fb8d4] bg-white text-[#1b4f95] hover:bg-[#eef4fb]",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
