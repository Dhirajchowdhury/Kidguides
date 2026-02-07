'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { supabase, getAuthUser, getCurrentUser, signOut } from '@/lib/auth'
import { ChevronRight, Plus, LogOut } from 'lucide-react'

interface Student {
  id: string
  full_name: string
  date_of_birth: string
  grade_level: string
}

interface Activity {
  id: string
  title: string
  description: string
  status: 'pending' | 'in_progress' | 'completed'
  due_date: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const authUser = await getAuthUser()
        if (!authUser) {
          router.push('/login')
          return
        }

        const currentUser = await getCurrentUser()
        setUser(currentUser)

        // Load students
        const { data: studentsData } = await supabase
          .from('students')
          .select('*')
          .eq('parent_id', authUser.id)

        setStudents(studentsData || [])

        // Load activities
        const { data: activitiesData } = await supabase
          .from('activities')
          .select('*')
          .in('student_id', studentsData?.map(s => s.id) || [])
          .order('due_date', { ascending: true })

        setActivities(activitiesData || [])
      } catch (err) {
        console.error('Failed to load data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [router])

  async function handleSignOut() {
    await signOut()
    router.push('/login')
  }

  const completedActivities = activities.filter(a => a.status === 'completed').length
  const completionRate = activities.length > 0 ? (completedActivities / activities.length) * 100 : 0

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">KidGuides</h1>
            <p className="text-sm text-gray-600">Parent Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">{user?.full_name}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Students</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{students.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Active Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {activities.filter(a => a.status === 'in_progress').length}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{Math.round(completionRate)}%</p>
              <Progress value={completionRate} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="students" className="space-y-4">
          <TabsList>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
          </TabsList>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">My Students</h2>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Student
              </Button>
            </div>

            {students.length > 0 ? (
              <div className="grid gap-4">
                {students.map(student => (
                  <Card key={student.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{student.full_name}</h3>
                          <p className="text-sm text-gray-600">Grade: {student.grade_level}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-12 text-center">
                  <p className="text-gray-600 mb-4">No students added yet</p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Student
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities" className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>

            {activities.length > 0 ? (
              <div className="space-y-3">
                {activities.map(activity => (
                  <Card key={activity.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                          <p className="text-xs text-gray-500 mt-2">Due: {new Date(activity.due_date).toLocaleDateString()}</p>
                        </div>
                        <Badge
                          variant={
                            activity.status === 'completed'
                              ? 'default'
                              : activity.status === 'in_progress'
                              ? 'secondary'
                              : 'outline'
                          }
                        >
                          {activity.status === 'completed' && '✓ Done'}
                          {activity.status === 'in_progress' && 'In Progress'}
                          {activity.status === 'pending' && 'Pending'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-12 text-center">
                  <p className="text-gray-600">No activities yet</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
