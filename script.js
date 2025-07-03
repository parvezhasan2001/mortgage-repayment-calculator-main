// document.getElementsByClassName('calculate-btn').addEventListener("click", Calculate);

// Format number with commas
function formatNumberWithCommas(value) {
  return value
    .replace(/\D/g, "") // remove non-digits
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Listen to input event
const amountInput = document.getElementById("mortgage-amount");
amountInput.addEventListener("input", function (e) {
  const cursorPosition = this.selectionStart;
  const formattedValue = formatNumberWithCommas(this.value);
  this.value = formattedValue;
  this.setSelectionRange(cursorPosition, cursorPosition);
});

const amountInput1 = document.getElementById("term");
amountInput1.addEventListener("input", function (e) {
  const cursorPosition = this.selectionStart;
  const formattedValue = formatNumberWithCommas(this.value);
  this.value = formattedValue;
  this.setSelectionRange(cursorPosition, cursorPosition);
});

function Calculate() {
  const amountEl = document.getElementById("mortgage-amount");
  const termEl = document.getElementById("term");
  const rateEl = document.getElementById("interest-rate");
  const typeEl = document.querySelector('input[name="mortgageType"]:checked');

  // Clear previous error styles
  amountEl.classList.remove("error");
  termEl.classList.remove("error");
  rateEl.classList.remove("error");

  let hasError = false;

  // Validate fields
  if (!amountEl.value) {
    amountEl.classList.add("error");

    hasError = true;
  }
  if (!termEl.value) {
    termEl.classList.add("error");
    hasError = true;
  }
  if (!rateEl.value) {
    rateEl.classList.add("error");
    hasError = true;
  }
  if (!typeEl) {
    alert("Please select a mortgage type.");
    hasError = true;
  }

  if (hasError) {
    alert("Please fill in all required fields.");
    return;
  }
  const amount = parseFloat(amountEl.value.replace(/,/g, ""));
  const term = parseInt(termEl.value.replace(/,/g, ""));
  const interest = parseFloat(rateEl.value.replace(/,/g, ""));
  const radioButtons = typeEl.value;

  let monthlyPayment, totalPayment;
  if (isNaN(amount) || isNaN(term) || isNaN(interest)) {
    alert("Please enter valid numbers.");
    return;
  }
  const months = term * 12;
  if (radioButtons === "repayment") {
    const monthlyRate = interest / 12 / 100;
    monthlyPayment =
      (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    totalPayment = monthlyPayment * months;
  } else if (radioButtons === "interestOnly") {
    monthlyPayment = (amount * interest) / 12;
    totalPayment = amount + monthlyPayment * months;
  }

  const monthlyFormatted = monthlyPayment.toLocaleString("en-UK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const totalFormatted = totalPayment.toLocaleString("en-UK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  document.getElementById("monthly-repayments").textContent =
    "£" + monthlyFormatted;
  document.getElementById("total-repayable").textContent = "£" + totalFormatted;
}

function clearAll() {
  document.getElementById("mortgage-amount").value = "";
  document.getElementById("term").value = "";
  document.getElementById("interest-rate").value = "";
  document.getElementById("monthly-repayments").textContent = "£0.00";
  document.getElementById("total-repayable").textContent = "£0.00";
  document.getElementById("mortgage-amount").classList.remove("error");
  document.getElementById("term").classList.remove("error");
  document.getElementById("interest-rate").classList.remove("error");
}
