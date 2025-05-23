import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Copy, X } from 'lucide-react';
import { toast } from "sonner";

export default function ArticleModal({ source, onClose }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(source.content);
    toast("Copied to clipboard", {
      description: "Article content has been copied to clipboard",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div 
        className="bg-background rounded-lg shadow-lg w-full max-w-3xl max-h-[80vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{source.title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-sm text-muted-foreground p-4 pb-0">
          {source.category} • Last updated: {source.lastUpdated}
        </div>

        <div className="p-4 prose dark:prose-invert max-w-none">
          {source.content.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="flex justify-end p-4 border-t">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <Copy className="h-4 w-4 mr-2" />
            Copy Content
          </Button>
        </div>
      </div>
    </div>
  );
}