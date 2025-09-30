import { cart, resetCart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOptions } from "../../data/deliveryOptions.js";
import formatCurrency from "../utils/money.js";
import { renderOrderSummary } from "./orderSummary.js";
import { addOrder } from "../../data/orders.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid"; // ✅ NEW: unique ID ke liye

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOptions(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cartQuantity}):</div>
      <div class="payment-summary-money">$${formatCurrency(
        productPriceCents
      )}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(
        shippingPriceCents
      )}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(
        totalBeforeTaxCents
      )}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary js-place-order">
      Place your order
    </button>`;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;

  document
    .querySelector(".js-place-order")
    .addEventListener("click", async () => {
      try {
        // ✅ 1. Backend ko request bhejna (optional, sirf logging/analytics ke liye)
        await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cart }),
        });

        // ✅ 2. Apna proper order object banana
        const order = {
          id: uuidv4(), // 🆕 unique order id
          orderTime: new Date().toISOString(), // 🆕 timestamp
          totalCostCents: totalCents, // 🆕 total fix (pehle NaN aa raha tha)
          products: cart.map((cartItem) => {
            const deliveryOption = getDeliveryOptions(
              cartItem.deliveryOptionId
            );
            const estimatedDeliveryTime = new Date();
            estimatedDeliveryTime.setDate(
              estimatedDeliveryTime.getDate() + deliveryOption.deliveryDays
            );

            return {
              productId: cartItem.productId,
              quantity: cartItem.quantity,
              estimatedDeliveryTime: estimatedDeliveryTime.toISOString(), // 🆕 delivery date fix
            };
          }),
        };

        addOrder(order); // ✅ ab orders.js ko sahi object milega
      } catch (error) {
        console.log(`Unexpected error. Please try again later`);
      }

      resetCart();
      window.location.href = "orders.html";
    });
}
