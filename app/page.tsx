"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Bell, CalendarIcon, CheckCircle2, Clock, Star } from "lucide-react"
import { motion } from "framer-motion"

export default function Dashboard() {
  const [greeting, setGreeting] = useState("")
  const [date, setDate] = useState(new Date())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")
  }, [])

  if (!mounted) return null

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.5 }} className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{greeting}, Siddharth</h1>
        <p className="text-muted-foreground">Here's what's happening with your projects today.</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.5, delay: 0.1 }}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Tasks Due Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">+2 from yesterday</p>
              <div className="mt-4">
                <Progress value={42} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.5, delay: 0.2 }}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Notes Created</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+3 from last week</p>
              <div className="mt-4">
                <Progress value={78} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.5, delay: 0.3 }}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Watchlist Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">8 in progress</p>
              <div className="mt-4">
                <Progress value={33} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.5, delay: 0.4 }}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Projects Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">2 due this week</p>
              <div className="mt-4">
                <Progress value={85} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="lg:col-span-4"
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest updates and activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    icon: CheckCircle2,
                    title: "Completed task: Update portfolio website",
                    time: "10 minutes ago",
                    category: "Work",
                  },
                  {
                    icon: Star,
                    title: "Added 'Everything Everywhere All at Once' to watchlist",
                    time: "2 hours ago",
                    category: "Watchlist",
                  },
                  { icon: Bell, title: "Reminder: Team meeting tomorrow", time: "5 hours ago", category: "Reminder" },
                  {
                    icon: Clock,
                    title: "Updated project deadline: Mobile app development",
                    time: "Yesterday",
                    category: "Work",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 rounded-lg border p-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{item.title}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="lg:col-span-3"
        >
          <Tabs defaultValue="calendar">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            </TabsList>
            <TabsContent value="calendar">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Calendar</CardTitle>
                  <CardDescription>Your schedule for the month</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="upcoming">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Upcoming Events</CardTitle>
                  <CardDescription>Your scheduled events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: "Team Standup Meeting", date: "Tomorrow, 10:00 AM" },
                      { title: "Client Presentation", date: "Friday, 2:00 PM" },
                      { title: "Code Review Session", date: "Saturday, 3:00 PM" },
                      { title: "Weekly Planning", date: "Monday, 9:00 AM" },
                    ].map((event, i) => (
                      <div key={i} className="flex items-center gap-4 rounded-lg border p-3">
                        <CalendarIcon className="h-4 w-4 text-primary" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{event.title}</p>
                          <p className="text-xs text-muted-foreground">{event.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}