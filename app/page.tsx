'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Users, 
  Shield, 
  Star, 
  CheckCircle, 
  Heart,
  Zap,
  Target,
  Award,
  Clock,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Home,
  Search
} from 'lucide-react'
import MainLayout from '@/components/layout/main-layout'

export default function LandingPage() {
  const router = useRouter()

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted to-accent/10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23088395%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground border-0 px-4 py-2 text-sm font-medium">
                  ✨ Offline Learning for Kids 0-7
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                    Building Bright
                  </span>
                  <br />
                  <span className="text-foreground">Futures Together! 🌟</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Connect your little ones with passionate college mentors for personalized, 
                  safe offline learning that builds strong foundations for life! 
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => router.push('/find-tutor')}
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Find a Tutor
                </Button>
                <Button
                  onClick={() => router.push('/signup')}
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary/5 px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300"
                >
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Join as Mentor
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-muted-foreground">100% Safe & Verified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-medium text-muted-foreground">4.9/5 Parent Rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-muted-foreground">500+ Happy Families</span>
                </div>
              </div>
            </div>

            {/* Right Content - Feature Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 bg-card/80 backdrop-blur-sm border-border hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-4">
                  <Home className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Home Learning</h3>
                <p className="text-sm text-muted-foreground">Safe, comfortable environment for your child</p>
              </Card>

              <Card className="p-6 bg-card/80 backdrop-blur-sm border-border hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-foreground mb-2">College Mentors</h3>
                <p className="text-sm text-muted-foreground">Young, energetic tutors who connect with kids</p>
              </Card>

              <Card className="p-6 bg-card/80 backdrop-blur-sm border-border hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-secondary rounded-2xl flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Personalized</h3>
                <p className="text-sm text-muted-foreground">Tailored learning plans for each child</p>
              </Card>

              <Card className="p-6 bg-card/80 backdrop-blur-sm border-border hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Fun Learning</h3>
                <p className="text-sm text-muted-foreground">Making education enjoyable and engaging</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Offline > Online Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-secondary/20 text-secondary-foreground border-0 px-4 py-2 text-sm font-medium mb-4">
              🏠 The Offline Advantage
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Why Offline Learning Wins for Kids! 🎯
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Young minds need real connections, hands-on activities, and distraction-free environments to truly flourish.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center border-2 border-primary/20 hover:border-primary/40 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Real Human Connection 👥</h3>
              <p className="text-muted-foreground leading-relaxed">
                Face-to-face interaction builds trust, emotional intelligence, and stronger learning bonds that screens simply can't match.
              </p>
            </Card>

            <Card className="p-8 text-center border-2 border-secondary/20 hover:border-secondary/40 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Zero Distractions 🎯</h3>
              <p className="text-muted-foreground leading-relaxed">
                No notifications, ads, or digital distractions. Just pure, focused learning time that maximizes attention and retention.
              </p>
            </Card>

            <Card className="p-8 text-center border-2 border-accent/20 hover:border-accent/40 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-3xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Hands-On Learning 🖐️</h3>
              <p className="text-muted-foreground leading-relaxed">
                Physical activities, manipulatives, and real-world examples help young children understand concepts better than digital alternatives.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Why College Mentors Section */}
      <section className="py-20 bg-gradient-to-br from-muted/50 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <Badge className="bg-secondary/10 text-secondary-foreground border-0 px-4 py-2 text-sm font-medium mb-4">
                  🎓 Our Amazing Mentors
                </Badge>
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  Why College Students Make the Best Tutors! ⭐
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Our college mentors bring fresh energy, relatability, and genuine passion for helping kids succeed.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Fresh & Energetic 🚀</h3>
                    <p className="text-muted-foreground">Young mentors bring enthusiasm and modern teaching methods that kids love and respond to naturally.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Relatable & Fun 😊</h3>
                    <p className="text-muted-foreground">College students understand how to make learning fun and can relate to kids in ways that create lasting connections.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Thoroughly Vetted ✅</h3>
                    <p className="text-muted-foreground">Every mentor goes through rigorous background checks, training, and continuous evaluation for your peace of mind.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Card className="p-6 bg-card border-primary/20">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">👩‍🎓</span>
                    </div>
                    <h4 className="font-semibold text-foreground">Sarah, 20</h4>
                    <p className="text-sm text-muted-foreground">Education Major</p>
                    <div className="flex justify-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-secondary fill-current" />
                      ))}
                    </div>
                  </div>
                </Card>
                <Card className="p-6 bg-card border-secondary/20">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">👨‍🎓</span>
                    </div>
                    <h4 className="font-semibold text-foreground">Mike, 22</h4>
                    <p className="text-sm text-muted-foreground">Math & Science</p>
                    <div className="flex justify-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-secondary fill-current" />
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
              <div className="space-y-4 pt-8">
                <Card className="p-6 bg-card border-accent/20">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">👩‍🎓</span>
                    </div>
                    <h4 className="font-semibold text-foreground">Emma, 21</h4>
                    <p className="text-sm text-muted-foreground">Child Psychology</p>
                    <div className="flex justify-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-secondary fill-current" />
                      ))}
                    </div>
                  </div>
                </Card>
                <Card className="p-6 bg-card border-primary/20">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">👨‍🎓</span>
                    </div>
                    <h4 className="font-semibold text-foreground">Alex, 19</h4>
                    <p className="text-sm text-muted-foreground">Arts & Creativity</p>
                    <div className="flex justify-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-secondary fill-current" />
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-secondary/10 text-secondary-foreground border-0 px-4 py-2 text-sm font-medium mb-4">
              🚀 Simple Process
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              How KidGuides Works! 📝
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Getting started is super easy! Just three simple steps to unlock your child's potential.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl text-primary-foreground font-bold">1</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-secondary-foreground" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Tell Us About Your Child 👶</h3>
              <p className="text-muted-foreground leading-relaxed">
                Share your child's age, interests, learning style, and goals. We'll match them with the perfect mentor who gets their unique personality!
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-secondary to-accent rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl text-secondary-foreground font-bold">2</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-accent-foreground" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Meet Your Mentor 🤝</h3>
              <p className="text-muted-foreground leading-relaxed">
                We'll introduce you to 2-3 carefully selected college mentors. Have a friendly chat and choose the one that clicks best with your family!
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl text-primary-foreground font-bold">3</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Start Learning & Growing! 🌱</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your mentor comes to your home for fun, engaging sessions. Watch your child's confidence and skills bloom with personalized attention!
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={() => router.push('/signup')}
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Get Started Today! <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-gradient-to-br from-muted/50 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-accent/10 text-accent-foreground border-0 px-4 py-2 text-sm font-medium mb-4">
              🛡️ Your Peace of Mind
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Safety & Trust Come First! 🔒
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We understand that your child's safety is your top priority. That's why we've built the most comprehensive safety system in the industry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center bg-card border-secondary/20 hover:border-secondary/40 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Background Verified ✅</h3>
              <p className="text-sm text-muted-foreground">Comprehensive background checks and reference verification for every mentor</p>
            </Card>

            <Card className="p-6 text-center bg-card border-accent/20 hover:border-accent/40 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Parent Supervised 👨‍👩‍👧‍👦</h3>
              <p className="text-sm text-muted-foreground">All sessions happen in your home with you present and in control</p>
            </Card>

            <Card className="p-6 text-center bg-card border-primary/20 hover:border-primary/40 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Flexible Scheduling ⏰</h3>
              <p className="text-sm text-muted-foreground">Sessions work around your family's schedule and comfort level</p>
            </Card>

            <Card className="p-6 text-center bg-card border-accent/20 hover:border-accent/40 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Continuous Training 📚</h3>
              <p className="text-sm text-muted-foreground">Ongoing education and safety training for all our mentors</p>
            </Card>
          </div>

          <div className="mt-16 bg-card rounded-3xl p-8 shadow-lg border border-border">
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Still have questions about safety? 🤔
                </h3>
                <p className="text-muted-foreground mb-6">
                  We're here to address any concerns and walk you through our comprehensive safety protocols. 
                  Your child's wellbeing is our absolute priority.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => router.push('/contact')}
                    className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-secondary-foreground"
                  >
                    Talk to Our Safety Team
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push('/safety')}
                    className="border-primary text-primary hover:bg-primary/5"
                  >
                    Read Safety Guidelines
                  </Button>
                </div>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-12 h-12 text-secondary-foreground" />
                </div>
                <p className="text-sm text-muted-foreground font-medium">100% Safe & Secure</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-accent to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-primary-foreground">
                Ready to Give Your Child the Best Start? 🚀
              </h2>
              <p className="text-xl text-primary-foreground/80 leading-relaxed max-w-2xl mx-auto">
                Join hundreds of families who've already discovered the magic of personalized, offline learning with KidGuides!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push('/find-tutor')}
                className="bg-background text-primary hover:bg-background/90 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Find Your Perfect Tutor 🎯
              </Button>
              <Button
                onClick={() => router.push('/signup')}
                variant="outline"
                className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300"
              >
                Become a Mentor 🎓
              </Button>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 pt-8 text-primary-foreground/80">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm">No setup fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm">Cancel anytime</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm">First session free</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
