import React, { useState } from "react";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import ArticleModal from "./article-modal";

export default function SourceList({ sources }) {
  const [showAll, setShowAll] = useState(false);
  const [selectedSource, setSelectedSource] = useState(null);

  const displayedSources = showAll ? sources : sources.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-muted/50 rounded-lg p-4 max-w-2xl"
    >
      <div className="flex items-center gap-2 mb-3">
        <FileText className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Found {sources.length} relevant sources</h3>
      </div>

      <ul className="space-y-2">
        {displayedSources.map((source, index) => (
          <motion.li
            key={source.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2"
          >
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium">
              {index + 1}
            </span>
            <Button
              variant="ghost"
              className="text-left justify-start h-auto py-2 font-normal hover:bg-primary/5"
              onClick={() => setSelectedSource(source)}
            >
              {source.title}
            </Button>
          </motion.li>
        ))}
      </ul>

      {sources.length > 5 && (
        <Button variant="ghost" size="sm" className="mt-2" onClick={() => setShowAll(!showAll)}>
          {showAll ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              See All ({sources.length})
            </>
          )}
        </Button>
      )}

      <AnimatePresence>
        {selectedSource && <ArticleModal source={selectedSource} onClose={() => setSelectedSource(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}