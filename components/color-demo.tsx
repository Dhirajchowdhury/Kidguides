'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function ColorDemo() {
  return (
    <div className="p-8 space-y-8 bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">New Color Scheme Demo</h1>
        <p className="text-muted-foreground">Your custom teal color palette with improved contrast and visibility!</p>
      </div>

      {/* Color Palette Display */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-6 text-center border-primary/20">
          <div className="w-16 h-16 bg-primary rounded-lg mx-auto mb-3"></div>
          <h3 className="font-semibold text-foreground">Primary</h3>
          <p className="text-sm text-muted-foreground">#09637E</p>
          <p className="text-xs text-muted-foreground mt-1">Dark Teal</p>
        </Card>
        
        <Card className="p-6 text-center border-secondary/20">
          <div className="w-16 h-16 bg-secondary rounded-lg mx-auto mb-3"></div>
          <h3 className="font-semibold text-foreground">Secondary</h3>
          <p className="text-sm text-muted-foreground">#5DD3B6</p>
          <p className="text-xs text-muted-foreground mt-1">Logo Color</p>
        </Card>
        
        <Card className="p-6 text-center border-accent/20">
          <div className="w-16 h-16 bg-accent rounded-lg mx-auto mb-3"></div>
          <h3 className="font-semibold text-foreground">Accent</h3>
          <p className="text-sm text-muted-foreground">#7AB2B2</p>
          <p className="text-xs text-muted-foreground mt-1">Light Teal</p>
        </Card>
        
        <Card className="p-6 text-center border-muted">
          <div className="w-16 h-16 bg-muted rounded-lg mx-auto mb-3"></div>
          <h3 className="font-semibold text-foreground">Muted</h3>
          <p className="text-sm text-muted-foreground">#EBF4F6</p>
          <p className="text-xs text-muted-foreground mt-1">Light Background</p>
        </Card>
      </div>

      {/* Dark Mode Preview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">Dark Mode Preview</h2>
        <div className="bg-slate-900 rounded-lg p-6 space-y-4">
          <div className="text-slate-100">
            <h3 className="text-lg font-semibold mb-2">Dark Theme Colors</h3>
            <p className="text-slate-300">Much better contrast and visibility in dark mode!</p>
          </div>
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded" style={{backgroundColor: '#5DD3B6'}}></div>
            <div className="w-8 h-8 rounded" style={{backgroundColor: '#7AB2B2'}}></div>
            <div className="w-8 h-8 rounded" style={{backgroundColor: '#09637E'}}></div>
          </div>
        </div>
      </div>

      {/* Component Examples */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Component Examples</h2>
        
        <div className="flex flex-wrap gap-4">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge>Default Badge</Badge>
          <Badge variant="secondary">Secondary Badge</Badge>
          <Badge variant="outline">Outline Badge</Badge>
          <Badge variant="destructive">Destructive Badge</Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-6 border-primary/20">
            <h3 className="text-lg font-semibold text-foreground mb-2">Light Theme Card</h3>
            <p className="text-muted-foreground">This card demonstrates the light theme colors with excellent contrast and readability.</p>
          </Card>
          
          <Card className="p-6 bg-primary text-primary-foreground border-primary">
            <h3 className="text-lg font-semibold mb-2">Primary Colored Card</h3>
            <p className="text-primary-foreground/80">This card uses the primary color background with appropriate foreground colors for perfect visibility.</p>
          </Card>
        </div>

        <Card className="p-6 bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground">
          <h3 className="text-lg font-semibold mb-2">Gradient Card</h3>
          <p className="text-primary-foreground/90">Beautiful gradient using all three main colors from your palette!</p>
        </Card>
      </div>
    </div>
  )
}