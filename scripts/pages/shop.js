// ========== PRODUCT DATA ==========
const products = [
  // BEST SELLERS
  {
    id: 1,
    name: "Classic Black Tee",
    price: 29.99,
    category: "shirts",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=60",
    isBestSeller: true,
    isNew: false
  },
  {
    id: 2,
    name: "Oversized Hoodie",
    price: 69.99,
    category: "hoodies",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=500&q=60",
    isBestSeller: true,
    isNew: false
  },
  {
    id: 3,
    name: "Cargo Shorts",
    price: 49.99,
    category: "shorts",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=500&q=60",
    isBestSeller: true,
    isNew: false
  },
  {
    id: 4,
    name: "Air Max Sneakers",
    price: 119.99,
    category: "shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=60",
    isBestSeller: true,
    isNew: false
  },
  {
    id: 5,
    name: "Striped Polo Shirt",
    price: 39.99,
    category: "shirts",
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=500&q=60",
    isBestSeller: false,
    isNew: true
  },
  {
    id: 6,
    name: "Vintage Denim Jacket",
    price: 89.99,
    category: "hoodies",
    image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=500&q=60",
    isBestSeller: false,
    isNew: true
  },
  {
    id: 7,
    name: "Linen Shorts",
    price: 44.99,
    category: "shorts",
    image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=500&q=60",
    isBestSeller: false,
    isNew: true
  },
  {
    id: 8,
    name: "Jordan 1 Retro",
    price: 129.99,
    category: "shoes",
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=500&q=60",
    isBestSeller: false,
    isNew: true
  },
  {
    id: 9,
    name: "White Crew Neck",
    price: 32.99,
    category: "shirts",
    image: "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=500&q=60",
    isBestSeller: false,
    isNew: false
  },
  {
    id: 10,
    name: "Athletic Hoodie",
    price: 64.99,
    category: "hoodies",
    image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=500&q=60",
    isBestSeller: false,
    isNew: false
  },
  {
    id: 11,
    name: "Chino Shorts",
    price: 54.99,
    category: "shorts",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=500&q=60",
    isBestSeller: false,
    isNew: false
  },
  {
    id: 12,
    name: "Running Shoes",
    price: 109.99,
    category: "shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=60",
    isBestSeller: false,
    isNew: false
  },
  {
    id: 13,
    name: "Colored Baseball Cap",
    price: 24.99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=500&q=60",
    isBestSeller: false,
    isNew: false
  },
  {
    id: 14,
    name: "Leather Belt",
    price: 39.99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=500&q=60",
    isBestSeller: false,
    isNew: false
  },
  {
    id: 15,
    name: "Graphic T-Shirt",
    price: 34.99,
    category: "shirts",
    image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=500&q=60",
    isBestSeller: false,
    isNew: false
  },
  {
    id: 16,
    name: "Streetwear Jacket",
    price: 94.99,
    category: "hoodies",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=60",
    isBestSeller: false,
    isNew: false
  }
];

// ========== STATE MANAGEMENT ==========
const state = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],
  currentFilter: 'all',
  isCartOpen: false
};

// ========== DOM ELEMENTS ==========
const DOM = {
  featuredGrid: document.getElementById('featured-grid'),
  arrivalsGrid: document.getElementById('arrivals-grid'),
  productsGrid: document.getElementById('products-grid'),
  filterButtons: document.querySelectorAll('.filter-btn'),
  cartCountElement: document.querySelector('.cart-count'),
  searchInput: document.getElementById('search-input'),
  cartIcon: document.querySelector('.cart-icon')
};

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', init);

function init() {
  renderFeaturedProducts();
  renderNewArrivals();
  renderAllProducts();
  createCartModal();
  attachEventListeners();
  updateCartCount();
  updateWishlistCount(); // Initialize wishlist count on page load
}

// ========== PRODUCT FILTERING & RENDERING ==========

/**
 * Filter products by criteria
 */
function filterProducts(predicate) {
  return products.filter(predicate);
}

/**
 * Get best selling products
 */
function getBestSellers() {
  return filterProducts(p => p.isBestSeller).slice(0, 4);
}

/**
 * Get new arrival products
 */
function getNewArrivals() {
  return filterProducts(p => p.isNew).slice(0, 4);
}

/**
 * Get products by category
 */
function getProductsByCategory(category) {
  return category === 'all' 
    ? products 
    : filterProducts(p => p.category === category);
}

/**
 * Search products by name
 */
function searchProducts(term) {
  const searchTerm = term.toLowerCase();
  return searchTerm === '' 
    ? [] 
    : filterProducts(p => p.name.toLowerCase().includes(searchTerm));
}

/**
 * Render featured products
 */
function renderFeaturedProducts() {
  const bestSellers = getBestSellers();
  renderProductGrid(DOM.featuredGrid, bestSellers);
}

/**
 * Render new arrivals
 */
function renderNewArrivals() {
  const newArrivals = getNewArrivals();
  renderProductGrid(DOM.arrivalsGrid, newArrivals);
}

/**
 * Render all products based on current filter
 */
function renderAllProducts() {
  const filtered = getProductsByCategory(state.currentFilter);
  renderProductGrid(DOM.productsGrid, filtered);
}

/**
 * Render product grid with cards
 */
function renderProductGrid(container, productList) {
  if (!container) return;
  container.innerHTML = productList
    .map(product => createProductCard(product))
    .join('');
  attachProductListeners(container);
}

/**
 * Create product card HTML
 */
function createProductCard(product) {
  const badgeHTML = getBadgeHTML(product);
  const isInWishlist = isProductInWishlist(product.id);
  const wishlistClass = isInWishlist ? 'added' : '';

  return `
    <div class="product-card" data-product-id="${product.id}">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
        ${badgeHTML}
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price">$${product.price.toFixed(2)}</div>
        <div class="product-footer">
          <button class="add-to-cart-btn" data-product-id="${product.id}">
            <i class="fas fa-shopping-bag"></i> Add to Cart
          </button>
          <button class="wishlist-btn ${wishlistClass}" data-product-id="${product.id}">
            <i class="fas fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Get badge HTML for product
 */
function getBadgeHTML(product) {
  if (product.isBestSeller) {
    return '<span class="product-badge bestseller">Best Seller</span>';
  }
  if (product.isNew) {
    return '<span class="product-badge">New</span>';
  }
  return '';
}

/**
 * Attach event listeners to product cards - Clean up old listeners before adding new ones
 */
function attachProductListeners(container) {
  // Remove old listeners by cloning and replacing (prevents duplicates)
  const addToCartButtons = container.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(btn => {
    const newBtn = btn.cloneNode(true);
    newBtn.addEventListener('click', handleAddToCart);
    btn.parentNode.replaceChild(newBtn, btn);
  });

  // Attach wishlist listeners (already has removeEventListener, but keep consistent)
  container.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.removeEventListener('click', handleWishlistToggle);
    btn.addEventListener('click', handleWishlistToggle);
  });
}

// ========== CART MANAGEMENT ==========

/**
 * Add product to cart
 */
function addToCart(productId) {
  const product = getProductById(productId);
  if (!product) return;

  const cartItem = getCartItem(productId);
  
  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  saveCart();
  updateCartCount();
  updateCartUI();
  showAddedFeedback(productId);
}

/**
 * Remove product from cart
 */
function removeFromCart(productId) {
  state.cart = state.cart.filter(item => item.id !== productId);
  saveCart();
  updateCartCount();
  updateCartUI();
}

/**
 * Increase product quantity
 */
function increaseQuantity(productId) {
  const cartItem = getCartItem(productId);
  if (cartItem) {
    cartItem.quantity += 1;
    saveCart();
    updateCartCount();
    updateCartUI();
  }
}

/**
 * Decrease product quantity
 */
function decreaseQuantity(productId) {
  const cartItem = getCartItem(productId);
  if (cartItem) {
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      saveCart();
      updateCartCount();
      updateCartUI();
    } else {
      removeFromCart(productId);
    }
  }
}

/**
 * Get cart item by product ID
 */
function getCartItem(productId) {
  return state.cart.find(item => item.id === productId);
}

/**
 * Calculate total cart price
 */
function calculateCartTotal() {
  return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/**
 * Calculate subtotal for a single item
 */
function calculateItemSubtotal(price, quantity) {
  return price * quantity;
}

/**
 * Get cart summary with breakdown
 */
function getCartSummary() {
  const subtotal = calculateCartTotal();
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;
  
  return {
    subtotal: subtotal,
    tax: tax,
    total: total,
    itemCount: state.cart.reduce((sum, item) => sum + item.quantity, 0)
  };
}

/**
 * Save cart to localStorage
 */
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(state.cart));
}

/**
 * Update cart counter - Add safety check for missing DOM element
 */
function updateCartCount() {
  if (!DOM.cartCountElement) return; // Safety: prevent crash if element missing
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  DOM.cartCountElement.textContent = totalItems;
}

/**
 * Show visual feedback when item added - Use pointerEvents instead of disabled
 */
function showAddedFeedback(productId) {
  const buttons = document.querySelectorAll(`[data-product-id="${productId}"].add-to-cart-btn`);
  buttons.forEach(btn => {
    const originalHTML = btn.innerHTML;
    const originalBackground = window.getComputedStyle(btn).background;
    
    btn.textContent = '✓ Added';
    btn.style.background = '#10b981';
    btn.style.pointerEvents = 'none'; // Disable clicks without using disabled attribute
    
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = originalBackground;
      btn.style.pointerEvents = 'auto'; // Re-enable clicks
    }, 1500);
  });
}

// ========== CART UI ==========

/**
 * Create cart modal
 */
function createCartModal() {
  const cartModal = document.createElement('div');
  cartModal.id = 'cart-modal';
  cartModal.className = 'cart-modal';
  cartModal.innerHTML = `
    <div class="cart-modal-content">
      <div class="cart-header">
        <h2>Shopping Cart</h2>
        <button class="close-cart-btn" id="close-cart-btn">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="cart-items" id="cart-items"></div>
      <div class="cart-summary">
        <div class="cart-summary-row">
          <span>Subtotal:</span>
          <span id="cart-subtotal">$0.00</span>
        </div>
        <div class="cart-summary-row">
          <span>Tax (8%):</span>
          <span id="cart-tax">$0.00</span>
        </div>
        <div class="cart-total">
          <span>Total:</span>
          <span id="cart-total">$0.00</span>
        </div>
        <button class="checkout-btn" id="checkout-btn">Proceed to Checkout</button>
        <button class="continue-shopping-btn" id="continue-shopping-btn">Continue Shopping</button>
      </div>
    </div>
  `;
  document.body.appendChild(cartModal);
  attachCartListeners();
}

/**
 * Attach cart event listeners
 */
function attachCartListeners() {
  document.getElementById('close-cart-btn').addEventListener('click', toggleCartModal);
  document.getElementById('continue-shopping-btn').addEventListener('click', toggleCartModal);
  document.getElementById('checkout-btn').addEventListener('click', handleCheckout);

  const cartModal = document.getElementById('cart-modal');
  cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) toggleCartModal();
  });
}

/**
 * Toggle cart modal visibility
 */
function toggleCartModal() {
  const cartModal = document.getElementById('cart-modal');
  state.isCartOpen = !state.isCartOpen;
  cartModal.classList.toggle('active');
  document.body.classList.toggle('modal-open', state.isCartOpen);
}

/**
 * Update cart UI
 */
function updateCartUI() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');

  if (state.cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-bag"></i>
        <p>Your cart is empty</p>
      </div>
    `;
    cartTotalElement.textContent = '$0.00';
    updateCartSummary();
    return;
  }

  cartItemsContainer.innerHTML = state.cart
    .map(item => createCartItemHTML(item))
    .join('');

  cartTotalElement.textContent = `$${calculateCartTotal().toFixed(2)}`;
  updateCartSummary();
  attachCartItemListeners();
}

/**
 * Update cart summary display
 */
function updateCartSummary() {
  const summary = getCartSummary();
  
  // Update or create summary elements
  const subtotalElement = document.getElementById('cart-subtotal');
  const taxElement = document.getElementById('cart-tax');
  const totalElement = document.getElementById('cart-total');
  
  if (subtotalElement) {
    subtotalElement.textContent = `$${summary.subtotal.toFixed(2)}`;
  }
  
  if (taxElement) {
    taxElement.textContent = `$${summary.tax.toFixed(2)}`;
  }
  
  if (totalElement) {
    totalElement.textContent = `$${summary.total.toFixed(2)}`;
  }
  
  console.log('Cart Summary:', {
    itemCount: summary.itemCount,
    subtotal: summary.subtotal.toFixed(2),
    tax: summary.tax.toFixed(2),
    total: summary.total.toFixed(2)
  });
}

/**
 * Create cart item HTML
 */
function createCartItemHTML(item) {
  const subtotal = calculateItemSubtotal(item.price, item.quantity);
  
  return `
    <div class="cart-item" data-product-id="${item.id}">
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <h4 class="cart-item-name">${item.name}</h4>
        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
      </div>
      <div class="cart-item-quantity">
        <button class="qty-btn qty-decrease" data-product-id="${item.id}">
          <i class="fas fa-minus"></i>
        </button>
        <span class="qty-value">${item.quantity}</span>
        <button class="qty-btn qty-increase" data-product-id="${item.id}">
          <i class="fas fa-plus"></i>
        </button>
      </div>
      <div class="cart-item-subtotal">
        $${subtotal.toFixed(2)}
      </div>
      <button class="cart-item-remove" data-product-id="${item.id}">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `;
}

/**
 * Attach listeners to cart item buttons
 */
function attachCartItemListeners() {
  document.querySelectorAll('.qty-increase').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productId = parseInt(e.currentTarget.dataset.productId);
      increaseQuantity(productId);
    });
  });

  document.querySelectorAll('.qty-decrease').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productId = parseInt(e.currentTarget.dataset.productId);
      decreaseQuantity(productId);
    });
  });

  document.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productId = parseInt(e.currentTarget.dataset.productId);
      removeFromCart(productId);
    });
  });
}

/**
 * Handle checkout
 */
function handleCheckout() {
  if (state.cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  alert('Checkout functionality will be implemented soon!');
}

// ========== WISHLIST MANAGEMENT ==========

/**
 * Check if product is in wishlist
 */
function isProductInWishlist(productId) {
  return state.wishlist.some(item => item.id === productId);
}

/**
 * Toggle wishlist for product
 */
function toggleWishlist(productId) {
  const product = getProductById(productId);
  if (!product) return;

  const index = state.wishlist.findIndex(item => item.id === productId);
  
  if (index > -1) {
    state.wishlist.splice(index, 1);
  } else {
    state.wishlist.push(product);
  }

  localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
}

// ========== UTILITY FUNCTIONS ==========

/**
 * Get product by ID
 */
function getProductById(productId) {
  return products.find(p => p.id === productId);
}

/**
 * Handle add to cart button click
 */
function handleAddToCart(e) {
  const productId = parseInt(e.currentTarget.dataset.productId);
  addToCart(productId);
}

/**
 * Handle wishlist button click - Update count after toggle
 */
function handleWishlistToggle(e) {
  e.preventDefault();
  e.stopPropagation();
  
  const productId = parseInt(e.currentTarget.dataset.productId);
  const wasInWishlist = isProductInWishlist(productId);
  
  toggleWishlist(productId);
  
  // Sync button state with actual state
  const isNowInWishlist = isProductInWishlist(productId);
  if (isNowInWishlist) {
    e.currentTarget.classList.add('added');
  } else {
    e.currentTarget.classList.remove('added');
  }
  
  // Show feedback
  showWishlistFeedback(e.currentTarget, isNowInWishlist);
  
  // Update wishlist count in navbar
  updateWishlistCount();
  
  console.log(`Wishlist updated for product ${productId}:`, {
    action: isNowInWishlist ? 'added' : 'removed',
    totalFavorites: state.wishlist.length
  });
}

/**
 * Show wishlist feedback
 */
function showWishlistFeedback(btn, isAdded) {
  btn.style.transform = 'scale(1.2)';
  setTimeout(() => {
    btn.style.transform = 'scale(1)';
  }, 200);
}

/**
 * Get all favorited products
 */
function getFavorites() {
  return state.wishlist;
}

/**
 * Update wishlist counter in navbar - Safety check for missing DOM element
 */
function updateWishlistCount() {
  const wishlistBadge = document.querySelector('.wishlist-count');
  if (!wishlistBadge) return; // Safety: prevent crash if element missing
  const wishlistCount = state.wishlist.length;
  wishlistBadge.textContent = wishlistCount;
}

/**
 * Render favorites page
 */
function renderFavoritesPage() {
  const favoritesContainer = document.getElementById('favorites-grid');
  if (!favoritesContainer) return; // Safety: handle missing element

  if (state.wishlist.length === 0) {
    favoritesContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
        <i class="fas fa-heart" style="font-size: 3rem; color: #d1d5db; margin-bottom: 16px; display: block;"></i>
        <h3 style="color: #6b7280; margin-bottom: 8px;">No Favorites Yet</h3>
        <p style="color: #9ca3af; margin: 0;">Start adding items to your wishlist!</p>
      </div>
    `;
    return;
  }

  favoritesContainer.innerHTML = state.wishlist
    .map(product => createProductCard(product))
    .join('');
  
  attachProductListeners(favoritesContainer);
}

// ========== EVENT LISTENERS ==========

/**
 * Attach all event listeners
 */
function attachEventListeners() {
  // Category filters - Add null check
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', handleFilterClick);
    });
  }

  // Search - Add null check
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }

  // Cart icon - Add null check
  const cartIcon = document.querySelector('.cart-icon');
  if (cartIcon) {
    cartIcon.addEventListener('click', handleCartClick);
  }
}

// ========== HANDLER FUNCTIONS (if not already defined) ==========

/**
 * Handle filter button click
 */
function handleFilterClick(e) {
  const filterBtnPressed = e.currentTarget;
  const filterValue = filterBtnPressed.dataset.filter;
  
  // Update active state
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  filterBtnPressed.classList.add('active');
  
  // Update state and re-render
  state.currentFilter = filterValue;
  renderAllProducts();
}

/**
 * Handle search input
 */
function handleSearch(e) {
  const searchTerm = e.target.value.trim();
  
  if (searchTerm === '') {
    renderAllProducts(); // Reset to current filter if search cleared
    return;
  }
  
  const results = searchProducts(searchTerm);
  renderProductGrid(DOM.productsGrid, results);
}

/**
 * Handle cart icon click
 */
function handleCartClick(e) {
  e.preventDefault();
  toggleCartModal();
  updateCartUI(); // Ensure cart UI is current when opened
}