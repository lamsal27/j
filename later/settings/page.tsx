"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useTheme } from "next-themes"
import { Download, Lock, Moon, Palette, Shield, Sun, Upload } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      updates: false,
      security: true,
    },
    appearance: {
      theme: "system",
      animations: true,
      compactMode: false,
    },
    security: {
      twoFactor: false,
      passwordReset: false,
      sessionTimeout: "30",
    },
    backup: {
      autoBackup: true,
      backupFrequency: "weekly",
      encryptBackups: true,
    },
    profile: {
      name: "Siddharth Lamsal",
      email: "siddharth@example.com",
      bio: "Software developer, open source contributor, and technology enthusiast.",
    },
  })

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
    if (theme) {
      setSettings((prev) => ({
        ...prev,
        appearance: {
          ...prev.appearance,
          theme: theme,
        },
      }))
    }
  }, [theme])

  const handleNotificationChange = (key, value) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: value,
      },
    })
    toast({
      title: "Notification settings updated",
      description: `${key} notifications ${value ? "enabled" : "disabled"}`,
    })
  }

  const handleAppearanceChange = (key, value) => {
    if (key === "theme") {
      setTheme(value)
    }

    setSettings({
      ...settings,
      appearance: {
        ...settings.appearance,
        [key]: value,
      },
    })

    if (key !== "theme") {
      toast({
        title: "Appearance settings updated",
        description: `${key} ${value ? "enabled" : "disabled"}`,
      })
    }
  }

  const handleSecurityChange = (key, value) => {
    setSettings({
      ...settings,
      security: {
        ...settings.security,
        [key]: value,
      },
    })
    toast({
      title: "Security settings updated",
      description: `${key} setting ${typeof value === "boolean" ? (value ? "enabled" : "disabled") : "changed to " + value}`,
    })
  }

  const handleBackupChange = (key, value) => {
    setSettings({
      ...settings,
      backup: {
        ...settings.backup,
        [key]: value,
      },
    })
    toast({
      title: "Backup settings updated",
      description: `${key} setting ${typeof value === "boolean" ? (value ? "enabled" : "disabled") : "changed to " + value}`,
    })
  }

  const handleProfileChange = (key, value) => {
    setSettings({
      ...settings,
      profile: {
        ...settings.profile,
        [key]: value,
      },
    })
  }

  const saveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved",
    })
  }

  const savePreferences = () => {
    toast({
      title: "Preferences saved",
      description: "Your account preferences have been updated",
    })
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  if (!mounted) return null

  return (
    <div className="container mx-auto p-4 md:p-6">
      <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.5 }} className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and application settings</p>
      </motion.div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-4 flex flex-wrap h-auto">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.3, delay: 0.1 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information and profile settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User" />
                      <AvatarFallback>SL</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-2">
                      <Button size="sm" variant="outline">
                        Change Avatar
                      </Button>
                      <Button size="sm" variant="ghost">
                        Remove
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={settings.profile.name}
                      onChange={(e) => handleProfileChange("name", e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.profile.email}
                      onChange={(e) => handleProfileChange("email", e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={settings.profile.bio}
                      onChange={(e) => handleProfileChange("bio", e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>

                  <Button onClick={saveProfile}>Save Changes</Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.3, delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences and settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="ja">Japanese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="est">
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                        <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                        <SelectItem value="cst">Central Time (CST)</SelectItem>
                        <SelectItem value="est">Eastern Time (EST)</SelectItem>
                        <SelectItem value="utc">Coordinated Universal Time (UTC)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="date-format">Date Format</Label>
                    <Select defaultValue="mdy">
                      <SelectTrigger>
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="private-profile">Private Profile</Label>
                      <p className="text-sm text-muted-foreground">Make your profile private to others</p>
                    </div>
                    <Switch id="private-profile" defaultChecked />
                  </div>

                  <Button onClick={savePreferences}>Save Preferences</Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage how you receive notifications and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={settings.notifications.email}
                    onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive push notifications on your devices</p>
                  </div>
                  <Switch
                    checked={settings.notifications.push}
                    onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Product Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about product updates and new features
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.updates}
                    onCheckedChange={(checked) => handleNotificationChange("updates", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Security Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about security incidents and alerts
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.security}
                    onCheckedChange={(checked) => handleNotificationChange("security", checked)}
                  />
                </div>

                <Button>Save Notification Settings</Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="appearance">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize the look and feel of the application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-base">Theme</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={settings.appearance.theme === "light" ? "default" : "outline"}
                      className="flex flex-col items-center justify-center gap-1 h-20 md:h-24"
                      onClick={() => handleAppearanceChange("theme", "light")}
                    >
                      <Sun className="h-5 w-5 md:h-6 md:w-6" />
                      <span>Light</span>
                    </Button>
                    <Button
                      variant={settings.appearance.theme === "dark" ? "default" : "outline"}
                      className="flex flex-col items-center justify-center gap-1 h-20 md:h-24"
                      onClick={() => handleAppearanceChange("theme", "dark")}
                    >
                      <Moon className="h-5 w-5 md:h-6 md:w-6" />
                      <span>Dark</span>
                    </Button>
                    <Button
                      variant={settings.appearance.theme === "system" ? "default" : "outline"}
                      className="flex flex-col items-center justify-center gap-1 h-20 md:h-24"
                      onClick={() => handleAppearanceChange("theme", "system")}
                    >
                      <Palette className="h-5 w-5 md:h-6 md:w-6" />
                      <span>System</span>
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Enable Animations</Label>
                    <p className="text-sm text-muted-foreground">
                      Use animations and transitions throughout the application
                    </p>
                  </div>
                  <Switch
                    checked={settings.appearance.animations}
                    onCheckedChange={(checked) => handleAppearanceChange("animations", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Use a more compact layout to fit more content on screen
                    </p>
                  </div>
                  <Switch
                    checked={settings.appearance.compactMode}
                    onCheckedChange={(checked) => handleAppearanceChange("compactMode", checked)}
                  />
                </div>

                <Button>Save Appearance Settings</Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.3, delay: 0.1 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Password & Authentication</CardTitle>
                  <CardDescription>Manage your password and authentication settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch
                      checked={settings.security.twoFactor}
                      onCheckedChange={(checked) => handleSecurityChange("twoFactor", checked)}
                    />
                  </div>

                  <Button>Update Password</Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.3, delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage additional security settings for your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Password Reset Verification</Label>
                      <p className="text-sm text-muted-foreground">
                        Require additional verification for password resets
                      </p>
                    </div>
                    <Switch
                      checked={settings.security.passwordReset}
                      onCheckedChange={(checked) => handleSecurityChange("passwordReset", checked)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Select
                      value={settings.security.sessionTimeout}
                      onValueChange={(value) => handleSecurityChange("sessionTimeout", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeout" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label className="text-base">Active Sessions</Label>
                    <Card className="bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Current location</p>
                            <p className="text-xs text-muted-foreground">Current session • Chrome on Windows</p>
                          </div>
                          <Shield className="h-4 w-4 text-primary" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Unknown location</p>
                            <p className="text-xs text-muted-foreground">2 days ago • Safari on macOS</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Lock className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Button variant="outline" className="w-full">
                    Sign Out All Devices
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="backup">
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.3, delay: 0.1 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Backup Settings</CardTitle>
                  <CardDescription>Manage your data backup and recovery options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Automatic Backups</Label>
                      <p className="text-sm text-muted-foreground">Automatically backup your data on a schedule</p>
                    </div>
                    <Switch
                      checked={settings.backup.autoBackup}
                      onCheckedChange={(checked) => handleBackupChange("autoBackup", checked)}
                    />
                  </div>

                  {settings.backup.autoBackup && (
                    <div className="grid gap-2">
                      <Label htmlFor="backup-frequency">Backup Frequency</Label>
                      <Select
                        value={settings.backup.backupFrequency}
                        onValueChange={(value) => handleBackupChange("backupFrequency", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Encrypt Backups</Label>
                      <p className="text-sm text-muted-foreground">Encrypt your backup data for additional security</p>
                    </div>
                    <Switch
                      checked={settings.backup.encryptBackups}
                      onCheckedChange={(checked) => handleBackupChange("encryptBackups", checked)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Backup Now
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Restore Backup
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.3, delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Data Management</CardTitle>
                  <CardDescription>Manage your data and privacy settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-base">Data Storage</Label>
                    <Card className="bg-muted/50">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Storage Used</span>
                            <span className="text-sm">2.4 GB / 10 GB</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: "24%" }}></div>
                          </div>
                          <div className="grid grid-cols-3 text-xs text-muted-foreground">
                            <div>Notes: 0.8 GB</div>
                            <div>Projects: 1.2 GB</div>
                            <div>Media: 0.4 GB</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base">Data Export</Label>
                    <p className="text-sm text-muted-foreground">Export all your data in a portable format</p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline">Export as JSON</Button>
                      <Button variant="outline">Export as CSV</Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base">Privacy & Data</Label>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Usage Analytics</p>
                        <p className="text-xs text-muted-foreground">Allow anonymous usage data collection</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Crash Reports</p>
                        <p className="text-xs text-muted-foreground">Send crash reports to improve the application</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <Button variant="destructive" className="w-full">
                    Delete All Data
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

