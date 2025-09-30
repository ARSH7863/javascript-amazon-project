import formatCurrency from "../../scripts/utils/money.js";

console.log(`Converts currency into dollars`);

if (formatCurrency(2095) === "20.95") {
  console.log(`passed`);
} else {
  console.log(`failed`);
}

console.log(`Works with 0`);

if (formatCurrency(0) === "0.00") {
  console.log(`passed`);
} else {
  console.log(`failed`);
}

console.log(`Rounds upto nearest cent`);

if (formatCurrency(2000.5) === "20.01") {
  console.log(`passed`);
} else {
  console.log(`failed`);
}
