"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Eye, EyeOff, FileCode, Plus, Search, Server } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Mock data for credentials and configs
const mockCredentials = [
  {
    id: 1,
    name: "GitHub Account",
    username: "siddharth.lamsal",
    password: "************",
    category: "Development",
    lastUpdated: "2023-03-15",
  },
  {
    id: 2,
    name: "Cloud Services",
    username: "admin",
    password: "************",
    category: "Security",
    lastUpdated: "2023-02-20",
  },
  {
    id: 3,
    name: "Email Account",
    username: "siddharth@example.com",
    password: "************",
    category: "Personal",
    lastUpdated: "2023-01-10",
  },
]

const mockConfigs = [
  {
    id: 1,
    name: "i3 Window Manager",
    path: "~/.config/i3/config",
    type: "Linux",
    lastModified: "2023-03-10",
    content:
      "# i3 config file\nset $mod Mod4\n\n# Font for window titles\nfont pango:monospace 8\n\n# Use Mouse+$mod to drag floating windows\nfloating_modifier $mod",
  },
  {
    id: 2,
    name: "Neovim Configuration",
    path: "~/.config/nvim/init.vim",
    type: "Linux",
    lastModified: "2023-02-15",
    content:
      '" Neovim Configuration\nset number\nset relativenumber\nset autoindent\nset tabstop=4\nset shiftwidth=4\nset mouse=a',
  },
  {
    id: 3,
    name: "Nginx Web Server",
    path: "/etc/nginx/nginx.conf",
    type: "Server",
    lastModified: "2023-03-15",
    content:
      "# Nginx Configuration\nuser nginx;\nworker_processes auto;\nerror_log /var/log/nginx/error.log warn;\npid /var/run/nginx.pid;",
  },
]

export default function DatabasePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [credentials, setCredentials] = useState(mockCredentials)
  const [configs, setConfigs] = useState(mockConfigs)
  const [showPassword, setShowPassword] = useState({})
  const [isNewCredentialOpen, setIsNewCredentialOpen] = useState(false)
  const [isNewConfigOpen, setIsNewConfigOpen] = useState(false)

  const [newCredential, setNewCredential] = useState({
    name: "",
    username: "",
    password: "",
    category: "Personal",
  })

  const [newConfig, setNewConfig] = useState({
    name: "",
    path: "",
    type: "Linux",
    content: "",
  })

  // Filter functions
  const filteredCredentials = credentials.filter((cred) => {
    const matchesSearch =
      cred.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cred.username.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || cred.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const filteredConfigs = configs.filter((config) => {
    const matchesSearch =
      config.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      config.path.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType =
      selectedCategory === "All" ||
      (selectedCategory === "Server" && config.type === "Server") ||
      (selectedCategory !== "Server" && config.type === "Linux")
    return matchesSearch && matchesType
  })

  // Handlers
  const handleAddCredential = () => {
    const newCredentialObj = {
      id: credentials.length + 1,
      ...newCredential,
      password: "************",
      lastUpdated: new Date().toISOString().split("T")[0],
    }
    setCredentials([newCredentialObj, ...credentials])
    setIsNewCredentialOpen(false)
    setNewCredential({ name: "", username: "", password: "", category: "Personal" })
  }

  const handleAddConfig = () => {
    const newConfigObj = {
      id: configs.length + 1,
      ...newConfig,
      lastModified: new Date().toISOString().split("T")[0],
    }
    setConfigs([newConfigObj, ...configs])
    setIsNewConfigOpen(false)
    setNewConfig({ name: "", path: "", type: "Linux", content: "" })
  }

  const togglePasswordVisibility = (id) => {
    setShowPassword((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert("Copied to clipboard")
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.5 }} className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Data & Database</h1>
        <p className="text-muted-foreground">Manage your configuration files and credentials</p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
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
            <SelectItem value="All">All Categories</SelectItem>
            <SelectItem value="Personal">Personal</SelectItem>
            <SelectItem value="Development">Development</SelectItem>
            <SelectItem value="Security">Security</SelectItem>
            <SelectItem value="Server">Server Configs</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="credentials" className="w-full">
        <TabsList className="mb-4 flex flex-wrap h-auto">
          <TabsTrigger value="credentials">Credentials</TabsTrigger>
          <TabsTrigger value="configs">Config Files</TabsTrigger>
        </TabsList>

        <TabsContent value="credentials">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Passwords & Credentials</h2>
            <Dialog open={isNewCredentialOpen} onOpenChange={setIsNewCredentialOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Credential
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px] max-w-[95vw]">
                <DialogHeader>
                  <DialogTitle>Add New Credential</DialogTitle>
                  <DialogDescription>Add a new password or credential to your database.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={newCredential.name}
                      onChange={(e) => setNewCredential({ ...newCredential, name: e.target.value })}
                      placeholder="e.g., Gmail Account"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={newCredential.username}
                      onChange={(e) => setNewCredential({ ...newCredential, username: e.target.value })}
                      placeholder="Username or Email"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={newCredential.password}
                      onChange={(e) => setNewCredential({ ...newCredential, password: e.target.value })}
                      placeholder="Password"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newCredential.category}
                      onValueChange={(value) => setNewCredential({ ...newCredential, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Personal">Personal</SelectItem>
                        <SelectItem value="Development">Development</SelectItem>
                        <SelectItem value="Security">Security</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsNewCredentialOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddCredential}>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Password</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCredentials.map((cred) => (
                  <TableRow key={cred.id}>
                    <TableCell className="font-medium">{cred.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span>{cred.username}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => copyToClipboard(cred.username)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span>{showPassword[cred.id] ? "actualPassword123" : cred.password}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => togglePasswordVisibility(cred.id)}
                        >
                          {showPassword[cred.id] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{cred.category}</Badge>
                    </TableCell>
                    <TableCell>{cred.lastUpdated}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="configs">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Configuration Files</h2>
            <Dialog open={isNewConfigOpen} onOpenChange={setIsNewConfigOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Config
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px] max-w-[95vw]">
                <DialogHeader>
                  <DialogTitle>Add New Configuration</DialogTitle>
                  <DialogDescription>Add a new configuration file to your database.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={newConfig.name}
                        onChange={(e) => setNewConfig({ ...newConfig, name: e.target.value })}
                        placeholder="e.g., i3 Window Manager"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="type">Type</Label>
                      <Select
                        value={newConfig.type}
                        onValueChange={(value) => setNewConfig({ ...newConfig, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Linux">Linux Config</SelectItem>
                          <SelectItem value="Server">Server Config</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="path">File Path</Label>
                    <Input
                      id="path"
                      value={newConfig.path}
                      onChange={(e) => setNewConfig({ ...newConfig, path: e.target.value })}
                      placeholder="e.g., ~/.config/i3/config"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="content">File Content</Label>
                    <Textarea
                      id="content"
                      value={newConfig.content}
                      onChange={(e) => setNewConfig({ ...newConfig, content: e.target.value })}
                      placeholder="Paste the configuration file content here..."
                      className="font-mono text-sm h-60"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsNewConfigOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddConfig}>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              {filteredConfigs.map((config) => (
                <AccordionItem key={config.id} value={`config-${config.id}`}>
                  <AccordionTrigger className="hover:bg-muted/50 px-4 rounded-md">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center">
                        {config.type === "Server" ? (
                          <Server className="h-4 w-4 mr-2 text-primary" />
                        ) : (
                          <FileCode className="h-4 w-4 mr-2 text-primary" />
                        )}
                        <span className="font-medium">{config.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{config.path}</span>
                        <span className="text-xs text-muted-foreground">Modified: {config.lastModified}</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-4 space-y-4">
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm" onClick={() => copyToClipboard(config.content)}>
                          <Copy className="h-3 w-3 mr-1" /> Copy
                        </Button>
                      </div>
                      <div className="relative">
                        <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs font-mono">
                          {config.content}
                        </pre>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

