'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { supabase, getAuthUser, getCurrentUser } from '@/lib/auth'
import { Plus, Calendar, CheckCircle2, Clock, AlertCircle } from 'lucide-react'

interface Activity {
  id: string
  title: string
  description: string
  status: 'pending' | 'in_progress' | 'completed'
  due_date: string
  student_id?: string
  score?: number
}

interface ActivityFormData {
  title: string
  description: string
  due_date: string
  student_id: string
}

interface Student {
  id: string
  full_name: string
}

export default function ActivitiesPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [activities, setActivities] = useState<Activity[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [formData, setFormData] = useState<ActivityFormData>({
    title: '',
    description: '',
    due_date: '',
    student_id: '',
  })

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

        if (currentUser?.role === 'teacher') {
          // Load teacher's activities
          const { data: activitiesData } = await supabase
            .from('activities')
            .select('*')
            .eq('teacher_id', authUser.id)
            .order('due_date', { ascending: true })

          setActivities(activitiesData || [])
        } else if (currentUser?.role === 'parent') {
          // Load students first
          const { data: studentsData } = await supabase
            .from('students')
            .select('*')
            .eq('parent_id', authUser.id)

          setStudents(studentsData || [])

          // Then load activities for those students
          if (studentsData && studentsData.length > 0) {
            const { data: activitiesData } = await supabase
              .from('activities')
              .select('*')
              .in('student_id', studentsData.map(s => s.id))
              .order('due_date', { ascending: true })

            setActivities(activitiesData || [])
          }
        }
      } catch (err) {
        console.error('Failed to load data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [router])

  async function handleAddActivity() {
    if (!formData.title || !formData.due_date || !formData.student_id) {
      alert('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    try {
      const authUser = await getAuthUser()
      if (!authUser) throw new Error('Not authenticated')

      const { error } = await supabase.from('activities').insert({
        title: formData.title,
        description: formData.description,
        due_date: formData.due_date,
        student_id: formData.student_id,
        status: 'pending',
      })

      if (error) throw error

      setFormData({
        title: '',
        description: '',
        due_date: '',
        student_id: '',
      })
      setIsOpen(false)

      // Reload activities
      const { data } = await supabase
        .from('activities')
        .select('*')
        .in('student_id', students.map(s => s.id))
        .order('due_date', { ascending: true })

      setActivities(data || [])
    } catch (err) {
      console.error('Failed to add activity:', err)
      alert('Failed to add activity')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleUpdateStatus(activityId: string, newStatus: string) {
    try {
      const { error } = await supabase
        .from('activities')
        .update({ status: newStatus })
        .eq('id', activityId)

      if (error) throw error

      setActivities(
        activities.map(a => (a.id === activityId ? { ...a, status: newStatus as any } : a))
      )
    } catch (err) {
      console.error('Failed to update activity:', err)
      alert('Failed to update activity')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  const filteredActivities =
    filterStatus === 'all' ? activities : activities.filter(a => a.status === filterStatus)

  const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />
      case 'in_progress':
        return <Clock className="w-4 h-4 text-blue-600" />
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Activities</h1>
          <p className="text-sm text-gray-600">Manage and track assignments</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{activities.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-yellow-600">
                {activities.filter(a => a.status === 'pending').length}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-600">
                {activities.filter(a => a.status === 'in_progress').length}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">
                {activities.filter(a => a.status === 'completed').length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filter and Add */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            {['all', 'pending', 'in_progress', 'completed'].map(status => (
              <Button
                key={status}
                variant={filterStatus === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus(status)}
              >
                {status === 'all' && 'All'}
                {status === 'pending' && 'Pending'}
                {status === 'in_progress' && 'In Progress'}
                {status === 'completed' && 'Completed'}
              </Button>
            ))}
          </div>

          {user?.role === 'parent' && students.length > 0 && (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Activity
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Activity</DialogTitle>
                  <DialogDescription>Add a new activity for your child</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Student *</label>
                    <Select value={formData.student_id} onValueChange={(val) => setFormData({ ...formData, student_id: val })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a student" />
                      </SelectTrigger>
                      <SelectContent>
                        {students.map(student => (
                          <SelectItem key={student.id} value={student.id}>
                            {student.full_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title *</label>
                    <Input
                      placeholder="Activity title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      placeholder="Activity description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Due Date *</label>
                    <Input
                      type="date"
                      value={formData.due_date}
                      onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                    />
                  </div>

                  <Button onClick={handleAddActivity} disabled={isSubmitting} className="w-full">
                    {isSubmitting ? 'Creating...' : 'Create Activity'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Activities List */}
        {filteredActivities.length > 0 ? (
          <div className="space-y-3">
            {filteredActivities.map(activity => (
              <Card key={activity.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <StatusIcon status={activity.status} />
                        <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                      </div>
                      {activity.description && (
                        <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(activity.due_date).toLocaleDateString()}
                        </span>
                        {activity.score && <span>Score: {activity.score}%</span>}
                      </div>
                    </div>

                    {user?.role === 'parent' && (
                      <Select value={activity.status} onValueChange={(val) => handleUpdateStatus(activity.id, val)}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-12 text-center">
              <p className="text-gray-600">No activities found</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
