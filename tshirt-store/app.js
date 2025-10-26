// Simple SPA router and store
const routes = {
  '/': renderHome,
  '/product': renderProduct,
  '/cart': renderCart,
  '/checkout': renderCheckout,
};

const state = {
  products: [
    { id: 'classic-black', name: 'Classic Black Tee', price: 19.0, emoji: '🖤', colors: ['Black'], sizes: ['S','M','L','XL'] },
    { id: 'ocean-blue', name: 'Ocean Blue Tee', price: 22.0, emoji: '🌊', colors: ['Blue'], sizes: ['S','M','L','XL'] },
    { id: 'sunset', name: 'Sunset Gradient Tee', price: 25.0, emoji: '🌅', colors: ['Orange','Pink'], sizes: ['S','M','L','XL'] },
    { id: 'forest', name: 'Forest Green Tee', price: 22.0, emoji: '🌲', colors: ['Green'], sizes: ['S','M','L','XL'] },
    { id: 'skull', name: 'Skull Graphic Tee', price: 28.0, emoji: '💀', colors: ['Black','White'], sizes: ['S','M','L','XL'] },
    { id: 'smile', name: 'Smiley Face Tee', price: 20.0, emoji: '😊', colors: ['Yellow','White'], sizes: ['S','M','L','XL'] },
    { id: 'rocket', name: 'Rocket Launch Tee', price: 26.0, emoji: '🚀', colors: ['Navy'], sizes: ['S','M','L','XL'] },
    { id: 'cat', name: 'Space Cat Tee', price: 24.0, emoji: '🐱', colors: ['Black'], sizes: ['S','M','L','XL'] },
  ],
  cart: loadCart(),
};

function saveCart(cart){
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}
function loadCart(){
  try { return JSON.parse(localStorage.getItem('cart')||'[]'); } catch { return []; }
}
function addToCart(productId, size){
  const product = state.products.find(p=>p.id===productId);
  if(!product) return;
  const key = `${productId}__${size||''}`;
  const existing = state.cart.find(i=>i.key===key);
  if(existing){ existing.qty += 1; }
  else { state.cart.push({ key, productId, size: size||null, qty: 1 }); }
  saveCart(state.cart);
}
function setQty(key, qty){
  const item = state.cart.find(i=>i.key===key);
  if(!item) return; item.qty = Math.max(1, qty|0); saveCart(state.cart);
}
function removeItem(key){
  state.cart = state.cart.filter(i=>i.key!==key); saveCart(state.cart);
}
function cartTotals(){
  const items = state.cart.map(i=>({ ...i, product: state.products.find(p=>p.id===i.productId) }));
  const subtotal = items.reduce((s,i)=> s + i.product.price * i.qty, 0);
  const shipping = subtotal > 60 ? 0 : (subtotal>0 ? 5 : 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax + shipping;
  return { items, subtotal, shipping, tax, total };
}

function navigate(){
  const hash = location.hash.replace('#','') || '/';
  const [path, query] = hash.split('?');
  const app = document.getElementById('app');
  const render = routes[path] || renderNotFound;
  app.innerHTML = '';
  const params = Object.fromEntries(new URLSearchParams(query||''));
  render(app, params);
  updateCartCount();
}

function updateCartCount(){
  const count = state.cart.reduce((s,i)=>s + i.qty, 0);
  const el = document.getElementById('cartCount');
  if(el) el.textContent = String(count);
}

function renderHome(root){
  const page = el('section', { class: 'page' }, [
    el('h1', { class: 'page-title' }, ['Find your new favorite tee']),
    el('p', { class: 'page-subtitle' }, ['Premium cotton. Everyday comfort.']),
    el('div', { class: 'grid product-grid' }, state.products.map(p=> renderProductCard(p)))
  ]);
  root.appendChild(page);
}

function renderProductCard(product){
  return el('article', { class: 'product card' }, [
    el('a', { href: `#/product?id=${product.id}` }, [
      el('div', { class: 'product-media' }, [product.emoji])
    ]),
    el('div', { class: 'card-body' }, [
      el('div', { class: 'product-title' }, [product.name]),
      el('div', { class: 'product-muted' }, [product.colors.join(', ')]),
      el('div', { class: 'product-price' }, [`$${product.price.toFixed(2)}`]),
      el('button', { class: 'btn btn-ghost btn-block', onclick: ()=> addToCart(product.id, product.sizes[0]) }, ['Quick add'])
    ])
  ]);
}

function renderProduct(root, params){
  const product = state.products.find(p=>p.id===params.id);
  if(!product){ renderNotFound(root); return; }

  let selectedSize = product.sizes[0];

  const sizePills = el('div', { class: 'pills', role: 'group', 'aria-label': 'Sizes' },
    product.sizes.map(size => el('button', {
        class: `pill${size===selectedSize?' active':''}`,
        onclick: ()=>{
          selectedSize = size;
          [...sizePills.children].forEach(c=> c.classList.toggle('active', c.textContent===size));
        }
      }, [size])
    )
  );

  const page = el('section', { class: 'page' }, [
    el('div', { class: 'split' }, [
      el('div', { class: 'gallery' }, [product.emoji]),
      el('div', {}, [
        el('h1', { class: 'page-title' }, [product.name]),
        el('div', { class: 'product-muted' }, [product.colors.join(', ')]),
        el('div', { class: 'product-price' }, [`$${product.price.toFixed(2)}`]),
        el('div', { style: 'height: 12px' }),
        el('div', {}, [
          el('label', {}, ['Size']),
          sizePills,
        ]),
        el('div', { style: 'height: 16px' }),
        el('div', { style: 'display:flex; gap:10px' }, [
          el('button', { class: 'btn btn-primary', onclick: ()=> addToCart(product.id, selectedSize) }, ['Add to cart']),
          el('a', { href: '#/cart', class: 'btn btn-ghost' }, ['View cart'])
        ]),
        el('div', { style: 'height: 20px' }),
        el('p', { class: 'product-muted' }, ['Soft, breathable cotton. Standard fit. Machine washable.'])
      ])
    ])
  ]);
  root.appendChild(page);
}

function renderCart(root){
  const { items, subtotal, shipping, tax, total } = cartTotals();

  if(items.length === 0){
    root.appendChild(el('section', { class: 'page' }, [
      el('h1', { class: 'page-title' }, ['Your cart']),
      el('div', { class: 'empty' }, [
        'Your cart is empty. ',
        el('a', { href: '#/' }, ['Continue shopping'])
      ])
    ]));
    return;
  }

  const list = el('div', { class: 'cart-list' }, items.map(i =>
    el('div', { class: 'cart-item' }, [
      el('div', { class: 'media' }, [i.product.emoji]),
      el('div', {}, [
        el('div', { class: 'title' }, [i.product.name]),
        el('div', { class: 'muted' }, [
          i.size ? `Size ${i.size}` : 'No size', ' · ', `$${i.product.price.toFixed(2)}`
        ]),
        el('div', { class: 'qty' }, [
          el('button', { class: 'qty-btn', onclick: ()=> setQty(i.key, i.qty - 1) }, ['−']),
          el('span', {}, [String(i.qty)]),
          el('button', { class: 'qty-btn', onclick: ()=> setQty(i.key, i.qty + 1) }, ['+'])
        ])
      ]),
      el('div', {}, [
        el('div', { class: 'remove', onclick: ()=> removeItem(i.key) }, ['Remove'])
      ])
    ])
  ));

  const summary = el('div', { class: 'summary' }, [
    row('Subtotal', `$${subtotal.toFixed(2)}`),
    row('Shipping', shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`),
    row('Tax (8%)', `$${tax.toFixed(2)}`),
    el('div', { class: 'summary-row total' }, [
      el('div', {}, ['Total']),
      el('div', {}, [`$${total.toFixed(2)}`])
    ]),
    el('div', { style: 'height: 12px' }),
    el('a', { class: 'btn btn-primary btn-block', href: '#/checkout' }, ['Proceed to checkout'])
  ]);

  root.appendChild(el('section', { class: 'page' }, [
    el('h1', { class: 'page-title' }, ['Your cart']),
    el('div', { class: 'grid' }, [
      el('div', { style: 'grid-column: span 8' }, [list]),
      el('div', { style: 'grid-column: span 4' }, [summary])
    ])
  ]));
}

function renderCheckout(root){
  const { total } = cartTotals();

  const form = el('form', { class: 'form', onsubmit: handleSubmit }, [
    field('Full name', 'name'),
    field('Email', 'email', 'email'),
    field('Address', 'address'),
    field('City', 'city'),
    group([
      field('State', 'state'),
      field('ZIP', 'zip')
    ], { columns: 2 }),
    el('div', { class: 'summary' }, [
      el('div', { class: 'summary-row total' }, [
        el('div', {}, ['Amount due']),
        el('div', {}, [`$${total.toFixed(2)}`])
      ])
    ]),
    el('button', { class: 'btn btn-primary' }, ['Place order'])
  ]);

  function handleSubmit(e){
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    if(!data.name || !data.email || !data.address){
      alert('Please complete name, email and address.');
      return;
    }
    // Mock order processing
    const orderId = Math.random().toString(36).slice(2,8).toUpperCase();
    state.cart = []; saveCart(state.cart);
    location.hash = `#/confirmation?id=${orderId}`;
    alert(`Thank you! Order ${orderId} confirmed.`);
  }

  root.appendChild(el('section', { class: 'page' }, [
    el('h1', { class: 'page-title' }, ['Checkout']),
    el('p', { class: 'page-subtitle' }, ['Enter your details to complete your order.']),
    form
  ]));
}

function renderNotFound(root){
  root.appendChild(el('section', { class: 'page' }, [
    el('h1', { class: 'page-title' }, ['Page not found']),
    el('a', { href: '#/' }, ['Go home'])
  ]));
}

// helpers
function el(tag, attrs={}, children=[]) {
  const node = document.createElement(tag);
  for(const [k,v] of Object.entries(attrs||{})){
    if(k.startsWith('on') && typeof v === 'function') node[k] = v;
    else if(v === true) node.setAttribute(k, '');
    else if(v !== false && v != null) node.setAttribute(k, v);
  }
  for(const child of Array.isArray(children) ? children : [children]){
    node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return node;
}
function row(label, value){
  return el('div', { class: 'summary-row' }, [ el('div', {}, [label]), el('div', {}, [value]) ]);
}
function field(labelText, name, type='text'){
  const id = `f_${name}`;
  return el('div', { class: 'field' }, [
    el('label', { for: id }, [labelText]),
    el('input', { id, name, type, required: true })
  ]);
}
function group(children, { columns=2 }={}){
  const wrapper = el('div', { class: 'grid' });
  children.forEach(child=>{
    const col = el('div', { style: `grid-column: span ${12/columns}` }, [child]);
    wrapper.appendChild(col);
  });
  return wrapper;
}

// boot
window.addEventListener('hashchange', navigate);
window.addEventListener('DOMContentLoaded', ()=>{
  const year = document.getElementById('year');
  if(year) year.textContent = String(new Date().getFullYear());
  navigate();
});
