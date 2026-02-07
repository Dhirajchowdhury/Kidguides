'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { supabase, getAuthUser, getCurrentUser } from '@/lib/auth'
import { ArrowLeft, Calendar, Award } from 'lucide-react'

interface Student {
  id: string
  full_name: string
  date_of_birth: string
  grade_level: string
}

interface ActivityRecord {
  id: string
  title: string
  description: string
  status: 'pending' | 'in_progress' | 'completed'
  due_date: string
  score?: number
  completed_at?: string
}

export default function StudentProfilePage() {
  const router = useRouter()
  const params = useParams()
  const studentId = params.id as string

  const [student, setStudent] = useState<Student | null>(null)
  const [activities, setActivities] = useState<ActivityRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const authUser = await getAuthUser()
        if (!authUser) {
          router.push('/login')
          return
        }

        // Load student
        const { data: studentData } = await supabase
          .from('students')
          .select('*')
          .eq('id', studentId)
          .single()

        setStudent(studentData)

        // Load student activities
        const { data: activitiesData } = await supabase
          .from('activities')
          .select('*')
          .eq('student_id', studentId)
          .order('due_date', { ascending: false })

        setActivities(activitiesData || [])
      } catch (err) {
        console.error('Failed to load data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [router, studentId])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  if (!student) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Student not found</p>
      </div>
    )
  }

  const completedActivities = activities.filter(a => a.status === 'completed').length
  const completionRate = activities.length > 0 ? (completedActivities / activities.length) * 100 : 0
  const averageScore =
    activities.filter(a => a.score).reduce((sum, a) => sum + (a.score || 0), 0) / activities.filter(a => a.score).length || 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">{student.full_name}</h1>
          <p className="text-gray-600">Grade {student.grade_level}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{activities.length}</p>
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

        {/* Activity Progress */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Overall Progress</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Completion Rate</span>
                    <span className="text-sm text-gray-600">{Math.round(completionRate)}%</span>
                  </div>
                  <Progress value={completionRate} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activities */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Activities</h2>
          {activities.length > 0 ? (
            <div className="space-y-3">
              {activities.map(activity => (
                <Card key={activity.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(activity.due_date).toLocaleDateString()}
                          </span>
                          {activity.score && (
                            <span className="flex items-center gap-1">
                              <Award className="w-3 h-3" />
                              {activity.score}%
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
      </main>
    </div>
  )
}
