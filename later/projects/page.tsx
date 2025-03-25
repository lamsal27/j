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
import { Progress } from "@/components/ui/progress"
import { Calendar, CheckCircle2, Edit, Plus, Search, Trash } from "lucide-react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"

// Mock data for projects
const mockProjects = [
  {
    id: "1",
    title: "Personal Portfolio Website",
    description: "Develop a modern portfolio website to showcase my projects and skills.",
    status: "In Progress",
    priority: "High",
    deadline: "2023-05-15",
    progress: 65,
    tags: ["React", "Next.js", "TailwindCSS"],
    tasks: [
      { id: "task-1-1", content: "Design website mockup", completed: true },
      { id: "task-1-2", content: "Set up React project structure", completed: true },
      { id: "task-1-3", content: "Implement responsive design", completed: false },
      { id: "task-1-4", content: "Add project showcase section", completed: false },
    ],
  },
  {
    id: "2",
    title: "Mobile App Development",
    description: "Create a cross-platform mobile app using React Native.",
    status: "Planning",
    priority: "Medium",
    deadline: "2023-06-10",
    progress: 25,
    tags: ["React Native", "Mobile", "TypeScript"],
    tasks: [
      { id: "task-2-1", content: "Research app requirements", completed: true },
      { id: "task-2-2", content: "Create wireframes", completed: false },
      { id: "task-2-3", content: "Set up development environment", completed: false },
      { id: "task-2-4", content: "Implement authentication", completed: false },
    ],
  },
  {
    id: "3",
    title: "Blog Platform",
    description: "Build a personal blog platform using Next.js and a headless CMS.",
    status: "Completed",
    priority: "High",
    deadline: "2023-03-20",
    progress: 100,
    tags: ["Next.js", "CMS", "Markdown"],
    tasks: [
      { id: "task-3-1", content: "Choose headless CMS", completed: true },
      { id: "task-3-2", content: "Design blog layout", completed: true },
      { id: "task-3-3", content: "Implement content fetching", completed: true },
      { id: "task-3-4", content: "Deploy to Vercel", completed: true },
    ],
  },
  {
    id: "4",
    title: "Open Source Contribution",
    description: "Contribute to open source projects to improve skills and give back to the community.",
    status: "In Progress",
    priority: "High",
    deadline: "2023-07-05",
    progress: 40,
    tags: ["Open Source", "GitHub", "Collaboration"],
    tasks: [
      { id: "task-4-1", content: "Find suitable projects", completed: true },
      { id: "task-4-2", content: "Set up local development", completed: true },
      { id: "task-4-3", content: "Fix reported issues", completed: false },
      { id: "task-4-4", content: "Submit pull requests", completed: false },
    ],
  },
  {
    id: "5",
    title: "Learn Machine Learning",
    description: "Study machine learning concepts and implement practical projects.",
    status: "Planning",
    priority: "Medium",
    deadline: "2023-08-15",
    progress: 15,
    tags: ["Python", "ML", "Data Science"],
    tasks: [
      { id: "task-5-1", content: "Complete online course", completed: true },
      { id: "task-5-2", content: "Practice with datasets", completed: false },
      { id: "task-5-3", content: "Build prediction model", completed: false },
      { id: "task-5-4", content: "Deploy model as web service", completed: false },
    ],
  },
  {
    id: "6",
    title: "Tech Conference Presentation",
    description: "Prepare and deliver a presentation at an upcoming tech conference.",
    status: "In Progress",
    priority: "Low",
    deadline: "2023-05-30",
    progress: 50,
    tags: ["Speaking", "Presentation", "Conference"],
    tasks: [
      { id: "task-6-1", content: "Research topic", completed: true },
      { id: "task-6-2", content: "Create presentation slides", completed: true },
      { id: "task-6-3", content: "Practice delivery", completed: false },
      { id: "task-6-4", content: "Gather feedback", completed: false },
    ],
  },
]

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [projects, setProjects] = useState(mockProjects)
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false)
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    status: "Planning",
    priority: "Medium",
    deadline: "",
    progress: 0,
    tags: "",
    tasks: [],
  })
  const [newTask, setNewTask] = useState("")

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = selectedStatus === "All" || project.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  const handleAddProject = () => {
    const newProjectObj = {
      id: (projects.length + 1).toString(),
      ...newProject,
      tags: typeof newProject.tags === "string" ? newProject.tags.split(",").map((tag) => tag.trim()) : newProject.tags,
      tasks: newProject.tasks.map((task, index) => ({
        id: `task-${projects.length + 1}-${index + 1}`,
        content: task,
        completed: false,
      })),
    }

    setProjects([newProjectObj, ...projects])
    setIsNewProjectOpen(false)
    setNewProject({
      title: "",
      description: "",
      status: "Planning",
      priority: "Medium",
      deadline: "",
      progress: 0,
      tags: "",
      tasks: [],
    })
  }

  const handleAddTask = () => {
    if (newTask.trim()) {
      setNewProject({
        ...newProject,
        tasks: [...newProject.tasks, newTask],
      })
      setNewTask("")
    }
  }

  const handleRemoveTask = (index) => {
    const updatedTasks = [...newProject.tasks]
    updatedTasks.splice(index, 1)
    setNewProject({
      ...newProject,
      tasks: updatedTasks,
    })
  }

  const onDragEnd = (result) => {
    if (!result.destination) return

    const { source, destination } = result

    if (source.droppableId === destination.droppableId) {
      const projectId = source.droppableId
      const projectIndex = projects.findIndex((project) => project.id === projectId)

      if (projectIndex !== -1) {
        const newProjects = [...projects]
        const tasks = [...newProjects[projectIndex].tasks]
        const [removed] = tasks.splice(source.index, 1)
        tasks.splice(destination.index, 0, removed)

        newProjects[projectIndex].tasks = tasks
        setProjects(newProjects)
      }
    }
  }

  const toggleTaskCompletion = (projectId, taskIndex) => {
    const projectIndex = projects.findIndex((project) => project.id === projectId)

    if (projectIndex !== -1) {
      const newProjects = [...projects]
      const tasks = [...newProjects[projectIndex].tasks]
      tasks[taskIndex].completed = !tasks[taskIndex].completed

      // Update progress
      const completedTasks = tasks.filter((task) => task.completed).length
      const progress = Math.round((completedTasks / tasks.length) * 100)

      newProjects[projectIndex].tasks = tasks
      newProjects[projectIndex].progress = progress

      setProjects(newProjects)
    }
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
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage your projects and tasks</p>
        </div>
        <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
          <DialogTrigger asChild>
            <Button className="bg-zinc-800 hover:bg-zinc-700">
              <Plus className="mr-2 h-4 w-4" /> New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px] bg-zinc-900 border-zinc-800">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>Add a new project to your portfolio. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  placeholder="Project title"
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Project description"
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newProject.status}
                    onValueChange={(value) => setNewProject({ ...newProject, status: value })}
                  >
                    <SelectTrigger className="bg-zinc-800 border-zinc-700">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem value="Planning">Planning</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newProject.priority}
                    onValueChange={(value) => setNewProject({ ...newProject, priority: value })}
                  >
                    <SelectTrigger className="bg-zinc-800 border-zinc-700">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="deadline">Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={newProject.deadline}
                  onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={newProject.tags}
                  onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                  placeholder="React, Next.js, TailwindCSS"
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tasks">Tasks</Label>
                <div className="flex gap-2">
                  <Input
                    id="tasks"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a task"
                    className="bg-zinc-800 border-zinc-700"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddTask()
                      }
                    }}
                  />
                  <Button onClick={handleAddTask} className="bg-zinc-800 hover:bg-zinc-700">
                    Add
                  </Button>
                </div>
                {newProject.tasks.length > 0 && (
                  <ul className="mt-2 space-y-2">
                    {newProject.tasks.map((task, index) => (
                      <li key={index} className="flex items-center justify-between p-2 bg-zinc-800 rounded-md">
                        <span>{task}</span>
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveTask(index)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewProjectOpen(false)} className="border-zinc-700">
                Cancel
              </Button>
              <Button onClick={handleAddProject} className="bg-zinc-800 hover:bg-zinc-700">
                Save Project
              </Button>
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
            placeholder="Search projects..."
            className="pl-8 bg-zinc-800 border-zinc-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full md:w-[180px] bg-zinc-800 border-zinc-700">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-800">
            <SelectItem value="All">All Status</SelectItem>
            <SelectItem value="Planning">Planning</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4 bg-zinc-800">
          <TabsTrigger value="all" className="data-[state=active]:bg-zinc-700">
            All Projects
          </TabsTrigger>
          <TabsTrigger value="high" className="data-[state=active]:bg-zinc-700">
            High Priority
          </TabsTrigger>
          <TabsTrigger value="in-progress" className="data-[state=active]:bg-zinc-700">
            In Progress
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <Badge
                        variant={
                          project.priority === "High"
                            ? "destructive"
                            : project.priority === "Medium"
                              ? "default"
                              : "outline"
                        }
                        className={project.priority === "Medium" ? "bg-zinc-700 hover:bg-zinc-600" : ""}
                      >
                        {project.priority}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <Badge
                        variant={
                          project.status === "Completed"
                            ? "default"
                            : project.status === "In Progress"
                              ? "secondary"
                              : "outline"
                        }
                        className="mr-2"
                      >
                        {project.status}
                      </Badge>
                      {project.deadline && (
                        <span className="flex items-center text-xs">
                          <Calendar className="h-3 w-3 mr-1" /> {project.deadline}
                        </span>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3 text-zinc-300">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.tags.map((tag, i) => (
                        <Badge key={i} variant="outline" className="text-xs border-zinc-700 bg-zinc-800">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable droppableId={project.id}>
                        {(provided) => (
                          <ul className="space-y-2" {...provided.droppableProps} ref={provided.innerRef}>
                            {project.tasks.map((task, taskIndex) => (
                              <Draggable key={task.id} draggableId={task.id} index={taskIndex}>
                                {(provided) => (
                                  <li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`flex items-center p-2 text-sm rounded-md ${
                                      task.completed ? "bg-zinc-800/80 line-through text-zinc-500" : "bg-zinc-800/50"
                                    }`}
                                  >
                                    <button
                                      className="mr-2 rounded-full border border-zinc-700 p-1"
                                      onClick={() => toggleTaskCompletion(project.id, taskIndex)}
                                    >
                                      {task.completed && <CheckCircle2 className="h-3 w-3 text-primary" />}
                                    </button>
                                    {task.content}
                                  </li>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </ul>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </CardContent>
                  <CardFooter className="flex justify-end pt-0">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
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

        <TabsContent value="high" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects
              .filter((project) => project.priority === "High")
              .map((project, index) => (
                <motion.div
                  key={project.id}
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <Badge variant="destructive">{project.priority}</Badge>
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        <Badge
                          variant={
                            project.status === "Completed"
                              ? "default"
                              : project.status === "In Progress"
                                ? "secondary"
                                : "outline"
                          }
                          className="mr-2"
                        >
                          {project.status}
                        </Badge>
                        {project.deadline && (
                          <span className="flex items-center text-xs">
                            <Calendar className="h-3 w-3 mr-1" /> {project.deadline}
                          </span>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-3 text-zinc-300">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs border-zinc-700 bg-zinc-800">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      <ul className="space-y-2">
                        {project.tasks.map((task, taskIndex) => (
                          <li
                            key={task.id}
                            className={`flex items-center p-2 text-sm rounded-md ${
                              task.completed ? "bg-zinc-800/80 line-through text-zinc-500" : "bg-zinc-800/50"
                            }`}
                          >
                            <button
                              className="mr-2 rounded-full border border-zinc-700 p-1"
                              onClick={() => toggleTaskCompletion(project.id, taskIndex)}
                            >
                              {task.completed && <CheckCircle2 className="h-3 w-3 text-primary" />}
                            </button>
                            {task.content}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="flex justify-end pt-0">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
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

        <TabsContent value="in-progress" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects
              .filter((project) => project.status === "In Progress")
              .map((project, index) => (
                <motion.div
                  key={project.id}
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <Badge
                          variant={
                            project.priority === "High"
                              ? "destructive"
                              : project.priority === "Medium"
                                ? "default"
                                : "outline"
                          }
                          className={project.priority === "Medium" ? "bg-zinc-700 hover:bg-zinc-600" : ""}
                        >
                          {project.priority}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        <Badge variant="secondary" className="mr-2">
                          In Progress
                        </Badge>
                        {project.deadline && (
                          <span className="flex items-center text-xs">
                            <Calendar className="h-3 w-3 mr-1" /> {project.deadline}
                          </span>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-3 text-zinc-300">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs border-zinc-700 bg-zinc-800">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      <ul className="space-y-2">
                        {project.tasks.map((task, taskIndex) => (
                          <li
                            key={task.id}
                            className={`flex items-center p-2 text-sm rounded-md ${
                              task.completed ? "bg-zinc-800/80 line-through text-zinc-500" : "bg-zinc-800/50"
                            }`}
                          >
                            <button
                              className="mr-2 rounded-full border border-zinc-700 p-1"
                              onClick={() => toggleTaskCompletion(project.id, taskIndex)}
                            >
                              {task.completed && <CheckCircle2 className="h-3 w-3 text-primary" />}
                            </button>
                            {task.content}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="flex justify-end pt-0">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
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

