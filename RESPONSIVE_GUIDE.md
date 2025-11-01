# 📱 Responsive Design Guide

This guide explains how to use the media queries and responsive utilities in your jewelry store website.

## 🎯 Breakpoints

The project uses Tailwind CSS with custom breakpoints:

- **xs**: 320px - Extra small mobile devices
- **sm**: 640px - Small tablets
- **md**: 768px - Medium tablets/tablets in landscape
- **lg**: 1024px - Desktop/laptop
- **xl**: 1280px - Large desktop
- **2xl**: 1536px - Extra large desktop
- **3xl**: 1920px - Ultra-wide screens

## 🖥️ Device-Specific Breakpoints

### Mobile First
```jsx
// Mobile (default)
<div className="text-sm">Content</div>

// Tablet and up
<div className="md:text-base">Content</div>

// Desktop and up
<div className="lg:text-lg">Content</div>
```

### Responsive Grids
```jsx
// 1 column on mobile, 2 on tablet, 3 on desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Content */}
</div>
```

### Responsive Flexbox
```jsx
// Column on mobile, row on desktop
<div className="flex flex-col md:flex-row gap-4">
  {/* Content */}
</div>
```

## 📐 Orientation Support

### Landscape Mode
```jsx
// Hide on landscape
<div className="landscape:hidden">Mobile only</div>

// Adjust height
<div className="h-64 landscape:h-auto">Content</div>
```

### Portrait Mode
```jsx
<div className="portrait:h-screen">Full height in portrait</div>
```

## 🌓 Dark Mode Support

Automatically detects system preferences:
```jsx
<div className="bg-white dark:bg-gray-800 text-black dark:text-white">
  Content
</div>
```

## ♿ Accessibility Features

### Reduced Motion
The CSS automatically disables animations for users who prefer reduced motion.

### Focus States
All interactive elements have visible focus indicators for keyboard navigation.

## 🎨 Custom Scrollbar

Custom scrollbar styling is applied on desktop (768px and up):
- Purple gradient thumb
- Smooth hover effects
- Rounded corners

## 📱 Mobile-Specific Features

### Safe Area Insets
```jsx
<div className="safe-area-inset">
  Respects iPhone notch and Android navigation
</div>
```

### Touch Device Detection
```jsx
<div className="touch:cursor-pointer touch:select-none">
  Optimized for touch devices
</div>
```

## 🖨️ Print Styles

Hide elements when printing:
```jsx
<div className="print:hidden">Don't print this</div>

<p className="print:text-black print:bg-white">
  Print-safe content
</p>
```

## 📊 High DPI Displays

Better borders on retina displays:
```jsx
<div className="retina:border-2">
  Sharper borders on high-density screens
</div>
```

## 📐 Responsive Typography

Headings automatically adjust:
- **Mobile (<640px)**: Smaller text
- **Desktop (≥640px)**: Larger text

## 🎯 Container Sizing

Responsive padding:
```jsx
<div className="container mx-auto">
  {/* 
    Mobile: 1rem padding
    Tablet: 2rem padding
    Desktop: 4-6rem padding
  */}
</div>
```

## 📸 Responsive Images

All images are automatically:
- Max width: 100%
- Height: auto
- Display: block

## 🎨 Responsive Cards

Card components adjust padding and border-radius:
```jsx
<div className="card">
  {/* Auto-responsive padding and radius */}
</div>
```

## 🔧 Button Responsive Sizing

Buttons adjust automatically:
```jsx
<button className="btn-primary">
  {/* 
    Mobile: smaller padding
    Desktop: larger padding
  */}
</button>
```

## 📝 Usage Examples

### Example 1: Product Grid
```jsx
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
  {products.map(product => (
    <ProductCard key={product.id} />
  ))}
</div>
```

### Example 2: Header Navigation
```jsx
<header className="flex flex-col md:flex-row items-center justify-between p-4 md:p-6">
  <Logo />
  <nav className="w-full md:w-auto flex justify-around md:justify-center gap-2">
    {links.map(link => (
      <Link key={link.path} href={link.path}>{link.name}</Link>
    ))}
  </nav>
</header>
```

### Example 3: Responsive Form
```jsx
<form className="flex flex-col md:flex-row gap-4">
  <input className="w-full md:w-1/2" />
  <input className="w-full md:w-1/2" />
  <button className="w-full md:w-auto">Submit</button>
</form>
```

## 🎯 Best Practices

1. **Mobile First**: Start with mobile styles, add desktop styles with prefixes
2. **Use Tailwind Utilities**: Prefer Tailwind classes over custom CSS
3. **Test on Real Devices**: Always test on actual mobile devices
4. **Touch Targets**: Keep interactive elements at least 44x44px
5. **Readable Text**: Maintain minimum font size of 16px on mobile

## 🚀 Performance Tips

- Use `md:`, `lg:` sparingly - don't overdo it
- Group similar breakpoints together
- Leverage CSS Grid and Flexbox for responsive layouts
- Use responsive images with `srcset` for better performance

## 📱 Common Responsive Patterns

### Sidebar Layout
```jsx
<div className="flex flex-col md:flex-row">
  <aside className="w-full md:w-64">Sidebar</aside>
  <main className="flex-1">Main Content</main>
</div>
```

### Modal/Dialog
```jsx
<div className="fixed inset-0 md:inset-4 md:max-w-md md:mx-auto">
  {/* Full screen on mobile, centered on desktop */}
</div>
```

### Responsive Table
```jsx
<div className="overflow-x-auto">
  <table className="min-w-full">
    {/* Scroll horizontally on mobile */}
  </table>
</div>
```

## 🔍 Media Query Hierarchy

CSS is organized by screen size:
1. Base styles (mobile)
2. Small devices (≥640px)
3. Medium devices (≥768px)
4. Large devices (≥1024px)
5. Extra large (≥1280px)
6. Ultra wide (≥1920px)

## 💡 Tips

- Use browser DevTools to test different screen sizes
- Check both portrait and landscape orientations
- Test on actual mobile devices for real-world performance
- Consider users with older devices (use progressive enhancement)

