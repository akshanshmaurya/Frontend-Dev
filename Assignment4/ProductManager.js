// ===== Q1: E-Commerce Product Manager =====
// Product class with discount and display methods

'use strict';

// Custom console output to page
const consoleOutput = document.getElementById('consoleOutput');
function customLog(msg) {
    console.log(msg);
    consoleOutput.innerHTML += `<p>${msg}</p>`;
}

// ===== PRODUCT CLASS =====
class Product {
    constructor(id, name, price, category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.originalPrice = price; // Store original for reset
        this.category = category;
        this.discountedPrice = price;
    }

    // Apply discount (percentage)
    applyDiscount(discountPercent) {
        this.discountedPrice = this.originalPrice - (this.originalPrice * discountPercent / 100);
        customLog(`✓ Discount of ${discountPercent}% applied to "${this.name}". New price: ₹${this.discountedPrice.toFixed(2)}`);
    }

    // Reset to original price
    resetPrice() {
        this.discountedPrice = this.originalPrice;
    }

    // Display product details in formatted string
    displayDetails() {
        const discount = ((this.originalPrice - this.discountedPrice) / this.originalPrice * 100).toFixed(1);
        const discountTag = this.discountedPrice < this.originalPrice ? ` 📉 (${discount}% off)` : '';
        
        return `
            <div class="product-card">
                <h3>${this.name}</h3>
                <p><strong>ID:</strong> ${this.id}</p>
                <p><strong>Category:</strong> ${this.category}</p>
                <p><strong>Original Price:</strong> <span class="price-original">₹${this.originalPrice.toFixed(2)}</span></p>
                <p><strong>Current Price:</strong> <span class="price-current">₹${this.discountedPrice.toFixed(2)}</span>${discountTag}</p>
            </div>
        `;
    }

    // Get product info as object
    getInfo() {
        return {
            id: this.id,
            name: this.name,
            category: this.category,
            price: this.discountedPrice,
            originalPrice: this.originalPrice
        };
    }
}

// ===== PRODUCT MANAGER =====
let products = [];

// Initialize with sample products
function initializeSampleProducts() {
    products = [
        new Product(1, 'Laptop', 75000, 'Electronics'),
        new Product(2, 'Mouse', 500, 'Accessories'),
        new Product(3, 'Monitor', 15000, 'Electronics'),
        new Product(4, 'Keyboard', 2500, 'Accessories'),
        new Product(5, 'Smartphone', 45000, 'Electronics'),
        new Product(6, 'Headphones', 3000, 'Audio')
    ];

    customLog('📦 Sample products loaded.');
    displayAllProducts();
}

// Add new product
function addProduct() {
    const id = parseInt(document.getElementById('productId').value);
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const category = document.getElementById('productCategory').value;

    if (!id || !name || !price || !category) {
        alert('Please fill all fields!');
        return;
    }

    const newProduct = new Product(id, name, price, category);
    products.push(newProduct);
    customLog(`✅ Product "${name}" added successfully!`);

    // Clear form
    document.getElementById('productForm').reset();
    displayAllProducts();
}

// Display all products
function displayAllProducts() {
    const container = document.getElementById('allProductsContainer');
    container.innerHTML = products.map(p => p.displayDetails()).join('');

    // Filter and display premium products (price > 1000)
    displayPremiumProducts();
}

// Display products with price > 1000
function displayPremiumProducts() {
    const premiumProducts = products.filter(p => p.discountedPrice > 1000);
    const container = document.getElementById('premiumProductsContainer');

    if (premiumProducts.length === 0) {
        container.innerHTML = '<p class="no-products">No products above ₹1000</p>';
        return;
    }

    container.innerHTML = premiumProducts.map(p => p.displayDetails()).join('');
    customLog(`🔍 Found ${premiumProducts.length} premium products (price > ₹1000)`);
}

// Apply discount to all products
function applyDiscountToAll() {
    if (products.length === 0) {
        alert('No products to discount!');
        return;
    }

    products.forEach(p => p.applyDiscount(10));
    customLog('✨ 10% discount applied to all products!');
    displayAllProducts();
}

// Reset all discounts
function resetDiscounts() {
    products.forEach(p => p.resetPrice());
    customLog('🔄 All prices reset to original.');
    displayAllProducts();
}

// Clear all products
function clearAllProducts() {
    if (confirm('Are you sure? This will delete all products.')) {
        products = [];
        document.getElementById('allProductsContainer').innerHTML = '<p class="no-products">No products</p>';
        document.getElementById('premiumProductsContainer').innerHTML = '<p class="no-products">No products</p>';
        customLog('🗑️ All products cleared.');
    }
}

// Form submission
document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault();
    addProduct();
});

// Initialize on load
window.addEventListener('load', function() {
    customLog('🚀 E-Commerce Product Manager initialized.');
    initializeSampleProducts();
});
