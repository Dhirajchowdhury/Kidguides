'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { supabase, getAuthUser, getCurrentUser } from '@/lib/auth'
import { Plus, ChevronRight, Mail } from 'lucide-react'

interface Guide {
  id: string
  full_name: string
  email: string
  specialization: string
  hourly_rate?: number
  status: 'active' | 'inactive'
}

interface GuideFormData {
  full_name: string
  email: string
  specialization: string
  hourly_rate: string
}

export default function GuidesPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [guides, setGuides] = useState<Guide[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<GuideFormData>({
    full_name: '',
    email: '',
    specialization: '',
    hourly_rate: '',
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

        // Load guides
        const { data } = await supabase
          .from('guides')
          .select('*')
          .eq('parent_id', authUser.id)
          .order('full_name')

        setGuides(data || [])
      } catch (err) {
        console.error('Failed to load data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [router])

  async function handleAddGuide() {
    if (!formData.full_name || !formData.email || !formData.specialization) {
      alert('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    try {
      const authUser = await getAuthUser()
      if (!authUser) throw new Error('Not authenticated')

      const { error } = await supabase.from('guides').insert({
        full_name: formData.full_name,
        email: formData.email,
        specialization: formData.specialization,
        hourly_rate: formData.hourly_rate ? parseFloat(formData.hourly_rate) : null,
        parent_id: authUser.id,
        status: 'active',
      })

      if (error) throw error

      setFormData({
        full_name: '',
        email: '',
        specialization: '',
        hourly_rate: '',
      })
      setIsOpen(false)

      // Reload guides
      const { data } = await supabase
        .from('guides')
        .select('*')
        .eq('parent_id', authUser.id)
        .order('full_name')

      setGuides(data || [])
    } catch (err) {
      console.error('Failed to add guide:', err)
      alert('Failed to add guide')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDeleteGuide(guideId: string) {
    if (!confirm('Are you sure you want to remove this guide?')) return

    try {
      const { error } = await supabase.from('guides').delete().eq('id', guideId)

      if (error) throw error

      setGuides(guides.filter(g => g.id !== guideId))
    } catch (err) {
      console.error('Failed to delete guide:', err)
      alert('Failed to delete guide')
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
          <h1 className="text-2xl font-bold text-gray-900">Guides & Tutors</h1>
          <p className="text-sm text-gray-600">Manage your child's tutors and guides</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">My Guides</h2>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Guide
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Guide</DialogTitle>
                <DialogDescription>Add a new tutor or guide for your child</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name *</label>
                  <Input
                    placeholder="Enter guide name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email *</label>
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Specialization *</label>
                  <Input
                    placeholder="e.g., Math, English, Science"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Hourly Rate (Optional)</label>
                  <Input
                    type="number"
                    placeholder="Enter hourly rate"
                    value={formData.hourly_rate}
                    onChange={(e) => setFormData({ ...formData, hourly_rate: e.target.value })}
                  />
                </div>

                <Button onClick={handleAddGuide} disabled={isSubmitting} className="w-full">
                  {isSubmitting ? 'Adding...' : 'Add Guide'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {guides.length > 0 ? (
          <div className="grid gap-4">
            {guides.map(guide => (
              <Card key={guide.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{guide.full_name}</h3>
                      <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                        <Mail className="w-4 h-4" />
                        {guide.email}
                      </p>
                      <div className="flex gap-2 mt-3">
                        <Badge variant="outline">{guide.specialization}</Badge>
                        {guide.hourly_rate && <Badge variant="secondary">${guide.hourly_rate}/hr</Badge>}
                        <Badge variant={guide.status === 'active' ? 'default' : 'secondary'}>
                          {guide.status === 'active' ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
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
              <p className="text-gray-600 mb-4">No guides added yet</p>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Guide
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Guide</DialogTitle>
                    <DialogDescription>Add a new tutor or guide for your child</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name *</label>
                      <Input
                        placeholder="Enter guide name"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email *</label>
                      <Input
                        type="email"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Specialization *</label>
                      <Input
                        placeholder="e.g., Math, English, Science"
                        value={formData.specialization}
                        onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Hourly Rate (Optional)</label>
                      <Input
                        type="number"
                        placeholder="Enter hourly rate"
                        value={formData.hourly_rate}
                        onChange={(e) => setFormData({ ...formData, hourly_rate: e.target.value })}
                      />
                    </div>

                    <Button onClick={handleAddGuide} disabled={isSubmitting} className="w-full">
                      {isSubmitting ? 'Adding...' : 'Add Guide'}
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
