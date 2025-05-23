import React, { useState, useRef, useEffect } from "react";
import { cn } from "../../lib/utils";
import { ChevronDown } from 'lucide-react';

const Dropdown = ({ 
  trigger, 
  children, 
  align = "left", 
  className,
  contentClassName,
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const alignmentClasses = {
    left: "left-0",
    right: "right-0",
    center: "left-1/2 -translate-x-1/2"
  };

  return (
    <div ref={dropdownRef} className={cn("relative inline-block", className)} {...props}>
      <div onClick={toggleDropdown} className="cursor-pointer">
        {trigger}
      </div>
      {isOpen && (
        <div 
          className={cn(
            "absolute z-10 mt-2 min-w-[10rem] rounded-md bg-background border shadow-lg",
            alignmentClasses[align],
            contentClassName
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

const DropdownItem = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer",
        className
      )}
      {...props}
    />
  );
};

const DropdownSeparator = ({ className, ...props }) => {
  return <div className={cn("h-px my-1 bg-border", className)} {...props} />;
};

const DropdownLabel = ({ className, ...props }) => {
  return (
    <div
      className={cn("px-4 py-2 text-xs font-medium text-muted-foreground", className)}
      {...props}
    />
  );
};

export { Dropdown, DropdownItem, DropdownSeparator, DropdownLabel };