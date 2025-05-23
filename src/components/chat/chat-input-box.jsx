/*"use client"

import { useState, useEffect } from "react"
import { Send, Zap, Paperclip, Mic } from "lucide-react"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { generateSuggestedPrompts } from "../../lib/dummy-data"
import { motion } from "framer-motion"

export default function ChatInputBox({ onSendMessage }) {
  const [message, setMessage] = useState("")
  const [suggestedPrompts, setSuggestedPrompts] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isRecording, setIsRecording] = useState(false)

  useEffect(() => {
    // Show suggestions when the input is empty
    if (message === "") {
      const randomPrompts = generateSuggestedPrompts("general")
      setSuggestedPrompts(randomPrompts)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }, [message])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage("")
    }
  }

  const handleSuggestedPrompt = (prompt) => {
    onSendMessage(prompt)
    setShowSuggestions(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (message.trim()) {
        onSendMessage(message)
        setMessage("")
      }
    }
  }

  const simulateVoiceRecording = () => {
    setIsRecording(true)

    // Simulate voice recording for 3 seconds
    setTimeout(() => {
      setIsRecording(false)
      setMessage("This is a simulated voice message transcription.")
    }, 3000)
  }

  return (
    <div className="w-full">
      {showSuggestions && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 flex flex-wrap gap-2"
        >
          {suggestedPrompts.map((prompt, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => handleSuggestedPrompt(prompt)}
            >
              <Zap className="h-3 w-3 mr-1 text-primary" />
              {prompt.length > 40 ? prompt.substring(0, 40) + "..." : prompt}
            </Button>
          ))}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="flex-1 flex items-end gap-2">
        <Button type="button" variant="ghost" size="icon" className="flex-shrink-0" title="Attach files">
          <Paperclip className="h-4 w-4" />
        </Button>

        <div className="flex-1 relative">
          <Textarea
            placeholder={isRecording ? "Listening..." : "Ask Copilot a question..."}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`min-h-[80px] resize-none pr-10 ${isRecording ? "bg-red-50 dark:bg-red-900/20" : ""}`}
            onKeyDown={handleKeyDown}
            disabled={isRecording}
          />
          {isRecording && <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-red-500 animate-pulse" />}
        </div>

        {message.trim() ? (
          <Button type="submit" size="icon" disabled={!message.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={simulateVoiceRecording}
            className={isRecording ? "bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-300" : ""}
          >
            <Mic className="h-4 w-4" />
          </Button>
        )}
      </form>
    </div>
  )
}
*/

"use client"

import { useState, useEffect } from "react"
import { Send, Zap, Paperclip, Mic } from "lucide-react"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { generateSuggestedPrompts } from "../../lib/dummy-data"
import { motion } from "framer-motion"

export default function ChatInputBox({ onSendMessage }) {
  const [message, setMessage] = useState("")
  const [suggestedPrompts, setSuggestedPrompts] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    // Show suggestions when the input is empty
    if (message === "") {
      const randomPrompts = generateSuggestedPrompts("general")
      // Limit number of suggestions on mobile
      const limitedPrompts = isMobile ? randomPrompts.slice(0, 2) : randomPrompts
      setSuggestedPrompts(limitedPrompts)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }, [message, isMobile])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage("")
    }
  }

  const handleSuggestedPrompt = (prompt) => {
    onSendMessage(prompt)
    setShowSuggestions(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (message.trim()) {
        onSendMessage(message)
        setMessage("")
      }
    }
  }

  const simulateVoiceRecording = () => {
    setIsRecording(true)

    // Simulate voice recording for 3 seconds
    setTimeout(() => {
      setIsRecording(false)
      setMessage("This is a simulated voice message transcription.")
    }, 3000)
  }

  return (
    <div className="w-full">
      {showSuggestions && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2 md:mb-3 flex flex-wrap gap-1 md:gap-2"
        >
          {suggestedPrompts.map((prompt, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs py-1 h-7"
              onClick={() => handleSuggestedPrompt(prompt)}
            >
              <Zap className="h-3 w-3 mr-1 text-primary" />
              {prompt.length > (isMobile ? 20 : 40) ? prompt.substring(0, isMobile ? 20 : 40) + "..." : prompt}
            </Button>
          ))}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="flex-1 flex items-end gap-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="flex-shrink-0 h-8 w-8 md:h-10 md:w-10"
          title="Attach files"
        >
          <Paperclip className="h-4 w-4" />
        </Button>

        <div className="flex-1 relative">
          <Textarea
            placeholder={isRecording ? "Listening..." : "Ask Copilot a question..."}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`min-h-[60px] md:min-h-[80px] resize-none pr-10 text-sm md:text-base ${isRecording ? "bg-red-50 dark:bg-red-900/20" : ""}`}
            onKeyDown={handleKeyDown}
            disabled={isRecording}
          />
          {isRecording && <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-red-500 animate-pulse" />}
        </div>

        {message.trim() ? (
          <Button type="submit" size="sm" className="h-8 w-8 md:h-10 md:w-10" disabled={!message.trim()}>
            <Send size ="sm" className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={simulateVoiceRecording}
            className={`h-8 w-8 md:h-10 md:w-10 ${isRecording ? "bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-300" : ""}`}
          >
            <Mic size ="sm" className="h-4 w-4" />
          </Button>
        )}
      </form>
    </div>
  )
}
