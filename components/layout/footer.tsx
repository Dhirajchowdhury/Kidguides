'use client'

import Link from 'next/link'
import { BookOpen, Mail, Phone, MapPin, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-primary via-secondary to-accent text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold">KidGuides</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Empowering kids aged 0-7 with personalized offline learning through passionate college mentors. 
              Building strong foundations for lifelong success! 🌟
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-8 h-8 bg-primary-foreground/20 rounded-lg flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
                aria-label="Facebook"
              >
                <span className="text-sm">📘</span>
              </a>
              <a 
                href="#" 
                className="w-8 h-8 bg-primary-foreground/20 rounded-lg flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
                aria-label="Instagram"
              >
                <span className="text-sm">📷</span>
              </a>
              <a 
                href="#" 
                className="w-8 h-8 bg-primary-foreground/20 rounded-lg flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
                aria-label="Twitter"
              >
                <span className="text-sm">🐦</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/find-tutor" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Find a Tutor
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Join as Mentor
                </Link>
              </li>
            </ul>
          </div>

          {/* For Parents */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">For Parents</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/safety" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Safety First 🛡️
                </Link>
              </li>
              <li>
                <Link href="/verified-mentors" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Verified Mentors ✅
                </Link>
              </li>
              <li>
                <Link href="/progress-tracking" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Progress Tracking 📊
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Parent Reviews ⭐
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact KidGuides</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary-foreground/70" />
                <span className="text-primary-foreground/80 text-sm">hello@kidguides.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary-foreground/70" />
                <span className="text-primary-foreground/80 text-sm">+1 (555) 123-KIDS</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary-foreground/70" />
                <span className="text-primary-foreground/80 text-sm">Available Nationwide</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 text-primary-foreground/80 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-accent" />
            <span>for kids and families</span>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">
              Terms of Service
            </Link>
            <span className="text-primary-foreground/70 text-sm">
              © 2026 KidGuides. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}