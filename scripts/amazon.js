let productsHTML = "";

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars * 10}.png">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      Rs.${Math.ceil(product.priceCents)}
    </div>

    <div class="product-quantity-container js-quantity-selector-${product.id}">
      <select>
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart js-added-checkmark-${product.id}">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart"
    data-product-id="${product.id}">
      Add to Cart
    </button>
  </div>
    `;
});

console.log(productsHTML);

document.querySelector(".js-products-grid").innerHTML = productsHTML;

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    //const productId = button.dataset.productId;
    const { productId } = button.dataset; //upar ka alternate

    const selectorQuantity = document.querySelector(
      `.js-quantity-selector-${productId}`
    );
    const selectorQuantityValue = Number(
      selectorQuantity.querySelector("select").value
    );

    //below code ye check karta hai ki joh product pe humne 'add to cart' click kiya voh cart mein pehle se hai ya nhi
    let matchingItem;
    cart.forEach((item) => {
      if (item.productId === productId) {
        matchingItem = item;
      }
    });

    //agar hai th selector quantity ko add kardo existing quantity mein; Agar nhi hai toh insert kardo product ko.
    if (matchingItem) {
      matchingItem.quantity += selectorQuantityValue;
    } else {
      cart.push({
        productId: productId, //'productId,' ->alternate way
        quantity: selectorQuantityValue,
      });
    }

    // below code is for counting the cart array and displaying it on the top right corner above the cart icon
    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });

    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

    //display the added check mark button above Add to Cart button
    const addedCheckMark = document.querySelector(`
      .js-added-checkmark-${productId}`);

    //styled class with opacity=1 ko add kiya div mein
    addedCheckMark.classList.add("added-to-cart-visible");

    //remove the 'added' check mark after two seconds
    
    let timeoutID = setTimeout(() => {
      addedCheckMark.classList.remove("added-to-cart-visible");
    }, 2000);
    //clear the timeout after 2 seconds.
    //clearTimeout function add karo agar kar paao toh
  });
});
