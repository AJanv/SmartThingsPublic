// Shopping Cart Class
class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.updateCartCount();
    }

    loadCart() {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateCartCount();
    }

    addItem(product, size, color, quantity = 1) {
        const existingItem = this.items.find(
            item => item.id === product.id && item.size === size && item.color === color
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                size: size,
                color: color,
                quantity: quantity,
                icon: product.icon
            });
        }

        this.saveCart();
        this.showNotification('Added to cart!');
    }

    removeItem(index) {
        this.items.splice(index, 1);
        this.saveCart();
    }

    updateQuantity(index, quantity) {
        if (quantity <= 0) {
            this.removeItem(index);
        } else {
            this.items[index].quantity = quantity;
            this.saveCart();
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    updateCartCount() {
        const countElements = document.querySelectorAll('.cart-count');
        const count = this.getItemCount();
        countElements.forEach(el => {
            el.textContent = count;
        });
    }

    clear() {
        this.items = [];
        this.saveCart();
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 3000;
            animation: slideIn 0.3s ease-out;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Product Display Functions
function displayProducts(productsToShow, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = productsToShow.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">${product.icon}</div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-colors">
                    ${product.colors.map(color => `
                        <div class="color-dot" style="background-color: ${color}"></div>
                    `).join('')}
                </div>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="btn-add-cart" onclick="event.stopPropagation(); openProductModal(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Add click handlers to product cards
    container.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', () => {
            const productId = parseInt(card.dataset.productId);
            openProductModal(productId);
        });
    });
}

// Product Modal
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('product-modal');
    if (!modal) return;

    // Populate modal
    document.getElementById('modal-product-image').innerHTML = `<div style="font-size: 8rem;">${product.icon}</div>`;
    document.getElementById('modal-product-name').textContent = product.name;
    document.getElementById('modal-product-price').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('modal-product-description').textContent = product.description;

    // Populate colors
    const colorsContainer = document.getElementById('modal-colors');
    colorsContainer.innerHTML = product.colors.map((color, index) => `
        <div class="color-option ${index === 0 ? 'selected' : ''}" 
             style="background-color: ${color}" 
             data-color="${color}"></div>
    `).join('');

    // Color selection
    colorsContainer.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', () => {
            colorsContainer.querySelectorAll('.color-option').forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
        });
    });

    // Add to cart handler
    document.getElementById('modal-add-to-cart').onclick = () => {
        const size = document.getElementById('modal-size-select').value;
        const selectedColor = colorsContainer.querySelector('.color-option.selected').dataset.color;
        const quantity = parseInt(document.getElementById('modal-quantity').value);
        
        cart.addItem(product, size, selectedColor, quantity);
        closeModal('product-modal');
    };

    modal.classList.add('active');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', () => {
    // Homepage - Display featured products
    if (document.getElementById('featured-products-grid')) {
        const featuredProducts = products.filter(p => p.featured);
        displayProducts(featuredProducts, 'featured-products-grid');
    }

    // Products page
    if (document.getElementById('products-grid')) {
        displayProducts(products, 'products-grid');

        // Filter functionality
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const category = button.dataset.category;
                const filtered = category === 'all' 
                    ? products 
                    : products.filter(p => p.category === category);
                
                displayProducts(filtered, 'products-grid');
            });
        });
    }

    // Cart page
    if (document.getElementById('cart-items-list')) {
        displayCart();
    }

    // Modal close handlers
    document.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            closeBtn.closest('.modal').classList.remove('active');
        });
    });

    // Click outside modal to close
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // Checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            document.getElementById('checkout-modal').classList.add('active');
        });
    }

    // Checkout form
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            closeModal('checkout-modal');
            document.getElementById('success-modal').classList.add('active');
            
            // Clear cart after successful order
            setTimeout(() => {
                cart.clear();
                closeModal('success-modal');
                window.location.href = 'products.html';
            }, 3000);
        });
    }
});

// Cart Display Functions
function displayCart() {
    const cartItemsList = document.getElementById('cart-items-list');
    const cartEmpty = document.getElementById('cart-empty');
    const cartContent = document.getElementById('cart-content');

    if (cart.items.length === 0) {
        cartEmpty.style.display = 'block';
        cartContent.style.display = 'none';
        return;
    }

    cartEmpty.style.display = 'none';
    cartContent.style.display = 'grid';

    cartItemsList.innerHTML = cart.items.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-image">${item.icon}</div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <div class="cart-item-meta">
                    Size: ${item.size} | Color: <span style="display: inline-block; width: 16px; height: 16px; background: ${item.color}; border: 1px solid #ddd; border-radius: 50%; vertical-align: middle;"></span>
                </div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateCartItemQuantity(${index}, ${item.quantity - 1})">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateCartItemQuantity(${index}, ${item.quantity + 1})">+</button>
                </div>
            </div>
            <div class="cart-item-actions">
                <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                <button class="btn-remove" onclick="removeCartItem(${index})">Remove</button>
            </div>
        </div>
    `).join('');

    updateCartSummary();
}

function updateCartItemQuantity(index, newQuantity) {
    cart.updateQuantity(index, newQuantity);
    displayCart();
}

function removeCartItem(index) {
    cart.removeItem(index);
    displayCart();
}

function updateCartSummary() {
    const subtotal = cart.getTotal();
    const shipping = subtotal > 50 ? 0 : 5.99;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;

    document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('cart-shipping').textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    document.getElementById('cart-tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
