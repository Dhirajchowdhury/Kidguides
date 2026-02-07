'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { supabase, getAuthUser, getCurrentUser } from '@/lib/auth'
import { Plus, ChevronRight, Trash2 } from 'lucide-react'

interface Student {
  id: string
  full_name: string
  date_of_birth: string
  grade_level: string
  parent_id: string
}

interface StudentFormData {
  full_name: string
  date_of_birth: string
  grade_level: string
}

const gradeOptions = [
  'Preschool',
  'Kindergarten',
  '1st Grade',
  '2nd Grade',
  '3rd Grade',
  '4th Grade',
  '5th Grade',
  '6th Grade',
  '7th Grade',
  '8th Grade',
  '9th Grade',
  '10th Grade',
  '11th Grade',
  '12th Grade',
]

export default function StudentsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<StudentFormData>({
    full_name: '',
    date_of_birth: '',
    grade_level: '1st Grade',
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

        if (currentUser?.role === 'parent') {
          const { data } = await supabase
            .from('students')
            .select('*')
            .eq('parent_id', authUser.id)
            .order('full_name')

          setStudents(data || [])
        }
      } catch (err) {
        console.error('Failed to load data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [router])

  async function handleAddStudent() {
    if (!formData.full_name || !formData.date_of_birth) {
      alert('Please fill in all fields')
      return
    }

    setIsSubmitting(true)
    try {
      const authUser = await getAuthUser()
      if (!authUser) throw new Error('Not authenticated')

      const { error } = await supabase.from('students').insert({
        full_name: formData.full_name,
        date_of_birth: formData.date_of_birth,
        grade_level: formData.grade_level,
        parent_id: authUser.id,
      })

      if (error) throw error

      setFormData({
        full_name: '',
        date_of_birth: '',
        grade_level: '1st Grade',
      })
      setIsOpen(false)

      // Reload students
      const { data } = await supabase
        .from('students')
        .select('*')
        .eq('parent_id', authUser.id)
        .order('full_name')

      setStudents(data || [])
    } catch (err) {
      console.error('Failed to add student:', err)
      alert('Failed to add student')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDeleteStudent(studentId: string) {
    if (!confirm('Are you sure you want to delete this student?')) return

    try {
      const { error } = await supabase.from('students').delete().eq('id', studentId)

      if (error) throw error

      setStudents(students.filter(s => s.id !== studentId))
    } catch (err) {
      console.error('Failed to delete student:', err)
      alert('Failed to delete student')
    }
  }

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
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <p className="text-sm text-gray-600">Manage your children</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">My Students</h2>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>Add a new child to your account</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input
                    placeholder="Enter student name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Date of Birth</label>
                  <Input
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Grade Level</label>
                  <Select value={formData.grade_level} onValueChange={(val) => setFormData({ ...formData, grade_level: val })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {gradeOptions.map(grade => (
                        <SelectItem key={grade} value={grade}>
                          {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleAddStudent} disabled={isSubmitting} className="w-full">
                  {isSubmitting ? 'Adding...' : 'Add Student'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {students.length > 0 ? (
          <div className="grid gap-4">
            {students.map(student => (
              <Link key={student.id} href={`/students/${student.id}`}>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{student.full_name}</h3>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline">{student.grade_level}</Badge>
                          <Badge variant="secondary">
                            Age: {new Date().getFullYear() - new Date(student.date_of_birth).getFullYear()}
                          </Badge>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-12 text-center">
              <p className="text-gray-600 mb-4">No students added yet</p>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Student
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Student</DialogTitle>
                    <DialogDescription>Add a new child to your account</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input
                        placeholder="Enter student name"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date of Birth</label>
                      <Input
                        type="date"
                        value={formData.date_of_birth}
                        onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Grade Level</label>
                      <Select value={formData.grade_level} onValueChange={(val) => setFormData({ ...formData, grade_level: val })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {gradeOptions.map(grade => (
                            <SelectItem key={grade} value={grade}>
                              {grade}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button onClick={handleAddStudent} disabled={isSubmitting} className="w-full">
                      {isSubmitting ? 'Adding...' : 'Add Student'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
