// Simple utility to save and load conversation history from localStorage
export const localStorageHistory = {
  saveHistory: (messages) => {
    try {
      localStorage.setItem("chat_history", JSON.stringify(messages))
    } catch (error) {
      console.error("Error saving history to localStorage:", error)
    }
  },

  loadHistory: () => {
    try {
      const savedHistory = localStorage.getItem("chat_history")
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory)
        // Convert string dates back to Date objects
        parsedHistory.forEach((msg) => {
          if (typeof msg.timestamp === "string") {
            msg.timestamp = new Date(msg.timestamp)
          }
        })
        return parsedHistory
      }
    } catch (error) {
      console.error("Error loading history from localStorage:", error)
    }
    return []
  },

  clearHistory: () => {
    try {
      localStorage.removeItem("chat_history")
    } catch (error) {
      console.error("Error clearing history from localStorage:", error)
    }
  },
}
