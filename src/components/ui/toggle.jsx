import React from "react";
import { cn } from "../../lib/utils";

const Toggle = React.forwardRef(
  ({ className, checked, onCheckedChange, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        role="switch"
        aria-checked={checked}
        data-state={checked ? "checked" : "unchecked"}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground ring-offset-background",
          className
        )}
        onClick={() => onCheckedChange && onCheckedChange(!checked)}
        {...props}
      />
    );
  }
);

Toggle.displayName = "Toggle";

export { Toggle };