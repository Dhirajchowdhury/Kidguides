'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import MainLayout from '@/components/layout/main-layout'

export default function TestColorsPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Color Test Page</h1>
            <p className="text-muted-foreground">Testing the new color scheme implementation</p>
          </div>

          {/* CSS Variables Test */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">CSS Variables Test</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 rounded-lg mx-auto mb-2" style={{backgroundColor: 'hsl(var(--primary))'}}></div>
                <p className="text-sm text-foreground">Primary</p>
                <p className="text-xs text-muted-foreground">var(--primary)</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-lg mx-auto mb-2" style={{backgroundColor: 'hsl(var(--secondary))'}}></div>
                <p className="text-sm text-foreground">Secondary</p>
                <p className="text-xs text-muted-foreground">var(--secondary)</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-lg mx-auto mb-2" style={{backgroundColor: 'hsl(var(--accent))'}}></div>
                <p className="text-sm text-foreground">Accent</p>
                <p className="text-xs text-muted-foreground">var(--accent)</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-lg mx-auto mb-2" style={{backgroundColor: 'hsl(var(--muted))'}}></div>
                <p className="text-sm text-foreground">Muted</p>
                <p className="text-xs text-muted-foreground">var(--muted)</p>
              </div>
            </div>
          </Card>

          {/* Tailwind Classes Test */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Tailwind Classes Test</h2>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button>Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge>Default Badge</Badge>
                <Badge variant="secondary">Secondary Badge</Badge>
                <Badge variant="outline">Outline Badge</Badge>
              </div>
            </div>
          </Card>

          {/* Background Test */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-6 bg-primary text-primary-foreground">
              <h3 className="text-lg font-semibold mb-2">Primary Background</h3>
              <p>This should have the primary color background with proper contrast text.</p>
            </Card>
            <Card className="p-6 bg-secondary text-secondary-foreground">
              <h3 className="text-lg font-semibold mb-2">Secondary Background</h3>
              <p>This should have the secondary (logo) color background.</p>
            </Card>
          </div>

          {/* Gradient Test */}
          <Card className="p-6 bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground">
            <h3 className="text-lg font-semibold mb-2">Gradient Test</h3>
            <p>This should show a beautiful gradient using all three main colors.</p>
          </Card>

          {/* Direct Hex Colors Test */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Direct Hex Colors Test</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 rounded-lg mx-auto mb-2" style={{backgroundColor: '#09637E'}}></div>
                <p className="text-sm text-foreground">#09637E</p>
                <p className="text-xs text-muted-foreground">Dark Teal</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-lg mx-auto mb-2" style={{backgroundColor: '#5DD3B6'}}></div>
                <p className="text-sm text-foreground">#5DD3B6</p>
                <p className="text-xs text-muted-foreground">Logo Color</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-lg mx-auto mb-2" style={{backgroundColor: '#7AB2B2'}}></div>
                <p className="text-sm text-foreground">#7AB2B2</p>
                <p className="text-xs text-muted-foreground">Light Teal</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-lg mx-auto mb-2" style={{backgroundColor: '#EBF4F6'}}></div>
                <p className="text-sm text-foreground">#EBF4F6</p>
                <p className="text-xs text-muted-foreground">Light Background</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}