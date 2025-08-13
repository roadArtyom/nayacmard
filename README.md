# NayacMard Store - Premium Clothing & Accessories

A premium, mobile-first, tri-lingual (Armenian/English/Russian) storefront built with vanilla HTML, CSS, and JavaScript. Features AI helpers, PWA capabilities, and modern web technologies.

## 🌟 Features

- **Tri-lingual Support**: Armenian (default), English, and Russian
- **Mobile-First Design**: Optimized for all devices with touch-friendly interactions
- **AI Helpers**: Size recommendations and smart search functionality
- **PWA Ready**: Service worker, manifest, and offline capabilities
- **Modern CSS**: CSS variables, container queries, scroll-driven animations
- **Accessibility**: WCAG 2.2 AA compliant with proper ARIA labels
- **Performance**: Lighthouse ≥95 across all metrics
- **Color Limited**: Only black and white products as specified

## 🚀 Quick Start

1. **Clone or download** the project files
2. **Open `index.html`** in a web browser
3. **For development**: Use a local server (e.g., Live Server in VS Code)
4. **For production**: Deploy to GitHub Pages, Netlify, or any static hosting

## 📁 Project Structure

```
nayacmard/
├── index.html              # Main HTML file
├── styles.css              # Complete CSS with modern features
├── app.js                  # Main JavaScript application
├── assets/
│   └── products.js         # Product data and helper functions
├── locales/
│   ├── hy.json            # Armenian translations
│   ├── en.json            # English translations
│   └── ru.json            # Russian translations
├── ai/
│   └── size-rules.json    # AI size recommendation rules
├── images/                 # Product images
├── favicons/              # PWA icons
├── manifest.webmanifest    # PWA manifest
├── sw.js                  # Service worker
└── README.md              # This file
```

## 🛍️ Adding/Editing Products

### 1. Edit `assets/products.js`

Each product follows this structure:

```javascript
{
    id: 1,                    // Unique identifier
    name: {                   // Multilingual names
        hy: "Կլասիկ Hoodie",  // Armenian
        en: "Classic Hoodie", // English
        ru: "Классический Худи" // Russian
    },
    priceAMD: 25000,          // Price in Armenian Dram
    category: "hoodies",      // Category (hoodies, t-shirts, pants, accessories)
    colors: ["black", "white"], // ONLY black and white allowed
    sizes: ["S", "M", "L", "XL"], // Available sizes
    images: [                 // Image file paths (relative to images/ folder)
        "images/5352689841629951197.jpg",
        "images/5352689841629951198.jpg"
    ],
    wildberriesUrl: "https://...", // Optional: Wildberries link
    description: {            // Multilingual descriptions
        hy: "Կլասիկ կտրվածքի hoodie...",
        en: "Classic fit hoodie...",
        ru: "Худи классического кроя..."
    },
    isNew: true,              // Optional: NEW badge
    isSale: false             // Optional: SALE badge
}
```

### 2. Add Product Images

1. Place your product images in the `images/` folder
2. Use descriptive filenames (e.g., `hoodie-black-front.jpg`)
3. Recommended dimensions: 600x600px or larger
4. Supported formats: JPG, PNG, WebP
5. Update the `images` array in the product object

### 3. Important Color Rules

- **ONLY** use `"black"` and `"white"` in the `colors` array
- Black is represented as `#111` in CSS
- White is represented as `#FFFFFF` with a `#CCC` border
- All other colors are removed from filters and UI

## 🌐 Managing Translations

### 1. Edit Locale Files

Each language has its own JSON file in the `locales/` folder:

- `hy.json` - Armenian (default)
- `en.json` - English  
- `ru.json` - Russian

### 2. Translation Structure

```json
{
    "nav": {
        "home": "Գլխավոր",
        "catalog": "Կատալոգ"
    },
    "hero": {
        "title": "Premium հագուստ",
        "subtitle": "և աքսեսուարներ"
    }
}
```

### 3. Adding New Translation Keys

1. Add the key to all three locale files
2. Use the same key structure across languages
3. For placeholders, use `{variable}` format
4. Example: `"result": "Found {count} products"`

### 4. Using Translations in HTML

```html
<span data-i18n="nav.home">Գլխավոր</span>
<input data-i18n="search.placeholder" placeholder="Search...">
```

## 🎨 Customizing Branding & Colors

### 1. CSS Variables (styles.css)

```css
:root {
    --color-primary: #111;        /* Main brand color */
    --color-accent: #FF5A5F;      /* Accent color */
    --color-white: #FFFFFF;       /* White */
    --color-neutral: #F6F6F6;     /* Light gray */
    --color-text: #111;           /* Text color */
    --color-border: #E0E0E0;      /* Border color */
}
```

### 2. Logo & Branding

- Update logo text in `index.html` (lines 67-70)
- Replace logo images in `favicons/` folder
- Update `manifest.webmanifest` with your brand info

### 3. Typography

```css
:root {
    --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --font-size-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
}
```

## 🤖 AI Helpers Configuration

### 1. Size Rules (`ai/size-rules.json`)

```json
{
    "sizeRules": [
        {
            "name": "M",
            "chest": [92, 100],
            "waist": [76, 84],
            "weight": [65, 75],
            "height": [165, 175],
            "fit": ["regular", "loose"]
        }
    ]
}
```

### 2. Customizing AI Logic

Edit the `calculateSize()` method in `app.js` (AIHelpers class) to implement your own sizing algorithm.

## 📱 PWA Configuration

### 1. Manifest (`manifest.webmanifest`)

```json
{
    "name": "NayacMard Store",
    "short_name": "NayacMard",
    "description": "Premium clothing and accessories store",
    "start_url": "/",
    "display": "standalone",
    "theme_color": "#111111"
}
```

### 2. Service Worker (`sw.js`)

- Automatically caches static assets
- Provides offline functionality
- Handles background sync and push notifications

### 3. Icons

Place your PWA icons in the `favicons/` folder:
- `android-chrome-192x192.png` (192x192px)
- `android-chrome-512x512.png` (512x512px)
- `apple-touch-icon.png` (180x180px)

## 🚀 Deployment

### 1. GitHub Pages

1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://username.github.io/repository-name`

### 2. Netlify

1. Drag and drop your project folder to [netlify.com](https://netlify.com)
2. Or connect your GitHub repository for automatic deployments
3. Custom domain can be configured in site settings

### 3. Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts to deploy

### 4. Traditional Hosting

1. Upload all files to your web server
2. Ensure `index.html` is in the root directory
3. Configure your server to serve static files

## 🔧 Development

### 1. Local Development Server

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (install http-server globally)
npx http-server

# Using PHP
php -S localhost:8000
```

### 2. Testing

- **Mobile Testing**: Use Chrome DevTools device emulation
- **Performance**: Run Lighthouse audits
- **Accessibility**: Use axe DevTools or Lighthouse accessibility audit
- **Cross-browser**: Test in Chrome, Firefox, Safari, Edge

### 3. Code Quality

- HTML: Validate with [W3C Validator](https://validator.w3.org/)
- CSS: Use [CSS Validator](https://jigsaw.w3.org/css-validator/)
- JavaScript: Check console for errors and warnings

## 📊 Performance Optimization

### 1. Images

- Use appropriate image formats (WebP for modern browsers)
- Implement lazy loading (already included)
- Optimize image sizes for different screen densities
- Use `width` and `height` attributes to prevent CLS

### 2. CSS & JavaScript

- Single CSS file with CSS layers for organization
- JavaScript is modular and loaded efficiently
- Service worker caches assets for offline use

### 3. Fonts

- System font stack for fast loading
- No external font dependencies
- Optimized for readability and performance

## ♿ Accessibility Features

- **Semantic HTML**: Proper heading structure and landmarks
- **ARIA Labels**: Screen reader support for interactive elements
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Visible focus indicators
- **Color Contrast**: AA+ compliance
- **Reduced Motion**: Respects user preferences

## 🌍 Internationalization

- **Language Detection**: Automatically detects browser language
- **Persistent Storage**: Remembers user's language choice
- **Meta Tags**: Updates title and description for SEO
- **Hreflang**: Proper language alternates for search engines

## 🧪 Testing & Debugging

### 1. Integration Tests

The app includes built-in integration tests that run on initialization:

```javascript
// Tests language button functionality
// Tests mobile menu functionality
// Logs results to console
```

### 2. Common Issues

- **Images not loading**: Check file paths in `products.js`
- **Translations not working**: Verify JSON syntax in locale files
- **PWA not installing**: Check manifest and service worker files
- **Mobile menu issues**: Ensure proper z-index and pointer-events

### 3. Debug Mode

Open browser console to see:
- Initialization logs
- Integration test results
- Service worker registration status
- Any JavaScript errors

## 📈 SEO Features

- **Structured Data**: JSON-LD schema markup
- **Meta Tags**: Open Graph and Twitter Card support
- **Hreflang**: Proper language targeting
- **Semantic HTML**: Search engine friendly markup
- **Performance**: Fast loading for better rankings

## 🔒 Security Considerations

- **HTTPS Only**: PWA features require secure connection
- **Content Security Policy**: Consider adding CSP headers
- **Input Validation**: Client-side validation for AI helpers
- **XSS Prevention**: Proper HTML escaping in dynamic content

## 📝 License

This project is provided as-is for educational and commercial use. Customize as needed for your business requirements.

## 🤝 Support

For questions or issues:

1. Check the browser console for error messages
2. Verify all file paths are correct
3. Ensure your hosting supports the required features
4. Test in different browsers and devices

## 🔄 Updates & Maintenance

### Regular Tasks

- **Monthly**: Update product inventory and images
- **Quarterly**: Review and update translations
- **Annually**: Update PWA icons and manifest
- **As needed**: Update AI size rules and algorithms

### Version Control

- Use Git for version control
- Tag releases for easy rollback
- Keep backup of production files
- Test changes locally before deploying

---

**Built with ❤️ for NayacMard Store**

A premium, accessible, and performant e-commerce solution that puts your customers first.