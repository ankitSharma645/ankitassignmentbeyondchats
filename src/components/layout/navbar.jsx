"use client"

import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { MessageSquare, Plus, Star, Settings, Menu, X, Moon, Sun, Palette, Zap } from "lucide-react"
import { useConversation } from "../../contexts/conversation-context"
import { useTheme } from "../../contexts/theme-context"
import { Dropdown, DropdownItem, DropdownSeparator } from "../ui/dropdown"

export default function Navbar() {
  const { createNewConversation } = useConversation()
  const { theme, changeTheme, themes } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const handleNewConversation = () => {
    // Create a new conversation and clear the current messages
    createNewConversation()
    setIsMobileMenuOpen(false)
  }

  const getThemeIcon = (themeId) => {
    switch (themeId) {
      case "light":
        return <Sun className="h-4 w-4 mr-2" />
      case "dark":
        return <Moon className="h-4 w-4 mr-2" />
      case "blue":
      case "purple":
      case "green":
      case "sunset":
      case "ocean":
        return <Palette className="h-4 w-4 mr-2" />
      case "neon":
        return <Zap className="h-4 w-4 mr-2" />
      default:
        return <Sun className="h-4 w-4 mr-2" />
    }
  }

  // Toggle the mobile sidebar
  const toggleMobileSidebar = () => {
    if (typeof window.toggleMobileSidebar === "function") {
      window.toggleMobileSidebar()
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-background"
      }`}
    >
      <div className="navbar px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isMobile && (
            <Button variant="ghost" size="icon" className="mr-1" onClick={toggleMobileSidebar}>
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <MessageSquare className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">AI Copilot</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <Button variant="ghost" onClick={handleNewConversation}>
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </Button>
          <Button variant="ghost">
            <Star className="h-4 w-4 mr-2" />
            Starred
          </Button>

          <Dropdown
            trigger={
              <Button variant="ghost">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            }
            align="right"
            contentClassName="w-56"
          >
            <div className="p-2">
              <h3 className="px-2 py-1.5 text-sm font-semibold">Appearance</h3>
              <DropdownSeparator />
              {themes.map((t) => (
                <DropdownItem
                  key={t.id}
                  className={`flex items-center ${theme === t.id ? "bg-accent text-accent-foreground" : ""}`}
                  onClick={() => changeTheme(t.id)}
                >
                  {getThemeIcon(t.id)}
                  {t.name}
                </DropdownItem>
              ))}
            </div>
          </Dropdown>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Button variant="outline" size="sm" onClick={handleNewConversation}>
            <Plus className="h-4 w-4 mr-1" />
            New
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Settings className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t p-4 flex flex-col gap-2 shadow-lg">
          <Button variant="ghost" className="justify-start">
            <Star className="h-4 w-4 mr-2" />
            Starred
          </Button>

          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Theme</p>
            <div className="grid grid-cols-2 gap-2">
              {themes.map((t) => (
                <Button
                  key={t.id}
                  variant={theme === t.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => changeTheme(t.id)}
                  className="flex items-center justify-start"
                >
                  {getThemeIcon(t.id)}
                  <span>{t.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
