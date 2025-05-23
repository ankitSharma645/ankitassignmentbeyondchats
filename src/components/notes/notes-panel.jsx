
"use client"

import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { X, Trash2, Copy, Edit, Save, Plus } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { useConversation } from "../../contexts/conversation-context"
import { Textarea } from "../ui/textarea"

export default function NotesPanel({ onClose }) {
  const { notes, addNote, updateNote, deleteNote } = useConversation()
  const [expandedNote, setExpandedNote] = useState(null)
  const [editingNote, setEditingNote] = useState(null)
  const [editContent, setEditContent] = useState("")
  const [newNoteContent, setNewNoteContent] = useState("")
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content)
    toast("Copied to clipboard", {
      description: "Note content has been copied to clipboard",
    })
  }

  const handleEdit = (note) => {
    setEditingNote(note.id)
    setEditContent(note.content)
  }

  const handleSaveEdit = () => {
    if (editContent.trim()) {
      updateNote(editingNote, editContent)
      setEditingNote(null)
      toast("Note updated", {
        description: "Your note has been updated successfully",
      })
    }
  }

  const handleDelete = (id) => {
    deleteNote(id)
    toast("Note deleted", {
      description: "Your note has been deleted",
    })
  }

  const handleAddNote = () => {
    if (newNoteContent.trim()) {
      addNote(newNoteContent)
      setNewNoteContent("")
      setIsAddingNote(false)
      toast("Note added", {
        description: "Your note has been added successfully",
      })
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-3 md:p-4 border-b">
        <h2 className="font-semibold text-sm md:text-base">Saved Notes</h2>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 md:h-10 md:w-10">
          <X  className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-auto p-2 md:p-3">
        {notes.length === 0 && !isAddingNote ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4 text-muted-foreground">
            <p className="text-sm md:text-base">No saved notes yet</p>
            <p className="text-xs md:text-sm mt-1">Add notes to save important information</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 text-xs md:text-sm"
              onClick={() => setIsAddingNote(true)}
            >
              <Plus className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
              Add Note
            </Button>
          </div>
        ) : (
          <AnimatePresence>
            {isAddingNote && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-3 md:mb-4"
              >
                <Textarea
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  placeholder="Type your note here..."
                  className="mb-2 text-sm"
                />
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setIsAddingNote(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={handleAddNote}
                    disabled={!newNoteContent.trim()}
                  >
                    <Save className="h-3 w-3 mr-1" />
                    Save
                  </Button>
                </div>
              </motion.div>
            )}

            {notes.map((note) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-2 md:mb-3 bg-muted/50 rounded-lg p-2 md:p-3"
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="text-xs text-muted-foreground">
                    {formatDistanceToNow(note.timestamp, { addSuffix: true })}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 md:h-6 md:w-6"
                      onClick={() => handleCopy(note.content)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 md:h-6 md:w-6"
                      onClick={() => handleEdit(note)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 md:h-6 md:w-6 text-destructive"
                      onClick={() => handleDelete(note.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {editingNote === note.id ? (
                  <div>
                    <Textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="text-xs md:text-sm mb-2"
                    />
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setEditingNote(null)}>
                        Cancel
                      </Button>
                      <Button variant="default" size="sm" className="h-7 text-xs" onClick={handleSaveEdit}>
                        <Save className="h-3 w-3 mr-1" />
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="text-xs md:text-sm cursor-pointer"
                    onClick={() => setExpandedNote(expandedNote === note.id ? null : note.id)}
                  >
                    {expandedNote === note.id ? (
                      note.content
                    ) : (
                      <>
                        {note.content.substring(0, isMobile ? 50 : 100)}
                        {note.content.length > (isMobile ? 50 : 100) && "..."}
                      </>
                    )}
                  </div>
                )}
              </motion.div>
            ))}

            {!isAddingNote && notes.length > 0 && (
              <Button variant="outline" size="sm" className="w-full mt-2 text-xs" onClick={() => setIsAddingNote(true)}>
                <Plus className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                Add Note
              </Button>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
