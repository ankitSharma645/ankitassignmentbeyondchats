"use client"

import { useState, useEffect } from "react"
import { localStorageHistory } from "../../lib/local-storage-history"

// This is a simple in-memory store to keep track of all messages
// even if the context or state gets reset
const messageStore = {
  messages: [],
  addMessage: function (message) {
    this.messages.push(message)
    // Save to localStorage whenever a message is added
    localStorageHistory.saveHistory(this.messages)
  },
  getMessages: function () {
    return [...this.messages]
  },
  clear: function () {
    this.messages = []
    localStorageHistory.clearHistory()
  },
}

export function useConversationHistory() {
  const [history, setHistory] = useState([])

  // Load history from localStorage on initial mount
  useEffect(() => {
    const savedHistory = localStorageHistory.loadHistory()
    if (savedHistory && savedHistory.length > 0) {
      messageStore.messages = savedHistory
      setHistory(savedHistory)
    }
  }, [])

  const addToHistory = (message) => {
    messageStore.addMessage(message)
    setHistory(messageStore.getMessages())
  }

  const getHistory = () => {
    return messageStore.getMessages()
  }

  const clearHistory = () => {
    messageStore.clear()
    setHistory([])
  }

  return {
    history,
    addToHistory,
    getHistory,
    clearHistory,
  }
}
