"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

// Custom props for our enhanced switch
interface CustomSwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  variant?: "default" | "success" | "danger" | "warning" | "info";
  size?: "sm" | "md" | "lg";
  label?: string;
  labelPosition?: "left" | "right";
  icon?: React.ReactNode;
}

const CustomSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  CustomSwitchProps
>(
  (
    {
      className,
      variant = "default",
      size = "md",
      label,
      labelPosition = "right",
      icon,
      ...props
    },
    ref
  ) => {
    // Define variant styles
    const variantStyles = {
      default: "data-[state=checked]:bg-primary",
      success: "data-[state=checked]:bg-green-500",
      danger: "data-[state=checked]:bg-red-500",
      warning: "data-[state=checked]:bg-yellow-500",
      info: "data-[state=checked]:bg-blue-500",
    };

    // Define size styles
    const sizeStyles = {
      sm: {
        switch: "h-5 w-9",
        thumb: "h-3.5 w-3.5",
      },
      md: {
        switch: "h-6 w-11",
        thumb: "h-5 w-5",
      },
      lg: {
        switch: "h-7 w-14",
        thumb: "h-6 w-6",
      },
    };

    const switchComponent = (
      <SwitchPrimitives.Root
        className={cn(
          "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-input",
          sizeStyles[size].switch,
          variantStyles[variant],
          className
        )}
        {...props}
        ref={ref}
      >
        <SwitchPrimitives.Thumb
          className={cn(
            "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-full data-[state=unchecked]:translate-x-0",
            sizeStyles[size].thumb
          )}
        >
          {icon && (
            <div className="flex h-full w-full items-center justify-center">
              {icon}
            </div>
          )}
        </SwitchPrimitives.Thumb>
      </SwitchPrimitives.Root>
    );

    // If no label, just return the switch
    if (!label) {
      return switchComponent;
    }

    // Return switch with label
    return (
      <div className="flex items-center gap-2">
        {labelPosition === "left" && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        {switchComponent}
        {labelPosition === "right" && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
      </div>
    );
  }
);

CustomSwitch.displayName = "CustomSwitch";

export { CustomSwitch };
