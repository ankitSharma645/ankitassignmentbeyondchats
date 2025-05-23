"use client"
import { useState, useRef, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import ChatInputBox from "./chat-input-box"
import ChatBubble from "./chat-bubble"
import SearchIndicator from "./search-indicator"
import { X } from "lucide-react"
import SourceList from "./source-list"
import ComposerPopup from "../composer/composer-popup"
import NotesPanel from "../notes/notes-panel"
import ConversationReplay from "./conversation-replay"
import MagicPrompt from "./magic-prompt"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { generateDummySources, generateDummyResponse, generateAnalytics } from "../../lib/dummy-data"
import { useConversation } from "../../contexts/conversation-context"
import { Sparkles, StickyNote, BarChart3, Palette } from "lucide-react"
import { aiPersonalities } from "../../lib/ai-personalities"
import { Dropdown, DropdownItem } from "../ui/dropdown"

export default function ChatInterface() {
  const {
    activeConversation,
    createNewConversation,
    addMessageToConversation,
    getCurrentConversation,
    getActiveConversationMessages,
    notes,
  } = useConversation()

  const [isSearching, setIsSearching] = useState(false)
  const [sources, setSources] = useState([])
  const [showComposer, setShowComposer] = useState(false)
  const [composerContent, setComposerContent] = useState("")
  const [showNotes, setShowNotes] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showReplay, setShowReplay] = useState(false)
  const [showMagicPrompt, setShowMagicPrompt] = useState(false)
  const [personality, setPersonality] = useState("friendly")
  const [analytics, setAnalytics] = useState(null)
  const [lastUserMessage, setLastUserMessage] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const [displayMessages, setDisplayMessages] = useState([])

  const messagesEndRef = useRef(null)
  const chatContainerRef = useRef(null)
  const conversation = getCurrentConversation()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (activeConversation) {
      const messages = getActiveConversationMessages() || []
      setDisplayMessages([...messages])
    } else {
      setDisplayMessages([])
    }
  }, [activeConversation, getActiveConversationMessages])

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [displayMessages, isSearching])

  useEffect(() => {
    if (!activeConversation) {
      createNewConversation()
    }
  }, [activeConversation, createNewConversation])

  const handleSendMessage = async (message) => {
    setLastUserMessage(message)

    const userMessage = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    }

    if (!activeConversation) {
      const newConvId = createNewConversation()
      addMessageToConversation(newConvId, userMessage)
      setDisplayMessages((prev) => [...prev, userMessage])

      setIsSearching(true)
      setSources([])

      setTimeout(() => {
        const newSources = generateDummySources(message)
        setSources(newSources)

        setTimeout(() => {
          // FIXED: Get selected personality first
          const selectedPersonality = aiPersonalities.find((p) => p.id === personality) || aiPersonalities[0]
          const aiResponse = generateDummyResponse(message, newSources, false, selectedPersonality.name)
          
          const aiMessage = {
            id: Date.now().toString(),
            content: aiResponse,
            sender: "ai",
            timestamp: new Date(),
            sources: newSources,
          }

          addMessageToConversation(newConvId, aiMessage)
          setDisplayMessages((prev) => [...prev, aiMessage])
          setIsSearching(false)
          setAnalytics(generateAnalytics(newConvId))
        }, 1500)
      }, 2000)
      return
    }

    addMessageToConversation(activeConversation, userMessage)
    setDisplayMessages((prev) => [...prev, userMessage])

    setIsSearching(true)
    setSources([])

    setTimeout(() => {
      const newSources = generateDummySources(message)
      setSources(newSources)

      setTimeout(() => {
        // FIXED: Get selected personality first
        const selectedPersonality = aiPersonalities.find((p) => p.id === personality) || aiPersonalities[0]
        const aiResponse = generateDummyResponse(message, newSources, false, selectedPersonality.name)
        
        const aiMessage = {
          id: Date.now().toString(),
          content: aiResponse,
          sender: "ai",
          timestamp: new Date(),
          sources: newSources,
        }

        addMessageToConversation(activeConversation, aiMessage)
        setDisplayMessages((prev) => [...prev, aiMessage])
        setIsSearching(false)
        setAnalytics(generateAnalytics(activeConversation))
      }, 1500)
    }, 2000)
  }

  // ... rest of the file remains unchanged ...


  const handleAddToComposer = (content) => {
    setComposerContent(content)
    setShowComposer(true)
    toast("Added to composer", {
      description: "You can now edit and customize this response",
    })
  }

  const handleSendFromComposer = (content) => {
    setShowComposer(false)

    // Simulate sending the modified content back to AI
    const userMessage = {
      id: Date.now().toString(),
      content: content,
      sender: "user",
      timestamp: new Date(),
      isFollowUp: true,
    }

    // Add to conversation context
    addMessageToConversation(activeConversation, userMessage)

    // Update display messages immediately
    setDisplayMessages((prev) => [...prev, userMessage])

    // Simulate AI processing the follow-up
    setIsSearching(true)

    setTimeout(() => {
      const newSources = generateDummySources(content, true)
      setSources(newSources)

      setTimeout(() => {
        const aiResponse = generateDummyResponse(content, newSources, true, personality)
        const aiMessage = {
          id: Date.now().toString(),
          content: aiResponse,
          sender: "ai",
          timestamp: new Date(),
          sources: newSources,
        }

        // Add to conversation context
        addMessageToConversation(activeConversation, aiMessage)

        // Update display messages
        setDisplayMessages((prev) => [...prev, aiMessage])

        setIsSearching(false)

        // Update analytics
        setAnalytics(generateAnalytics(activeConversation))
      }, 1500)
    }, 2000)
  }

  const handleMagicPromptSelect = (prompt) => {
    setShowMagicPrompt(false)
    handleSendMessage(prompt)
  }

  // Close notes panel on mobile when clicking outside
  const handleNotesOverlayClick = () => {
    if (isMobile && showNotes) {
      setShowNotes(false)
    }
  }

  return (
    <div className="flex h-screen ">
      <div className="flex-1 flex flex-col h-full">
        {/* Secondary header with tools - positioned below the main navbar */}
        <div className="bg-primary/10 p-2 md:p-4 border-b flex flex-col md:flex-row justify-between items-start md:items-center mt-16 z-30 dark:bg-gray-800 dark:border-gray-700">
          <div>
            <h1 className="text-lg md:text-xl font-bold">{conversation?.title || "New Conversation"}</h1>
            <p className="text-xs md:text-sm text-muted-foreground">Your assistant for customer support</p>
          </div>

          <div className="flex gap-2 mt-2 md:mt-0 w-full md:w-auto justify-end">
            <Dropdown
              trigger={
                <Button variant="outline" size="sm" className="text-xs">
                  <Palette className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                  <span className="hidden md:inline">AI Personality</span>
                  <span className="md:hidden">AI</span>
                </Button>
              }
              align="right"
              contentClassName="w-56"
            >
              <div className="p-2 space-y-1">
                {aiPersonalities.map((p) => (
                  <DropdownItem
                    key={p.id}
                    className={`flex items-center ${personality === p.id ? "bg-accent text-accent-foreground" : ""}`}
                    onClick={() => setPersonality(p.id)}
                  >
                    <span className="mr-2 text-lg">{p.avatar}</span>
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-muted-foreground">{p.description}</div>
                    </div>
                  </DropdownItem>
                ))}
              </div>
            </Dropdown>

            <Button variant="outline" size="sm" className="text-xs" onClick={() => setShowMagicPrompt(true)}>
              <Sparkles className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Magic Prompts</span>
              <span className="md:hidden">Prompts</span>
            </Button>
          </div>
        </div>

        {/* Main content area with proper spacing */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-2 md:p-4 scroll-smooth"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            paddingBottom: "80px", // Extra padding at bottom
            height: "calc(100vh - 16rem)", // Ensure there's enough height for scrolling
          }}
        >
          {showReplay ? (
            <ConversationReplay
              messages={displayMessages}
              onFinish={() => setShowReplay(false)}
              personality={personality}
            />
          ) : (
            <>
              {/* Display messages from current conversation */}
              {displayMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-4 text-muted-foreground mt-8">
                  <p className="text-lg font-medium">Start a new conversation</p>
                  <p className="text-sm mt-2">Ask a question or use the magic prompts to get started</p>
                </div>
              ) : (
                displayMessages.map((message, index) => (
                  <ChatBubble
                    key={message.id || index}
                    message={message}
                    onAddToComposer={handleAddToComposer}
                    personality={personality}
                    showReactions={true} // Always show reactions, the component will handle mobile display
                  />
                ))
              )}

              {isSearching && <SearchIndicator />}

              {sources.length > 0 && !isSearching && <SourceList sources={sources} />}

              {showAnalytics && analytics && (
                <div className="bg-muted/50 rounded-lg p-3 md:p-4 max-w-2xl mb-4 md:mb-6 dark:bg-gray-800">
                  <div className="flex items-center justify-between mb-2 md:mb-3">
                    <h3 className="font-semibold flex items-center text-sm md:text-base">
                      <BarChart3 className="h-4 w-4 md:h-5 md:w-5 text-primary mr-1 md:mr-2" />
                      Conversation Analytics
                    </h3>
                    <Button variant="ghost" size="sm" onClick={() => setShowAnalytics(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 md:gap-4">
                    <div className="bg-background p-2 md:p-3 rounded-md dark:bg-gray-700">
                      <div className="text-xs text-muted-foreground">Response Time</div>
                      <div className="text-sm md:text-lg font-medium">{analytics.responseTime}ms</div>
                    </div>
                    <div className="bg-background p-2 md:p-3 rounded-md dark:bg-gray-700">
                      <div className="text-xs text-muted-foreground">Confidence Score</div>
                      <div className="text-sm md:text-lg font-medium">{analytics.confidenceScore}%</div>
                    </div>
                    <div className="bg-background p-2 md:p-3 rounded-md dark:bg-gray-700">
                      <div className="text-xs text-muted-foreground">Sources Used</div>
                      <div className="text-sm md:text-lg font-medium">{analytics.sourcesUsed}</div>
                    </div>
                    <div className="bg-background p-2 md:p-3 rounded-md dark:bg-gray-700">
                      <div className="text-xs text-muted-foreground">Word Count</div>
                      <div className="text-sm md:text-lg font-medium">{analytics.wordCount}</div>
                    </div>
                    <div className="bg-background p-2 md:p-3 rounded-md dark:bg-gray-700">
                      <div className="text-xs text-muted-foreground">Topic Relevance</div>
                      <div className="text-sm md:text-lg font-medium">{analytics.topicRelevance}%</div>
                    </div>
                    <div className="bg-background p-2 md:p-3 rounded-md dark:bg-gray-700">
                      <div className="text-xs text-muted-foreground">Sentiment Score</div>
                      <div className="text-sm md:text-lg font-medium">{analytics.sentimentScore}%</div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat input area with proper spacing */}
        <div className="p-2 md:p-4 border-t bg-background relative dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-end gap-2">
            <ChatInputBox onSendMessage={handleSendMessage} />

            {/* Show Notes button integrated into the chat input area */}
            <Button
              variant="outline"
              size="sm"
              className="h-[60px] md:h-[80px] flex-shrink-0 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
              onClick={() => setShowNotes(!showNotes)}
            >
              {showNotes ? (
                <>
                  <X className="h-4 w-4 mr-0 md:mr-2" />
                  <span className="hidden md:inline">Hide Notes</span>
                </>
              ) : (
                <>
                  <StickyNote className="h-4 w-4 mr-0 md:mr-2" />
                  <span className="hidden md:inline">Show Notes</span>
                  <span className="md:hidden">{notes.length}</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Notes panel with overlay for mobile */}
      {showNotes && (
        <>
          {isMobile && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={handleNotesOverlayClick} />}
          <div
            className={`${isMobile ? "fixed right-0 top-0 bottom-0 w-[85%] max-w-[300px] z-50" : "w-80"} border-l bg-background overflow-auto ${isMobile ? "pt-4" : "pt-16"} dark:bg-gray-800 dark:border-gray-700`}
          >
            <NotesPanel onClose={() => setShowNotes(false)} />
          </div>
        </>
      )}

      <AnimatePresence>
        {showComposer && (
          <ComposerPopup
            initialContent={composerContent}
            onClose={() => setShowComposer(false)}
            onSend={handleSendFromComposer}
          />
        )}

        {showMagicPrompt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <MagicPrompt onSelectPrompt={handleMagicPromptSelect} onClose={() => setShowMagicPrompt(false)} />
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

