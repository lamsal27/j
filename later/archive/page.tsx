"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { BookOpen, Code, ExternalLink, Film, Laptop, Music, Plus, Search, Tag, Youtube } from "lucide-react"

// Mock data for archive
const mockLearningWebsites = [
  {
    id: 1,
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    description: "Comprehensive documentation for web technologies",
    category: "Programming",
    tags: ["Web Development", "JavaScript", "HTML", "CSS"],
    dateAdded: "2023-01-15",
  },
  {
    id: 2,
    title: "freeCodeCamp",
    url: "https://www.freecodecamp.org",
    description: "Free coding tutorials and certification courses",
    category: "Programming",
    tags: ["Web Development", "JavaScript", "Python", "Data Science"],
    dateAdded: "2023-02-10",
  },
  {
    id: 3,
    title: "Khan Academy",
    url: "https://www.khanacademy.org",
    description: "Free courses in math, science, and more",
    category: "Education",
    tags: ["Math", "Science", "Economics", "Free"],
    dateAdded: "2023-01-05",
  },
  {
    id: 4,
    title: "Coursera",
    url: "https://www.coursera.org",
    description: "Online courses from top universities",
    category: "Education",
    tags: ["University", "Certificates", "Professional"],
    dateAdded: "2023-03-20",
  },
  {
    id: 5,
    title: "MIT OpenCourseWare",
    url: "https://ocw.mit.edu",
    description: "Free MIT course materials",
    category: "Education",
    tags: ["University", "Engineering", "Computer Science"],
    dateAdded: "2023-02-15",
  },
]

const mockYoutubeChannels = [
  {
    id: 1,
    title: "Fireship",
    url: "https://www.youtube.com/c/Fireship",
    description: "Quick, practical web development videos",
    category: "Programming",
    tags: ["Web Development", "JavaScript", "Quick Tutorials"],
    dateAdded: "2023-01-10",
  },
  {
    id: 2,
    title: "3Blue1Brown",
    url: "https://www.youtube.com/c/3blue1brown",
    description: "Animated math explanations",
    category: "Education",
    tags: ["Math", "Animations", "Explanations"],
    dateAdded: "2023-02-05",
  },
  {
    id: 3,
    title: "Computerphile",
    url: "https://www.youtube.com/user/Computerphile",
    description: "Computer science concepts explained",
    category: "Technology",
    tags: ["Computer Science", "Algorithms", "Programming"],
    dateAdded: "2023-03-15",
  },
  {
    id: 4,
    title: "Kurzgesagt – In a Nutshell",
    url: "https://www.youtube.com/c/inanutshell",
    description: "Animated science videos",
    category: "Science",
    tags: ["Science", "Animations", "Educational"],
    dateAdded: "2023-01-20",
  },
  {
    id: 5,
    title: "The Coding Train",
    url: "https://www.youtube.com/c/TheCodingTrain",
    description: "Creative coding tutorials",
    category: "Programming",
    tags: ["Creative Coding", "JavaScript", "Processing"],
    dateAdded: "2023-02-25",
  },
]

const mockBlogs = [
  {
    id: 1,
    title: "CSS-Tricks",
    url: "https://css-tricks.com",
    description: "Tips, tricks, and techniques on using CSS",
    category: "Web Development",
    tags: ["CSS", "Web Design", "Frontend"],
    dateAdded: "2023-01-05",
  },
  {
    id: 2,
    title: "Smashing Magazine",
    url: "https://www.smashingmagazine.com",
    description: "Professional web design and development articles",
    category: "Web Development",
    tags: ["Web Design", "UX", "Frontend"],
    dateAdded: "2023-02-10",
  },
  {
    id: 3,
    title: "A List Apart",
    url: "https://alistapart.com",
    description: "Web design, development, and best practices",
    category: "Web Development",
    tags: ["Web Standards", "Accessibility", "UX"],
    dateAdded: "2023-03-15",
  },
  {
    id: 4,
    title: "Wait But Why",
    url: "https://waitbutwhy.com",
    description: "Long-form explanations of complex topics",
    category: "General",
    tags: ["Science", "Philosophy", "Technology"],
    dateAdded: "2023-01-20",
  },
  {
    id: 5,
    title: "Coding Horror",
    url: "https://blog.codinghorror.com",
    description: "Programming and human factors",
    category: "Programming",
    tags: ["Software Development", "Programming Culture"],
    dateAdded: "2023-02-25",
  },
]

const mockMovieSites = [
  {
    id: 1,
    title: "Netflix",
    url: "https://www.netflix.com",
    description: "Streaming service with a wide variety of content",
    category: "Streaming",
    tags: ["Movies", "TV Shows", "Originals"],
    dateAdded: "2023-01-10",
  },
  {
    id: 2,
    title: "HBO Max",
    url: "https://www.hbomax.com",
    description: "HBO's streaming platform with premium content",
    category: "Streaming",
    tags: ["Movies", "TV Shows", "HBO Originals"],
    dateAdded: "2023-02-15",
  },
  {
    id: 3,
    title: "Disney+",
    url: "https://www.disneyplus.com",
    description: "Disney's streaming service",
    category: "Streaming",
    tags: ["Disney", "Marvel", "Star Wars"],
    dateAdded: "2023-03-20",
  },
  {
    id: 4,
    title: "IMDb",
    url: "https://www.imdb.com",
    description: "Movie and TV show database",
    category: "Reference",
    tags: ["Movies", "TV Shows", "Ratings"],
    dateAdded: "2023-01-25",
  },
  {
    id: 5,
    title: "Letterboxd",
    url: "https://letterboxd.com",
    description: "Social platform for sharing film reviews and lists",
    category: "Social",
    tags: ["Movies", "Reviews", "Lists"],
    dateAdded: "2023-02-05",
  },
]

const mockMusicCollection = [
  {
    id: 1,
    title: "Spotify",
    url: "https://open.spotify.com",
    description: "Music streaming platform",
    category: "Streaming",
    tags: ["Music", "Playlists", "Podcasts"],
    dateAdded: "2023-01-15",
  },
  {
    id: 2,
    title: "Bandcamp",
    url: "https://bandcamp.com",
    description: "Platform for independent musicians",
    category: "Indie",
    tags: ["Independent Music", "Albums", "Direct Support"],
    dateAdded: "2023-02-20",
  },
  {
    id: 3,
    title: "SoundCloud",
    url: "https://soundcloud.com",
    description: "Audio platform for creators",
    category: "Streaming",
    tags: ["Music", "Podcasts", "Independent Artists"],
    dateAdded: "2023-03-25",
  },
  {
    id: 4,
    title: "Classical Archives",
    url: "https://www.classicalarchives.com",
    description: "Classical music collection",
    category: "Classical",
    tags: ["Classical Music", "Composers", "Recordings"],
    dateAdded: "2023-01-30",
  },
  {
    id: 5,
    title: "NPR Music",
    url: "https://www.npr.org/music",
    description: "Music news, reviews, and performances",
    category: "News",
    tags: ["Music News", "Live Sessions", "Reviews"],
    dateAdded: "2023-02-10",
  },
]

const mockCodeRepos = [
  {
    id: 1,
    title: "VS Code",
    url: "https://github.com/microsoft/vscode",
    description: "Visual Studio Code source code",
    category: "Editor",
    tags: ["TypeScript", "Editor", "Microsoft"],
    dateAdded: "2023-01-05",
  },
  {
    id: 2,
    title: "React",
    url: "https://github.com/facebook/react",
    description: "React JavaScript library",
    category: "Frontend",
    tags: ["JavaScript", "UI Library", "Facebook"],
    dateAdded: "2023-02-10",
  },
  {
    id: 3,
    title: "TensorFlow",
    url: "https://github.com/tensorflow/tensorflow",
    description: "Machine learning framework",
    category: "Machine Learning",
    tags: ["Python", "Machine Learning", "Google"],
    dateAdded: "2023-03-15",
  },
  {
    id: 4,
    title: "Linux",
    url: "https://github.com/torvalds/linux",
    description: "Linux kernel source code",
    category: "Operating System",
    tags: ["C", "Kernel", "Operating System"],
    dateAdded: "2023-01-20",
  },
  {
    id: 5,
    title: "Next.js",
    url: "https://github.com/vercel/next.js",
    description: "React framework for production",
    category: "Frontend",
    tags: ["JavaScript", "React", "Framework"],
    dateAdded: "2023-02-25",
  },
]

const mockLinuxDistros = [
  {
    id: 1,
    title: "Arch Linux",
    url: "https://archlinux.org",
    description: "Lightweight and flexible Linux distribution",
    category: "Linux",
    tags: ["Rolling Release", "Customizable", "Pacman"],
    dateAdded: "2023-01-10",
  },
  {
    id: 2,
    title: "Ubuntu",
    url: "https://ubuntu.com",
    description: "User-friendly Linux distribution",
    category: "Linux",
    tags: ["Debian-based", "User-friendly", "LTS"],
    dateAdded: "2023-02-15",
  },
  {
    id: 3,
    title: "Fedora",
    url: "https://getfedora.org",
    description: "Cutting-edge Linux distribution",
    category: "Linux",
    tags: ["Red Hat", "Workstation", "Server"],
    dateAdded: "2023-03-20",
  },
  {
    id: 4,
    title: "Debian",
    url: "https://www.debian.org",
    description: "Stable and reliable Linux distribution",
    category: "Linux",
    tags: ["Stable", "Free Software", "Universal OS"],
    dateAdded: "2023-01-25",
  },
  {
    id: 5,
    title: "Pop!_OS",
    url: "https://pop.system76.com",
    description: "Linux distribution by System76",
    category: "Linux",
    tags: ["Ubuntu-based", "NVIDIA Support", "Tiling"],
    dateAdded: "2023-02-05",
  },
]

const categories = [
  "All",
  "Programming",
  "Education",
  "Technology",
  "Science",
  "Web Development",
  "Streaming",
  "Reference",
  "Linux",
]

export default function ArchivePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isNewItemOpen, setIsNewItemOpen] = useState(false)
  const [newItem, setNewItem] = useState({
    title: "",
    url: "",
    description: "",
    category: "Programming",
    tags: "",
    section: "learning",
  })

  const [learningWebsites, setLearningWebsites] = useState(mockLearningWebsites)
  const [youtubeChannels, setYoutubeChannels] = useState(mockYoutubeChannels)
  const [blogs, setBlogs] = useState(mockBlogs)
  const [movieSites, setMovieSites] = useState(mockMovieSites)
  const [musicCollection, setMusicCollection] = useState(mockMusicCollection)
  const [codeRepos, setCodeRepos] = useState(mockCodeRepos)
  const [linuxDistros, setLinuxDistros] = useState(mockLinuxDistros)

  const filterItems = (items) => {
    return items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }

  const filteredLearningWebsites = filterItems(learningWebsites)
  const filteredYoutubeChannels = filterItems(youtubeChannels)
  const filteredBlogs = filterItems(blogs)
  const filteredMovieSites = filterItems(movieSites)
  const filteredMusicCollection = filterItems(musicCollection)
  const filteredCodeRepos = filterItems(codeRepos)
  const filteredLinuxDistros = filterItems(linuxDistros)

  const handleAddItem = () => {
    const newItemObj = {
      id: Date.now(),
      title: newItem.title,
      url: newItem.url,
      description: newItem.description,
      category: newItem.category,
      tags: newItem.tags.split(",").map((tag) => tag.trim()),
      dateAdded: new Date().toISOString().split("T")[0],
    }

    switch (newItem.section) {
      case "learning":
        setLearningWebsites([newItemObj, ...learningWebsites])
        break
      case "youtube":
        setYoutubeChannels([newItemObj, ...youtubeChannels])
        break
      case "blogs":
        setBlogs([newItemObj, ...blogs])
        break
      case "movies":
        setMovieSites([newItemObj, ...movieSites])
        break
      case "music":
        setMusicCollection([newItemObj, ...musicCollection])
        break
      case "code":
        setCodeRepos([newItemObj, ...codeRepos])
        break
      case "linux":
        setLinuxDistros([newItemObj, ...linuxDistros])
        break
    }

    setIsNewItemOpen(false)
    setNewItem({
      title: "",
      url: "",
      description: "",
      category: "Programming",
      tags: "",
      section: "learning",
    })
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const renderResourceCard = (item, index, icon) => (
    <motion.div
      key={item.id}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{item.title}</CardTitle>
            <Badge variant="outline">{item.category}</Badge>
          </div>
          <CardDescription>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-blue-500 hover:underline"
            >
              <ExternalLink className="h-3 w-3 mr-1" /> {item.url}
            </a>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-3">{item.description}</p>
          <div className="flex flex-wrap gap-1 mt-3">
            {item.tags.map((tag, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                <Tag className="h-3 w-3 mr-1" /> {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-0">
          <div className="flex items-center text-xs text-muted-foreground">
            {icon}
            <span className="ml-1">Added: {item.dateAdded}</span>
          </div>
          <Button variant="ghost" size="sm">
            Visit
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )

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
          <h1 className="text-3xl font-bold tracking-tight">Archive</h1>
          <p className="text-muted-foreground">Your collection of resources, websites, and references</p>
        </div>
        <Dialog open={isNewItemOpen} onOpenChange={setIsNewItemOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Resource</DialogTitle>
              <DialogDescription>Add a new website, channel, or resource to your archive.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="section">Section</Label>
                <Select value={newItem.section} onValueChange={(value) => setNewItem({ ...newItem, section: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="learning">Learning Websites</SelectItem>
                    <SelectItem value="youtube">YouTube Channels</SelectItem>
                    <SelectItem value="blogs">Blogs</SelectItem>
                    <SelectItem value="movies">Movie Sites</SelectItem>
                    <SelectItem value="music">Music Collection</SelectItem>
                    <SelectItem value="code">Code Repositories</SelectItem>
                    <SelectItem value="linux">Linux Distros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  placeholder="Resource title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  value={newItem.url}
                  onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  placeholder="Brief description"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select value={newItem.category} onValueChange={(value) => setNewItem({ ...newItem, category: value })}>
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
                  value={newItem.tags}
                  onChange={(e) => setNewItem({ ...newItem, tags: e.target.value })}
                  placeholder="tag1, tag2, tag3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewItemOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddItem}>Add Resource</Button>
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
            placeholder="Search resources..."
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

      <Tabs defaultValue="learning" className="w-full">
        <TabsList className="mb-4 flex flex-wrap h-auto">
          <TabsTrigger value="learning">Learning</TabsTrigger>
          <TabsTrigger value="youtube">YouTube</TabsTrigger>
          <TabsTrigger value="blogs">Blogs</TabsTrigger>
          <TabsTrigger value="movies">Movies</TabsTrigger>
          <TabsTrigger value="music">Music</TabsTrigger>
          <TabsTrigger value="code">Code Repos</TabsTrigger>
          <TabsTrigger value="linux">Linux Distros</TabsTrigger>
        </TabsList>

        <TabsContent value="learning" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLearningWebsites.map((item, index) =>
              renderResourceCard(item, index, <BookOpen className="h-3 w-3" />),
            )}
          </div>
        </TabsContent>

        <TabsContent value="youtube" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredYoutubeChannels.map((item, index) =>
              renderResourceCard(item, index, <Youtube className="h-3 w-3" />),
            )}
          </div>
        </TabsContent>

        <TabsContent value="blogs" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBlogs.map((item, index) => renderResourceCard(item, index, <BookOpen className="h-3 w-3" />))}
          </div>
        </TabsContent>

        <TabsContent value="movies" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMovieSites.map((item, index) => renderResourceCard(item, index, <Film className="h-3 w-3" />))}
          </div>
        </TabsContent>

        <TabsContent value="music" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMusicCollection.map((item, index) =>
              renderResourceCard(item, index, <Music className="h-3 w-3" />),
            )}
          </div>
        </TabsContent>

        <TabsContent value="code" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCodeRepos.map((item, index) => renderResourceCard(item, index, <Code className="h-3 w-3" />))}
          </div>
        </TabsContent>

        <TabsContent value="linux" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLinuxDistros.map((item, index) => renderResourceCard(item, index, <Laptop className="h-3 w-3" />))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

