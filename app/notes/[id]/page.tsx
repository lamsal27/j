"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Calendar, ChevronLeft, Edit, Lock, Save, Tag, Trash } from "lucide-react"
import { mockNotes } from "@/lib/data"

export default function NotePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const noteId = Number.parseInt(params.id)
  const [note, setNote] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedNote, setEditedNote] = useState<any>(null)

  useEffect(() => {
    // Find the note with the matching id
    const foundNote = mockNotes.find((n) => n.id === noteId)
    if (foundNote) {
      setNote(foundNote)
      setEditedNote({ ...foundNote })
    } else {
      // Redirect to notes page if note not found
      router.push("/notes")
    }
  }, [noteId, router])

  const handleSave = () => {
    setNote(editedNote)
    setIsEditing(false)
    // In a real app, you would save to API/database here
  }

  const handleChange = (field: string, value: string) => {
    setEditedNote({
      ...editedNote,
      [field]: value,
    })
  }

  const handleTagsChange = (tagsString: string) => {
    const tagsArray = tagsString.split(",").map((tag) => tag.trim())
    setEditedNote({
      ...editedNote,
      tags: tagsArray,
    })
  }

  if (!note) {
    return (
      <div className="container mx-auto p-4 md:p-6">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" onClick={() => router.push("/notes")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Loading note...</h1>
        </div>
      </div>
    )
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => router.push("/notes")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">{isEditing ? "Editing Note" : "Note Details"}</h1>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" /> Save
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </Button>
                <Button variant="destructive">
                  <Trash className="h-4 w-4 mr-2" /> Delete
                </Button>
              </>
            )}
          </div>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="bg-muted/40">
            <div className="flex justify-between items-start">
              {isEditing ? (
                <Input
                  value={editedNote.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="text-xl font-semibold"
                />
              ) : (
                <CardTitle className="text-xl flex items-center gap-2">
                  {note.title}
                  {note.isEncrypted && <Lock className="h-4 w-4 text-muted-foreground" />}
                </CardTitle>
              )}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 mr-1" /> {note.date}
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {isEditing ? (
              <Textarea
                value={editedNote.content}
                onChange={(e) => handleChange("content", e.target.value)}
                className="min-h-[200px]"
              />
            ) : (
              <div className="whitespace-pre-wrap leading-relaxed">{note.content}</div>
            )}

            <div className="mt-6">
              <h3 className="font-medium mb-2">Tags</h3>
              {isEditing ? (
                <Input
                  value={editedNote.tags.join(", ")}
                  onChange={(e) => handleTagsChange(e.target.value)}
                  placeholder="Enter tags separated by commas"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {note.tags.map((tag: string, i: number) => (
                    <Badge key={i} variant="outline">
                      <Tag className="h-3 w-3 mr-1" /> {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="border-t flex items-center justify-between py-4">
            <Badge variant="secondary">{note.category}</Badge>
            <div className="flex items-center gap-2">
              {note.isActionable && <Badge variant="default">Actionable</Badge>}
              {note.isEncrypted && <Badge variant="outline">Encrypted</Badge>}
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

