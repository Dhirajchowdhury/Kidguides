'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { supabase, getAuthUser, getCurrentUser, signOut } from '@/lib/auth'
import { LogOut, Plus, Users, BookOpen, TrendingUp } from 'lucide-react'

interface TeacherClass {
  id: string
  name: string
  grade_level: string
  student_count: number
}

interface StudentProgress {
  id: string
  full_name: string
  completed_activities: number
  total_activities: number
  average_score: number
}

interface AssignmentDraft {
  title: string
  description: string
  due_date: string
  class_id: string
}

export default function TeacherDashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [classes, setClasses] = useState<TeacherClass[]>([])
  const [studentProgress, setStudentProgress] = useState<StudentProgress[]>([])
  const [loading, setLoading] = useState(true)
  const [assignmentDraft, setAssignmentDraft] = useState<AssignmentDraft>({
    title: '',
    description: '',
    due_date: '',
    class_id: '',
  })
  const [isAssigning, setIsAssigning] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        const authUser = await getAuthUser()
        if (!authUser) {
          router.push('/login')
          return
        }

        const currentUser = await getCurrentUser()
        if (currentUser?.role !== 'teacher') {
          router.push('/dashboard')
          return
        }

        setUser(currentUser)

        // Load teacher's classes
        const { data: classesData } = await supabase
          .from('classes')
          .select('*')
          .eq('teacher_id', authUser.id)

        setClasses(classesData || [])

        // Load student progress for all classes
        const { data: progressData } = await supabase
          .from('student_progress')
          .select('*')
          .in('class_id', classesData?.map(c => c.id) || [])

        setStudentProgress(progressData || [])
      } catch (err) {
        console.error('Failed to load data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [router])

  async function handleAssignActivity() {
    if (!assignmentDraft.title || !assignmentDraft.due_date || !assignmentDraft.class_id) {
      alert('Please fill in all fields')
      return
    }

    setIsAssigning(true)
    try {
      await supabase.from('activities').insert({
        title: assignmentDraft.title,
        description: assignmentDraft.description,
        due_date: assignmentDraft.due_date,
        class_id: assignmentDraft.class_id,
        status: 'pending',
      })

      setAssignmentDraft({
        title: '',
        description: '',
        due_date: '',
        class_id: '',
      })

      // Reload classes
      const { data: classesData } = await supabase
        .from('classes')
        .select('*')
        .eq('teacher_id', (await getAuthUser())?.id)

      setClasses(classesData || [])
    } catch (err) {
      console.error('Failed to assign activity:', err)
      alert('Failed to assign activity')
    } finally {
      setIsAssigning(false)
    }
  }

  async function handleSignOut() {
    await signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  const totalStudents = classes.reduce((sum, c) => sum + c.student_count, 0)
  const averageCompletion =
    studentProgress.length > 0
      ? Math.round(
          studentProgress.reduce((sum, sp) => sum + (sp.completed_activities / sp.total_activities) * 100, 0) /
            studentProgress.length
        )
      : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">KidGuides</h1>
            <p className="text-sm text-gray-600">Teacher Dashboard</p>
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
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Total Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalStudents}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Classes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{classes.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Avg. Completion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{averageCompletion}%</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="classes" className="space-y-4">
          <TabsList>
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="student-progress">Student Progress</TabsTrigger>
          </TabsList>

          {/* Classes Tab */}
          <TabsContent value="classes" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">My Classes</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Assign Activity
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Assign Activity to Class</DialogTitle>
                    <DialogDescription>Create and assign a new activity to your students</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Class</label>
                      <Select value={assignmentDraft.class_id} onValueChange={(val) => setAssignmentDraft({ ...assignmentDraft, class_id: val })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a class" />
                        </SelectTrigger>
                        <SelectContent>
                          {classes.map(cls => (
                            <SelectItem key={cls.id} value={cls.id}>
                              {cls.name} - Grade {cls.grade_level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Activity Title</label>
                      <Input
                        placeholder="Enter activity title"
                        value={assignmentDraft.title}
                        onChange={(e) => setAssignmentDraft({ ...assignmentDraft, title: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        placeholder="Enter activity description"
                        value={assignmentDraft.description}
                        onChange={(e) => setAssignmentDraft({ ...assignmentDraft, description: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Due Date</label>
                      <Input
                        type="date"
                        value={assignmentDraft.due_date}
                        onChange={(e) => setAssignmentDraft({ ...assignmentDraft, due_date: e.target.value })}
                      />
                    </div>

                    <Button onClick={handleAssignActivity} disabled={isAssigning} className="w-full">
                      {isAssigning ? 'Assigning...' : 'Assign Activity'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {classes.length > 0 ? (
              <div className="grid gap-4">
                {classes.map(cls => (
                  <Card key={cls.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{cls.name}</h3>
                          <p className="text-sm text-gray-600">Grade {cls.grade_level}</p>
                          <p className="text-xs text-gray-500 mt-1">{cls.student_count} students</p>
                        </div>
                        <Badge variant="outline">{cls.student_count} Students</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-12 text-center">
                  <p className="text-gray-600 mb-4">No classes yet</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Student Progress Tab */}
          <TabsContent value="student-progress" className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">Student Progress</h2>

            {studentProgress.length > 0 ? (
              <div className="space-y-3">
                {studentProgress.map(student => (
                  <Card key={student.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{student.full_name}</h3>
                          <p className="text-sm text-gray-600">
                            {student.completed_activities} of {student.total_activities} activities completed
                          </p>
                          <p className="text-sm text-gray-600">Average Score: {student.average_score}%</p>
                        </div>
                        <Badge variant="secondary">
                          {Math.round((student.completed_activities / student.total_activities) * 100)}%
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-12 text-center">
                  <p className="text-gray-600">No student progress data yet</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
