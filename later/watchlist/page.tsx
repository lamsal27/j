"use client"

import { useState } from "react"
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
import { Edit, Eye, Film, Plus, Search, Star, Trash, Tv } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Mock data for watchlist
const mockWatchlist = [
  {
    id: 1,
    title: "The Dark Knight",
    type: "Movie",
    status: "Completed",
    rating: 5,
    progress: 100,
    image: "/placeholder.svg?height=200&width=150",
    notes: "Best Batman movie ever. Heath Ledger's performance as the Joker is legendary.",
    genre: ["Action", "Crime", "Drama"],
  },
  {
    id: 2,
    title: "Breaking Bad",
    type: "Series",
    status: "Watching",
    rating: 4,
    progress: 75,
    image: "/placeholder.svg?height=200&width=150",
    notes: "Currently on Season 4. The character development is incredible.",
    genre: ["Crime", "Drama", "Thriller"],
  },
  {
    id: 3,
    title: "Inception",
    type: "Movie",
    status: "Completed",
    rating: 4,
    progress: 100,
    image: "/placeholder.svg?height=200&width=150",
    notes: "Mind-bending plot with amazing visuals. Need to rewatch to catch all the details.",
    genre: ["Action", "Adventure", "Sci-Fi"],
  },
  {
    id: 4,
    title: "Attack on Titan",
    type: "Anime",
    status: "Watching",
    rating: 5,
    progress: 80,
    image: "/placeholder.svg?height=200&width=150",
    notes: "Incredible story and animation. The plot twists are shocking.",
    genre: ["Action", "Drama", "Fantasy"],
  },
  {
    id: 5,
    title: "The Mandalorian",
    type: "Series",
    status: "To Watch",
    rating: 0,
    progress: 0,
    image: "/placeholder.svg?height=200&width=150",
    notes: "Heard great things about this Star Wars series.",
    genre: ["Action", "Adventure", "Sci-Fi"],
  },
  {
    id: 6,
    title: "Parasite",
    type: "Movie",
    status: "To Watch",
    rating: 0,
    progress: 0,
    image: "/placeholder.svg?height=200&width=150",
    notes: "Oscar-winning film that I need to watch soon.",
    genre: ["Drama", "Thriller"],
  },
  {
    id: 7,
    title: "Stranger Things",
    type: "Series",
    status: "Completed",
    rating: 4,
    progress: 100,
    image: "/placeholder.svg?height=200&width=150",
    notes: "Great nostalgic 80s vibe with compelling characters.",
    genre: ["Drama", "Fantasy", "Horror"],
  },
  {
    id: 8,
    title: "Demon Slayer",
    type: "Anime",
    status: "To Watch",
    rating: 0,
    progress: 0,
    image: "/placeholder.svg?height=200&width=150",
    notes: "Heard the animation is stunning.",
    genre: ["Action", "Fantasy"],
  },
]

export default function WatchlistPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("All")
  const [watchlist, setWatchlist] = useState(mockWatchlist)
  const [isNewItemOpen, setIsNewItemOpen] = useState(false)
  const [newItem, setNewItem] = useState({
    title: "",
    type: "Movie",
    status: "To Watch",
    rating: 0,
    progress: 0,
    image: "/placeholder.svg?height=200&width=150",
    notes: "",
    genre: [],
  })

  const filteredItems = watchlist.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "All" || item.type === selectedType
    return matchesSearch && matchesType
  })

  const handleAddItem = () => {
    const newItemObj = {
      id: watchlist.length + 1,
      ...newItem,
      genre: typeof newItem.genre === "string" ? newItem.genre.split(",").map((g) => g.trim()) : newItem.genre,
    }

    setWatchlist([newItemObj, ...watchlist])
    setIsNewItemOpen(false)
    setNewItem({
      title: "",
      type: "Movie",
      status: "To Watch",
      rating: 0,
      progress: 0,
      image: "/placeholder.svg?height=200&width=150",
      notes: "",
      genre: [],
    })
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="container mx-auto p-3 md:p-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Watchlist</h1>
          <p className="text-muted-foreground">Track movies, series, and anime you want to watch</p>
        </div>
        <Dialog open={isNewItemOpen} onOpenChange={setIsNewItemOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add to Watchlist
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px] max-w-[90vw]">
            <DialogHeader>
              <DialogTitle>Add to Watchlist</DialogTitle>
              <DialogDescription>Add a new movie, series, or anime to your watchlist.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  placeholder="Title"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="type">Type</Label>
                  <Select value={newItem.type} onValueChange={(value) => setNewItem({ ...newItem, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Movie">Movie</SelectItem>
                      <SelectItem value="Series">Series</SelectItem>
                      <SelectItem value="Anime">Anime</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={newItem.status} onValueChange={(value) => setNewItem({ ...newItem, status: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="To Watch">To Watch</SelectItem>
                      <SelectItem value="Watching">Watching</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="genre">Genres (comma separated)</Label>
                <Input
                  id="genre"
                  value={typeof newItem.genre === "string" ? newItem.genre : newItem.genre.join(", ")}
                  onChange={(e) => setNewItem({ ...newItem, genre: e.target.value })}
                  placeholder="Action, Drama, Comedy"
                />
              </div>
              {newItem.status === "Watching" && (
                <div className="grid gap-2">
                  <Label htmlFor="progress">Progress (%)</Label>
                  <Input
                    id="progress"
                    type="number"
                    min="0"
                    max="100"
                    value={newItem.progress}
                    onChange={(e) => setNewItem({ ...newItem, progress: Number.parseInt(e.target.value) })}
                  />
                </div>
              )}
              {newItem.status === "Completed" && (
                <div className="grid gap-2">
                  <Label htmlFor="rating">Rating (1-5)</Label>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewItem({ ...newItem, rating: star })}
                        className="p-1"
                      >
                        <Star
                          className={`h-5 w-5 ${star <= newItem.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newItem.notes}
                  onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
                  placeholder="Your thoughts or reminders..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewItemOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddItem}>Add Item</Button>
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
            placeholder="Search watchlist..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Types</SelectItem>
            <SelectItem value="Movie">Movies</SelectItem>
            <SelectItem value="Series">Series</SelectItem>
            <SelectItem value="Anime">Anime</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="to-watch">To Watch</TabsTrigger>
          <TabsTrigger value="watching">Watching</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="overflow-hidden">
                  <div className="aspect-[2/3] relative">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="font-medium">
                        {item.type === "Movie" ? (
                          <Film className="h-3 w-3 mr-1" />
                        ) : item.type === "Series" ? (
                          <Tv className="h-3 w-3 mr-1" />
                        ) : (
                          <Eye className="h-3 w-3 mr-1" />
                        )}
                        {item.type}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg truncate">{item.title}</CardTitle>
                    <CardDescription className="flex justify-between items-center">
                      <Badge
                        variant={
                          item.status === "To Watch" ? "outline" : item.status === "Watching" ? "secondary" : "default"
                        }
                      >
                        {item.status}
                      </Badge>
                      {item.status === "Completed" && (
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${star <= item.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                            />
                          ))}
                        </div>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    {item.status === "Watching" && (
                      <div className="mb-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{item.progress}%</span>
                        </div>
                        <Progress value={item.progress} className="h-1" />
                      </div>
                    )}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {item.genre.map((g, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {g}
                        </Badge>
                      ))}
                    </div>
                    {item.notes && <p className="text-xs text-muted-foreground line-clamp-2">{item.notes}</p>}
                  </CardContent>
                  <CardFooter className="flex justify-end pt-0">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="to-watch" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems
              .filter((item) => item.status === "To Watch")
              .map((item, index) => (
                <motion.div
                  key={item.id}
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden">
                    <div className="aspect-[2/3] relative">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="font-medium">
                          {item.type === "Movie" ? (
                            <Film className="h-3 w-3 mr-1" />
                          ) : item.type === "Series" ? (
                            <Tv className="h-3 w-3 mr-1" />
                          ) : (
                            <Eye className="h-3 w-3 mr-1" />
                          )}
                          {item.type}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg truncate">{item.title}</CardTitle>
                      <CardDescription>
                        <Badge variant="outline">To Watch</Badge>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {item.genre.map((g, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {g}
                          </Badge>
                        ))}
                      </div>
                      {item.notes && <p className="text-xs text-muted-foreground line-clamp-2">{item.notes}</p>}
                    </CardContent>
                    <CardFooter className="flex justify-end pt-0">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="watching" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems
              .filter((item) => item.status === "Watching")
              .map((item, index) => (
                <motion.div
                  key={item.id}
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden">
                    <div className="aspect-[2/3] relative">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="font-medium">
                          {item.type === "Movie" ? (
                            <Film className="h-3 w-3 mr-1" />
                          ) : item.type === "Series" ? (
                            <Tv className="h-3 w-3 mr-1" />
                          ) : (
                            <Eye className="h-3 w-3 mr-1" />
                          )}
                          {item.type}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg truncate">{item.title}</CardTitle>
                      <CardDescription>
                        <Badge variant="secondary">Watching</Badge>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="mb-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{item.progress}%</span>
                        </div>
                        <Progress value={item.progress} className="h-1" />
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {item.genre.map((g, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {g}
                          </Badge>
                        ))}
                      </div>
                      {item.notes && <p className="text-xs text-muted-foreground line-clamp-2">{item.notes}</p>}
                    </CardContent>
                    <CardFooter className="flex justify-end pt-0">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems
              .filter((item) => item.status === "Completed")
              .map((item, index) => (
                <motion.div
                  key={item.id}
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden">
                    <div className="aspect-[2/3] relative">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="font-medium">
                          {item.type === "Movie" ? (
                            <Film className="h-3 w-3 mr-1" />
                          ) : item.type === "Series" ? (
                            <Tv className="h-3 w-3 mr-1" />
                          ) : (
                            <Eye className="h-3 w-3 mr-1" />
                          )}
                          {item.type}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg truncate">{item.title}</CardTitle>
                      <CardDescription className="flex justify-between items-center">
                        <Badge variant="default">Completed</Badge>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${star <= item.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                            />
                          ))}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {item.genre.map((g, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {g}
                          </Badge>
                        ))}
                      </div>
                      {item.notes && <p className="text-xs text-muted-foreground line-clamp-2">{item.notes}</p>}
                    </CardContent>
                    <CardFooter className="flex justify-end pt-0">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
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

