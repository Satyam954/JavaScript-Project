const API = "https://dummyjson.com/products?limit=0";
const CATEGORY_API = "https://dummyjson.com/products/categories"
const productscontainer = document.querySelector("#products-container");
const categoryfilters = document.querySelector("#category-filters");
const searchinput = document.querySelector("#search-input");
const productdetailcontainer = document.querySelector("#product-detail-container");
const wishlistcount = document.querySelector("#wishlist-count");
const cartcount = document.querySelector("#cart-count");
const wishlistcontainer = document.querySelector("#wishlist-container");
const cartcontainer = document.querySelector("#cart-container");



// let wishlistItme=JSON.parse(localStorage.getItem("wishlist")) || []
// console.log(wishlistItme);

function getitems(key) {
  return JSON.parse(localStorage.getItem(key)) || []
}
function setitems(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}
// step one  is for the product detail and cateogry  page build up
function convertToinr(price) {
  return (price * 94.99).toFixed(2);
}

function fixedcato(cato) {
  return cato.replace("-", " ");
}
async function fetchProduct(url) {
  productscontainer.innerHTML = "Loading"
  let responce = await fetch(url)
  let data = await responce.json()
  renderProducts(data.products)
}


function renderProducts(products) {
  productscontainer.innerHTML = ""
  if (products.length > 1) {
    products.forEach((product) => {
      const { category, thumbnail, title, price, id } = product
      let article = document.createElement("article")
      article.className = "bg-white border border-slate-200 rounded-lg p-4 flex flex-col justify-between hover:border-slate-300 hover:shadow-sm transition"
      article.innerHTML = ` <div class="h-48 w-full flex items-center justify-center p-3 mb-4 bg-white">
            <img src=${thumbnail}
              alt=${title}>
          </div>
          <div class="flex-grow flex flex-col">
            <span class="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
              ${fixedcato(category)}
            </span>
            <h2 class="font-semibold text-slate-900 text-sm mb-2 line-clamp-2" title="Essence Mascara Lash Princess">
              ${title}
            </h2>
            <div class="mt-auto pt-2">
              <span class="text-lg font-bold text-slate-900">
               ₹ ${convertToinr(price)}
              </span>
            </div>
            <a href="product-details.html?id=${id}"
              class="mt-4 block w-full text-center bg-teal-700 hover:bg-teal-800 text-white text-sm font-medium py-2 px-4 rounded transition">
              View Details
            </a>
          </div>`

      productscontainer.append(article);
    })
  } else {
    productscontainer.innerHTML = "Product not found"
    return
  }

}


async function fetchCatogery() {
  const responce = await fetch(CATEGORY_API)
  const result = await responce.json()

  catedories = [{ name: "all", slug: "all", url: API }, ...result]
  renderCatogeries();

}






function renderCatogeries(defaultcato = "all") {
  categoryfilters.innerHTML = ""
  catedories.forEach(({ name, slug, url }) => {
    let button = document.createElement("button")
    if (slug === defaultcato) {
      button.className = "px-4 py-1.5 rounded-md text-sm capitalize font-medium bg-teal-700 text-white transition"
    }
    else {
      button.className = "px-4 py-1.5 rounded-md text-sm capitalize font-medium bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 transition"

    }
    button.textContent = name;
    button.type = "button";
    button.dataset.slug = slug;
    button.dataset.url = url;

    categoryfilters.append(button)
  })
}

if (productscontainer) {
  fetchCatogery()
  fetchProduct(API)
}

if (categoryfilters) {
  categoryfilters.addEventListener("click", (e) => {
    e.stopPropagation()
    const btn = e.target
    let url = btn.dataset.url
    let slug = btn.dataset.slug
    if (btn.type) {
      console.log("hi");
      console.log(slug);
      fetchProduct(url)
      renderCatogeries(slug)
    }
  })
}


if (searchinput) {
  searchinput.addEventListener("input", (e) => {
    console.log(searchinput.value);
    let product = searchinput.value
    const url = `https://dummyjson.com/products/search?q=${product}`
    fetchProduct(url)

  }
  )
}


// now for product detail page
async function productdetail() {
  if (!productdetailcontainer) {
    return
  }
  productdetailcontainer.innerHTML = "Loading....."
  let params = new URLSearchParams(window.location.search)
  let id = params.get("id")
  const url = `https://dummyjson.com/products/${id}`
  let responce = await fetch(url)
  let data = await responce.json()
  console.log(data);
  let { category, thumbnail, title, price, description, rating, reviews } = data
  productdetailcontainer.innerHTML = `
     <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        
        <div class="bg-white border border-slate-200 rounded-lg p-8 flex items-center justify-center min-h-[350px] md:min-h-[440px]">
          <img 
            src=${thumbnail}
            alt=${title}
            class="max-h-96 max-w-full object-contain"
          >
        </div>

        <div class="flex flex-col">
          <div>
            <span class="inline-block text-xs font-semibold text-teal-700 uppercase tracking-wider mb-2">
              ${category}
            </span>
          </div>

          <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-3">
            ${title}
          </h1>

          <div class="flex items-center gap-1 mb-4">
            <div class="flex items-center" aria-label="2.6 out of 5 stars">
              <svg class="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <svg class="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <svg class="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <svg class="w-5 h-5 text-slate-300 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <svg class="w-5 h-5 text-slate-300 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
            <span class="ml-2 text-sm text-slate-500 font-medium">
               ${rating}(${reviews.length}) 
            </span>
          </div>

          <div class="mb-6">
            <span class="text-2xl sm:text-3xl font-bold text-slate-900">
              ₹ ${convertToinr(price)}
            </span>
          </div>

          <div class="border-t border-b border-slate-200 py-6 mb-6">
            <p class="text-slate-600 text-base leading-relaxed">
              ${description}
            </p>
          </div>

          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            
            <div class="flex items-center border border-slate-300 rounded-md bg-white w-fit">
              <button 
                type="button" 
                id="qty-minus" 
                class="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-l-md transition"
                aria-label="Decrease quantity"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                </svg>
              </button>

              <span id="qty-value" class="w-12 text-center text-sm font-semibold text-slate-900 select-none">
                1
              </span>

              <button 
                type="button" 
                id="qty-plus" 
                class="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-r-md transition"
                aria-label="Increase quantity"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
              </button>
            </div>

            <button 
              type="button" 
              id="add-to-cart-btn" 
              class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-medium py-2.5 px-6 rounded-md shadow-sm transition"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              <span>Add to Cart</span>
            </button>

            <button 
              type="button" 
              id="add-to-wishlist-btn" 
              class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 border border-teal-700 text-teal-700 hover:bg-teal-50 font-medium py-2.5 px-6 rounded-md shadow-sm transition"
            >
              <svg id="wishlist-btn-icon" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              <span id="wishlist-btn-text">Add to Wishlist</span>
            </button>
          </div>

        </div>
      </div>`


  // add to wishlist 
  let addtowishlistbtn = document.querySelector("#add-to-wishlist-btn");
  addtowishlistbtn.addEventListener("click", (e) => {
    e.preventDefault()
    addtowishlist(data)

  })


  // fot the quantity update 
   let qtyvalue =document.querySelector("#qty-value")

  document.querySelector("#qty-plus").addEventListener("click",(e) => {
    qtyvalue.textContent=Number(qtyvalue.textContent)+1
  })

  document.querySelector("#qty-minus").addEventListener("click",(e) => {
     let value = Number(qtyvalue.textContent)
     if (value>0) {
           qtyvalue.textContent=Number(qtyvalue.textContent)-1
     }
    
  })

  // addtoCart
  let addtocartbtn = document.querySelector("#add-to-cart-btn");
  addtocartbtn.addEventListener("click", (e) => {

    // if we click on add to cart so the quty value must go  in the local storage data but the qty value is not in the  api data so we add it  mannualy 
    e.preventDefault()
    addtoCart({...data,quantity:Number(qtyvalue.textContent)})
    console.log(qtyvalue.textContent);
    console.log(getitems("cart"));
  })


}



// wihslistpage
function wishlistPage() {
  // wishlistcontainer.innerHTML="";
  if (!wishlistcontainer) {
    return
  }
  const wishlistdata = getitems("wishlist")
  const div = document.createElement("div");
  div.className = "bg-white border border-slate-200 rounded-lg divide-y divide-slate-200 overflow-hidden shadow-sm"

  if (!wishlistdata.length) {

    wishlistcontainer.innerHTML = ` <div class="bg-white border border-slate-200 rounded-lg p-12 text-center max-w-md mx-auto my-8">
        <div class="w-16 h-16 mx-auto mb-4 text-slate-300 flex items-center justify-center">
          <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-slate-800 mb-2">Your wishlist is empty</h2>
        <p class="text-slate-500 text-sm mb-6">Looks like you haven't saved any products to your wishlist yet.</p>
        <a href="index.html" class="inline-flex items-center justify-center bg-teal-700 hover:bg-teal-800 text-white font-medium px-6 py-2.5 rounded-md transition text-sm">
          Start Shopping
        </a>
      </div>`
    return
  }

  else {

    console.log(wishlistdata.length);
    wishlistcontainer.innerHTML = "";

    wishlistdata.forEach((data) => {


      let { thumbnail, title, price, category, id } = data
      let div2 = document.createElement("div")
      div2.className = "p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-between"
      let card = ` <div class="flex items-center gap-4 w-full sm:w-auto flex-1 min-w-0">
            <div class="w-16 h-16 sm:w-20 sm:h-20 bg-white border border-slate-200 rounded p-1.5 flex items-center justify-center shrink-0">
              <img 
                src=${thumbnail} 
                alt=${title} 
                class="max-h-full max-w-full object-contain"
              >
            </div>
            <div class="min-w-0 flex-1">
              <a 
                href="product-details.html?id=${id}" 
                class="text-sm font-semibold text-slate-900 hover:text-teal-700 line-clamp-2 transition" 
                title=${title}
              >
                ${title}
              </a>
              <p class="text-sm font-bold text-slate-900 mt-1">₹ ${convertToinr(price)}</p>
            </div>
          </div>
          <div class="flex items-center gap-3 w-full sm:w-auto shrink-0 justify-end">
            <button 
             data-id=${id}
              type="button" 
              class="wishlist-add-cart-btn inline-flex items-center justify-center gap-1.5 bg-teal-700 hover:bg-teal-800 text-white text-sm font-medium py-2 px-4 rounded transition shadow-sm"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              <span>Add to Cart</span>
            </button>
            <button 
            data-id=${id}
              type="button" 
              class="wishlist-remove-btn inline-flex items-center justify-center gap-1.5 text-slate-500 hover:text-red-600 border border-slate-300 hover:border-red-300 text-sm font-medium py-2 px-3 rounded transition"
              title="Remove from Wishlist"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              <span>Remove from Wishlist</span>
            </button>
          </div>`
      div2.innerHTML = card
      div.append(div2)
    })

    wishlistcontainer.addEventListener("click", (e) => {

      const wishlistremovebtn = e.target.closest(".wishlist-remove-btn ")
      const wishlistaddartbtn = e.target.closest(".wishlist-add-cart-btn ")

      if (wishlistremovebtn) {
        let removeproductId = Number(wishlistremovebtn.dataset.id)

        let wishlist = getitems("wishlist");
        let updatewishlsit = wishlist.filter((item) => {
          return item.id !== removeproductId
        })
        setitems("wishlist", updatewishlsit)
        updateWishlistCount()
        wishlistPage()
      }
      if (wishlistaddartbtn) {
        const productId = Number(wishlistaddartbtn.dataset.id);
        const data = getitems("wishlist").find(({ id }) => id === productId)

        console.log(data);
        addtoCart(data)
      }
    })

    wishlistcontainer.append(div)
  }
}
// cartpage

function cartPage() {
  if (!cartcontainer) {
    return
  }
  cartcontainer.innerHTML = ""
  let cartdata = getitems("cart")
  if (!cartdata.length) {
    cartcontainer.innerHTML = ` <div class="bg-white border border-slate-200 rounded-lg p-12 text-center max-w-md mx-auto my-8">
        <div class="w-16 h-16 mx-auto mb-4 text-slate-300 flex items-center justify-center">
          <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-slate-800 mb-2">Your cart is empty</h2>
        <p class="text-slate-500 text-sm mb-6">Looks like you haven't added anything to your cart yet.</p>
        <a href="index.html" class="inline-flex items-center justify-center bg-teal-700 hover:bg-teal-800 text-white font-medium px-6 py-2.5 rounded-md transition text-sm">
          Start Shopping
        </a>
      </div>`

    return
  }

  let maindiv = document.createElement("div")
  maindiv.className = "grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"

  let div2 = document.createElement("div")
  div2.className = "lg:col-span-2 bg-white border border-slate-200 rounded-lg divide-y divide-slate-200 overflow-hidden shadow-sm"
  let totalprice = 0;

  cartdata.forEach((data) => {

    let { thumbnail, id, title, price,quantity } = data
    totalprice = totalprice + price *quantity;
    

    const itemdiv = document.createElement("div");
    itemdiv.classList = "p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-between";
    itemdiv.innerHTML = `  <div class="flex items-center gap-4 w-full sm:w-auto flex-1 min-w-0">
              <div
                class="w-16 h-16 sm:w-20 sm:h-20 bg-white border border-slate-200 rounded p-1.5 flex items-center justify-center shrink-0">
                <img src=${thumbnail}
                  alt=${title}>
              </div>
              <div class="min-w-0 flex-1">
                <a href="product-details.html?id=${id}"
                  class="text-sm font-semibold text-slate-900 hover:text-teal-700 line-clamp-2 transition"
                  title= ${title}>
                  ${title}
                </a>
                <p class="text-xs text-slate-500 mt-1">₹ ${convertToinr(price)} each</p>
              </div>
            </div>
            <div class="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto shrink-0">
              <div class="flex items-center border border-slate-300 rounded bg-white">
                <button type="button"
                 data-id=${id}
                  class="cart-qty-minus p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-l transition"
                  aria-label="Decrease quantity">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                  </svg>
                </button>
                <span class="w-8 text-center text-xs font-semibold text-slate-800 select-none">${quantity}</span>
                <button type="button"
                data-id=${id}
                  class="cart-qty-plus p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-r transition"
                  aria-label="Increase quantity">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </button>
              </div>
              <div class="w-20 text-right">
                <span class="text-sm font-bold text-slate-900">₹ ${(Number(quantity) * convertToinr(price)).toFixed(2)}</span>
              </div>
              <button type="button"
                class="cart-wishlist-btn text-slate-400 hover:text-teal-700 p-1.5 rounded transition"
                title="Add to Wishlist" aria-label="Add to Wishlist">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                  </path>
                </svg>
              </button>
              <button type="button" class="cart-remove-btn text-slate-400 hover:text-red-600 p-1.5 rounded transition"
                title="Remove from cart" aria-label="Remove item">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                  </path>
                </svg>
              </button>
            </div>`

    div2.append(itemdiv)

    // for the add to wishtlist and remove to  cart

    itemdiv.addEventListener("click",(e) => {
      let addtowishlistbtn = e.target.closest(".cart-wishlist-btn")
      let removecartbtn = e.target.closest(".cart-remove-btn")
      if (addtowishlistbtn) {
        console.log("htttttttt");
        addtowishlist(data)
      }
      if (removecartbtn) {
          console.log("hehehee");
          let filterproduct = getitems("cart")
          let cartdata=filterproduct.filter((item) => {
            return item.id!==id
          })

          setitems("cart",cartdata)
          updateCartcount()
          cartPage()
      }
    })


  }) //loop end here
  
  // now we select the increase and decrease items btn


  const div3 = document.createElement("div");  // total price div 
  div3.classList = "bg-white border border-slate-200 rounded-lg p-6 shadow-sm sticky top-24";
  div3.innerHTML = `<h2 class="text-lg font-bold text-slate-900 mb-4 pb-3 border-b border-slate-200">
            Order Summary
          </h2>

          <div class="flex items-center justify-between text-base font-semibold text-slate-900 mb-6">
            <span>Total Amount</span>
            <span class="text-xl font-bold text-teal-700">₹ ${convertToinr(totalprice)}</span>
          </div>

          <button type="button" id="checkout-btn"
            class="w-full bg-teal-700 hover:bg-teal-800 text-white font-medium py-3 px-4 rounded-md shadow-sm transition text-center">
            Proceed to Checkout
    </button>`


  cartcontainer.innerHTML = ""
  console.log("hellooo")
  maindiv.append(div2, div3)
  cartcontainer.append(maindiv)

  cartcontainer.querySelectorAll(".cart-qty-plus").forEach((btn) => {
    // console.log(btn);
    btn.addEventListener("click",(e) => {
     let span=btn.previousElementSibling;
        let id = e.currentTarget.dataset.id
     span.textContent=Number(span.textContent)+1
       updateCartItemQuantity(id,span.textContent)
       
    })
  })
  cartcontainer.querySelectorAll(".cart-qty-minus").forEach((btn) => {
    // console.log(btn);
    btn.addEventListener("click",(e) => {
      let span = e.currentTarget.nextElementSibling
    //  let span=btn.nextElementSibling;
    let id = e.currentTarget.dataset.id
    console.log(id);
     let value =span.textContent=Number(span.textContent)
     if (value>0) {
      span.textContent=Number(span.textContent)-1
      updateCartItemQuantity(id,span.textContent)
     }
    })
  })


}

cartPage()
wishlistPage()

productdetail()

function addtowishlist(data) {
  const wishlistproducts = getitems("wishlist")
  if (wishlistproducts.length) {
    let isExist = wishlistproducts.some((item) => item.id === data.id)

    if (!isExist) {
      setitems("wishlist", [data, ...wishlistproducts])
    }
  } else {
    setitems("wishlist", [data])
  }

 
  updateWishlistCount()
}

function addtoCart(data) {
  let cartproduct = getitems("cart")
  if (cartproduct.length) {
    let isexist = cartproduct.find((item) => item.id === data.id)
    
    if (isexist) {
      const filteProducts = cartproduct.map((item) => {
        if (item.id===isexist.id) {
          return{
            ...item,
            quantity: Number(data.quantity) + Number(isexist.quantity)
          } 
        }
        return item
      })
      setitems("cart", filteProducts)
    } else{
         setitems("cart", [data, ...cartproduct])
    }
  } else {
    setitems("cart", [data])
  }
  updateCartcount()
}

function updateCartItemQuantity(id ,quantity) {
  const cartproduct = getitems("cart")

 const filterproduct= cartproduct.map((item) => {
  if (item.id===Number(id)) {
    return {
      ...item,
      quantity
    }
  }
  return item
  }
  )
  setitems("cart",filterproduct)
  updateCartcount()
  cartPage()
}

function updateWishlistCount() {
  wishlistcount.textContent = getitems("wishlist").length
}

updateWishlistCount()

function updateCartcount() {
  cartcount.textContent = getitems("cart").length
  cartcount.textContent=getitems("cart").reduce((acc ,crr) => {
    return acc+Number(crr.quantity)
  },0)
}

updateCartcount()