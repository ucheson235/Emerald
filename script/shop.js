const products = [
  {
    name: 'Sony Playstation 5',
    url: 'https://i.ibb.co/zHmZnWx/playstation-5.png',
    category: 'games',
    price: 499.99,
  },
  {
    name: 'Samsung Galaxy',
    url: 'https://i.ibb.co/rFFMDH7/samsung-galaxy.png',
    category: 'smartphones',
    price: 399.99,
  },
  {
    name: 'Cannon EOS Camera',
    url: 'https://i.ibb.co/mhm1hLq/cannon-eos-camera.png',
    category: 'cameras',
    price: 749.99,
  },
  {
    name: 'Sony A7 Camera',
    url: 'https://i.ibb.co/LS9TDLN/sony-a7-camera.png',
    category: 'cameras',
    price: 1999.99,
  },
  {
    name: 'LG TV',
    url: 'https://i.ibb.co/QHgFnHk/lg-tv.png',
    category: 'televisions',
    price: 799.99,
  },
  {
    name: 'Nintendo Switch',
    url: 'https://i.ibb.co/L0L9SdG/nintendo-switch.png',
    category: 'games',
    price: 299.99,
  },
  {
    name: 'Xbox Series X',
    url: 'https://i.ibb.co/C8rBVdT/xbox-series-x.png',
    category: 'games',
    price: 499.99,
  },
  {
    name: 'Samsung TV',
    url: 'https://i.ibb.co/Pj1nm4B/samsung-tv.png',
    category: 'televisions',
    price: 1099.99,
  },
  {
    name: 'Google Pixel',
    url: 'https://i.ibb.co/5F58zmH/google-pixel.png',
    category: 'smartphones',
    price: 499.99,
  },
  {
    name: 'Sony ZV1F Camera',
    url: 'https://i.ibb.co/5Wy3RZ9/sony-zv1f-camera.png',
    category: 'cameras',
    price: 799.99,
  },
  {
    name: 'Toshiba TV',
    url: 'https://i.ibb.co/FxM6rXq/toshiba-tv.png',
    category: 'televisions',
    price: 499.99,
  },
  {
    name: 'iPhone 14',
    url: 'https://i.ibb.co/5vc7J6s/iphone-14.png',
    category: 'smartphones',
    price: 999.99,
  },
];


 // get Dom elements 

 const productsWrapper = document.getElementById('products-wrapper');
 const checkboxes = document.querySelectorAll('.check');
 const filtersContainer = document.getElementById('filters-container');
 const searchInput = document.getElementById('search');
 const cartButton = document.getElementById('cart-button');
 const cartCount = document.getElementById('cart-count');

//  initialized cart item count 

let cartItemCount = 0;

// initialize products

const productElements = [];

// event Listener for filtering 

filtersContainer.addEventListener('change', filterProducts);
searchInput.addEventListener('input', filterProducts);

// Loop over the products and create the product elements
 products.forEach((product) => {
  const productElement =  createProductElement(product);

      productElements.push(productElement);
      productsWrapper.appendChild(productElement);



 });  

  // create product element
 function createProductElement(product) {
    const productElement = document.createElement('div');

    productElement.className = "product-wrapper";

      productElement.innerHTML = `
        <div class="products-container">
        <img
              src="${product.url}"
              alt="${product.name}"
              class="product-image"
            />
        <button class="status-btn">Add to cart</button>
        </div>
        <p class="product-name">${product.name}</p>
        <p class="product-category">${product.category}</p>
        <strong class="product-price">N${product.price.toLocaleString()}</strong>`;

        productElement.querySelector('.status-btn').addEventListener('click', updateCart);

        
    return productElement;


 }

 //add or remove item from cart

 function updateCart(e){
  const statusEl = e.target

  if(statusEl.classList.contains('added')){
    // remove from cart 
    statusEl.classList.remove('added');
    statusEl.innerText = 'Add To Cart';
    statusEl.classList.remove('bg-red-600');
    statusEl.classList.add('bg-gray-800');

   cartItemCount--;

  } else{
    // add to cart
    statusEl.classList.add('added');
    statusEl.innerText = 'Remove from cart';
    statusEl.classList.remove('bg-gray-800');
    statusEl.classList.add('bg-red-600');

   cartItemCount++;
  }

  cartCount.innerText = cartItemCount.toString();
  
}

 // filter product by checkboxs and search input
 function filterProducts(){
  // get search term
 
  const searchTerm = searchInput.value.trim().toLowerCase();

  // get cheched category

  const checkedCategories = Array.from(checkboxes)
  .filter((checkbox) => checkbox.checked)
  .map((check) => check.id);

// loop over products and check for matches
productElements.forEach((productElement, index) => {
  const product = products[index];

  // check to see if the product matches the search or the checked categories
  const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm);
  const isInCheckedCategory =
    checkedCategories.length === 0 || checkedCategories.includes(product.category);

  // show or hide product based on match
  if (matchesSearchTerm && isInCheckedCategory) {
    productElement.classList.remove('hidden');
  } else {
    productElement.classList.add('hidden');
  }
});

 

}



