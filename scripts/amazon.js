import { cart, addToCart, calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

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
                src="${product.getStarsURL()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select class="js-quantity-selector-${product.id}">
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

            ${product.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart js-addedToCart-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-addToCart_btn"
            data-product-id = "${product.id}">
              Add to Cart
            </button>
          </div>`;
});

// console.log(productsHTML);

document.querySelector(".js-products-grid").innerHTML = productsHTML;

function updateToCart() {
  const cartQuantity = calculateCartQuantity();

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

const timeout = {};

document.querySelectorAll(".js-addToCart_btn").forEach((button) => {
  button.addEventListener("click", () => {
    // console.log(`Added Product`);
    // const productId = button.dataset.productId;
    const { productId } = button.dataset;

    const quantitySelector = document.querySelector(
      `.js-quantity-selector-${productId}`
    );

    const quantity = Number(quantitySelector.value);
    addToCart(productId, quantity);
    updateToCart();

    const addedMessage = document.querySelector(`.js-addedToCart-${productId}`);

    addedMessage.classList.add(`add-to-cart-visible`);

    // setTimeout(() => {
    //   addedMessage.classList.remove("add-to-cart-visible");
    // }, 2000);

    if (timeout[productId]) {
      clearTimeout(timeout[productId]);
    }

    timeout[productId] = setTimeout(() => {
      addedMessage.classList.remove("add-to-cart-visible");
    }, 2000);

    // console.log(cart);
  });
});
updateToCart();
