const Products = [
    { id: 1, name: 'Product-1', price: 100 },
    { id: 2, name: 'Product-2', price: 200 },
    { id: 3, name: 'Product-3', price: 300 },
    { id: 4, name: 'Product-4', price: 400 },
  ];

  let cart = [];  
  const productsContainer = document.getElementById('productsContainer');
  const cartContainer = document.getElementById('cartContainer');
  
  function renderProducts() {
    productsContainer.innerHTML = '<h2>Products</h2>';
  
    Products.forEach(product => {
      const productInCart = cart.find(item => item.id === product.id);
      const quantityInCart = productInCart ? productInCart.quantity : 0;
  
      const productElement = document.createElement('div');
      productElement.classList.add('product');
      productElement.innerHTML = `
        <p>${product.name}</p>
        <p>${product.price}</p>
        <div class="btn">
          <button onclick="removeFromCart(${product.id})"><i class="fa-sharp fa-solid fa-minus"></i></button>
          ${quantityInCart}
          <button onclick="addToCart(${product.id})"><i class="fa-sharp fa-regular fa-plus"></i></button>
        </div>
      `;
      productsContainer.appendChild(productElement);
    });
  }  

  function renderCart() {
    cartContainer.innerHTML = '<h2>Cart</h2>';
  
    if (cart.length === 0) {
      cartContainer.innerHTML += '<p>No Product added to the cart</p>';
    } else {
      cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
          <p>${item.name}</p>
          <p>${item.quantity} x ${item.price}</p>
        `;
        cartContainer.appendChild(cartItemElement);
      });
  
      const totalElement = document.createElement('p');
      totalElement.classList.add('total-price');
      totalElement.textContent = `Total : ${calculateTotalPrice()}`;
      cartContainer.appendChild(totalElement);
    }
  }
  
  
  function addToCart(productId) {
    const product = Products.find(item => item.id === productId);
  
    const existingItem = cart.find(item => item.id === productId);
  
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  
    renderCart();
    renderProducts();
  }
  
  function removeFromCart(productId) {

    if (cart.length === 0) {
      alert("You haven't added any product yet. Please add products to your cart.");
      return;

      }
    const existingItem = cart.find(item => item.id === productId);
  
    if (existingItem) {
      existingItem.quantity = Math.max(0, existingItem.quantity - 1);
  
      if (existingItem.quantity === 0) {
        cart = cart.filter(item => item.id !== productId);
      }
    }
  
    renderCart();
    renderProducts();
  }
  
  function calculateTotalPrice() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }
  

  
  renderProducts();
  renderCart();
  
  

