# Favicon Generation Guide

This directory contains the favicon files needed for the NayacMard Store. Some files need to be generated from the SVG source.

## Required Files

### 1. favicon.svg ✅
- **Status**: Created
- **Purpose**: Modern browsers, scalable icon
- **Size**: 32x32 viewBox

### 2. favicon.ico ✅
- **Status**: Created (placeholder)
- **Purpose**: Legacy browser support
- **Size**: 16x16, 32x32, 48x48 pixels
- **Generate from**: favicon.svg

### 3. apple-touch-icon.png ✅
- **Status**: Created (placeholder)
- **Purpose**: iOS home screen icon
- **Size**: 180x180 pixels
- **Generate from**: favicon.svg

### 4. android-chrome-192x192.png ✅
- **Status**: Created (placeholder)
- **Purpose**: Android Chrome icon
- **Size**: 192x192 pixels
- **Generate from**: favicon.svg

### 5. android-chrome-512x512.png ✅
- **Status**: Created (placeholder)
- **Purpose**: Android Chrome icon (high res)
- **Size**: 512x512 pixels
- **Generate from**: favicon.svg

### 6. maskable.svg ✅
- **Status**: Created
- **Purpose**: PWA maskable icon
- **Size**: 512x512 viewBox with safe area

## How to Generate Missing Files

### Option 1: Online Tools
1. **favicon.io** - Upload favicon.svg, download all formats
2. **realfavicongenerator.net** - Comprehensive favicon generation
3. **favicon-generator.org** - Simple online generator

### Option 2: Command Line (ImageMagick)
```bash
# Install ImageMagick
# macOS: brew install imagemagick
# Ubuntu: sudo apt-get install imagemagick

# Generate PNG files from SVG
convert favicon.svg -resize 16x16 favicon-16x16.png
convert favicon.svg -resize 32x32 favicon-32x32.png
convert favicon.svg -resize 180x180 apple-touch-icon.png
convert favicon.svg -resize 192x192 android-chrome-192x192.png
convert favicon.svg -resize 512x512 android-chrome-512x512.png

# Generate ICO file (multiple sizes)
convert favicon-16x16.png favicon-32x32.png favicon.ico
```

### Option 3: Design Software
- **Figma**: Export SVG to PNG at required sizes
- **Sketch**: Export SVG to PNG at required sizes
- **Adobe Illustrator**: Export SVG to PNG at required sizes

## File Naming Convention

All files should follow this naming pattern:
```
favicon.ico
favicon.svg
apple-touch-icon.png
android-chrome-192x192.png
android-chrome-512x512.png
maskable.svg
```

## Quality Requirements

- **PNG files**: High quality, no compression artifacts
- **ICO file**: Multiple sizes embedded (16x16, 32x32, 48x48)
- **SVG files**: Clean, optimized code
- **Colors**: Use brand colors (#111 for black, #FF5A5F for accent)

## Testing

After generating all files:
1. Test in different browsers
2. Verify PWA installation works
3. Check favicon appears in bookmarks
4. Test iOS "Add to Home Screen" functionality

## Notes

- The SVG files are already created and optimized
- Generate PNG/ICO files from the SVG source for best quality
- Ensure all files are in the `/favicons/` directory
- Update manifest.webmanifest if file names change
