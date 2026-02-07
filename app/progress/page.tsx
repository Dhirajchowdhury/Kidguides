'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Chart, ChartContainer, ChartLegend, ChartResponsiveContainer, ChartTooltip, ChartXAxis, ChartYAxis } from '@/components/ui/chart'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { supabase, getAuthUser, getCurrentUser } from '@/lib/auth'
import { Calendar, TrendingUp, Award } from 'lucide-react'

interface Student {
  id: string
  full_name: string
}

interface ActivityHistory {
  id: string
  title: string
  student_id: string
  status: 'pending' | 'in_progress' | 'completed'
  score?: number
  due_date: string
  completed_at?: string
}

interface ProgressData {
  month: string
  completed: number
  total: number
}

export default function ProgressPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [selectedStudentId, setSelectedStudentId] = useState<string>('')
  const [activities, setActivities] = useState<ActivityHistory[]>([])
  const [progressData, setProgressData] = useState<ProgressData[]>([])
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
        let studentsQuery = supabase.from('students').select('*')

        if (currentUser?.role === 'parent') {
          studentsQuery = studentsQuery.eq('parent_id', authUser.id)
        }

        const { data: studentsData } = await studentsQuery

        setStudents(studentsData || [])
        if (studentsData && studentsData.length > 0) {
          setSelectedStudentId(studentsData[0].id)
        }
      } catch (err) {
        console.error('Failed to load data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [router])

  // Load activities and progress for selected student
  useEffect(() => {
    async function loadStudentProgress() {
      if (!selectedStudentId) return

      try {
        // Load activity history
        const { data: activitiesData } = await supabase
          .from('activities')
          .select('*')
          .eq('student_id', selectedStudentId)
          .order('due_date', { ascending: false })

        setActivities(activitiesData || [])

        // Generate progress data (mock data for demo)
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
        const data = months.map(month => ({
          month,
          completed: Math.floor(Math.random() * 20),
          total: 20,
        }))
        setProgressData(data)
      } catch (err) {
        console.error('Failed to load progress:', err)
      }
    }

    loadStudentProgress()
  }, [selectedStudentId])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  const completedActivities = activities.filter(a => a.status === 'completed').length
  const totalActivities = activities.length
  const completionRate = totalActivities > 0 ? (completedActivities / totalActivities) * 100 : 0
  const averageScore =
    activities.filter(a => a.score).reduce((sum, a) => sum + (a.score || 0), 0) / activities.filter(a => a.score).length || 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Progress Tracking</h1>
          <p className="text-sm text-gray-600">Monitor activity completion and performance</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Student Selection */}
        {students.length > 0 && (
          <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
            {students.map(student => (
              <Button
                key={student.id}
                variant={selectedStudentId === student.id ? 'default' : 'outline'}
                onClick={() => setSelectedStudentId(student.id)}
              >
                {student.full_name}
              </Button>
            ))}
          </div>
        )}

        {selectedStudentId && (
          <>
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{totalActivities}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{completedActivities}</p>
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

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Average Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{Math.round(averageScore)}%</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Activity Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Activity Completion Trend</CardTitle>
                  <CardDescription>Activities completed over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="completed" stroke="#3b82f6" name="Completed" />
                      <Line type="monotone" dataKey="total" stroke="#e5e7eb" name="Total" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Status Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Activity Status Distribution</CardTitle>
                  <CardDescription>Current activity status breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Completed</span>
                        <span className="text-sm text-gray-600">{completedActivities}</span>
                      </div>
                      <Progress value={(completedActivities / totalActivities) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">In Progress</span>
                        <span className="text-sm text-gray-600">
                          {activities.filter(a => a.status === 'in_progress').length}
                        </span>
                      </div>
                      <Progress
                        value={(activities.filter(a => a.status === 'in_progress').length / totalActivities) * 100}
                        className="h-2"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Pending</span>
                        <span className="text-sm text-gray-600">
                          {activities.filter(a => a.status === 'pending').length}
                        </span>
                      </div>
                      <Progress
                        value={(activities.filter(a => a.status === 'pending').length / totalActivities) * 100}
                        className="h-2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Activity History */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Activity History</h2>
              {activities.length > 0 ? (
                <div className="space-y-3">
                  {activities.map(activity => (
                    <Card key={activity.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(activity.due_date).toLocaleDateString()}
                              </span>
                              {activity.score && (
                                <span className="flex items-center gap-1">
                                  <Award className="w-3 h-3" />
                                  Score: {activity.score}%
                                </span>
                              )}
                            </div>
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
            </div>
          </>
        )}
      </main>
    </div>
  )
}
