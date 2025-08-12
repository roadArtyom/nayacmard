// Products data for NayacMard Store
// Each product has multilingual names and descriptions
export const products = [
    {
        id: 1,
        name: {
            hy: "Կլասիկ Hoodie",
            en: "Classic Hoodie",
            ru: "Классический Худи"
        },
        priceAMD: 25000,
        category: "hoodies",
        colors: ["black", "white", "gray"],
        sizes: ["S", "M", "L", "XL"],
        images: ["images/5352689841629951197.jpg", "images/5352689841629951198.jpg", "images/5352689841629951199.jpg"],
        wildberriesUrl: "https://wildberries.am/product/classic-hoodie",
        description: {
            hy: "Կլասիկ կտրվածքի hoodie՝ հարմարավետ նյութից: Կատարյալ է ցանկացած օրի համար:",
            en: "Classic fit hoodie made from comfortable material. Perfect for any day.",
            ru: "Худи классического кроя из комфортного материала. Идеально подходит для любого дня."
        },
        isNew: true,
        isSale: false
    },
    {
        id: 2,
        name: {
            hy: "Սպորտային T-Shirt",
            en: "Sport T-Shirt",
            ru: "Спортивная Футболка"
        },
        priceAMD: 15000,
        category: "t-shirts",
        colors: ["black", "white", "red", "blue"],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        images: ["images/5352689841629951200.jpg", "images/5352689841629951201.jpg"],
        wildberriesUrl: null,
        description: {
            hy: "Բարձր որակի սպորտային T-shirt՝ շնչող նյութից: Հարմար է մարզանքի և առօրյա կրելու համար:",
            en: "High-quality sport T-shirt made from breathable material. Suitable for sports and everyday wear.",
            ru: "Высококачественная спортивная футболка из дышащего материала. Подходит для спорта и повседневной носки."
        },
        isNew: false,
        isSale: true
    },
    {
        id: 3,
        name: {
            hy: "Ժինսե Pants",
            en: "Denim Pants",
            ru: "Джинсовые Брюки"
        },
        priceAMD: 35000,
        category: "pants",
        colors: ["blue", "black", "gray"],
        sizes: ["S", "M", "L", "XL"],
        images: ["images/5352689841629951202.jpg", "images/5352689841629951203.jpg", "images/5352689841629951204.jpg"],
        wildberriesUrl: "https://wildberries.am/product/denim-pants",
        description: {
            hy: "Ժամանակակից կտրվածքի ժինսե բрюքեր՝ բարձր որակի դենիմից: Կատարյալ են ցանկացած ոճի համար:",
            en: "Modern cut denim pants made from high-quality denim. Perfect for any style.",
            ru: "Джинсовые брюки современного кроя из высококачественного денима. Идеально подходят для любого стиля."
        },
        isNew: false,
        isSale: false
    },
    {
        id: 4,
        name: {
            hy: "Գեղեցիկ Hoodie",
            en: "Stylish Hoodie",
            ru: "Стильное Худи"
        },
        priceAMD: 28000,
        category: "hoodies",
        colors: ["red", "blue", "green"],
        sizes: ["M", "L", "XL", "XXL"],
        images: ["images/5352689841629951205.jpg", "images/5352689841629951206.jpg"],
        wildberriesUrl: null,
        description: {
            hy: "Գեղեցիկ և ոճային hoodie՝ վառ գույներով: Կատարյալ է երիտասարդների համար:",
            en: "Beautiful and stylish hoodie with bright colors. Perfect for young people.",
            ru: "Красивое и стильное худи с яркими цветами. Идеально подходит для молодежи."
        },
        isNew: true,
        isSale: false
    },
    {
        id: 5,
        name: {
            hy: "Բազային T-Shirt",
            en: "Basic T-Shirt",
            ru: "Базовая Футболка"
        },
        priceAMD: 12000,
        category: "t-shirts",
        colors: ["white", "black", "gray"],
        sizes: ["XS", "S", "M", "L", "XL"],
        images: ["images/5352689841629951207.jpg", "images/5352689841629951209.jpg"],
        wildberriesUrl: "https://wildberries.am/product/basic-tshirt",
        description: {
            hy: "Բազային կտրվածքի T-shirt՝ բնական բամբակից: Հարմար է ցանկացած կազմակերպության համար:",
            en: "Basic fit T-shirt made from natural cotton. Suitable for any occasion.",
            ru: "Футболка базового кроя из натурального хлопка. Подходит для любого случая."
        },
        isNew: false,
        isSale: false
    },
    {
        id: 6,
        name: {
            hy: "Կաշվե Accessory",
            en: "Leather Accessory",
            ru: "Кожаный Аксессуар"
        },
        priceAMD: 18000,
        category: "accessories",
        colors: ["black", "brown"],
        sizes: ["One Size"],
        images: ["images/5352689841629951210.jpg", "images/5352689841629951211.jpg"],
        wildberriesUrl: null,
        description: {
            hy: "Բարձր որակի կաշվե աքսեսուար՝ ձեռքով պատրաստված: Կատարյալ է որպես նվեր:",
            en: "High-quality leather accessory handcrafted. Perfect as a gift.",
            ru: "Высококачественный кожаный аксессуар ручной работы. Идеально подходит в качестве подарка."
        },
        isNew: false,
        isSale: true
    },
    {
        id: 7,
        name: {
            hy: "Գեղեցիկ Pants",
            en: "Elegant Pants",
            ru: "Элегантные Брюки"
        },
        priceAMD: 42000,
        category: "pants",
        colors: ["black", "gray", "navy"],
        sizes: ["S", "M", "L", "XL"],
        images: ["images/5352689841629951319.jpg", "images/5352689841629951320.jpg"],
        wildberriesUrl: "https://wildberries.am/product/elegant-pants",
        description: {
            hy: "Էլեգանտ կտրվածքի բрюքեր՝ բարձր որակի նյութից: Կատարյալ են գործնական հանդիպումների համար:",
            en: "Elegant cut pants made from high-quality material. Perfect for business meetings.",
            ru: "Элегантные брюки из высококачественного материала. Идеально подходят для деловых встреч."
        },
        isNew: true,
        isSale: false
    },
    {
        id: 8,
        name: {
            hy: "Կապույտ Hoodie",
            en: "Blue Hoodie",
            ru: "Синее Худи"
        },
        priceAMD: 26000,
        category: "hoodies",
        colors: ["blue", "navy", "light-blue"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        images: ["images/5352689841629951321.jpg", "images/5352689841629951322.jpg", "images/5352689841629951323.jpg"],
        wildberriesUrl: null,
        description: {
            hy: "Կապույտ գույնի hoodie՝ հարմարավետ նյութից: Կատարյալ է սառը եղանակի համար:",
            en: "Blue colored hoodie made from comfortable material. Perfect for cold weather.",
            ru: "Синее худи из комфортного материала. Идеально подходит для холодной погоды."
        },
        isNew: false,
        isSale: false
    }
];

// Helper function to get products by category
export function getProductsByCategory(category) {
    if (category === 'all') return products;
    return products.filter(product => product.category === category);
}

// Helper function to get products by search term
export function searchProducts(searchTerm) {
    const term = searchTerm.toLowerCase();
    return products.filter(product => 
        product.name.hy.toLowerCase().includes(term) ||
        product.name.en.toLowerCase().includes(term) ||
        product.name.ru.toLowerCase().includes(term) ||
        product.description.hy.toLowerCase().includes(term) ||
        product.description.en.toLowerCase().includes(term) ||
        product.description.ru.toLowerCase().includes(term)
    );
}

// Helper function to get products by size
export function getProductsBySize(size) {
    if (!size) return products;
    return products.filter(product => product.sizes.includes(size));
}

// Helper function to get products by color
export function getProductsByColor(color) {
    if (!color) return products;
    return products.filter(product => product.colors.includes(color));
}

// Helper function to filter products with multiple criteria
export function filterProducts(filters) {
    let filtered = products;
    
    if (filters.category && filters.category !== 'all') {
        filtered = filtered.filter(product => product.category === filters.category);
    }
    
    if (filters.search) {
        filtered = filtered.filter(product => 
            product.name.hy.toLowerCase().includes(filters.search.toLowerCase()) ||
            product.name.en.toLowerCase().includes(filters.search.toLowerCase()) ||
            product.name.ru.toLowerCase().includes(filters.search.toLowerCase())
        );
    }
    
    if (filters.size) {
        filtered = filtered.filter(product => product.sizes.includes(filters.size));
    }
    
    if (filters.color) {
        filtered = filtered.filter(product => product.colors.includes(filters.color));
    }
    
    return filtered;
}

// Helper function to get unique categories
export function getCategories() {
    return [...new Set(products.map(product => product.category))];
}

// Helper function to get unique colors
export function getColors() {
    const allColors = products.flatMap(product => product.colors);
    return [...new Set(allColors)];
}

// Helper function to get unique sizes
export function getSizes() {
    const allSizes = products.flatMap(product => product.sizes);
    return [...new Set(allSizes)].sort((a, b) => {
        const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
        return sizeOrder.indexOf(a) - sizeOrder.indexOf(b);
    });
}
