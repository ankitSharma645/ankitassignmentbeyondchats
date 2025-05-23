import React from "react";
import { Button } from "../ui/button";
import { Bold, Italic, List, ListOrdered, Heading2, Quote } from 'lucide-react';

export default function FormattingToolbar({ onFormat, disabled }) {
  const formatOptions = [
    { id: "bold", label: "Bold", icon: Bold },
    { id: "italic", label: "Italic", icon: Italic },
    { id: "bullet", label: "Bullet List", icon: List },
    { id: "numbered", label: "Numbered List", icon: ListOrdered },
    { id: "heading", label: "Heading", icon: Heading2 },
    { id: "quote", label: "Quote", icon: Quote },
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Formatting:</h3>
      <div className="flex flex-wrap gap-2">
        {formatOptions.map((option) => {
          const Icon = option.icon;
          return (
            <Button
              key={option.id}
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => onFormat(option.id)}
              disabled={disabled}
              title={option.label}
            >
              <Icon className="h-3.5 w-3.5" />
            </Button>
          );
        })}
      </div>
    </div>
  );
}