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
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', locales[locale].desc);
        
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
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
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
            if (lang === this.currentLocale) {
                btn.setAttribute('aria-pressed', 'true');
                btn.classList.add('active');
            } else {
                btn.setAttribute('aria-pressed', 'false');
                btn.classList.remove('active');
            }
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
        try {
            // Import products from products.js
            const { products } = await import('./assets/products.js');
            this.products = products;
            this.filteredProducts = [...products];
            this.renderProducts();
            this.updateResultsCount();
        } catch (error) {
            console.error('Failed to load products:', error);
        }
    }

    filterProducts() {
        let filtered = [...this.products];
        
        // Category filter
        if (currentFilters.category && currentFilters.category !== 'all') {
            filtered = filtered.filter(product => product.category === currentFilters.category);
        }
        
        // Search filter
        if (currentFilters.search) {
            const searchTerm = currentFilters.search.toLowerCase();
            filtered = filtered.filter(product => 
                product.name[currentLanguage].toLowerCase().includes(searchTerm) ||
                product.description[currentLanguage].toLowerCase().includes(searchTerm)
            );
        }
        
        // Size filter
        if (currentFilters.size) {
            filtered = filtered.filter(product => product.sizes.includes(currentFilters.size));
        }
        
        // Color filter
        if (currentFilters.color) {
            filtered = filtered.filter(product => product.colors.includes(currentFilters.color));
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
                <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: var(--space-2xl);">
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
        if (product.isNew) badges.push('<span class="badge badge--new">NEW</span>');
        if (product.isSale) badges.push('<span class="badge badge--sale">SALE</span>');
        
        const colorChips = product.colors.map(color => 
            `<div class="color-chip color-chip--${color}" data-color="${color}" title="${color}"></div>`
        ).join('');
        
        const sizePills = product.sizes.map(size => 
            `<button class="size-pill" data-size="${size}">${size}</button>`
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
                <div class="product-card__price">${product.priceAMD} AMD</div>
                <div class="product-card__options">
                    <div class="option-group">
                        <label class="option-label">Size</label>
                        <div class="size-pills">${sizePills}</div>
                    </div>
                    <div class="option-group">
                        <label class="option-label">Color</label>
                        <div class="color-chips">${colorChips}</div>
                    </div>
                </div>
                <div class="product-card__actions">
                    <button class="btn btn--primary" onclick="openProductModal(${product.id})">
                        ${i18n.getTranslation('cta.whatsapp') || 'WhatsApp'}
                    </button>
                    ${product.wildberriesUrl ? `
                        <a href="${product.wildberriesUrl}" class="btn btn--outline" target="_blank" rel="noopener">
                            ${i18n.getTranslation('cta.wb') || 'Wildberries'}
                        </a>
                    ` : ''}
                    <button class="btn btn--outline" onclick="openProductModal(${product.id})">
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

// ===== AI HELPERS =====
class AIHelpers {
    constructor() {
        this.sizeRules = null;
    }

    async init() {
        await this.loadSizeRules();
        this.bindEvents();
    }

    async loadSizeRules() {
        try {
            const response = await fetch('ai/size-rules.json');
            this.sizeRules = await response.json();
        } catch (error) {
            console.warn('Failed to load size rules:', error);
        }
    }

    bindEvents() {
        const getSizeBtn = document.getElementById('get-size-btn');
        const aiSearchBtn = document.getElementById('ai-search-btn');
        
        if (getSizeBtn) {
            getSizeBtn.addEventListener('click', () => this.getSizeRecommendation());
        }
        
        if (aiSearchBtn) {
            aiSearchBtn.addEventListener('click', () => this.performAISearch());
        }
    }

    getSizeRecommendation() {
        const height = parseInt(document.getElementById('height-input').value);
        const weight = parseInt(document.getElementById('weight-input').value);
        const fitPreference = document.getElementById('fit-preference').value;
        const resultDiv = document.getElementById('size-result');
        
        if (!height || !weight) {
            resultDiv.innerHTML = `<p style="color: #e74c3c;">${i18n.getTranslation('ai.size.error') || 'Please enter valid measurements'}</p>`;
            resultDiv.hidden = false;
            return;
        }
        
        if (!this.sizeRules) {
            resultDiv.innerHTML = '<p style="color: #e74c3c;">Size rules not available</p>';
            resultDiv.hidden = false;
            return;
        }
        
        // Simple rule-based size recommendation
        let recommendedSize = this.calculateSize(height, weight, fitPreference);
        
        resultDiv.innerHTML = `
            <p style="color: #27ae60;">
                ${i18n.getTranslation('ai.size.result')?.replace('{size}', recommendedSize) || `Recommended size: ${recommendedSize}`}
            </p>
        `;
        resultDiv.hidden = false;
    }

    calculateSize(height, weight, fitPreference) {
        // Simple BMI-based calculation
        const heightM = height / 100;
        const bmi = weight / (heightM * heightM);
        
        let baseSize = 'M';
        
        if (height < 160) {
            baseSize = bmi < 20 ? 'XS' : 'S';
        } else if (height < 170) {
            baseSize = bmi < 20 ? 'S' : 'M';
        } else if (height < 180) {
            baseSize = bmi < 20 ? 'M' : 'L';
        } else {
            baseSize = bmi < 20 ? 'L' : 'XL';
        }
        
        // Adjust based on fit preference
        const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
        let sizeIndex = sizeOrder.indexOf(baseSize);
        
        if (fitPreference === 'tight' && sizeIndex > 0) sizeIndex--;
        if (fitPreference === 'loose' && sizeIndex < sizeOrder.length - 1) sizeIndex++;
        
        return sizeOrder[sizeIndex];
    }

    performAISearch() {
        const searchInput = document.getElementById('ai-search-input').value;
        const resultDiv = document.getElementById('ai-search-result');
        
        if (!searchInput.trim()) {
            resultDiv.innerHTML = `<p style="color: #e74c3c;">Please enter a search term</p>`;
            resultDiv.hidden = false;
            return;
        }
        
        // Simple fuzzy search
        const results = this.fuzzySearch(searchInput);
        
        if (results.length === 0) {
            resultDiv.innerHTML = `<p style="color: #e74c3c;">${i18n.getTranslation('ai.search.no-results') || 'No results found'}</p>`;
        } else {
            resultDiv.innerHTML = `
                <p style="color: #27ae60;">
                    ${i18n.getTranslation('ai.search.results-found')?.replace('{count}', results.length) || `Found ${results.length} products`}
                </p>
                <ul style="margin-top: 10px; padding-left: 20px;">
                    ${results.slice(0, 5).map(product => 
                        `<li>${product.name[currentLanguage]} - ${product.priceAMD} AMD</li>`
                    ).join('')}
                </ul>
            `;
        }
        
        resultDiv.hidden = false;
    }

    fuzzySearch(query) {
        const searchTerm = query.toLowerCase();
        const results = [];
        
        productManager.products.forEach(product => {
            const name = product.name[currentLanguage].toLowerCase();
            const description = product.description[currentLanguage].toLowerCase();
            
            // Simple fuzzy matching
            if (name.includes(searchTerm) || description.includes(searchTerm)) {
                results.push(product);
            } else {
                // Check for partial matches
                const words = searchTerm.split(' ');
                const nameWords = name.split(' ');
                const descWords = description.split(' ');
                
                const nameMatch = words.some(word => 
                    nameWords.some(nw => nw.includes(word))
                );
                const descMatch = words.some(word => 
                    descWords.some(dw => dw.includes(word))
                );
                
                if (nameMatch || descMatch) {
                    results.push(product);
                }
            }
        });
        
        return results;
    }
}

// ===== MODAL MANAGEMENT =====
class ModalManager {
    constructor() {
        this.modal = null;
        this.currentProduct = null;
        this.currentImageIndex = 0;
    }

    init() {
        this.modal = document.getElementById('product-modal');
        this.bindEvents();
    }

    bindEvents() {
        const closeBtn = this.modal?.querySelector('.modal__close');
        const overlay = this.modal?.querySelector('.modal__overlay');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }
        
        if (overlay) {
            overlay.addEventListener('click', () => this.closeModal());
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal && !this.modal.hidden) {
                this.closeModal();
            }
        });
    }

    openModal(productId) {
        const product = productManager.getProductById(productId);
        if (!product || !this.modal) return;
        
        this.currentProduct = product;
        this.currentImageIndex = 0;
        
        this.updateModalContent();
        this.modal.hidden = false;
        document.body.style.overflow = 'hidden';
        
        // Focus trap
        this.setupFocusTrap();
    }

    closeModal() {
        if (!this.modal) return;
        
        this.modal.hidden = true;
        document.body.style.overflow = '';
        this.currentProduct = null;
        
        // Remove focus trap
        this.removeFocusTrap();
    }

    updateModalContent() {
        if (!this.currentProduct) return;
        
        const product = this.currentProduct;
        
        // Update title and description
        const title = this.modal.querySelector('#modal-title');
        const description = this.modal.querySelector('#modal-description');
        
        if (title) title.textContent = product.name[currentLanguage];
        if (description) description.textContent = product.description[currentLanguage];
        
        // Update main image
        const mainImage = this.modal.querySelector('#modal-main-image');
        if (mainImage && product.images.length > 0) {
            mainImage.src = product.images[this.currentImageIndex];
            mainImage.alt = product.name[currentLanguage];
        }
        
        // Update thumbnails
        this.updateThumbnails();
        
        // Update size pills
        this.updateSizePills();
        
        // Update color chips
        this.updateColorChips();
        
        // Update action buttons
        this.updateActionButtons();
    }

    updateThumbnails() {
        const thumbnailsContainer = this.modal.querySelector('#modal-thumbnails');
        if (!thumbnailsContainer || !this.currentProduct) return;
        
        thumbnailsContainer.innerHTML = '';
        
        this.currentProduct.images.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = `gallery__thumbnail ${index === this.currentImageIndex ? 'active' : ''}`;
            thumbnail.onclick = () => this.changeImage(index);
            
            const img = document.createElement('img');
            img.src = image;
            img.alt = `${this.currentProduct.name[currentLanguage]} - Image ${index + 1}`;
            img.loading = 'lazy';
            
            thumbnail.appendChild(img);
            thumbnailsContainer.appendChild(thumbnail);
        });
    }

    updateSizePills() {
        const sizePillsContainer = this.modal.querySelector('#modal-size-pills');
        if (!sizePillsContainer || !this.currentProduct) return;
        
        sizePillsContainer.innerHTML = '';
        
        this.currentProduct.sizes.forEach(size => {
            const pill = document.createElement('button');
            pill.className = 'size-pill';
            pill.textContent = size;
            pill.onclick = () => this.selectSize(size);
            sizePillsContainer.appendChild(pill);
        });
    }

    updateColorChips() {
        const colorChipsContainer = this.modal.querySelector('#modal-color-chips');
        if (!colorChipsContainer || !this.currentProduct) return;
        
        colorChipsContainer.innerHTML = '';
        
        this.currentProduct.colors.forEach(color => {
            const chip = document.createElement('div');
            chip.className = `color-chip color-chip--${color}`;
            chip.setAttribute('data-color', color);
            chip.onclick = () => this.selectColor(color);
            colorChipsContainer.appendChild(chip);
        });
    }

    updateActionButtons() {
        const whatsappBtn = this.modal.querySelector('#modal-whatsapp-btn');
        const wbBtn = this.modal.querySelector('#modal-wb-btn');
        const shareBtn = this.modal.querySelector('#modal-share-btn');
        
        if (whatsappBtn) {
            whatsappBtn.onclick = () => this.openWhatsApp();
        }
        
        if (wbBtn && this.currentProduct.wildberriesUrl) {
            wbBtn.style.display = 'block';
            wbBtn.onclick = () => window.open(this.currentProduct.wildberriesUrl, '_blank');
        } else if (wbBtn) {
            wbBtn.style.display = 'none';
        }
        
        if (shareBtn) {
            shareBtn.onclick = () => this.shareProduct();
        }
    }

    changeImage(index) {
        if (!this.currentProduct || index < 0 || index >= this.currentProduct.images.length) return;
        
        this.currentImageIndex = index;
        
        // Update main image
        const mainImage = this.modal.querySelector('#modal-main-image');
        if (mainImage) {
            mainImage.src = this.currentProduct.images[index];
        }
        
        // Update thumbnail selection
        const thumbnails = this.modal.querySelectorAll('.gallery__thumbnail');
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    }

    selectSize(size) {
        // Update size selection UI
        const pills = this.modal.querySelectorAll('.size-pill');
        pills.forEach(pill => {
            pill.classList.toggle('selected', pill.textContent === size);
        });
    }

    selectColor(color) {
        // Update color selection UI
        const chips = this.modal.querySelectorAll('.color-chip');
        chips.forEach(chip => {
            chip.classList.toggle('selected', chip.getAttribute('data-color') === color);
        });
    }

    openWhatsApp() {
        const product = this.currentProduct;
        if (!product) return;
        
        const message = `Hi! I'm interested in ${product.name[currentLanguage]} (${product.priceAMD} AMD)`;
        const whatsappUrl = `https://wa.me/374XXXXXXXXX?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }

    async shareProduct() {
        const product = this.currentProduct;
        if (!product) return;
        
        const shareData = {
            title: product.name[currentLanguage],
            text: product.description[currentLanguage],
            url: window.location.href
        };
        
        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (error) {
                console.log('Share cancelled:', error);
            }
        } else {
            // Fallback: copy to clipboard
            try {
                await navigator.clipboard.writeText(`${shareData.title} - ${shareData.url}`);
                alert('Link copied to clipboard!');
            } catch (error) {
                console.error('Failed to copy:', error);
            }
        }
    }

    setupFocusTrap() {
        const focusableElements = this.modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;
        
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
        
        firstElement.focus();
    }

    removeFocusTrap() {
        // Focus trap is automatically removed when modal is hidden
    }
}

// ===== MOBILE MENU =====
class MobileMenu {
    constructor() {
        this.menuButton = null;
        this.nav = null;
        this.isOpen = false;
    }

    init() {
        this.menuButton = document.querySelector('.header__mobile-menu');
        this.nav = document.querySelector('.header__nav');
        
        if (this.menuButton) {
            this.menuButton.addEventListener('click', () => this.toggle());
        }
        
        // Close menu when clicking on nav links
        const navLinks = this.nav?.querySelectorAll('.header__nav-link');
        navLinks?.forEach(link => {
            link.addEventListener('click', () => this.close());
        });
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        if (!this.menuButton || !this.nav) return;
        
        this.isOpen = true;
        this.menuButton.setAttribute('aria-expanded', 'true');
        this.nav.classList.add('mobile-open');
        document.body.style.overflow = 'hidden';
    }

    close() {
        if (!this.menuButton || !this.nav) return;
        
        this.isOpen = false;
        this.menuButton.setAttribute('aria-expanded', 'false');
        this.nav.classList.remove('mobile-open');
        document.body.style.overflow = '';
    }
}

// ===== FILTERS =====
class FilterManager {
    constructor() {
        this.bindEvents();
    }

    bindEvents() {
        // Category chips
        const categoryChips = document.querySelectorAll('.category-chip');
        categoryChips.forEach(chip => {
            chip.addEventListener('click', () => {
                this.updateCategoryFilter(chip.dataset.category);
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
        const chips = document.querySelectorAll('.category-chip');
        chips.forEach(chip => {
            chip.classList.toggle('active', chip.dataset.category === category);
        });
        
        currentFilters.category = category;
        productManager.filterProducts();
    }

    updateSearchFilter(search) {
        currentFilters.search = search;
        productManager.filterProducts();
    }

    updateSizeFilter(size) {
        currentFilters.size = size;
        productManager.filterProducts();
    }

    updateColorFilter(color) {
        currentFilters.color = color;
        productManager.filterProducts();
    }
}

// ===== PWA REGISTRATION =====
class PWAManager {
    constructor() {
        this.deferredPrompt = null;
    }

    init() {
        this.registerServiceWorker();
        this.bindEvents();
    }

    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('Service Worker registered:', registration);
            } catch (error) {
                console.error('Service Worker registration failed:', error);
            }
        }
    }

    bindEvents() {
        // Listen for beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            
            // Show install button or banner
            this.showInstallPrompt();
        });
        
        // Listen for app installed event
        window.addEventListener('appinstalled', () => {
            console.log('PWA was installed');
            this.deferredPrompt = null;
        });
    }

    showInstallPrompt() {
        // You can show a custom install button here
        console.log('PWA install prompt available');
    }

    async promptInstall() {
        if (!this.deferredPrompt) return;
        
        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }
        
        this.deferredPrompt = null;
    }
}

// ===== INTEGRATION TESTS =====
class IntegrationTests {
    static async runTests() {
        console.log('Running integration tests...');
        
        // Test language button functionality
        await this.testLanguageButtons();
        
        // Test mobile menu functionality
        await this.testMobileMenu();
        
        console.log('Integration tests completed');
    }

    static async testLanguageButtons() {
        const languageButtons = document.querySelectorAll('.language-btn');
        
        for (const button of languageButtons) {
            try {
                // Simulate click
                button.click();
                await new Promise(resolve => setTimeout(resolve, 100));
                
                // Check if aria-pressed is updated
                const isPressed = button.getAttribute('aria-pressed') === 'true';
                if (!isPressed) {
                    console.error('Language button aria-pressed not updated correctly');
                }
                
                // Check if HTML lang attribute is updated
                const htmlLang = document.documentElement.lang;
                const buttonLang = button.getAttribute('data-lang');
                if (htmlLang !== buttonLang) {
                    console.error('HTML lang attribute not updated correctly');
                }
                
            } catch (error) {
                console.error('Language button test failed:', error);
            }
        }
    }

    static async testMobileMenu() {
        const menuButton = document.querySelector('.header__mobile-menu');
        if (!menuButton) return;
        
        try {
            // Test opening menu
            menuButton.click();
            await new Promise(resolve => setTimeout(resolve, 100));
            
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
            if (!isExpanded) {
                console.error('Mobile menu not opening correctly');
            }
            
            // Test closing menu
            menuButton.click();
            await new Promise(resolve => setTimeout(resolve, 100));
            
            const isClosed = menuButton.getAttribute('aria-expanded') === 'false';
            if (!isClosed) {
                console.error('Mobile menu not closing correctly');
            }
            
        } catch (error) {
            console.error('Mobile menu test failed:', error);
        }
    }
}

// ===== GLOBAL INSTANCES =====
const i18n = new I18n();
const productManager = new ProductManager();
const aiHelpers = new AIHelpers();
const modalManager = new ModalManager();
const mobileMenu = new MobileMenu();
const filterManager = new FilterManager();
const pwaManager = new PWAManager();

// ===== GLOBAL FUNCTIONS =====
function openProductModal(productId) {
    modalManager.openModal(productId);
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Initialize all components
        await i18n.init();
        await productManager.init();
        await aiHelpers.init();
        modalManager.init();
        mobileMenu.init();
        filterManager.init();
        pwaManager.init();
        
        // Run integration tests
        await IntegrationTests.runTests();
        
        console.log('NayacMard Store initialized successfully');
        
    } catch (error) {
        console.error('Failed to initialize NayacMard Store:', error);
    }
});

// ===== LANGUAGE SWITCHER EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', () => {
    const languageButtons = document.querySelectorAll('.language-btn');
    
    languageButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const lang = button.getAttribute('data-lang');
            await i18n.setLanguage(lang);
        });
    });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.addEventListener('DOMContentLoaded', () => {
        const animatedElements = document.querySelectorAll('.product-card, .delivery__item, .contact-item');
        animatedElements.forEach(el => observer.observe(el));
    });
}

// ===== VIEW TRANSITIONS API SUPPORT =====
if ('startViewTransition' in document) {
    // Enable view transitions for navigation
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (link) {
            e.preventDefault();
            
            document.startViewTransition(() => {
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    });
}
