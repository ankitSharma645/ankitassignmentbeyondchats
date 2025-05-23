/*import React from "react";
import { Toaster } from "sonner";
import Navbar from "./components/layout/navbar";
import Sidebar from "./components/layout/sidebar";
import ChatInterface from "./components/chat/chat-interface";
import { ThemeProvider } from "./contexts/theme-context";
import { ConversationProvider } from "./contexts/conversation-context";
import "../src/additional-css.css"
import HeroSection from "./components/layout/hero-section";
import Footer from "./components/layout/footer";

function App() {
  return (
    <ThemeProvider>
      <ConversationProvider>
        <div className="flex flex-col h-screen">
          <Navbar />
         
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
             
            <main className="flex-1 overflow-hidden">
              
              
              <ChatInterface />
             
            </main>
          </div>
          <Toaster position="top-right" />
        </div>
      </ConversationProvider>
    </ThemeProvider>
  );
}

export default App;*/
import { Toaster } from "sonner"
import Navbar from "./components/layout/navbar"
import Sidebar from "./components/layout/sidebar"
import ChatInterface from "./components/chat/chat-interface"
import { ThemeProvider } from "./contexts/theme-context"
import { ConversationProvider } from "./contexts/conversation-context"

import "../src/index.css" // Import the index.css file

function App() {
  return (
    <ThemeProvider>
      <ConversationProvider>
        <div className="flex flex-col h-screen">
          <Navbar />

          <div className="flex flex-1 overflow-hidden">
            <Sidebar />

            <main className="flex-1 overflow-hidden">
              <ChatInterface />
            </main>
          </div>
          <Toaster position="top-right" />
        </div>
      </ConversationProvider>
    </ThemeProvider>
  )
}

export default App
