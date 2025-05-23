"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { X, Zap } from "lucide-react"
import { magicPrompts } from "../../lib/dummy-data"
import "./MagicPrompt.css"

export default function MagicPrompt({ onSelectPrompt, onClose }) {
  const [activeCategory, setActiveCategory] = useState(magicPrompts[0]?.category || "")
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(onClose, 500) // Matches spin duration
  }

  return (
    <div className={`spin-modal-overlay ${isClosing ? "spin-closing" : ""}`}>
      {/* Static dark backdrop */}
      <div className="spin-modal-backdrop" onClick={handleClose} />

      {/* Pure spinning modal */}
      <div className="spin-modal-content">
        <div className="spin-modal-header">
          <div className="spin-modal-title">
            <Zap className="spin-icon" />
            <h3>Magic Prompts</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="close-icon" />
          </Button>
        </div>

        <div className="spin-modal-body">
          <div className="spin-modal-sidebar">
            {magicPrompts.map((category) => (
              <button
                key={category.category}
                className={`category-btn ${activeCategory === category.category ? "active" : ""}`}
                onClick={() => setActiveCategory(category.category)}
              >
                {category.category}
              </button>
            ))}
          </div>

          <div className="spin-modal-main">
            <h4>{activeCategory} Prompts</h4>
            <div className="prompts-container">
              {magicPrompts
                .find((c) => c.category === activeCategory)
                ?.prompts.map((prompt, index) => (
                  <div key={index} className="prompt-card" onClick={() => onSelectPrompt(prompt)}>
                    <p>{prompt}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
