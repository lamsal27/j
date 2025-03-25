"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Edit, Lock, Plus, Search, Tag, Trash } from "lucide-react"
import { mockNotes } from "@/lib/data"

const categories = ["All", "Projects", "Security", "Personal", "Research", "Business", "Development", "Ideas"]

export default function NotesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [notes, setNotes] = useState(mockNotes)
  const [isNewNoteOpen, setIsNewNoteOpen] = useState(false)
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    category: "Personal",
    tags: "",
    isEncrypted: false,
    isActionable: false,
  })

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || note.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const handleAddNote = () => {
    const newNoteObj = {
      id: notes.length + 1,
      title: newNote.title,
      content: newNote.content,
      date: new Date().toISOString().split("T")[0],
      category: newNote.category,
      tags: newNote.tags.split(",").map((tag) => tag.trim()),
      isEncrypted: newNote.isEncrypted,
      isActionable: newNote.isActionable,
    }

    setNotes([newNoteObj, ...notes])
    setIsNewNoteOpen(false)
    setNewNote({
      title: "",
      content: "",
      category: "Personal",
      tags: "",
      isEncrypted: false,
      isActionable: false,
    })
  }

  const handleNoteClick = (noteId: number) => {
    router.push(`/notes/${noteId}`)
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
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notes</h1>
          <p className="text-muted-foreground">Manage your thoughts, ideas, and tasks</p>
        </div>
        <Dialog open={isNewNoteOpen} onOpenChange={setIsNewNoteOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Note
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px] max-w-[95vw]">
            <DialogHeader>
              <DialogTitle>Create New Note</DialogTitle>
              <DialogDescription>Add a new note to your collection. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  placeholder="Note title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  placeholder="Write your note here..."
                  className="min-h-[150px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newNote.category}
                    onValueChange={(value) => setNewNote({ ...newNote, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories
                        .filter((cat) => cat !== "All")
                        .map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={newNote.tags}
                    onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
                    placeholder="tag1, tag2, tag3"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="encrypted"
                    checked={newNote.isEncrypted}
                    onChange={(e) => setNewNote({ ...newNote, isEncrypted: e.target.checked })}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="encrypted">Encrypt Note</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="actionable"
                    checked={newNote.isActionable}
                    onChange={(e) => setNewNote({ ...newNote, isActionable: e.target.checked })}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="actionable">Actionable Task</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewNoteOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddNote}>Save Note</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col md:flex-row gap-4 mb-6"
      >
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search notes..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4 flex flex-wrap h-auto">
          <TabsTrigger value="all">All Notes</TabsTrigger>
          <TabsTrigger value="actionable">Actionable</TabsTrigger>
          <TabsTrigger value="encrypted">Encrypted</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map((note, index) => (
              <motion.div
                key={note.id}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => handleNoteClick(note.id)}
                className="cursor-pointer transform transition-transform hover:-translate-y-1 hover:shadow-md"
              >
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{note.title}</CardTitle>
                      {note.isEncrypted && <Lock className="h-4 w-4 text-muted-foreground" />}
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {note.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm line-clamp-3">{note.content}</p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {note.tags.map((tag, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" /> {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Badge variant="secondary">{note.category}</Badge>
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/notes/${note.id}?edit=true`)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="actionable" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes
              .filter((note) => note.isActionable)
              .map((note, index) => (
                <motion.div
                  key={note.id}
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => handleNoteClick(note.id)}
                  className="cursor-pointer transform transition-transform hover:-translate-y-1 hover:shadow-md"
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{note.title}</CardTitle>
                        {note.isEncrypted && <Lock className="h-4 w-4 text-muted-foreground" />}
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {note.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm line-clamp-3">{note.content}</p>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {note.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            <Tag className="h-3 w-3 mr-1" /> {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                      <Badge variant="secondary">{note.category}</Badge>
                      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            router.push(`/notes/${note.id}?edit=true`)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="encrypted" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes
              .filter((note) => note.isEncrypted)
              .map((note, index) => (
                <motion.div
                  key={note.id}
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => handleNoteClick(note.id)}
                  className="cursor-pointer transform transition-transform hover:-translate-y-1 hover:shadow-md"
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{note.title}</CardTitle>
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {note.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm line-clamp-3">
                        {note.isEncrypted ? "This note is encrypted. Click to view content." : note.content}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {note.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            <Tag className="h-3 w-3 mr-1" /> {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                      <Badge variant="secondary">{note.category}</Badge>
                      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            router.push(`/notes/${note.id}?edit=true`)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

