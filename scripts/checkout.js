import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart, loadCartFetch } from "../data/cart.js";

// import "../data/cart-class.js";
// import "../data/car.js";
// import "../data/backend-practice.js";

async function loadPage() {
  try {
    // await new Promise((resolve) => {
    //   loadCart(() => {
    //     resolve();
    //   });
    // });
    await Promise.all([loadProductsFetch(), loadCartFetch()]);

    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  } catch (error) {
    console.log(`Unexpected Error. Please try again later`, error);
  }
}
loadPage();

// Promise.all([
//   loadProductsFetch(),
//   new Promise((resolve) => {
//     loadCart(() => {
//       resolve();
//     });
//   }),
// ]).then(() => {
//   renderCheckoutHeader();
//   renderOrderSummary();
//   renderPaymentSummary();
// });

// new Promise((resolve) => {
//   loadProducts(() => {
//     resolve();
//   });
// })
//   .then(() => {
//     return new Promise((resolve) => {
//       loadCart(() => {
//         resolve();
//       });
//     });
//   })
//   .then(() => {
//     renderCheckoutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();
//   });

// // loadProducts(() => {
// //   loadCart(() => {
// //     renderCheckoutHeader();
// //     renderOrderSummary();
// //     renderPaymentSummary();
// //   });
// // });
