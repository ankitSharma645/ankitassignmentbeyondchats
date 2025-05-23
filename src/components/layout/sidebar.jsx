"use client"

import { useState, useEffect, useRef } from "react"
import { useConversation } from "../../contexts/conversation-context"
import { formatTime, formatDate } from "../../lib/utils"
import { Button } from "../ui/button"
import { Star, Trash2, Edit2, ChevronLeft, ChevronRight, MessageSquare, Pin, X } from "lucide-react"
import { useTheme } from "../../contexts/theme-context"

export default function Sidebar() {
  const {
    conversations,
    activeConversation,
    setActiveConversation,
    toggleStarConversation,
    deleteConversation,
    renameConversation,
    pinnedMessages,
    unpinMessage,
  } = useConversation()

  const { theme } = useTheme()
  const isDarkMode = theme === "dark"

  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isEditing, setIsEditing] = useState(null)
  const [editTitle, setEditTitle] = useState("")
  const [activeTab, setActiveTab] = useState("conversations")
  const [isMobile, setIsMobile] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const sidebarRef = useRef(null)
  const pinnedContainerRef = useRef(null)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)

      // Auto-collapse sidebar on desktop if it was previously collapsed
      if (!mobile && !isCollapsed) {
        setIsCollapsed(false)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [isCollapsed])

  // Handle clicks outside the sidebar on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && isMobileSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsMobileSidebarOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMobile, isMobileSidebarOpen])

  const handleRename = (id) => {
    if (editTitle.trim()) {
      renameConversation(id, editTitle)
      setIsEditing(null)
    }
  }

  const startEditing = (id, currentTitle) => {
    setIsEditing(id)
    setEditTitle(currentTitle)
  }

  // Group conversations by date
  const groupedConversations = conversations.reduce((groups, conversation) => {
    const date = formatDate(conversation.timestamp)
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(conversation)
    return groups
  }, {})

  // Handle conversation selection on mobile
  const handleConversationSelect = (id) => {
    setActiveConversation(id)
    // Close mobile sidebar after selection
    if (isMobile) {
      setIsMobileSidebarOpen(false)
    }
  }

  // Toggle mobile sidebar
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen)
  }

  // Add this function to the global window object so it can be called from navbar
  useEffect(() => {
    window.toggleMobileSidebar = toggleMobileSidebar
    return () => {
      delete window.toggleMobileSidebar
    }
  }, [])

  // Handle unpin message if available
  const handleUnpin = (messageId, e) => {
    e.stopPropagation()
    if (typeof unpinMessage === "function") {
      unpinMessage(messageId)
    }
  }

  // Get button background color based on theme
  const getButtonBgColor = () => {
    return isDarkMode ? "bg-gray-700" : "bg-gray-200"
  }

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isMobile && isMobileSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileSidebarOpen(false)} />
      )}

      {/* Sidebar container */}
      <div
        ref={sidebarRef}
        className={`
          fixed md:relative h-screen bg-background z-50 transition-all duration-300 shadow-lg flex flex-col
          ${isMobile
            ? isMobileSidebarOpen
              ? "left-0 w-[85%] max-w-[300px] border-r"
              : "-left-full w-[85%] max-w-[300px]"
            : isCollapsed
              ? "w-0 md:w-12 overflow-hidden md:overflow-visible border-r"
              : "w-80 border-r"
          }
        `}
      >
        {/* Header */}
        <div className="flex-shrink-0 flex justify-between items-center p-4 border-b">
          {(!isCollapsed || isMobile) && <h2 className="font-semibold">Conversations</h2>}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => (isMobile ? setIsMobileSidebarOpen(false) : setIsCollapsed(!isCollapsed))}
            className={`${isCollapsed && !isMobile ? "mx-auto" : "ml-auto"}`}
          >
            {isMobile ? (
              <X size="sm" className="h-4 w-4" />
            ) : isCollapsed ? (
              <ChevronRight size="sm" className="h-4 w-4" />
            ) : (
              <ChevronLeft size="sm" className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Tabs */}
        {(!isCollapsed || isMobile) && (
          <div className="flex-shrink-0 flex border-b">
            <Button
              variant={activeTab === "conversations" ? "default" : "ghost"}
              className="flex-1 rounded-none"
              onClick={() => setActiveTab("conversations")}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Chats
            </Button>
            <Button
              variant={activeTab === "pinned" ? "default" : "ghost"}
              className="flex-1 rounded-none"
              onClick={() => setActiveTab("pinned")}
            >
              <Pin className="h-4 w-4 mr-2" />
              Pinned
            </Button>
          </div>
        )}

        {/* Content area - flex-grow to take remaining space */}
        <div className="flex-grow overflow-hidden">
          {(!isCollapsed || isMobile) && activeTab === "conversations" && (
            <div className="h-full overflow-y-auto">
              {Object.entries(groupedConversations).map(([date, convs]) => (
                <div key={date}>
                  <div className="px-4 py-2 text-xs text-muted-foreground font-medium">{date}</div>
                  {convs.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`px-4 py-2 border-l-2 cursor-pointer hover:bg-muted/50 ${activeConversation === conversation.id ? "border-primary bg-muted" : "border-transparent"
                        }`}
                      onClick={() => handleConversationSelect(conversation.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          {isEditing === conversation.id ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="w-full p-1 text-sm border rounded"
                                autoFocus
                                onBlur={() => handleRename(conversation.id)}
                                onKeyDown={(e) => e.key === "Enter" && handleRename(conversation.id)}
                              />
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-sm truncate">{conversation.title}</h3>
                              {conversation.starred && <Star className="h-3 w-3 text-yellow-400 flex-shrink-0" />}
                            </div>
                          )}
                          <p className="text-xs text-muted-foreground truncate">{conversation.preview}</p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                          {formatTime(conversation.timestamp)}
                        </span>
                      </div>

                      {activeConversation === conversation.id && !isEditing && (
                        <div className="flex mt-2 gap-2" style={{ opacity: 1, visibility: "visible" }}>
                          <Button
                            variant="default"
                            className={`sidebar-action-button h-8 w-8 ${getButtonBgColor()} hover:bg-gray-300 dark:hover:bg-gray-600`}
                            style={{ opacity: 1, visibility: "visible" }}
                            data-tooltip="Star"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleStarConversation(conversation.id)
                            }}
                          >
                            <Star
                              className={`h-4 w-4 ${conversation.starred
                                  ? "fill-yellow-400 text-yellow-400"
                                  : isDarkMode
                                    ? "text-white"
                                    : "text-gray-700"
                                }`}
                              style={{ opacity: 1, visibility: "visible" }}
                            />
                          </Button>
                          <Button
                            variant="default"
                            className={`sidebar-action-button h-8 w-8 ${getButtonBgColor()} hover:bg-gray-300 dark:hover:bg-gray-600`}
                            style={{ opacity: 1, visibility: "visible" }}
                            data-tooltip="Edit"
                            onClick={(e) => {
                              e.stopPropagation()
                              startEditing(conversation.id, conversation.title)
                            }}
                          >
                            <Edit2
                              className={`h-4 w-4 ${isDarkMode ? "text-white" : "text-gray-700"}`}
                              style={{ opacity: 1, visibility: "visible" }}
                            />
                          </Button>
                          <Button
                            variant="default"
                            className={`sidebar-action-button h-8 w-8 ${getButtonBgColor()} hover:bg-gray-300 dark:hover:bg-gray-600`}
                            style={{ opacity: 1, visibility: "visible" }}
                            data-tooltip="Delete"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteConversation(conversation.id)
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" style={{ opacity: 1, visibility: "visible" }} />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {(!isCollapsed || isMobile) && activeTab === "pinned" && (
            <div ref={pinnedContainerRef} className="h-full overflow-y-auto pinned-messages-container">
              {pinnedMessages.length === 0 ? (
                <div className="flex items-center justify-center h-full p-4">
                  <p className="text-sm text-muted-foreground text-center">
                    No pinned messages yet. Pin important messages for quick access.
                  </p>
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  {pinnedMessages.map((message) => (
                    <div key={message.id} className="border rounded-lg p-3 bg-muted/30">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-medium">{message.sender === "ai" ? "AI Copilot" : "You"}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
                          {typeof unpinMessage === "function" && (
                            <Button
                              variant="ghost"
                              size="sm"
                             
                              onClick={(e) => handleUnpin(message.id, e)}
                            >
                              <X size="sm" className="h-4 w-4" />
                            </Button>


                           




                          )}
                        </div>
                      </div>
                      <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
