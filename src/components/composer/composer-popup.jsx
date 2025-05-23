import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { X, Send, Save, Loader2 } from 'lucide-react';
import ToneAdjuster from "./tone-adjuster";
import FormattingToolbar from "./formatting-toolbar";
import { toast } from "sonner";
import { useConversation } from "../../contexts/conversation-context";

export default function ComposerPopup({ initialContent, onClose, onSend }) {
  const [content, setContent] = useState(initialContent);
  const [isAdjusting, setIsAdjusting] = useState(false);
  const { addNote } = useConversation();

  const handleToneAdjust = (newTone) => {
    setIsAdjusting(true);

    // Simulate tone adjustment with a delay
    setTimeout(() => {
      let adjustedContent = content;

      switch (newTone) {
        case "friendly":
          adjustedContent = makeMoreFriendly(content);
          break;
        case "formal":
          adjustedContent = makeMoreFormal(content);
          break;
        case "grammar":
          adjustedContent = fixGrammar(content);
          break;
        case "personal":
          adjustedContent = addPersonalTone(content);
          break;
      }

      setContent(adjustedContent);
      setIsAdjusting(false);
      
      toast("Tone adjusted", {
        description: `Content has been adjusted to a ${newTone} tone.`
      });
    }, 1500);
  };

  const handleAddToNotes = () => {
    addNote(content);
    toast("Added to notes", {
      description: "Response has been saved to your notes",
    });
    onClose();
  };

  const handleFormatting = (formatType) => {
    let newContent = content;
    const textarea = document.getElementById('composer-textarea');
    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;
    const selectedText = content.substring(selectionStart, selectionEnd);
    
    switch (formatType) {
      case 'bold':
        newContent = content.substring(0, selectionStart) + `**${selectedText}**` + content.substring(selectionEnd);
        break;
      case 'italic':
        newContent = content.substring(0, selectionStart) + `*${selectedText}*` + content.substring(selectionEnd);
        break;
      case 'bullet':
        newContent = content.substring(0, selectionStart) + `\n- ${selectedText}` + content.substring(selectionEnd);
        break;
      case 'numbered':
        newContent = content.substring(0, selectionStart) + `\n1. ${selectedText}` + content.substring(selectionEnd);
        break;
      case 'heading':
        newContent = content.substring(0, selectionStart) + `\n## ${selectedText}` + content.substring(selectionEnd);
        break;
      case 'quote':
        newContent = content.substring(0, selectionStart) + `\n> ${selectedText}` + content.substring(selectionEnd);
        break;
      default:
        break;
    }
    
    setContent(newContent);
  };

  // Tone adjustment functions (simplified for demo)
  const makeMoreFriendly = (text) => {
    return (
      text
        .replace(/Hello/g, "Hi there")
        .replace(/Thank you/g, "Thanks so much")
        .replace(/Please/g, "Please feel free to")
        .replace(/\./g, "! ")
        .replace(/Unfortunately/g, "I understand your concern, however") +
      "\n\nIs there anything else I can help you with today? 😊"
    );
  };

  const makeMoreFormal = (text) => {
    return text
      .replace(/Hi/g, "Hello")
      .replace(/Thanks/g, "Thank you")
      .replace(/Yeah/g, "Yes")
      .replace(/!/g, ".")
      .replace(/\bI think\b/g, "I believe")
      .replace(/\bget\b/g, "receive")
      .replace(/\bhelp you\b/g, "assist you");
  };

  const fixGrammar = (text) => {
    return text
      .replace(/\bi\b/g, "I")
      .replace(/\s{2,}/g, " ")
      .replace(/\b(cant|can't)\b/g, "cannot")
      .replace(/\b(dont|don't)\b/g, "do not")
      .replace(/\b(wont|won't)\b/g, "will not");
  };

  const addPersonalTone = (text) => {
    return (
      "Based on my experience, " +
      text
        .replace(/We/g, "I")
        .replace(/Our/g, "My")
        .replace(/The company/g, "We") +
      "\n\nI hope this helps!"
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        className="bg-background rounded-lg shadow-lg w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Message Composer</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4 border-b">
          <ToneAdjuster onAdjust={handleToneAdjust} disabled={isAdjusting} />
        </div>
        
        <div className="p-4 border-b">
          <FormattingToolbar onFormat={handleFormatting} disabled={isAdjusting} />
        </div>

        <div className="flex-1 p-4 overflow-auto">
          {isAdjusting ? (
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Adjusting tone...</p>
            </div>
          ) : (
            <Textarea
              id="composer-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[300px] resize-none w-full"
              placeholder="Compose your message here..."
            />
          )}
        </div>

        <div className="p-4 border-t flex justify-between">
          <Button variant="outline" onClick={handleAddToNotes} disabled={isAdjusting}>
            <Save className="h-4 w-4 mr-2" />
            Add to Notes
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} disabled={isAdjusting}>
              Cancel
            </Button>
            <Button onClick={() => onSend(content)} disabled={!content.trim() || isAdjusting}>
              <Send className="h-4 w-4 mr-2" />
              Send to Copilot
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}