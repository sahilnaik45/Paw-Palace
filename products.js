const productGrid = document.getElementById('product-grid');
    const sortFilter = document.getElementById('sort-filter');
    const searchBar = document.getElementById('search-bar');
    const loadMoreContainer = document.getElementById('load-more-container');
    
    // Function to display next batch of products
    function displayProducts(filteredProducts, reset = false) {
      if (reset) {
        productGrid.innerHTML = '';
        currentDisplayCount = 0;
      }
      const itemsToLoad = filteredProducts.slice(currentDisplayCount, currentDisplayCount + productsPerPage);
      itemsToLoad.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        const sizeOptions = product.availableSizes.map(size => `<option value="${size}">${size}</option>`).join('');
        card.innerHTML = `
          <img class="product-image" src="${product.image}" alt="${product.name}" onclick="quickView(${product.id})">
          <div class="product-details">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">₹${product.price}</p>
            <p class="rating">Rating: ${generateAverageStars(product.rating)}</p>
            <select id="size-select-${product.id}" class="size-select">
              ${sizeOptions}
            </select>
            <div class="btns">
              <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
              <button class="btn" onclick="addToCompare(${product.id})">Compare</button>
            </div>
          </div>
        `;
        productGrid.appendChild(card);
      });
      currentDisplayCount += itemsToLoad.length;
      loadMoreContainer.style.display = (currentDisplayCount < filteredProducts.length) ? 'block' : 'none';
    }
    
    // Load More function
    function loadMoreProducts() {
      displayProducts(filteredProductsGlobal);
    }
    
    // Filter and Sort Functionality
    function filterAndSortProducts() {
      let filtered = products.slice();
      const searchQuery = searchBar.value.toLowerCase();
      if (searchQuery) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery));
      }
      const sortBy = sortFilter.value;
      if (sortBy === 'price-low-high') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price-high-low') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'popularity') {
        filtered.sort((a, b) => b.rating - a.rating);
      }
      filteredProductsGlobal = filtered;
      displayProducts(filteredProductsGlobal, true);
    }
    
    // Event listeners for sort and search
    sortFilter.addEventListener('change', filterAndSortProducts);
    searchBar.addEventListener('input', filterAndSortProducts);
    
    // Update Cart Count
    function updateCartCount() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      document.getElementById('cart-count').innerText = count;
    }
    
    function addToCart(id) {
      const product = products.find(p => p.id === id);
      const sizeSelect = document.getElementById(`size-select-${id}`);
      const selectedSize = sizeSelect ? sizeSelect.value : (product.availableSizes ? product.availableSizes[0] : 'Standard');
      const cartProduct = { id: product.id, product: product.name, price: product.price, image: product.image, size: selectedSize, quantity: 1 };
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingIndex = cart.findIndex(item => item.id === product.id && item.size === selectedSize);
      if (existingIndex !== -1) {
        cart[existingIndex].quantity += 1;
      } else {
        cart.push(cartProduct);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      alert(`"${product.name}" (${selectedSize}) added to cart!`);
    }
    
    function addToWishlist(id) {
      alert(`Product ${id} added to wishlist!`);
    }
    
    function addToCompare(id) {
      const product = products.find(p => p.id === id);
      if (!compareList.find(item => item.id === product.id)) {
        compareList.push(product);
      }
      updateCompareCount();
      alert(`"${product.name}" added to compare list!`);
    }
    
    function updateCompareCount() {
      document.getElementById('compare-count').innerText = compareList.length;
    }
    
    // Quick View Modal Functions
    const quickViewModal = document.getElementById('quick-view-modal');
    const quickViewContent = document.getElementById('quick-view-content');
    const closeModalBtn = document.getElementById('close-modal');
    
    function generateAverageStars(rating) {
      let stars = '';
      for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
          stars += '<span class="filled">★</span>';
        } else if (i - rating < 1) {
          stars += '<span class="half-filled">★</span>';
        } else {
          stars += '<span>☆</span>';
        }
      }
      return stars;
    }
    
    function generateEmptyStars() {
      let stars = '';
      for (let i = 1; i <= 5; i++) {
        stars += `<span onclick="setStarRating(currentProductId, ${i})">☆</span>`;
      }
      return stars;
    }
    
    let currentProductId = null;
    function quickView(id) {
      const product = products.find(p => p.id === id);
      if (product) {
        currentProductId = id;
        const sizeOptions = product.availableSizes.map(size => `<option value="${size}">${size}</option>`).join('');
        const avgStars = generateAverageStars(product.rating);
        quickViewContent.innerHTML = `
          <h2 style="color: #ff4f8b;">${product.name}</h2>
          <img src="${product.image}" alt="${product.name}" style="width:100%; height:auto; border-radius: 8px; margin:1rem 0;">
          <p>${product.description}</p>
          <p class="price" style="font-weight:600;">Price: ₹${product.price}</p>
          <p class="rating">Average Rating: ${product.rating.toFixed(1)} (${product.ratingCount} reviews) ${avgStars}</p>
          <p style="font-size:0.9rem; color:#555;"><strong>Why it's better:</strong> ${product.features}</p>
          <label for="quick-size-select-${product.id}" style="margin-top: 1rem; display:block;">Select Size:</label>
          <select id="quick-size-select-${product.id}" class="size-select" style="margin-bottom: 1rem;">
            ${sizeOptions}
          </select>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;"> 
            <button class="btn" onclick="addToCartQuick(${product.id})">Add to Cart</button>
            <button class="btn" onclick="addToWishlist(${product.id})">Wishlist</button>
          </div>
          <div class="reviews-section">
            <h4>Rate this Product</h4>
            <div class="star-rating" id="star-rating-input-${product.id}">
              ${generateEmptyStars()}
            </div>
            <button class="btn" style="margin-top:0.5rem;" onclick="submitStarRating(${product.id})">Submit Rating</button>
          </div>
        `;
        quickViewModal.style.display = 'block';
      }
    }
    
    function setStarRating(productId, rating) {
      selectedRatings[productId] = rating;
      const starDiv = document.getElementById(`star-rating-input-${productId}`);
      let starsHtml = '';
      for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
          starsHtml += `<span style="cursor:pointer; color: #ff4f8b;" onclick="setStarRating(${productId}, ${i})">★</span>`;
        } else {
          starsHtml += `<span style="cursor:pointer; color: #ccc;" onclick="setStarRating(${productId}, ${i})">☆</span>`;
        }
      }
      starDiv.innerHTML = starsHtml;
    }
    
    function submitStarRating(productId) {
      const newRating = selectedRatings[productId];
      if (!newRating) {
        alert('Please select a rating.');
        return;
      }
      const product = products.find(p => p.id === productId);
      const totalRating = product.rating * product.ratingCount;
      const newTotalRating = totalRating + newRating;
      product.ratingCount += 1;
      product.rating = newTotalRating / product.ratingCount;
      alert(`Thank you! New average rating is ${product.rating.toFixed(1)} based on ${product.ratingCount} reviews.`);
      filterAndSortProducts();
      quickView(productId);
    }
    
    function addToCartQuick(id) {
      const product = products.find(p => p.id === id);
      const sizeSelect = document.getElementById(`quick-size-select-${id}`);
      const selectedSize = sizeSelect ? sizeSelect.value : (product.availableSizes ? product.availableSizes[0] : 'Standard');
      const cartProduct = { id: product.id, product: product.name, price: product.price, image: product.image, size: selectedSize, quantity: 1 };
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingIndex = cart.findIndex(item => item.id === product.id && item.size === selectedSize);
      if (existingIndex !== -1) {
        cart[existingIndex].quantity += 1;
      } else {
        cart.push(cartProduct);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      alert(`"${product.name}" (${selectedSize}) added to cart!`);
      quickViewModal.style.display = 'none';
    }
    
    closeModalBtn.addEventListener('click', () => {
      quickViewModal.style.display = 'none';
    });
    
    window.addEventListener('click', (event) => {
      if (event.target === quickViewModal) {
        quickViewModal.style.display = 'none';
      }
      if (event.target === compareModal) {
        compareModal.style.display = 'none';
      }
    });
    
    // Compare Modal Functions
    const compareModal = document.getElementById('compare-modal');
    const closeCompareModalBtn = document.getElementById('close-compare-modal');
    function openCompareModal() {
      if (compareList.length === 0) {
        alert('No products in compare list.');
        return;
      }
      const compareListDiv = document.getElementById('compare-list');
      compareListDiv.innerHTML = compareList.map(product => `
        <div class="compare-item">
          <span class="remove-compare" onclick="removeFromCompare(${product.id})">X</span>
          <img src="${product.image}" alt="${product.name}">
          <h4 style="color:#ff4f8b;">${product.name}</h4>
          <p>Price: ₹${product.price}</p>
          <p>Rating: ${product.rating.toFixed(1)} (${product.ratingCount} reviews)</p>
          <p>${product.description.substring(0, 50)}...</p>
        </div>
      `).join('');
      compareModal.style.display = 'block';
    }
    function removeFromCompare(productId) {
      compareList = compareList.filter(item => item.id !== productId);
      updateCompareCount();
      if (compareModal.style.display === 'block') {
        openCompareModal();
      }
    }
    closeCompareModalBtn.addEventListener('click', () => {
      compareModal.style.display = 'none';
    });
    
    // Initial setup
    function init() {
      filteredProductsGlobal = products.slice();
      filterAndSortProducts();
      updateCartCount();
    }
    init();