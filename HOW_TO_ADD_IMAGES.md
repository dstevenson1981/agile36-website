# How to Add Images to Your Agile36 Site

## Quick Guide

1. **Place your images in the `public` folder**
   - Navigate to: `agile36-site/public/`
   - Add your image files here (e.g., `hero-image.jpg`, `course-safe.jpg`, etc.)

2. **Use the images in your code**
   - In Next.js, images in the `public` folder are accessible from the root path
   - Example: If you add `hero-image.jpg` to `public/`, use it as `/hero-image.jpg`

## Where to Add Images

### Hero Image
- **Location**: Right side of the hero section
- **Recommended size**: 600x500px or larger
- **File**: Add to `public/hero-image.jpg` (or .png)
- **Update in code**: Replace the placeholder div in `app/page.tsx` around line 60

### Course Images
- **Location**: Top of each course card
- **Recommended size**: 400x300px
- **Files**: 
  - `public/course-safe.jpg` - For SAFe course
  - `public/course-generative-ai.jpg` - For Generative AI course
  - `public/course-ai-product.jpg` - For AI Product course
  - `public/course-pmi.jpg` - For PMI course
- **Update in code**: Replace the placeholder divs in each course card

### Company Logos
- **Location**: "Trusted by" section
- **Recommended size**: 150x60px each
- **Files**: Add multiple logo files like `logo1.png`, `logo2.png`, etc.
- **Update in code**: Replace the placeholder divs in the "Trusted By" section

## Example Code Update

### For Hero Image:
```tsx
// Replace this:
<div className="w-full h-[500px] bg-gradient-to-br...">
  <p>Hero Image Placeholder</p>
</div>

// With this:
<Image 
  src="/hero-image.jpg" 
  alt="Agile36 Training" 
  width={600} 
  height={500}
  className="rounded-2xl shadow-lg"
/>
```

### For Course Images:
```tsx
// Replace this:
<div className="h-48 bg-gradient-to-br from-orange-100...">
  <p>Course Image</p>
</div>

// With this:
<Image 
  src="/course-safe.jpg" 
  alt="SAFe Certification" 
  width={400} 
  height={300}
  className="w-full h-48 object-cover"
/>
```

## Image Formats Supported
- JPG/JPEG
- PNG
- WebP (recommended for better performance)
- SVG (for logos)

## Tips
- Use WebP format for better performance
- Optimize images before adding (use tools like TinyPNG or ImageOptim)
- Keep file sizes under 500KB for faster loading
- Use descriptive filenames (e.g., `hero-agile-training.jpg` not `img1.jpg`)

