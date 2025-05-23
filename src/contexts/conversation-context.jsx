/*"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { sampleConversations } from "../lib/dummy-data"
import { generateId } from "../lib/utils"

const ConversationContext = createContext()

export function ConversationProvider({ children }) {
  const [conversations, setConversations] = useState([])
  const [activeConversation, setActiveConversation] = useState(null)
  const [pinnedMessages, setPinnedMessages] = useState([])
  const [notes, setNotes] = useState([])

  useEffect(() => {
    // Load conversations from localStorage or use sample data
    const savedConversations = localStorage.getItem("conversations")
    const savedPinnedMessages = localStorage.getItem("pinnedMessages")
    const savedNotes = localStorage.getItem("notes")

    if (savedConversations) {
      const parsedConversations = JSON.parse(savedConversations)
      // Convert string dates back to Date objects
      parsedConversations.forEach((conv) => {
        conv.timestamp = new Date(conv.timestamp)
        conv.messages.forEach((msg) => {
          msg.timestamp = new Date(msg.timestamp)
        })
      })
      setConversations(parsedConversations)

      // Set the most recent conversation as active if none is active
      if (!activeConversation && parsedConversations.length > 0) {
        setActiveConversation(parsedConversations[0].id)
      }
    } else {
      // Use sample data for first-time users
      setConversations(sampleConversations)
      if (sampleConversations.length > 0) {
        setActiveConversation(sampleConversations[0].id)
      }
    }

    if (savedPinnedMessages) {
      const parsedPinnedMessages = JSON.parse(savedPinnedMessages)
      parsedPinnedMessages.forEach((msg) => {
        msg.timestamp = new Date(msg.timestamp)
      })
      setPinnedMessages(parsedPinnedMessages)
    }

    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes)
      parsedNotes.forEach((note) => {
        note.timestamp = new Date(note.timestamp)
      })
      setNotes(parsedNotes)
    }
  }, [])

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem("conversations", JSON.stringify(conversations))
    }
  }, [conversations])

  // Save pinned messages to localStorage whenever they change
  useEffect(() => {
    if (pinnedMessages.length > 0) {
      localStorage.setItem("pinnedMessages", JSON.stringify(pinnedMessages))
    }
  }, [pinnedMessages])

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("notes", JSON.stringify(notes))
    }
  }, [notes])

  const createNewConversation = () => {
    const newConversation = {
      id: generateId(),
      title: "New Conversation",
      preview: "",
      timestamp: new Date(),
      starred: false,
      messages: [],
    }

    setConversations([newConversation, ...conversations])
    setActiveConversation(newConversation.id)
    return newConversation.id
  }

  const updateConversation = (id, updates) => {
    setConversations(conversations.map((conv) => (conv.id === id ? { ...conv, ...updates } : conv)))
  }

  const deleteConversation = (id) => {
    setConversations(conversations.filter((conv) => conv.id !== id))
    if (activeConversation === id) {
      setActiveConversation(conversations.length > 1 ? conversations[0].id : null)
    }
  }

  const addMessageToConversation = (conversationId, message) => {
    const conversation = conversations.find((c) => c.id === conversationId)
    if (!conversation) return

    const updatedMessages = [...conversation.messages, message]
    const preview = message.sender === "user" ? message.content : conversation.preview

    updateConversation(conversationId, {
      messages: updatedMessages,
      preview: preview,
      timestamp: new Date(),
    })

    return message.id
  }

  const toggleStarConversation = (id) => {
    const conversation = conversations.find((c) => c.id === id)
    if (conversation) {
      updateConversation(id, { starred: !conversation.starred })
    }
  }

  const renameConversation = (id, newTitle) => {
    updateConversation(id, { title: newTitle })
  }

  const pinMessage = (message) => {
    if (!pinnedMessages.some((m) => m.id === message.id)) {
      setPinnedMessages([...pinnedMessages, message])
    }
  }

  const unpinMessage = (messageId) => {
    setPinnedMessages(pinnedMessages.filter((m) => m.id !== messageId))
  }

  const addNote = (content) => {
    const newNote = {
      id: generateId(),
      content,
      timestamp: new Date(),
    }
    setNotes([...notes, newNote])
    return newNote.id
  }

  const updateNote = (id, content) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, content, timestamp: new Date() } : note)))
  }

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const getCurrentConversation = () => {
    return conversations.find((c) => c.id === activeConversation) || null
  }

  const getActiveConversationMessages = () => {
    const currentConversation = conversations.find((c) => c.id === activeConversation)
    return currentConversation ? currentConversation.messages : []
  }

  return (
    <ConversationContext.Provider
      value={{
        conversations,
        activeConversation,
        setActiveConversation,
        createNewConversation,
        updateConversation,
        deleteConversation,
        addMessageToConversation,
        toggleStarConversation,
        renameConversation,
        pinnedMessages,
        pinMessage,
        unpinMessage,
        notes,
        addNote,
        updateNote,
        deleteNote,
        getCurrentConversation,
        getActiveConversationMessages,
      }}
    >
      {children}
    </ConversationContext.Provider>
  )
}

export function useConversation() {
  const context = useContext(ConversationContext)
  if (context === undefined) {
    throw new Error("useConversation must be used within a ConversationProvider")
  }
  return context
}
*/
"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { sampleConversations } from "../lib/dummy-data"
import { generateId } from "../lib/utils"

const ConversationContext = createContext()

export function ConversationProvider({ children }) {
  const [conversations, setConversations] = useState([])
  const [activeConversation, setActiveConversation] = useState(null)
  const [pinnedMessages, setPinnedMessages] = useState([])
  const [notes, setNotes] = useState([])
  const [messagesByConversation, setMessagesByConversation] = useState({})

  useEffect(() => {
    // Load conversations from localStorage or use sample data
    const savedConversations = localStorage.getItem("conversations")
    const savedPinnedMessages = localStorage.getItem("pinnedMessages")
    const savedNotes = localStorage.getItem("notes")
    const savedMessagesByConversation = localStorage.getItem("messagesByConversation")

    if (savedConversations) {
      const parsedConversations = JSON.parse(savedConversations)
      // Convert string dates back to Date objects
      parsedConversations.forEach((conv) => {
        conv.timestamp = new Date(conv.timestamp)
      })
      setConversations(parsedConversations)

      // Set the most recent conversation as active if none is active
      if (!activeConversation && parsedConversations.length > 0) {
        setActiveConversation(parsedConversations[0].id)
      }
    } else {
      // Use sample data for first-time users
      setConversations(sampleConversations)
      if (sampleConversations.length > 0) {
        setActiveConversation(sampleConversations[0].id)
      }
    }

    if (savedPinnedMessages) {
      const parsedPinnedMessages = JSON.parse(savedPinnedMessages)
      parsedPinnedMessages.forEach((msg) => {
        msg.timestamp = new Date(msg.timestamp)
      })
      setPinnedMessages(parsedPinnedMessages)
    }

    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes)
      parsedNotes.forEach((note) => {
        note.timestamp = new Date(note.timestamp)
      })
      setNotes(parsedNotes)
    }

    if (savedMessagesByConversation) {
      const parsedMessagesByConversation = JSON.parse(savedMessagesByConversation)
      // Convert string dates back to Date objects for all messages
      Object.keys(parsedMessagesByConversation).forEach((convId) => {
        parsedMessagesByConversation[convId].forEach((msg) => {
          msg.timestamp = new Date(msg.timestamp)
        })
      })
      setMessagesByConversation(parsedMessagesByConversation)
    } else if (savedConversations) {
      // If we have conversations but no messages, initialize the messages
      const parsedConversations = JSON.parse(savedConversations)
      const initialMessages = {}
      parsedConversations.forEach((conv) => {
        if (conv.messages && Array.isArray(conv.messages)) {
          initialMessages[conv.id] = conv.messages.map((msg) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }))
        } else {
          initialMessages[conv.id] = []
        }
      })
      setMessagesByConversation(initialMessages)
    }
  }, [])

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem("conversations", JSON.stringify(conversations))
    }
  }, [conversations])

  // Save messages by conversation to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(messagesByConversation).length > 0) {
      localStorage.setItem("messagesByConversation", JSON.stringify(messagesByConversation))
    }
  }, [messagesByConversation])

  // Save pinned messages to localStorage whenever they change
  useEffect(() => {
    if (pinnedMessages.length > 0) {
      localStorage.setItem("pinnedMessages", JSON.stringify(pinnedMessages))
    }
  }, [pinnedMessages])

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("notes", JSON.stringify(notes))
    }
  }, [notes])

  const createNewConversation = () => {
    const newConversation = {
      id: generateId(),
      title: "New Conversation",
      preview: "",
      timestamp: new Date(),
      starred: false,
    }

    setConversations([newConversation, ...conversations])
    setActiveConversation(newConversation.id)

    // Initialize empty messages array for this conversation
    setMessagesByConversation((prev) => ({
      ...prev,
      [newConversation.id]: [],
    }))

    console.log("Created new conversation:", newConversation.id)
    return newConversation.id
  }

  const updateConversation = (id, updates) => {
    setConversations(conversations.map((conv) => (conv.id === id ? { ...conv, ...updates } : conv)))
  }

  const deleteConversation = (id) => {
    setConversations(conversations.filter((conv) => conv.id !== id))

    // Remove messages for this conversation
    setMessagesByConversation((prev) => {
      const newMessages = { ...prev }
      delete newMessages[id]
      return newMessages
    })

    if (activeConversation === id) {
      // Set the most recent conversation as active
      const remainingConversations = conversations.filter((conv) => conv.id !== id)
      setActiveConversation(remainingConversations.length > 0 ? remainingConversations[0].id : null)
    }
  }

  const addMessageToConversation = (conversationId, message) => {
    const conversation = conversations.find((c) => c.id === conversationId)
    if (!conversation) {
      console.error("Conversation not found:", conversationId)
      return
    }

    // Add message to the conversation's messages
    setMessagesByConversation((prev) => {
      const conversationMessages = prev[conversationId] || []
      return {
        ...prev,
        [conversationId]: [...conversationMessages, message],
      }
    })

    // Update conversation preview and timestamp
    const preview = message.sender === "user" ? message.content : conversation.preview
    updateConversation(conversationId, {
      preview: preview,
      timestamp: new Date(),
    })

    console.log("Added message to conversation:", conversationId, message)
    return message.id
  }

  const toggleStarConversation = (id) => {
    const conversation = conversations.find((c) => c.id === id)
    if (conversation) {
      updateConversation(id, { starred: !conversation.starred })
    }
  }

  const renameConversation = (id, newTitle) => {
    updateConversation(id, { title: newTitle })
  }

  const pinMessage = (message) => {
    if (!pinnedMessages.some((m) => m.id === message.id)) {
      setPinnedMessages([...pinnedMessages, message])
    }
  }

  const unpinMessage = (messageId) => {
    setPinnedMessages(pinnedMessages.filter((m) => m.id !== messageId))
  }

  const addNote = (content) => {
    const newNote = {
      id: generateId(),
      content,
      timestamp: new Date(),
    }
    setNotes([...notes, newNote])
    return newNote.id
  }

  const updateNote = (id, content) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, content, timestamp: new Date() } : note)))
  }

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const getCurrentConversation = () => {
    return conversations.find((c) => c.id === activeConversation) || null
  }

  const getActiveConversationMessages = () => {
    return messagesByConversation[activeConversation] || []
  }

  return (
    <ConversationContext.Provider
      value={{
        conversations,
        activeConversation,
        setActiveConversation,
        createNewConversation,
        updateConversation,
        deleteConversation,
        addMessageToConversation,
        toggleStarConversation,
        renameConversation,
        pinnedMessages,
        pinMessage,
        unpinMessage,
        notes,
        addNote,
        updateNote,
        deleteNote,
        getCurrentConversation,
        getActiveConversationMessages,
      }}
    >
      {children}
    </ConversationContext.Provider>
  )
}

export function useConversation() {
  const context = useContext(ConversationContext)
  if (context === undefined) {
    throw new Error("useConversation must be used within a ConversationProvider")
  }
  return context
}
