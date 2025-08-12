# NayacMard Store - Premium Clothing & Accessories

A modern, mobile-first, single-page storefront built with vanilla HTML, CSS, and JavaScript. Features tri-lingual support (Armenian, English, Russian), responsive design, and progressive enhancement.

## ✨ Features

- **🌍 Tri-lingual UI**: Armenian (hy-AM), English (en-US), Russian (ru-RU)
- **📱 Mobile-first Design**: Responsive across 360px - 1440px viewports
- **🎨 Modern CSS**: CSS Variables, Container Queries, :has(), @layer, clamp()
- **🎭 Smooth Animations**: CSS Scroll-Driven Animations, IntersectionObserver, Web Animations API
- **♿ Accessibility**: WCAG AA+ compliant, semantic HTML, keyboard navigation
- **🚀 Performance**: Lighthouse ≥95, lazy loading, optimized images
- **🔍 SEO Optimized**: Meta tags, JSON-LD schema, hreflang support
- **📱 Progressive Enhancement**: View Transitions API, scroll-timeline, fallbacks

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+)
- Local web server (for development)

### Installation

1. **Clone or download** the project files
2. **Start a local server** in the project directory:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```
3. **Open** `http://localhost:8000` in your browser

## 📁 Project Structure

```
nayacmard/
├── index.html              # Main HTML file
├── styles.css              # Complete CSS with modern features
├── app.js                  # Main JavaScript application
├── assets/
│   └── products.js         # Product catalog data
├── locales/
│   ├── hy.json            # Armenian translations
│   ├── en.json            # English translations
│   └── ru.json            # Russian translations
├── images/                 # Product and brand images
└── README.md               # This file
```

## 🛠️ Customization Guide

### Adding/Editing Products

Edit `assets/products.js` to modify the product catalog:

```javascript
{
    id: 9,
    name: {
        hy: "Նոր ապրանք",
        en: "New Product", 
        ru: "Новый товар"
    },
    priceAMD: 30000,
    category: "hoodies", // hoodies, t-shirts, pants, accessories
    colors: ["black", "white"],
    sizes: ["S", "M", "L", "XL"],
    images: ["images/new-product-1.jpg", "images/new-product-2.jpg"],
    wildberriesUrl: "https://wildberries.am/product/new-product", // or null
    description: {
        hy: "Հայերեն նկարագրություն",
        en: "English description",
        ru: "Русское описание"
    },
    isNew: true,    // Show NEW badge
    isSale: false   // Show SALE badge
}
```

**Image Requirements:**
- Format: JPG, PNG, WebP
- Dimensions: Square (1:1 aspect ratio) recommended
- Size: Optimize for web (max 800KB per image)
- Naming: Use descriptive names with numbers for variants

### Adding New Images

1. **Place images** in the `images/` directory
2. **Update product data** in `assets/products.js`
3. **Optimize images** for web (compress, resize if needed)

### Translating UI Text

Edit the locale files in `locales/` directory:

```json
{
    "nav": {
        "home": "Գլխավոր",
        "catalog": "Կատալոգ"
    },
    "hero": {
        "title": "Premium հագուստ",
        "description": "Նկարագրություն"
    }
}
```

**Translation Keys:**
- `nav.*` - Navigation menu items
- `hero.*` - Hero section content
- `cta.*` - Call-to-action buttons
- `filter.*` - Filter and search options
- `size.*` - Size guide content
- `delivery.*` - Delivery information
- `contacts.*` - Contact details
- `product.*` - Product modal content
- `badge.*` - Product badges
- `footer.*` - Footer content

### Changing Colors & Styling

Modify CSS variables in `styles.css`:

```css
:root {
    --color-primary: #111;           /* Main brand color */
    --color-accent: #FF5A5F;        /* Accent color */
    --color-white: #FFFFFF;          /* White */
    --color-neutral: #F6F6F6;        /* Light gray */
    --color-text: #111;              /* Text color */
    --color-text-secondary: #666;    /* Secondary text */
    --color-border: #E0E0E0;         /* Border color */
    
    --radius-sm: 6px;                /* Small border radius */
    --radius-md: 12px;               /* Medium border radius */
    --radius-lg: 16px;               /* Large border radius */
    
    --transition-fast: 120ms;        /* Fast animations */
    --transition-normal: 180ms;      /* Normal animations */
    --transition-slow: 280ms;        /* Slow animations */
}
```

### Modifying Animations

**CSS Animations:**
```css
@keyframes heroReveal {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.hero__title-line {
    animation: heroReveal 0.8s var(--transition-slow) forwards;
}
```

**JavaScript Animations:**
```javascript
// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
});
```

## 🌐 Internationalization (i18n)

### Language Switching

The app automatically:
- Detects user's preferred language
- Remembers language choice in localStorage
- Updates HTML lang attribute
- Translates all UI elements
- Updates meta tags for SEO

### Adding New Languages

1. **Create** new locale file: `locales/xx.json`
2. **Add** language button in HTML:
   ```html
   <button class="language-btn" data-lang="xx">XX</button>
   ```
3. **Update** JavaScript to load new locale:
   ```javascript
   await this.loadLocale('xx');
   ```

### Localized Content

- **Product names** and descriptions in all languages
- **UI text** automatically translated
- **Meta tags** updated per language
- **hreflang** tags for SEO

## 📱 Responsive Design

### Breakpoints

- **Mobile**: 360px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1440px+

### Container Queries

```css
@container (min-width: 600px) {
    .filters__content {
        flex-direction: row;
        align-items: center;
    }
}
```

### Mobile-First Approach

- Base styles for mobile
- Progressive enhancement for larger screens
- Touch-friendly interactions
- Optimized navigation for small screens

## ♿ Accessibility Features

### WCAG AA+ Compliance

- **Semantic HTML** structure
- **ARIA labels** and roles
- **Keyboard navigation** support
- **Focus management** in modals
- **Screen reader** compatibility
- **Color contrast** ratios
- **Reduced motion** support

### Keyboard Navigation

- **Tab** through interactive elements
- **Enter/Space** to activate buttons
- **Escape** to close modals
- **Arrow keys** in product gallery
- **Focus trap** in modal dialogs

### Screen Reader Support

- **Alt text** for all images
- **ARIA live regions** for dynamic content
- **Status announcements** for filters
- **Descriptive labels** for form controls

## 🚀 Performance Optimization

### Loading Strategy

- **Critical CSS** inlined
- **JavaScript** deferred/async
- **Images** lazy-loaded
- **Fonts** system stack (no external requests)

### Image Optimization

```html
<img src="image.jpg" 
     alt="Description"
     width="300" 
     height="300"
     loading="lazy"
     decoding="async">
```

### Progressive Enhancement

- **Core functionality** works without JavaScript
- **Enhanced features** with modern browsers
- **Graceful degradation** for older browsers
- **Feature detection** for advanced APIs

## 🔍 SEO Features

### Meta Tags

```html
<meta name="title" content="NayacMard Store - Premium Clothing">
<meta name="description" content="Premium clothing and accessories">
<meta name="keywords" content="clothing, hoodies, t-shirts, Armenia">
```

### Open Graph & Twitter Cards

```html
<meta property="og:title" content="NayacMard Store">
<meta property="og:description" content="Premium clothing">
<meta property="og:image" content="path/to/image.jpg">
```

### JSON-LD Schema

```json
{
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NayacMard Store",
    "url": "https://nayacmard.com"
}
```

### Hreflang Tags

```html
<link rel="alternate" hreflang="hy-am" href="https://nayacmard.com/#">
<link rel="alternate" hreflang="en-us" href="https://nayacmard.com/#">
<link rel="alternate" hreflang="ru-ru" href="https://nayacmard.com/#">
```

## 🚀 Deployment

### Netlify

1. **Connect** your GitHub repository
2. **Build settings**:
   - Build command: (leave empty)
   - Publish directory: `.`
3. **Deploy** automatically on push

### GitHub Pages

1. **Enable** GitHub Pages in repository settings
2. **Select** source branch (main/master)
3. **Deploy** automatically

### Vercel

1. **Import** your repository
2. **Framework preset**: Other
3. **Deploy** with default settings

### Custom Server

1. **Upload** all files to your web server
2. **Ensure** `.htaccess` or server config handles routing
3. **Test** all functionality

## 🧪 Testing

### Browser Testing

- **Chrome** 90+ ✅
- **Firefox** 88+ ✅
- **Safari** 14+ ✅
- **Edge** 90+ ✅

### Device Testing

- **Mobile**: iPhone, Android
- **Tablet**: iPad, Android tablets
- **Desktop**: Windows, macOS, Linux

### Performance Testing

```bash
# Lighthouse CLI
npm install -g lighthouse
lighthouse https://your-site.com --output html

# WebPageTest
# Visit webpagetest.org
```

### Accessibility Testing

- **axe DevTools** browser extension
- **WAVE** web accessibility evaluator
- **Screen reader** testing (NVDA, JAWS, VoiceOver)

## 🐛 Troubleshooting

### Common Issues

**Images not loading:**
- Check file paths in `products.js`
- Ensure images exist in `images/` directory
- Verify file permissions

**Translations not working:**
- Check locale file syntax (valid JSON)
- Verify `data-i18n` attributes in HTML
- Check browser console for errors

**Modal not opening:**
- Ensure JavaScript is loaded
- Check browser console for errors
- Verify product IDs match

**Responsive issues:**
- Test with browser dev tools
- Check CSS media queries
- Verify viewport meta tag

### Debug Mode

Enable debug logging in browser console:

```javascript
// In browser console
localStorage.setItem('debug', 'true');
location.reload();
```

## 📚 API Reference

### JavaScript Classes

#### I18n
- `setLanguage(locale)` - Change language
- `getTranslation(key)` - Get translation by key

#### ProductManager
- `filterProducts(filters)` - Filter products
- `renderProducts()` - Render product grid
- `getProductById(id)` - Get product by ID

#### ProductModal
- `open(productId)` - Open product modal
- `close()` - Close modal
- `goToImage(index)` - Navigate to image

#### FilterManager
- `updateCategoryFilter(category)` - Update category
- `updateSearchFilter(search)` - Update search
- `applyFilters()` - Apply all filters

### CSS Custom Properties

```css
:root {
    --color-primary: #111;
    --color-accent: #FF5A5F;
    --space-xs: 0.25rem;
    --space-sm: 0.5rem;
    --space-md: 1rem;
    --space-lg: 1.5rem;
    --space-xl: 2rem;
    --space-2xl: 3rem;
    --space-3xl: 4rem;
}
```

### Event Listeners

```javascript
// Language change
document.addEventListener('languageChange', (e) => {
    console.log('Language changed to:', e.detail.language);
});

// Product filter
document.addEventListener('filterChange', (e) => {
    console.log('Filters updated:', e.detail.filters);
});
```

## 🤝 Contributing

### Development Setup

1. **Fork** the repository
2. **Create** feature branch
3. **Make** changes
4. **Test** thoroughly
5. **Submit** pull request

### Code Style

- **HTML**: Semantic, accessible markup
- **CSS**: BEM methodology, CSS custom properties
- **JavaScript**: ES6+, class-based architecture
- **Comments**: Clear, descriptive documentation

### Testing Checklist

- [ ] Cross-browser compatibility
- [ ] Mobile responsiveness
- [ ] Accessibility compliance
- [ ] Performance optimization
- [ ] SEO requirements
- [ ] Internationalization

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **CSS Working Group** for modern CSS features
- **Web Animations API** contributors
- **Intersection Observer** specification
- **View Transitions API** team
- **Container Queries** working group

## 📞 Support

For questions, issues, or contributions:

- **Email**: info@nayacmard.com
- **GitHub**: Create an issue or pull request
- **Documentation**: Refer to this README

---

**Built with ❤️ for the Armenian community and modern web standards.**