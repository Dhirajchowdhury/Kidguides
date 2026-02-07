'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Search,
  MapPin,
  Star,
  Clock,
  Award,
  Heart,
  BookOpen,
  Users,
  Filter,
  CheckCircle
} from 'lucide-react'
import MainLayout from '@/components/layout/main-layout'
import { useRouter } from 'next/navigation'

export default function FindTutorPage() {
  const router = useRouter()
  const [searchLocation, setSearchLocation] = useState('')
  const [selectedAge, setSelectedAge] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')

  // Mock tutor data - in real app this would come from API
  const tutors = [
    {
      id: 1,
      name: "Dhiraj choudhary",
      age: 20,
      university: "heritage",
      major: "Elementary Education",
      rating: 4.9,
      reviews: 47,
      hourlyRate: 25,
      location: "Palo Alto, CA",
      subjects: ["Math", "Reading", "Science"],
      experience: "2 years",
      bio: "Hi! I'm Sarah, and I absolutely love working with young children. I believe learning should be fun and engaging!",
      avatar: "👩‍🎓",
      verified: true,
      backgroundCheck: true,
      languages: ["English", "Spanish"]
    },
    {
      id: 2,
      name: "Michael Chen",
      age: 21,
      university: "UC Berkeley",
      major: "Child Psychology",
      rating: 4.8,
      reviews: 32,
      hourlyRate: 28,
      location: "Berkeley, CA",
      subjects: ["Math", "Art", "Music"],
      experience: "1.5 years",
      bio: "Creative and patient tutor who loves making learning an adventure. Specializes in hands-on activities!",
      avatar: "👨‍🎓",
      verified: true,
      backgroundCheck: true,
      languages: ["English", "Mandarin"]
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      age: 19,
      university: "UCLA",
      major: "Early Childhood Development",
      rating: 5.0,
      reviews: 28,
      hourlyRate: 30,
      location: "Los Angeles, CA",
      subjects: ["Reading", "Writing", "Social Skills"],
      experience: "1 year",
      bio: "Passionate about helping children build confidence and discover their love for learning through play-based activities.",
      avatar: "👩‍🎓",
      verified: true,
      backgroundCheck: true,
      languages: ["English", "Spanish"]
    },
    {
      id: 4,
      name: "Alex Johnson",
      age: 22,
      university: "San Jose State",
      major: "Mathematics Education",
      rating: 4.7,
      reviews: 41,
      hourlyRate: 26,
      location: "San Jose, CA",
      subjects: ["Math", "Logic Games", "Problem Solving"],
      experience: "3 years",
      bio: "Making math fun and accessible for young minds! I use games and visual aids to build strong foundations.",
      avatar: "👨‍🎓",
      verified: true,
      backgroundCheck: true,
      languages: ["English"]
    }
  ]

  const handleBookTutor = (tutorId: number) => {
    // In real app, this would handle booking logic
    router.push('/signup')
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted to-secondary/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <Badge className="bg-gradient-to-r from-primary to-secondary text-primary-foreground border-0 px-6 py-3 text-lg font-medium">
              🔍 Find Your Perfect Match
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Amazing Tutors
              </span>
              <br />
              <span className="text-foreground">Ready to Help Your Child! 🌟</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Browse our carefully selected college mentors who are passionate about making learning fun, 
              safe, and effective for kids aged 0-7.
            </p>
          </div>

          {/* Search Filters */}
          <div className="mt-12 max-w-4xl mx-auto">
            <Card className="p-8 bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter your city"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="pl-10 border-border focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Child's Age</label>
                  <Select value={selectedAge} onValueChange={setSelectedAge}>
                    <SelectTrigger className="border-border focus:border-primary">
                      <SelectValue placeholder="Select age" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-2">0-2 years</SelectItem>
                      <SelectItem value="3-4">3-4 years</SelectItem>
                      <SelectItem value="5-6">5-6 years</SelectItem>
                      <SelectItem value="7">7 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Subject Focus</label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger className="border-border focus:border-primary">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">Math</SelectItem>
                      <SelectItem value="reading">Reading</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="art">Art & Creativity</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="social">Social Skills</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground">
                    <Search className="w-4 h-4 mr-2" />
                    Search Tutors
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Tutors Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Available Tutors Near You</h2>
              <p className="text-muted-foreground">Found {tutors.length} amazing mentors ready to help your child succeed!</p>
            </div>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {tutors.map((tutor) => (
              <Card key={tutor.id} className="p-8 border-2 border-primary/20 hover:border-primary/40 hover:shadow-lg transition-all duration-300">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-2xl">
                        {tutor.avatar}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-xl font-bold text-foreground">{tutor.name}</h3>
                          {tutor.verified && (
                            <Badge className="bg-secondary/10 text-secondary-foreground border-0 text-xs">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-primary font-medium">{tutor.university}</p>
                        <p className="text-sm text-muted-foreground">{tutor.major} • Age {tutor.age}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Star className="w-4 h-4 text-secondary fill-current" />
                        <span className="font-bold text-foreground">{tutor.rating}</span>
                        <span className="text-sm text-muted-foreground">({tutor.reviews})</span>
                      </div>
                      <p className="text-2xl font-bold text-primary">${tutor.hourlyRate}/hr</p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-muted-foreground leading-relaxed">{tutor.bio}</p>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{tutor.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-secondary" />
                        <span className="text-sm text-muted-foreground">{tutor.experience} experience</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-accent" />
                        <span className="text-sm text-muted-foreground">Background checked</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">SUBJECTS</p>
                        <div className="flex flex-wrap gap-1">
                          {tutor.subjects.slice(0, 2).map((subject) => (
                            <Badge key={subject} variant="outline" className="text-xs border-primary/20 text-primary">
                              {subject}
                            </Badge>
                          ))}
                          {tutor.subjects.length > 2 && (
                            <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                              +{tutor.subjects.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">LANGUAGES</p>
                        <p className="text-sm text-muted-foreground">{tutor.languages.join(", ")}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3 pt-4 border-t border-border">
                    <Button
                      onClick={() => handleBookTutor(tutor.id)}
                      className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Book {tutor.name.split(' ')[0]}
                    </Button>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                      View Profile
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 px-8 py-3">
              Load More Tutors
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-gradient-to-br from-muted/50 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-secondary/10 text-secondary-foreground border-0 px-4 py-2 text-sm font-medium mb-4">
              ✨ Why Choose KidGuides
            </Badge>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Every Tutor is Carefully Selected & Trained
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We don't just find tutors - we find the right tutors who share our commitment to your child's success and safety.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center bg-card border-primary/20 hover:border-primary/40 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Rigorous Screening 🔍</h3>
              <p className="text-muted-foreground leading-relaxed">
                Background checks, reference verification, and multiple interviews ensure only the best mentors join our community.
              </p>
            </Card>

            <Card className="p-8 text-center bg-card border-secondary/20 hover:border-secondary/40 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-3xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Ongoing Training 📚</h3>
              <p className="text-muted-foreground leading-relaxed">
                Continuous education in child development, safety protocols, and age-appropriate teaching methods.
              </p>
            </Card>

            <Card className="p-8 text-center bg-card border-accent/20 hover:border-accent/40 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Perfect Matching 💝</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our algorithm considers personality, teaching style, and your child's unique needs for the perfect match.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-secondary to-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-foreground">
              Ready to Get Started? 🚀
            </h2>
            <p className="text-xl text-primary-foreground/80 leading-relaxed max-w-2xl mx-auto">
              Join hundreds of families who've found their perfect tutor match through KidGuides!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push('/signup')}
                className="bg-background text-primary hover:bg-background/90 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Create Your Account 🎯
              </Button>
              <Button
                onClick={() => router.push('/contact')}
                variant="outline"
                className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300"
              >
                Need Help Choosing? 💬
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}