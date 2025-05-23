import React, { useState, createContext, useContext } from "react";
import { cn } from "../../lib/utils";

const TabsContext = createContext(null);

const Tabs = ({ defaultValue, value, onValueChange, children, className, ...props }) => {
  const [selectedTab, setSelectedTab] = useState(value || defaultValue);

  const handleTabChange = (newValue) => {
    if (onValueChange) {
      onValueChange(newValue);
    } else {
      setSelectedTab(newValue);
    }
  };

  const currentValue = value !== undefined ? value : selectedTab;

  return (
    <TabsContext.Provider value={{ value: currentValue, onValueChange: handleTabChange }}>
      <div className={cn("", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

const TabsList = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        className
      )}
      {...props}
    />
  );
};

const TabsTrigger = ({ value, className, ...props }) => {
  const { value: selectedValue, onValueChange } = useContext(TabsContext);
  const isSelected = selectedValue === value;

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isSelected
          ? "bg-background text-foreground shadow-sm"
          : "hover:bg-background/50 hover:text-foreground",
        className
      )}
      onClick={() => onValueChange(value)}
      data-state={isSelected ? "active" : "inactive"}
      {...props}
    />
  );
};

const TabsContent = ({ value, className, ...props }) => {
  const { value: selectedValue } = useContext(TabsContext);
  const isSelected = selectedValue === value;

  if (!isSelected) return null;

  return (
    <div
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      data-state={isSelected ? "active" : "inactive"}
      {...props}
    />
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };