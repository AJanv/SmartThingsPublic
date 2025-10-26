# ThreadStyle - T-Shirt E-Commerce Website

A modern, beautiful, and fully functional t-shirt e-commerce website built with HTML, CSS, and vanilla JavaScript.

## Features

### 🎨 Beautiful Modern Design
- Clean, minimalist interface with smooth animations
- Responsive design that works on all devices
- Professional color scheme and typography
- Interactive hover effects and transitions

### 🛍️ Complete Shopping Experience
- **Product Catalog**: Browse 15+ unique t-shirt designs
- **Product Categories**: Filter by Classic, Graphic, or Premium
- **Product Details**: Interactive modal with size, color, and quantity selection
- **Shopping Cart**: Full-featured cart with quantity adjustment
- **Checkout Flow**: Complete checkout form with order summary
- **Persistent Cart**: Cart data saved in browser localStorage

### 💼 Product Features
- Multiple color options per product
- Size selection (XS to XXL)
- Detailed product descriptions
- Category filtering
- Featured products showcase
- Price calculations with tax and shipping

### 📱 Responsive Design
- Mobile-friendly navigation
- Adaptive layouts for all screen sizes
- Touch-optimized interactions
- Optimized for tablets and phones

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- No server or build tools required!

### Installation

1. Navigate to the project directory:
```bash
cd tshirt-store
```

2. Open the website in your browser:
   - **Option 1**: Double-click `index.html`
   - **Option 2**: Right-click `index.html` and select "Open with Browser"
   - **Option 3**: Use a local server (recommended for best experience):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     ```
   Then open http://localhost:8000 in your browser.

## Project Structure

```
tshirt-store/
├── index.html          # Homepage with hero section and featured products
├── products.html       # Full product catalog with filtering
├── cart.html          # Shopping cart and checkout
├── styles.css         # All styling and responsive design
├── app.js            # Shopping cart logic and UI interactions
├── products.js       # Product data and catalog
└── README.md         # This file
```

## Usage Guide

### Browsing Products
1. Visit the homepage to see featured products
2. Click "Shop Collection" or navigate to "Shop" to see all products
3. Use category filters (All, Classic, Graphic, Premium) to narrow your search

### Adding to Cart
1. Click on any product card to open the product details modal
2. Select your preferred size, color, and quantity
3. Click "Add to Cart"
4. View your cart count update in the navigation

### Checkout Process
1. Click the cart icon in the navigation
2. Review your items and adjust quantities if needed
3. Click "Proceed to Checkout"
4. Fill in shipping and payment information
5. Click "Place Order" to complete your purchase

### Cart Features
- **Increase/Decrease Quantity**: Use +/- buttons
- **Remove Items**: Click "Remove" button
- **Free Shipping**: Automatically applied on orders over $50
- **Tax Calculation**: 8% tax automatically calculated
- **Persistent Storage**: Your cart is saved even after closing the browser

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup and modern features
- **CSS3**: Custom properties, Grid, Flexbox, animations
- **JavaScript (ES6+)**: Classes, modules, localStorage API
- **Google Fonts**: Inter font family
- **No frameworks**: Pure vanilla JavaScript for maximum performance

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Features Implemented
- Local storage for cart persistence
- Dynamic product rendering
- Category filtering
- Modal dialogs
- Form validation
- Responsive navigation
- Smooth animations
- Touch-optimized controls

## Customization

### Adding New Products
Edit `products.js` and add new product objects:

```javascript
{
    id: 16,
    name: "Your Product Name",
    category: "classic", // or "graphic" or "premium"
    price: 29.99,
    description: "Product description",
    colors: ["#HEXCODE1", "#HEXCODE2"],
    icon: "🎨", // emoji icon
    featured: false
}
```

### Changing Colors
Edit CSS custom properties in `styles.css`:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e293b;
    /* ... more colors */
}
```

### Modifying Shipping/Tax
Edit calculation logic in `app.js`:

```javascript
const shipping = subtotal > 50 ? 0 : 5.99;
const tax = subtotal * 0.08; // Change tax rate here
```

## Future Enhancements

Potential features to add:
- Backend integration (Node.js, Django, etc.)
- Payment processing (Stripe, PayPal)
- User authentication and accounts
- Order history
- Product reviews and ratings
- Wishlist functionality
- Search functionality
- Real product images
- Email notifications
- Inventory management
- Multiple payment methods

## Demo Content

The website includes 15 pre-configured products across three categories:
- **Classic**: Basic, essential t-shirts in various colors
- **Graphic**: T-shirts with artistic designs and prints
- **Premium**: High-end t-shirts with luxury materials

## Performance

- **Lightweight**: No external dependencies or frameworks
- **Fast Loading**: Minimal CSS and JavaScript
- **Optimized**: Efficient DOM manipulation
- **Smooth**: 60fps animations using CSS transforms

## Support

For questions or issues:
- Check the code comments in each file
- Review the product data structure in `products.js`
- Examine the cart logic in `app.js`
- Study the styling approach in `styles.css`

## License

This project is open source and available for personal and commercial use.

## Credits

Created with ❤️ using modern web technologies.

---

**Enjoy building your t-shirt empire with ThreadStyle!** 👕✨
