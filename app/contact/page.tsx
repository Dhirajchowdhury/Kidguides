'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Mail,
  Phone,
  Clock,
  MessageCircle,
  Heart,
  Send,
  CheckCircle,
  HelpCircle,
  Users
} from 'lucide-react'
import MainLayout from '@/components/layout/main-layout'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    urgency: 'normal'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <MainLayout>
        <section className="py-20 bg-gradient-to-br from-secondary/10 to-accent/10 min-h-screen flex items-center">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Card className="p-12 bg-card border-secondary/20 shadow-lg">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-secondary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Thank You! 🎉
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                We've received your message and our team will get back to you within 24 hours.
              </p>
              <p className="text-muted-foreground mb-8">
                In the meantime, feel free to explore our tutors or learn more about our safety protocols.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => window.location.href = '/find-tutor'}
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground"
                >
                  Browse Tutors
                </Button>
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5"
                >
                  Send Another Message
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted to-secondary/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <Badge className="bg-gradient-to-r from-primary to-secondary text-primary-foreground border-0 px-6 py-3 text-lg font-medium">
              💬 Get in Touch
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                We're Here to Help
              </span>
              <br />
              <span className="text-foreground">Every Step of the Way! 🤗</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Have questions about our tutors, safety protocols, or how KidGuides works? 
              Our friendly team is ready to help you find the perfect learning solution for your child.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Send Us a Message 📝</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Fill out the form below and we'll get back to you as soon as possible. 
                  For urgent matters, please call us directly.
                </p>
              </div>

              <Card className="p-8 border-2 border-primary/20">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Your Name *</label>
                      <Input
                        required
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="border-border focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Email Address *</label>
                      <Input
                        required
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="border-border focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Phone Number</label>
                      <Input
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="border-border focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">How urgent is this?</label>
                      <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                        <SelectTrigger className="border-border focus:border-primary">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low - General inquiry</SelectItem>
                          <SelectItem value="normal">Normal - Within 24 hours</SelectItem>
                          <SelectItem value="high">High - Same day response</SelectItem>
                          <SelectItem value="urgent">Urgent - Call me ASAP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Subject *</label>
                    <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
                      <SelectTrigger className="border-border focus:border-primary">
                        <SelectValue placeholder="What can we help you with?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="find-tutor">Finding the right tutor</SelectItem>
                        <SelectItem value="safety">Safety questions</SelectItem>
                        <SelectItem value="pricing">Pricing and packages</SelectItem>
                        <SelectItem value="scheduling">Scheduling help</SelectItem>
                        <SelectItem value="become-tutor">Becoming a tutor</SelectItem>
                        <SelectItem value="technical">Technical support</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Message *</label>
                    <Textarea
                      required
                      placeholder="Tell us more about how we can help you and your child..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="border-border focus:border-primary"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground py-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Contact Info & Quick Actions */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Other Ways to Reach Us 📞</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Prefer to talk? We'd love to hear from you! Our team is available during business hours 
                  and we always aim to respond quickly.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <Card className="p-6 border-2 border-secondary/20 hover:border-secondary/40 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground mb-2">Call Us 📞</h3>
                      <p className="text-2xl font-bold text-secondary mb-1">+91 62918 98849</p>
                      <p className="text-sm text-muted-foreground">Mon-Fri: 8am-8pm PST | Sat-Sun: 10am-6pm PST</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-2 border-accent/20 hover:border-accent/40 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground mb-2">Email Us 📧</h3>
                      <p className="text-lg font-semibold text-accent mb-1">kidguides01@gmail.com</p>
                      <p className="text-sm text-muted-foreground">We typically respond within 2-4 hours</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-2 border-primary/20 hover:border-primary/40 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground mb-2">Live Chat 💬</h3>
                      <p className="text-lg font-semibold text-primary mb-1">Available on our website</p>
                      <p className="text-sm text-muted-foreground">Instant help during business hours</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* FAQ Section */}
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <HelpCircle className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Quick Questions? 🤔</h3>
                  <p className="text-muted-foreground">Check out our most common questions and answers</p>
                </div>
                <div className="space-y-4">
                  <div className="bg-card p-4 rounded-xl border border-border">
                    <h4 className="font-semibold text-foreground mb-1">How do you ensure tutor safety?</h4>
                    <p className="text-sm text-muted-foreground">All tutors undergo background checks, reference verification, and safety training.</p>
                  </div>
                  <div className="bg-card p-4 rounded-xl border border-border">
                    <h4 className="font-semibold text-foreground mb-1">What ages do you work with?</h4>
                    <p className="text-sm text-muted-foreground">We specialize in children aged 0-7 years with age-appropriate learning methods.</p>
                  </div>
                  <div className="bg-card p-4 rounded-xl border border-border">
                    <h4 className="font-semibold text-foreground mb-1">How much does tutoring cost?</h4>
                    <p className="text-sm text-muted-foreground">Rates typically depends on the tutor and subjects.</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-6 border-primary text-primary hover:bg-primary/5">
                  View All FAQs
                </Button>
              </Card>
            </div>
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
            <h2 className="text-4xl font-bold text-foreground mb-6">
              We're Here When You Need Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your questions and concerns are important to us. We're committed to providing the support 
              and transparency you need to feel confident about your child's learning journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center bg-card border-secondary/20 hover:border-secondary/40 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Quick Response ⚡</h3>
              <p className="text-muted-foreground leading-relaxed">
                We aim to respond to all inquiries within 2-4 hours during business hours, often much faster.
              </p>
            </Card>

            <Card className="p-8 text-center bg-card border-accent/20 hover:border-accent/40 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Expert Team 👥</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our support team includes education specialists and child development experts ready to help.
              </p>
            </Card>

            <Card className="p-8 text-center bg-card border-primary/20 hover:border-primary/40 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Personal Care 💝</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every family is unique. We take time to understand your specific needs and concerns.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}