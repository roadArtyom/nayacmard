/**
 * NayacMard Store - Main Application
 * Vanilla JavaScript with modern features and progressive enhancement
 */

// ===== GLOBAL STATE =====
let currentLanguage = 'hy';
let currentFilters = {
    category: 'all',
    search: '',
    size: '',
    color: ''
};
let currentProducts = [];
let currentProductIndex = 0;
let currentImageIndex = 0;

// ===== INTERNATIONALIZATION =====
class I18n {
    constructor() {
        this.locales = {};
        this.currentLocale = 'hy';
        this.fallbackLocale = 'hy';
    }

    async loadLocale(locale) {
        try {
            const response = await fetch(`locales/${locale}.json`);
            this.locales[locale] = await response.json();
        } catch (error) {
            console.warn(`Failed to load locale ${locale}:`, error);
            // Fallback to fallback locale
            if (locale !== this.fallbackLocale) {
                return this.loadLocale(this.fallbackLocale);
            }
        }
    }

    async init() {
        // Load all locales
        await Promise.all([
            this.loadLocale('hy'),
            this.loadLocale('en'),
            this.loadLocale('ru')
        ]);
        
        // Set initial language from localStorage or default
        const savedLang = localStorage.getItem('nayacmard-language') || 'hy';
        await this.setLanguage(savedLang);
    }

    async setLanguage(locale) {
        if (!this.locales[locale]) {
            console.warn(`Locale ${locale} not found, falling back to ${this.fallbackLocale}`);
            locale = this.fallbackLocale;
        }

        this.currentLocale = locale;
        currentLanguage = locale;
        
        // Update HTML lang attribute
        document.documentElement.lang = locale;
        
        // Update meta tags
        this.updateMetaTags();
        
        // Update all i18n elements
        this.updateAllElements();
        
        // Save to localStorage
        localStorage.setItem('nayacmard-language', locale);
        
        // Update language buttons
        this.updateLanguageButtons();
    }

    updateMetaTags() {
        const locale = this.currentLocale;
        const locales = {
            'hy': { title: 'NayacMard Store - Գնումներ առցանց', desc: 'Premium հագուստ և աքսեսուարներ' },
            'en': { title: 'NayacMard Store - Online Shopping', desc: 'Premium clothing and accessories' },
            'ru': { title: 'NayacMard Store - Онлайн покупки', desc: 'Премиальная одежда и аксессуары' }
        };

        document.title = locales[locale].title;
        document.querySelector('meta[name="description"]').setAttribute('content', locales[locale].desc);
        
        // Update Open Graph tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogTitle) ogTitle.setAttribute('content', locales[locale].title);
        if (ogDesc) ogDesc.setAttribute('content', locales[locale].desc);
    }

    updateAllElements() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'search') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
    }

    getTranslation(key) {
        const keys = key.split('.');
        let value = this.locales[this.currentLocale];
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return null;
            }
        }
        
        return value;
    }

    updateLanguageButtons() {
        const buttons = document.querySelectorAll('.language-btn');
        buttons.forEach(btn => {
            const lang = btn.getAttribute('data-lang');
            btn.classList.toggle('active', lang === this.currentLocale);
        });
    }
}

// ===== PRODUCT MANAGEMENT =====
class ProductManager {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
    }

    async init() {
        // Import products from products.js
        try {
            const { products, filterProducts } = await import('./assets/products.js');
            this.products = products;
            this.filteredProducts = [...products];
            this.renderProducts();
            this.updateResultsCount();
        } catch (error) {
            console.error('Failed to load products:', error);
        }
    }

    filterProducts(filters) {
        let filtered = [...this.products];
        
        // Category filter
        if (filters.category && filters.category !== 'all') {
            filtered = filtered.filter(product => product.category === filters.category);
        }
        
        // Search filter
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filtered = filtered.filter(product => 
                product.name[currentLanguage].toLowerCase().includes(searchTerm) ||
                product.description[currentLanguage].toLowerCase().includes(searchTerm)
            );
        }
        
        // Size filter
        if (filters.size) {
            filtered = filtered.filter(product => product.sizes.includes(filters.size));
        }
        
        // Color filter
        if (filters.color) {
            filtered = filtered.filter(product => product.colors.includes(filters.color));
        }
        
        this.filteredProducts = filtered;
        this.renderProducts();
        this.updateResultsCount();
    }

    renderProducts() {
        const grid = document.getElementById('products-grid');
        if (!grid) return;

        grid.innerHTML = '';
        
        if (this.filteredProducts.length === 0) {
            grid.innerHTML = `
                <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                    <h3>${i18n.getTranslation('filter.no-results') || 'No products found'}</h3>
                </div>
            `;
            return;
        }

        this.filteredProducts.forEach(product => {
            const card = this.createProductCard(product);
            grid.appendChild(card);
        });
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-product-id', product.id);
        
        const badges = [];
        if (product.isNew) badges.push(`<span class="badge badge--new">${i18n.getTranslation('badge.new')}</span>`);
        if (product.isSale) badges.push(`<span class="badge badge--sale">${i18n.getTranslation('badge.sale')}</span>`);
        
        const colorChips = product.colors.map(color => 
            `<div class="color-chip color-chip--${color}" title="${color}"></div>`
        ).join('');
        
        const sizePills = product.sizes.map(size => 
            `<span class="size-pill">${size}</span>`
        ).join('');
        
        card.innerHTML = `
            <div class="product-card__image">
                <img src="${product.images[0]}" 
                     alt="${product.name[currentLanguage]}" 
                     width="300" 
                     height="300"
                     loading="lazy"
                     decoding="async">
                ${badges.length > 0 ? `<div class="product-card__badges">${badges.join('')}</div>` : ''}
            </div>
            <div class="product-card__content">
                <h3 class="product-card__title">${product.name[currentLanguage]}</h3>
                <div class="product-card__price">${product.priceAMD.toLocaleString()} AMD</div>
                <div class="product-card__options">
                    <div class="color-chips">${colorChips}</div>
                    <div class="size-pills">${sizePills}</div>
                </div>
                <div class="product-card__actions">
                    <button class="btn btn--primary" onclick="productModal.open(${product.id})">
                        ${i18n.getTranslation('cta.whatsapp')}
                    </button>
                    ${product.wildberriesUrl ? 
                        `<a href="${product.wildberriesUrl}" class="btn btn--outline" target="_blank" rel="noopener">
                            ${i18n.getTranslation('cta.wb')}
                        </a>` : ''
                    }
                    <button class="btn btn--outline" onclick="productModal.open(${product.id})">
                        ${i18n.getTranslation('cta.details') || 'Details'}
                    </button>
                </div>
            </div>
        `;
        
        return card;
    }

    updateResultsCount() {
        const countElement = document.getElementById('results-count');
        if (countElement) {
            countElement.textContent = this.filteredProducts.length;
        }
    }

    getProductById(id) {
        return this.products.find(product => product.id === id);
    }
}

// ===== PRODUCT MODAL =====
class ProductModal {
    constructor() {
        this.modal = document.getElementById('product-modal');
        this.currentProduct = null;
        this.currentImageIndex = 0;
        this.init();
    }

    init() {
        // Close modal on overlay click
        this.modal.querySelector('.modal__overlay').addEventListener('click', () => this.close());
        
        // Close modal on close button click
        this.modal.querySelector('.modal__close').addEventListener('click', () => this.close());
        
        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.modal.hidden) {
                this.close();
            }
        });
        
        // Navigation buttons
        this.modal.querySelector('.gallery__nav--prev').addEventListener('click', () => this.previousImage());
        this.modal.querySelector('.gallery__nav--next').addEventListener('click', () => this.nextImage());
        
        // WhatsApp button
        this.modal.querySelector('#modal-whatsapp-btn').addEventListener('click', () => this.openWhatsApp());
        
        // Wildberries button
        this.modal.querySelector('#modal-wb-btn').addEventListener('click', () => this.openWildberries());
        
        // Share button
        this.modal.querySelector('#modal-share-btn').addEventListener('click', () => this.shareProduct());
    }

    open(productId) {
        const product = productManager.getProductById(productId);
        if (!product) return;

        this.currentProduct = product;
        this.currentImageIndex = 0;
        
        this.updateModalContent();
        this.showModal();
        
        // Focus trap
        this.setupFocusTrap();
    }

    close() {
        this.hideModal();
        this.currentProduct = null;
        this.currentImageIndex = 0;
        
        // Remove focus trap
        this.removeFocusTrap();
    }

    showModal() {
        this.modal.hidden = false;
        document.body.style.overflow = 'hidden';
        
        // Focus first focusable element
        const firstFocusable = this.modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) firstFocusable.focus();
    }

    hideModal() {
        this.modal.hidden = true;
        document.body.style.overflow = '';
    }

    updateModalContent() {
        const product = this.currentProduct;
        
        // Update title and description
        this.modal.querySelector('#modal-title').textContent = product.name[currentLanguage];
        this.modal.querySelector('#modal-description').textContent = product.description[currentLanguage];
        
        // Update main image
        this.updateMainImage();
        
        // Update thumbnails
        this.updateThumbnails();
        
        // Update size pills
        this.updateSizePills();
        
        // Update color chips
        this.updateColorChips();
        
        // Show/hide Wildberries button
        const wbBtn = this.modal.querySelector('#modal-wb-btn');
        if (product.wildberriesUrl) {
            wbBtn.style.display = 'block';
            wbBtn.onclick = () => window.open(product.wildberriesUrl, '_blank');
        } else {
            wbBtn.style.display = 'none';
        }
    }

    updateMainImage() {
        const product = this.currentProduct;
        const mainImage = this.modal.querySelector('#modal-main-image');
        mainImage.src = product.images[this.currentImageIndex];
        mainImage.alt = product.name[currentLanguage];
    }

    updateThumbnails() {
        const product = this.currentProduct;
        const thumbnailsContainer = this.modal.querySelector('#modal-thumbnails');
        
        thumbnailsContainer.innerHTML = product.images.map((image, index) => `
            <img src="${image}" 
                 alt="${product.name[currentLanguage]} - ${index + 1}" 
                 class="${index === this.currentImageIndex ? 'active' : ''}"
                 onclick="productModal.goToImage(${index})"
                 width="60" 
                 height="60">
        `).join('');
    }

    updateSizePills() {
        const product = this.currentProduct;
        const sizePillsContainer = this.modal.querySelector('#modal-size-pills');
        
        sizePillsContainer.innerHTML = product.sizes.map(size => `
            <span class="size-pill" onclick="productModal.selectSize('${size}')">${size}</span>
        `).join('');
    }

    updateColorChips() {
        const product = this.currentProduct;
        const colorChipsContainer = this.modal.querySelector('#modal-color-chips');
        
        colorChipsContainer.innerHTML = product.colors.map(color => `
            <div class="color-chip color-chip--${color}" 
                 onclick="productModal.selectColor('${color}')" 
                 title="${color}"></div>
        `).join('');
    }

    goToImage(index) {
        this.currentImageIndex = index;
        this.updateMainImage();
        this.updateThumbnails();
    }

    previousImage() {
        const product = this.currentProduct;
        this.currentImageIndex = (this.currentImageIndex - 1 + product.images.length) % product.images.length;
        this.updateMainImage();
        this.updateThumbnails();
    }

    nextImage() {
        const product = this.currentProduct;
        this.currentImageIndex = (this.currentImageIndex + 1) % product.images.length;
        this.updateMainImage();
        this.updateThumbnails();
    }

    selectSize(size) {
        // Update size selection UI
        const pills = this.modal.querySelectorAll('#modal-size-pills .size-pill');
        pills.forEach(pill => pill.classList.remove('selected'));
        event.target.classList.add('selected');
    }

    selectColor(color) {
        // Update color selection UI
        const chips = this.modal.querySelectorAll('#modal-color-chips .color-chip');
        chips.forEach(chip => chip.classList.remove('selected'));
        event.target.classList.add('selected');
    }

    openWhatsApp() {
        const product = this.currentProduct;
        const selectedSize = this.modal.querySelector('#modal-size-pills .size-pill.selected')?.textContent || '';
        const selectedColor = this.modal.querySelector('#modal-color-chips .color-chip.selected')?.classList.contains('selected') ? 
            this.modal.querySelector('#modal-color-chips .color-chip.selected').classList[1].replace('color-chip--', '') : '';
        
        let message = `Բարև, ուզում եմ պատվիրել — ${product.name.hy}`;
        if (selectedSize) message += ` (Չափ: ${selectedSize})`;
        if (selectedColor) message += ` (Գույն: ${selectedColor})`;
        message += ` - ${product.priceAMD.toLocaleString()} AMD`;
        
        const whatsappUrl = `https://wa.me/374XXXXXXXXX?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }

    openWildberries() {
        if (this.currentProduct?.wildberriesUrl) {
            window.open(this.currentProduct.wildberriesUrl, '_blank');
        }
    }

    async shareProduct() {
        const product = this.currentProduct;
        
        if (navigator.share) {
            try {
                await navigator.share({
                    title: product.name[currentLanguage],
                    text: product.description[currentLanguage],
                    url: window.location.href
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            // Fallback: copy to clipboard
            const url = window.location.href;
            try {
                await navigator.clipboard.writeText(url);
                alert('Link copied to clipboard!');
            } catch (error) {
                console.log('Error copying to clipboard:', error);
            }
        }
    }

    setupFocusTrap() {
        const focusableElements = this.modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        this.modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }

    removeFocusTrap() {
        // Focus trap is automatically removed when modal is hidden
    }
}

// ===== FILTERS & SEARCH =====
class FilterManager {
    constructor() {
        this.init();
    }

    init() {
        // Category chips
        document.querySelectorAll('.category-chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                this.updateCategoryFilter(e.target.getAttribute('data-category'));
            });
        });
        
        // Search input
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.updateSearchFilter(e.target.value);
            });
        }
        
        // Size filter
        const sizeFilter = document.getElementById('size-filter');
        if (sizeFilter) {
            sizeFilter.addEventListener('change', (e) => {
                this.updateSizeFilter(e.target.value);
            });
        }
        
        // Color filter
        const colorFilter = document.getElementById('color-filter');
        if (colorFilter) {
            colorFilter.addEventListener('change', (e) => {
                this.updateColorFilter(e.target.value);
            });
        }
    }

    updateCategoryFilter(category) {
        // Update active state
        document.querySelectorAll('.category-chip').forEach(chip => {
            chip.classList.toggle('active', chip.getAttribute('data-category') === category);
        });
        
        currentFilters.category = category;
        this.applyFilters();
    }

    updateSearchFilter(search) {
        currentFilters.search = search;
        this.applyFilters();
    }

    updateSizeFilter(size) {
        currentFilters.size = size;
        this.applyFilters();
    }

    updateColorFilter(color) {
        currentFilters.color = color;
        this.applyFilters();
    }

    applyFilters() {
        productManager.filterProducts(currentFilters);
    }
}

// ===== SCROLL SPY & SMOOTH SCROLLING =====
class ScrollManager {
    constructor() {
        this.init();
    }

    init() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Scroll spy for navigation
        this.setupScrollSpy();
        
        // Intersection Observer for animations
        this.setupIntersectionObserver();
    }

    setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.header__nav-link');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.updateActiveNavLink(id);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-80px 0px -80% 0px'
        });
        
        sections.forEach(section => observer.observe(section));
    }

    updateActiveNavLink(activeId) {
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${activeId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe elements for animation
        document.querySelectorAll('.product-card, .delivery__item, .contact-item').forEach(el => {
            observer.observe(el);
        });
    }
}

// ===== MOBILE MENU =====
class MobileMenu {
    constructor() {
        this.menuButton = document.querySelector('.header__mobile-menu');
        this.nav = document.querySelector('.header__nav');
        this.init();
    }

    init() {
        this.menuButton.addEventListener('click', () => this.toggle());
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.menuButton.contains(e.target) && !this.nav.contains(e.target)) {
                this.close();
            }
        });
    }

    toggle() {
        const isExpanded = this.menuButton.getAttribute('aria-expanded') === 'true';
        this.menuButton.setAttribute('aria-expanded', !isExpanded);
        
        if (isExpanded) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.nav.classList.add('mobile-open');
        this.menuButton.classList.add('active');
    }

    close() {
        this.nav.classList.remove('mobile-open');
        this.menuButton.classList.remove('active');
    }
}

// ===== UTILITIES =====
class Utils {
    static formatPrice(price) {
        return price.toLocaleString('hy-AM') + ' AMD';
    }
    
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}

// ===== INITIALIZATION =====
let i18n, productManager, productModal, filterManager, scrollManager, mobileMenu;

async function init() {
    try {
        // Initialize internationalization
        i18n = new I18n();
        await i18n.init();
        
        // Initialize components
        productManager = new ProductManager();
        productModal = new ProductModal();
        filterManager = new FilterManager();
        scrollManager = new ScrollManager();
        mobileMenu = new MobileMenu();
        
        // Initialize products
        await productManager.init();
        
        // Setup language switcher
        setupLanguageSwitcher();
        
        // Setup WhatsApp float button
        setupWhatsAppFloat();
        
        // Setup scroll-driven animations (progressive enhancement)
        setupScrollAnimations();
        
        console.log('NayacMard Store initialized successfully');
        
    } catch (error) {
        console.error('Failed to initialize NayacMard Store:', error);
    }
}

function setupLanguageSwitcher() {
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const lang = btn.getAttribute('data-lang');
            await i18n.setLanguage(lang);
            
            // Re-render products with new language
            if (productManager) {
                productManager.renderProducts();
            }
        });
    });
}

function setupWhatsAppFloat() {
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.addEventListener('click', (e) => {
            e.preventDefault();
            const message = encodeURIComponent('Բարև, ուզում եմ տեղեկություն ստանալ NayacMard Store-ի մասին');
            window.open(`https://wa.me/374XXXXXXXXX?text=${message}`, '_blank');
        });
    }
}

function setupScrollAnimations() {
    // Progressive enhancement: Scroll-driven animations
    if (CSS.supports('scroll-timeline: --page-scroll block')) {
        document.documentElement.style.setProperty('--page-scroll', 'block');
        
        // Add scroll timeline to hero image
        const heroImage = document.querySelector('.hero__image img');
        if (heroImage) {
            heroImage.style.setProperty('--parallax-depth', '50');
        }
    }
}

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', init);

// Handle view transitions API (progressive enhancement)
if ('startViewTransition' in document) {
    document.addEventListener('click', (e) => {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const target = document.querySelector(e.target.getAttribute('href'));
            if (target) {
                document.startViewTransition(() => {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            }
        }
    });
}

// Handle reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('reduced-motion');
}

// ===== EXPORTS FOR GLOBAL ACCESS =====
window.productModal = null; // Will be set after initialization
window.productManager = null; // Will be set after initialization
