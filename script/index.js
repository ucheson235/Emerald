

let images = [
    "./assest/stacked-bracelets-img1.jpg",
    "./assest/sunglasses-img2.jpg",
    "./assest/bundle-of-bracelets-img3.jpg",
    "./assest/blue-t-shirt-img4.jpg",
    "./assest/red-t-shirt-img5.jpg",
    "./assest/black-fashion-backpack-img6.jpg",
    "./assest/black-bag-over-the-shoulder-img7.jpg",
    "./assest/bright-red-purse-with-gold-img8.jpg",
    "./assest/classic-quartz-wrist-watch-img9.jpg",
    "./assest/photography-studio-img10.jpg",
    "./assest/laptop-img11.jpg",
    "./assest/black-sneakers-with-white-sole-img12.jpg",
    "./assest/wireless-headphones-img13.jpg",
    "./assest/pair-of-navy-blue-skate-shoes-img14.jpg",
    "./assest/pair-of-sunglasses-img15.jpg",
    "./assest/black-headphones-img16.jpg",
    "./assest/black-microphone-img17.jpg",
    "./assest/flat-lay-of-products-on-blue-img18.jpg",
    "./assest/gold-silver-iphone-7-case-img19.jpg",
    "./assest/pink-fitness-tracker-img20.jpg",
    "./assest/black-mi-band-smartwatch-img21.jpg",
    "./assest/sequined-black-dress-img22.jpg",
    "./assest/off-shoulder-red-cocktail-dress-img23.jpg",
    "./assest/iphone-7-glitter-case-front-back-img24.jpg",
    "./assest/black-white-iphone-cases-img25.jpg",
    "./assest/-black-sunglasses-img26.jpg",
    "./assest/red-LED-sneakers-img27.jpg",
    "./assest/headphone-volume-control-img28.jpg",
    "./assest/mens-spring-summer-jacket-img29.jpg"  
];

let currentIndex = 0; // Default index

// Function to move to the next slide
function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length; // Increment the index
    document.getElementById("slider-image").src = images[currentIndex];
    console.log("Next slide:", currentIndex); // Log the current index
}

// Function to move to the previous slide
function prevSlide() {
    currentIndex = (currentIndex - 1 + images.length) % images.length; // Decrement the index
    document.getElementById("slider-image").src = images[currentIndex];
    console.log("Previous slide:", currentIndex); // Log the current index
}


setInterval(nextSlide, 3000);


let productElements = [];


//  fectching API from fakeproduct 

const apiUrl = 'https://fakestoreapi.com/products';

// Fetch products from the API
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data); // Logs the fetched data to the console
        
        // Loop through all fetched products and create DOM elements for each
        data.forEach((product) => {
            const productEl = createProductElement(product);
            productsWrapper.appendChild(productEl);
        });
    })
    .catch(error => console.error('Error fetching products:', error));

// Get DOM elements
const productsWrapper = document.getElementById("products-wrapper");
const searchInput = document.getElementById("search");
const cartCount = document.getElementById("cart-count");


// Initialize cart item count
let cartItemCount = 0;

// Event listener for filtering products
searchInput.addEventListener("input", filteringProduct);

// Function to create product elements
function createProductElement(product) {
    const productEl = document.createElement("div");
    productEl.className = "product-wrapper";

    productEl.innerHTML = `
        <div class="products-container">
        <img class="product-image" src="${product.image}" alt="${product.title}">
        <button class="status-btn" onClick="updateCart(event)">Add to cart</button>
        </div>
        <p class="product-name">${product.title}</p>
        <p class="product-category">${product.category}</p>
        <strong class="product-price">N${product.price.toLocaleString()}</strong>`
    return productEl;
}


const statusButtons = document.querySelectorAll('.status-btn');
statusButtons.forEach(button => {
  button.addEventListener('click', updateCart);
});


// filter product by checkboxs and search input

function filteringProduct() {
  // Get search input and convert to lowercase for case-insensitive search
  const searchTerm = searchInput.value.trim().toLowerCase();
  console.log("Search Term:", searchTerm);

  // Loop through all products and check for matches
  productElements.forEach((productEl, index) => {
    const product = data[index];  // Use the fetched product data

    // Check if the product title matches the search term
    const matchesSearchTerm = product.title.toLowerCase().includes(searchTerm);

    // Show or hide product based on match
    if (matchesSearchTerm) {
      productEl.classList.remove('hidden');
    } else {
      productEl.classList.add('hidden');
    }
  });
}

// Add event listener to search input for filtering
searchInput.addEventListener("input", filteringProduct);


// add or remove item from cart


function updateCart(e) {
  const statusEl = e.target;

  // Check if the button is already marked as 'added' or hidden
  if (statusEl.classList.contains('added')) {
    // Remove from cart
    statusEl.classList.remove('added');
    statusEl.innerHTML = 'Add to cart';
    statusEl.classList.remove('bg-primary-color'); // Use correct class name for your color
    statusEl.classList.add('bg-dark-color'); // Use correct class name for your color

    cartItemCount--;
  } else {
    // Add to cart
    statusEl.classList.add('added');
    statusEl.innerHTML = 'Remove from cart';
    statusEl.classList.remove('bg-dark-color'); // Use correct class name for your color
    statusEl.classList.add('bg-primary-color'); // Use correct class name for your color

    cartItemCount++;
  }

  // Update the cart count display
  cartCount.innerHTML = cartItemCount.toString();
  console.log(cartItemCount);
}

