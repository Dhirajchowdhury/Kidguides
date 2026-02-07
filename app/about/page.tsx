'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Heart, 
  Users, 
  Target, 
  Award,
  BookOpen,
  Shield,
  Star,
  Sparkles
} from 'lucide-react'
import MainLayout from '@/components/layout/main-layout'
import { useRouter } from 'next/navigation'

export default function AboutPage() {
  const router = useRouter()

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted to-secondary/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <Badge className="bg-gradient-to-r from-primary to-secondary text-primary-foreground border-0 px-6 py-3 text-lg font-medium">
              ✨ Our Story
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Building Brighter Futures
              </span>
              <br />
              <span className="text-foreground">One Child at a Time! 🌟</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              KidGuides was born from a simple belief: every child deserves personalized attention, 
              real human connection, and the joy of learning in a safe, nurturing environment.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <Badge className="bg-primary/10 text-primary border-0 px-4 py-2 text-sm font-medium mb-4">
                  🎯 Our Mission
                </Badge>
                <h2 className="text-4xl font-bold text-foreground mb-6">
                  Why We Do What We Do
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                  In a world increasingly dominated by screens and digital distractions, we believe young children 
                  need something different - something real, personal, and deeply human.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  That's why we connect families with passionate college mentors who bring energy, creativity, 
                  and genuine care to every learning session. Because the best education happens when hearts connect.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6 border-primary/20 hover:border-primary/40 transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">500+</h3>
                  <p className="text-sm text-muted-foreground">Happy Families</p>
                </Card>
                <Card className="p-6 border-secondary/20 hover:border-secondary/40 transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">200+</h3>
                  <p className="text-sm text-muted-foreground">Verified Mentors</p>
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Personalized Learning</h3>
                    <p className="text-muted-foreground">Every child is unique. Our mentors adapt their teaching style to match each child's personality, interests, and learning pace.</p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-secondary/5 to-accent/5 border-secondary/20">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Safety First</h3>
                    <p className="text-muted-foreground">Comprehensive background checks, continuous training, and parent-supervised sessions ensure your child's safety and your peace of mind.</p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Joyful Learning</h3>
                    <p className="text-muted-foreground">Learning should be fun! Our mentors use games, stories, and creative activities to make education an adventure your child looks forward to.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-muted/50 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-secondary/10 text-secondary-foreground border-0 px-4 py-2 text-sm font-medium mb-4">
              💝 Our Values
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              What We Stand For
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These core values guide everything we do, from selecting mentors to designing learning experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-8 text-center bg-card border-primary/20 hover:border-primary/40 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Compassion 💕</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every interaction is filled with kindness, understanding, and genuine care for each child's wellbeing.
              </p>
            </Card>

            <Card className="p-8 text-center bg-card border-secondary/20 hover:border-secondary/40 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Trust 🛡️</h3>
              <p className="text-muted-foreground leading-relaxed">
                We earn your trust through transparency, reliability, and unwavering commitment to your child's safety.
              </p>
            </Card>

            <Card className="p-8 text-center bg-card border-accent/20 hover:border-accent/40 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Excellence ⭐</h3>
              <p className="text-muted-foreground leading-relaxed">
                We continuously strive for the highest standards in mentor selection, training, and learning outcomes.
              </p>
            </Card>

            <Card className="p-8 text-center bg-card border-primary/20 hover:border-primary/40 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Growth 🌱</h3>
              <p className="text-muted-foreground leading-relaxed">
                We believe in the unlimited potential of every child and nurture their natural curiosity and love for learning.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary border-0 px-4 py-2 text-sm font-medium mb-4">
              👥 Meet the Team
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              The People Behind KidGuides
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our passionate team of educators, parents, and child development experts work tirelessly to create the best learning experience for your child.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">👩‍💼</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Sarah Johnson</h3>
              <p className="text-primary font-medium mb-4">Founder & CEO</p>
              <p className="text-muted-foreground leading-relaxed">
                Former elementary teacher with 10+ years of experience. Passionate about making quality education accessible to every child.
              </p>
              <div className="flex justify-center mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-secondary fill-current" />
                ))}
              </div>
            </Card>

            <Card className="p-8 text-center bg-gradient-to-br from-secondary/5 to-accent/5 border-secondary/20">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">👨‍🎓</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Dr. Michael Chen</h3>
              <p className="text-secondary font-medium mb-4">Head of Curriculum</p>
              <p className="text-muted-foreground leading-relaxed">
                Child development specialist with PhD in Educational Psychology. Designs age-appropriate learning frameworks.
              </p>
              <div className="flex justify-center mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-secondary fill-current" />
                ))}
              </div>
            </Card>

            <Card className="p-8 text-center bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
              <div className="w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">👩‍🏫</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Emily Rodriguez</h3>
              <p className="text-accent font-medium mb-4">Safety & Training Director</p>
              <p className="text-muted-foreground leading-relaxed">
                Ensures all mentors meet our rigorous safety standards and receive ongoing training in child care and education.
              </p>
              <div className="flex justify-center mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-secondary fill-current" />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-secondary to-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-foreground">
              Ready to Join Our Family? 🤗
            </h2>
            <p className="text-xl text-primary-foreground/80 leading-relaxed max-w-2xl mx-auto">
              Become part of a community that truly cares about your child's growth, happiness, and success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push('/find-tutor')}
                className="bg-background text-primary hover:bg-background/90 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Find Your Perfect Tutor 🎯
              </Button>
              <Button
                onClick={() => router.push('/contact')}
                variant="outline"
                className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300"
              >
                Get in Touch 💬
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}