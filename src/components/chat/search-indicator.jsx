import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from 'lucide-react';

export default function SearchIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 p-4 rounded-lg bg-muted max-w-md"
    >
      <Loader2 className="h-5 w-5 animate-spin text-primary" />
      <div>
        <p className="font-medium">Searching for relevant sources...</p>
        <p className="text-sm text-muted-foreground">This may take a moment</p>
      </div>
    </motion.div>
  );
}