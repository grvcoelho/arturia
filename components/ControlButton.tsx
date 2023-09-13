import React, { useState } from "react";
import { cn } from "@/lib/styling";

interface ControlButtonProps {
  children: React.ReactNode;
  active?: boolean;
  variant?: "default" | "shift";
  onClick?: () => void;
}

export const ControlButton: React.FC<ControlButtonProps> = ({
  children,
  active,
  variant,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "control-button",
        "flex h-[14px] w-[24px] cursor-pointer flex-col justify-center rounded-[1.5px] transition-all ease-in-out active:translate-y-[1px] active:shadow-none",
        variant === "default" && "bg-neutral-100 shadow-sm",
        variant === "shift" &&
          "bg-neutral-800 ring-[1.5px] ring-inset ring-white",
        active && "active",
      )}
    >
      <span
        className={cn(
          "text-center font-mono text-[4px]",
          variant === "default" && "text-neutral-800",
          variant === "shift" && "text-white",
        )}
      >
        {children}
      </span>
    </div>
  );
};

ControlButton.defaultProps = {
  active: false,
  variant: "default",
};
