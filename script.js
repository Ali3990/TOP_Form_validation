// Constraints and validation for form fields

function showError(input, message) {
    input.classList.add('invalid'); // attaches invalid class to the element to give red border
    const errorSpan = document.getElementById(`${input.id}-error`);
    errorSpan.textContent = message; // gives the span an error message
};

function clearError(input) {
    input.classList.remove('invalid');
    const errorSpan = document.getElementById(`${input.id}-error`);
    errorSpan.textContent = ''; // clears any error message
};

// email must have a '@' and ending in '.com'
const email = document.getElementById("userEmail");

function validateEmail(emailInput) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.com$/;
    return emailRegex.test(emailInput);
};

email.addEventListener("input", () => {
    const isValid = validateEmail(email.value);
    if (isValid) {
        clearError(email);
    } else {
        showError(email, "Please enter a correct email format.")
    }
});


// Country code is required
const country = document.getElementById("country");

function validateCountry(countryOption) {
    return countryOption !== "";
};

country.addEventListener("blur", ()=> {
    const isValid = validateCountry(country.value);
    if (isValid) {
        clearError(country);
    } else {
        showError(country, "A country selection is required.");
    }
});

