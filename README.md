# Naya Cmard - Premium Clothing Store Website

A beautiful, responsive website for your online clothing store with a modern black and white design, multiple language support, and smooth animations.

## 🌟 Features

### ✨ Design & User Experience
- **Modern Black & White Design** - Clean, professional aesthetic
- **Fully Responsive** - Works perfectly on all devices (desktop, tablet, mobile)
- **Smooth Animations** - Fade-in effects, hover animations, and smooth transitions
- **Professional Typography** - Clean, readable fonts with proper hierarchy

### 🌍 Multi-Language Support
- **English (EN)** - Primary language
- **Armenian (ՀԱ)** - Native language support
- **Russian (РУ)** - Regional language support
- **Easy Language Switching** - Click language buttons to switch instantly

### 📱 Mobile-First Design
- **Touch-Friendly** - Optimized for mobile devices
- **Responsive Navigation** - Collapsible mobile menu
- **Optimized Images** - Fast loading on all devices
- **Mobile-Optimized Forms** - Easy to use on small screens

### 🛍️ Product Features
- **Product Gallery** - Beautiful product cards with hover effects
- **Category Filtering** - Filter by product type (shirts, jackets, dresses, pants)
- **Search Functionality** - Find products quickly
- **Image Modal** - Click to view larger product images
- **Pagination** - Navigate through large product catalogs

### 📞 Contact & Communication
- **Contact Form** - Easy customer inquiries
- **Phone Integration** - Direct phone calls to +374 99 499 979
- **Social Media Links** - Connect with your social platforms
- **Wildberries Integration** - Mention of your marketplace presence

## 🚀 Getting Started

### 1. File Structure
```
nayacmard/
├── index.html          # Main homepage
├── products.html       # Products page
├── images/            # Product and logo images
├── README.md          # This file
└── CNAME             # Domain configuration
```

### 2. Setup Instructions
1. **Upload Files** - Upload all files to your web hosting
2. **Images** - Ensure all images are in the `images/` folder
3. **Domain** - Point your domain to the hosting
4. **Test** - Open the website in different browsers and devices

### 3. Customization

#### Adding New Products
Edit the `products` array in `products.html`:

```javascript
{
    id: 13,
    name: "New Product Name",
    category: "shirts", // shirts, jackets, dresses, pants
    price: 49.99,
    description: "Product description here",
    image: "images/your-image.jpg",
    badge: "New" // Optional: New, Popular, Sale, Premium
}
```

#### Changing Colors
Modify CSS variables in both HTML files:

```css
:root {
    --primary-black: #000000;    /* Main black color */
    --primary-white: #ffffff;    /* Main white color */
    --accent-gray: #333333;      /* Secondary gray */
    --light-gray: #f5f5f5;      /* Light background */
}
```

#### Adding New Languages
1. Add new language button in HTML
2. Add translations to the `translations` object
3. Update language switching logic

#### Customizing Contact Information
Update contact details in `index.html`:
- Phone number: +374 99 499 979
- Email: info@nayacmard.com
- Location: Armenia, Yerevan
- Social media links

## 🎨 Design System

### Color Palette
- **Primary Black**: #000000 - Main text and accents
- **Primary White**: #ffffff - Backgrounds and highlights
- **Accent Gray**: #333333 - Secondary text and borders
- **Light Gray**: #f5f5f5 - Section backgrounds

### Typography
- **Primary Font**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Armenian Font**: Arial Unicode MS, Arial, sans-serif
- **Russian Font**: Arial, sans-serif

### Spacing
- **Section Padding**: 80px-100px
- **Grid Gaps**: 30px-40px
- **Component Margins**: 15px-25px

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🔧 Technical Features

### Performance
- **Optimized Images** - Proper sizing and compression
- **CSS Variables** - Easy customization and maintenance
- **Minimal JavaScript** - Fast loading and smooth interactions
- **Intersection Observer** - Efficient scroll animations

### Accessibility
- **Semantic HTML** - Proper heading structure
- **Alt Text** - Descriptive image alt attributes
- **Keyboard Navigation** - Full keyboard support
- **Screen Reader Friendly** - Proper ARIA labels

### SEO Ready
- **Meta Tags** - Proper title and description
- **Semantic Structure** - Clean HTML hierarchy
- **Fast Loading** - Optimized for search engines
- **Mobile Friendly** - Google mobile-first indexing

## 🌐 Browser Support

- **Chrome** 60+
- **Firefox** 55+
- **Safari** 12+
- **Edge** 79+
- **Mobile Browsers** - All modern mobile browsers

## 📞 Support & Contact

For technical support or customization requests:
- **Phone**: +374 99 499 979
- **Email**: info@nayacmard.com

## 🚀 Future Enhancements

Potential features to add:
- **Shopping Cart** - E-commerce functionality
- **User Accounts** - Customer login system
- **Product Reviews** - Customer feedback system
- **Size Guide** - Product sizing information
- **Wishlist** - Save favorite products
- **Newsletter** - Email marketing integration
- **Analytics** - Track website performance

## 📄 License

This website is created specifically for Naya Cmard clothing store. All rights reserved.

---

**Built with ❤️ for Naya Cmard - Where Style Meets Quality**