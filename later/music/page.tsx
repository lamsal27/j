"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
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
import {
  Heart,
  ListMusic,
  Mic2,
  Music,
  Music2,
  Pause,
  Play,
  Plus,
  Repeat,
  Search,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react"

// Mock data for playlists
const mockPlaylists = [
  {
    id: 1,
    name: "Chill Vibes",
    description: "Relaxing tunes for work and study",
    coverImage: "/placeholder.svg?height=150&width=150",
    songs: [
      { id: 1, title: "Midnight City", artist: "M83", album: "Hurry Up, We're Dreaming", duration: "4:03" },
      { id: 2, title: "Intro", artist: "The xx", album: "xx", duration: "2:07" },
      { id: 3, title: "Flickers", artist: "Bonobo", album: "Migration", duration: "5:41" },
      { id: 4, title: "Breathe", artist: "Télépopmusik", album: "Genetic World", duration: "4:39" },
      { id: 5, title: "Daylight", artist: "Joji", album: "Nectar", duration: "2:43" },
    ],
  },
  {
    id: 2,
    name: "Workout Mix",
    description: "High energy tracks to keep you motivated",
    coverImage: "/placeholder.svg?height=150&width=150",
    songs: [
      { id: 6, title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", duration: "3:20" },
      { id: 7, title: "Physical", artist: "Dua Lipa", album: "Future Nostalgia", duration: "3:41" },
      { id: 8, title: "Power", artist: "Kanye West", album: "My Beautiful Dark Twisted Fantasy", duration: "4:52" },
      { id: 9, title: "Stronger", artist: "Kanye West", album: "Graduation", duration: "5:11" },
      { id: 10, title: "Don't Stop Me Now", artist: "Queen", album: "Jazz", duration: "3:29" },
    ],
  },
  {
    id: 3,
    name: "Coding Focus",
    description: "Ambient and electronic music for deep work",
    coverImage: "/placeholder.svg?height=150&width=150",
    songs: [
      { id: 11, title: "Strobe", artist: "deadmau5", album: "For Lack of a Better Name", duration: "10:33" },
      { id: 12, title: "Avril 14th", artist: "Aphex Twin", album: "Drukqs", duration: "2:05" },
      { id: 13, title: "Noctuary", artist: "Bonobo", album: "Black Sands", duration: "3:24" },
      { id: 14, title: "Kiara", artist: "Bonobo", album: "Black Sands", duration: "3:50" },
      { id: 15, title: "Dayvan Cowboy", artist: "Boards of Canada", album: "The Campfire Headphase", duration: "5:00" },
    ],
  },
  {
    id: 4,
    name: "Indie Discoveries",
    description: "New and upcoming indie artists",
    coverImage: "/placeholder.svg?height=150&width=150",
    songs: [
      { id: 16, title: "Motion Sickness", artist: "Phoebe Bridgers", album: "Stranger in the Alps", duration: "3:54" },
      { id: 17, title: "Scott Street", artist: "Phoebe Bridgers", album: "Stranger in the Alps", duration: "5:05" },
      { id: 18, title: "Garden Song", artist: "Phoebe Bridgers", album: "Punisher", duration: "2:57" },
      { id: 19, title: "Kyoto", artist: "Phoebe Bridgers", album: "Punisher", duration: "3:04" },
      { id: 20, title: "I Know The End", artist: "Phoebe Bridgers", album: "Punisher", duration: "5:44" },
    ],
  },
  {
    id: 5,
    name: "Classic Rock Essentials",
    description: "Timeless rock classics",
    coverImage: "/placeholder.svg?height=150&width=150",
    songs: [
      { id: 21, title: "Stairway to Heaven", artist: "Led Zeppelin", album: "Led Zeppelin IV", duration: "8:02" },
      { id: 22, title: "Bohemian Rhapsody", artist: "Queen", album: "A Night at the Opera", duration: "5:55" },
      { id: 23, title: "Hotel California", artist: "Eagles", album: "Hotel California", duration: "6:30" },
      {
        id: 24,
        title: "Sweet Child O' Mine",
        artist: "Guns N' Roses",
        album: "Appetite for Destruction",
        duration: "5:56",
      },
      { id: 25, title: "Comfortably Numb", artist: "Pink Floyd", album: "The Wall", duration: "6:23" },
    ],
  },
]

// Mock data for recently played songs
const recentlyPlayed = [
  {
    id: 1,
    title: "Midnight City",
    artist: "M83",
    album: "Hurry Up, We're Dreaming",
    coverImage: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 12,
    title: "Avril 14th",
    artist: "Aphex Twin",
    album: "Drukqs",
    coverImage: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 22,
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    coverImage: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 7,
    title: "Physical",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    coverImage: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 19,
    title: "Kyoto",
    artist: "Phoebe Bridgers",
    album: "Punisher",
    coverImage: "/placeholder.svg?height=50&width=50",
  },
]

export default function MusicPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPlaylist, setCurrentPlaylist] = useState(mockPlaylists[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(currentPlaylist.songs[0])
  const [isNewPlaylistOpen, setIsNewPlaylistOpen] = useState(false)
  const [newPlaylist, setNewPlaylist] = useState({
    name: "",
    description: "",
  })

  const filteredPlaylists = mockPlaylists.filter((playlist) => {
    return playlist.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const handleAddPlaylist = () => {
    // In a real app, this would add the playlist to the database
    setIsNewPlaylistOpen(false)
    setNewPlaylist({
      name: "",
      description: "",
    })
  }

  const playSong = (song) => {
    setCurrentSong(song)
    setIsPlaying(true)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
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
          <h1 className="text-3xl font-bold tracking-tight">Music</h1>
          <p className="text-muted-foreground">Your playlists and favorite songs</p>
        </div>
        <Dialog open={isNewPlaylistOpen} onOpenChange={setIsNewPlaylistOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Playlist
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Playlist</DialogTitle>
              <DialogDescription>Create a new playlist to organize your music.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Playlist Name</Label>
                <Input
                  id="name"
                  value={newPlaylist.name}
                  onChange={(e) => setNewPlaylist({ ...newPlaylist, name: e.target.value })}
                  placeholder="My Awesome Playlist"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newPlaylist.description}
                  onChange={(e) => setNewPlaylist({ ...newPlaylist, description: e.target.value })}
                  placeholder="Describe your playlist..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewPlaylistOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPlaylist}>Create Playlist</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left sidebar - Playlists */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full md:w-64 lg:w-80 shrink-0"
        >
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search playlists..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold mb-3">Your Playlists</h2>
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="space-y-2 pr-4">
                {filteredPlaylists.map((playlist) => (
                  <div
                    key={playlist.id}
                    className={`flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-zinc-800/50 ${
                      currentPlaylist.id === playlist.id ? "bg-zinc-800/50" : ""
                    }`}
                    onClick={() => setCurrentPlaylist(playlist)}
                  >
                    <Avatar className="h-10 w-10 rounded-md">
                      <AvatarImage src={playlist.coverImage} alt={playlist.name} />
                      <AvatarFallback className="rounded-md">
                        <Music className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{playlist.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{playlist.songs.length} songs</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-3">Recently Played</h2>
              <div className="space-y-2">
                {recentlyPlayed.map((song) => (
                  <div
                    key={song.id}
                    className="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-zinc-800/50"
                    onClick={() => playSong(song)}
                  >
                    <Avatar className="h-8 w-8 rounded-md">
                      <AvatarImage src={song.coverImage} alt={song.title} />
                      <AvatarFallback className="rounded-md">
                        <Music2 className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{song.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main content - Current playlist */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1"
        >
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <Avatar className="h-24 w-24 rounded-md">
                  <AvatarImage src={currentPlaylist.coverImage} alt={currentPlaylist.name} />
                  <AvatarFallback className="rounded-md">
                    <ListMusic className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Badge variant="outline" className="mb-2">
                    Playlist
                  </Badge>
                  <CardTitle className="text-2xl">{currentPlaylist.name}</CardTitle>
                  <CardDescription>{currentPlaylist.description}</CardDescription>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <span>{currentPlaylist.songs.length} songs</span>
                    <span>•</span>
                    <span>
                      {currentPlaylist.songs.reduce((acc, song) => {
                        const [min, sec] = song.duration.split(":")
                        return acc + Number.parseInt(min) * 60 + Number.parseInt(sec)
                      }, 0) / 60}
                      min
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mt-4">
                <div className="grid grid-cols-12 text-xs uppercase text-muted-foreground font-medium py-2 border-b border-zinc-800">
                  <div className="col-span-1">#</div>
                  <div className="col-span-5">Title</div>
                  <div className="col-span-3 hidden md:block">Album</div>
                  <div className="col-span-2 text-right md:text-left">Duration</div>
                  <div className="col-span-1"></div>
                </div>

                {currentPlaylist.songs.map((song, index) => (
                  <div
                    key={song.id}
                    className={`grid grid-cols-12 text-sm py-2 px-1 rounded-md hover:bg-zinc-800/50 ${
                      currentSong.id === song.id ? "bg-zinc-800/50" : ""
                    }`}
                    onClick={() => playSong(song)}
                  >
                    <div className="col-span-1 flex items-center">
                      {currentSong.id === song.id && isPlaying ? (
                        <div className="w-4 h-4 flex items-center justify-center text-primary">
                          <span className="animate-pulse">▶</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">{index + 1}</span>
                      )}
                    </div>
                    <div className="col-span-5 flex items-center gap-3 truncate">
                      <div className="truncate">
                        <p className="truncate font-medium">{song.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
                      </div>
                    </div>
                    <div className="col-span-3 hidden md:flex items-center text-muted-foreground truncate">
                      {song.album}
                    </div>
                    <div className="col-span-2 flex items-center justify-end md:justify-start text-muted-foreground">
                      {song.duration}
                    </div>
                    <div className="col-span-1 flex items-center justify-end">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Music player */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 p-3 z-10"
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Avatar className="h-12 w-12 rounded-md">
              <AvatarImage src="/placeholder.svg?height=48&width=48" alt={currentSong.title} />
              <AvatarFallback className="rounded-md">
                <Music2 className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="font-medium truncate">{currentSong.title}</p>
              <p className="text-sm text-muted-foreground truncate">{currentSong.artist}</p>
            </div>
            <Button variant="ghost" size="icon" className="ml-2 text-muted-foreground hover:text-primary">
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 max-w-2xl">
            <div className="flex items-center justify-center gap-4">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Shuffle className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={togglePlayPause}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <SkipForward className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Repeat className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-muted-foreground">1:21</span>
              <Slider defaultValue={[33]} max={100} step={1} className="flex-1" />
              <span className="text-xs text-muted-foreground">{currentSong.duration}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <Mic2 className="h-4 w-4 text-muted-foreground" />
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <Slider defaultValue={[70]} max={100} step={1} className="w-20" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

