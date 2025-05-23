import React from "react";
import { Button } from "../ui/button";
import { Smile, BookText, CheckCircle, User } from 'lucide-react';

export default function ToneAdjuster({ onAdjust, disabled }) {
  const toneOptions = [
    { id: "friendly", label: "More Friendly", icon: Smile },
    { id: "formal", label: "More Formal", icon: BookText },
    { id: "grammar", label: "Fix Grammar", icon: CheckCircle },
    { id: "personal", label: "My Tone of Voice", icon: User },
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Adjust Tone:</h3>
      <div className="flex flex-wrap gap-2">
        {toneOptions.map((option) => {
          const Icon = option.icon;
          return (
            <Button
              key={option.id}
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => onAdjust(option.id)}
              disabled={disabled}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{option.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}