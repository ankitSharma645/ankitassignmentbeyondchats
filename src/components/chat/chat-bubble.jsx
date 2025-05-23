"use client"

import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { Copy, MessageSquarePlus, Pin, Play, Volume2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { useConversation } from "../../contexts/conversation-context"
import { aiPersonalities } from "../../lib/ai-personalities"

export default function ChatBubble({ message, onAddToComposer, personality = "friendly", showReactions = true }) {
  const { pinMessage } = useConversation()
  const [isPlaying, setIsPlaying] = useState(false)
  const [showFullContent, setShowFullContent] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Add resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize() // Initialize on mount
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const isAi = message.sender === "ai"
  const isUser = message.sender === "user"
  const selectedPersonality = aiPersonalities.find((p) => p.id === personality) || aiPersonalities[0]

  // Custom styling for better readability in dark mode
const getMessageStyle = () => {
  if (isAi) {
    return "bg-gray-100 text-gray-900 border border-gray-200 dark:bg-slate-800 dark:text-white dark:border-slate-700"
  } else if (message.isFollowUp) {
    return "bg-blue-100 text-blue-900 dark:bg-blue-900/50 dark:text-blue-100 dark:border-blue-800"
  } else {
    // Bright blue for user messages in dark mode for better visibility
    return "bg-primary text-primary-foreground dark:bg-blue-600 dark:text-white"
  }
}

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    toast("Copied to clipboard", {
      description: "Message content has been copied to clipboard",
    })
  }

  const handlePin = () => {
    pinMessage(message)
    toast("Message pinned", {
      description: "Message has been pinned for quick access",
    })
  }

  const handlePlayVoice = () => {
    setIsPlaying(true)

    // Use the Web Speech API directly
    const utterance = new SpeechSynthesisUtterance(message.content)
    utterance.rate = 1.0
    utterance.pitch = 1.0

    utterance.onend = () => {
      setIsPlaying(false)
    }

    window.speechSynthesis.speak(utterance)
  }

  const handleStopVoice = () => {
    window.speechSynthesis.cancel()
    setIsPlaying(false)
  }

  // Adjust content length threshold for mobile
  const contentLengthThreshold = isMobile ? 150 : 300
  const contentLength = message.content.length
  const isLongContent = contentLength > contentLengthThreshold
  const displayContent =
    showFullContent || !isLongContent ? message.content : `${message.content.substring(0, contentLengthThreshold)}...`

  // Determine which buttons to show on mobile
  const renderMobileButtons = () => {
    if (!isAi) {
      // For user messages on mobile, just show copy
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="text-xs py-1 h-7 md:h-8 dark:text-white dark:hover:bg-slate-700"
        >
          <Copy className="h-3 w-3" />
        </Button>
      )
    }

    // For AI messages on mobile, show all buttons in a more compact layout
    return (
      <>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAddToComposer(message.content)}
          className="text-xs py-1 h-7 md:h-8 dark:bg-slate-700 dark:text-white dark:border-slate-600 dark:hover:bg-slate-600"
        >
          <MessageSquarePlus className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="text-xs py-1 h-7 md:h-8 dark:text-white dark:hover:bg-slate-700"
        >
          <Copy className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePin}
          className="text-xs py-1 h-7 md:h-8 dark:text-white dark:hover:bg-slate-700"
        >
          <Pin className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={isPlaying ? handleStopVoice : handlePlayVoice}
          className="text-xs py-1 h-7 md:h-8 dark:text-white dark:hover:bg-slate-700"
        >
          {isPlaying ? <Volume2 className="h-3 w-3 animate-pulse" /> : <Play className="h-3 w-3" />}
        </Button>
      </>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isAi ? "justify-start" : "justify-end"} mb-4 md:mb-6 px-1 md:px-0`}
    >
      <div
        className={`max-w-full md:max-w-3xl rounded-lg p-3 md:p-4 shadow-sm ${getMessageStyle()}`}
        style={{
          boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
          width: isMobile ? "auto" : "auto", // Allow natural width on mobile
          minWidth: isMobile ? "75%" : "200px", // Wider on mobile for better readability
        }}
      >
        <div className="flex items-center gap-2 mb-1 md:mb-2">
          <div className="font-semibold flex items-center gap-1">
            {isAi && <span className="text-lg">{selectedPersonality.avatar}</span>}
            <span style={{ color: isUser ? "inherit" : "inherit" }}>{isAi ? "AI Copilot" : "You"}</span>
          </div>
          <div className="text-xs opacity-75 dark:opacity-90 dark:text-gray-300">
            {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
          </div>
        </div>

        <div
          className="whitespace-pre-wrap font-normal text-sm md:text-base"
          style={{
            color: isUser ? "inherit" : "inherit",
            wordBreak: "break-word",
          }}
        >
          {displayContent}
        </div>

        {isLongContent && (
          <button
            onClick={() => setShowFullContent(!showFullContent)}
            className="text-xs mt-2 hover:underline"
            style={{ color: isUser ? "#60a5fa" : "#60a5fa" }}
          >
            {showFullContent ? "Show less" : "Read more"}
          </button>
        )}

        {message.sources && message.sources.length > 0 && (
          <div className="mt-2 text-xs opacity-75 dark:opacity-90 dark:text-gray-300">
            Based on:{" "}
            {message.sources
              .slice(0, 2)
              .map((s) => s.title)
              .join(", ")}
            {message.sources.length > 2 && ` and ${message.sources.length - 2} more sources`}
          </div>
        )}

        {/* Always show buttons, but with different layouts for mobile vs desktop */}
        <div className="mt-2 md:mt-3 flex flex-wrap gap-1 md:gap-2">
          {isMobile
            ? // Mobile-optimized buttons
              renderMobileButtons()
            : // Desktop buttons (show all when showReactions is true)
              showReactions && (
                <>
                  {isAi && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onAddToComposer(message.content)}
                      className="text-xs py-1 h-7 md:h-8 dark:bg-slate-700 dark:text-white dark:border-slate-600 dark:hover:bg-slate-600"
                    >
                      <MessageSquarePlus className="h-3 w-3 mr-1" />
                      <span className="hidden md:inline">Add to Composer</span>
                      <span className="md:hidden">Add</span>
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="text-xs py-1 h-7 md:h-8 dark:text-white dark:hover:bg-slate-700"
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    <span className="hidden md:inline">Copy</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePin}
                    className="text-xs py-1 h-7 md:h-8 dark:text-white dark:hover:bg-slate-700"
                  >
                    <Pin className="h-3 w-3 mr-1" />
                    <span className="hidden md:inline">Pin</span>
                  </Button>
                  {isAi && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={isPlaying ? handleStopVoice : handlePlayVoice}
                      className="text-xs py-1 h-7 md:h-8 dark:text-white dark:hover:bg-slate-700"
                    >
                      {isPlaying ? (
                        <>
                          <Volume2 className="h-3 w-3 mr-1 animate-pulse" />
                          <span className="hidden md:inline">Stop</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-3 w-3 mr-1" />
                          <span className="hidden md:inline">Listen</span>
                        </>
                      )}
                    </Button>
                  )}
                </>
              )}
        </div>
      </div>
    </motion.div>
  )
}
