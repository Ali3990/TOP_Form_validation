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
        showError(email, "Please enter a correct email format.");
    };
});


// Country code is required
const country = document.getElementById("country");
function validateCountry(countryOption) {
    return countryOption !== "";
};

country.addEventListener("blur", ()=> {
    const isValid = validateCountry(country.value);
    runPostalValidation(); // in case the user changes country after entering postal code.
    if (isValid) {
        clearError(country);
    } else {
        showError(country, "A country selection is required.");
    };
});



// Postal code
const postal = document.getElementById("postal-code");
function validatePostal(postalCode) {
    const selectedCountry = country.value;
    switch (selectedCountry){
        case (""):
            return false;

        case ("US"):
            const usRegex = /^\d{5}(-\d{4})?$/;
            return usRegex.test(postalCode);

        case ("CA"):
            const caRegex = /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i;
            return caRegex.test(postalCode);

        case ("GB"):
            const gbRegex = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;
            return gbRegex.test(postalCode);

        case ("AU"):   
            const auRegex = /^\d{4}$/;
            return auRegex.test(postalCode);     
    };
};

function runPostalValidation() {
    const isValid = validatePostal(postal.value);
    if (isValid) {
        clearError(postal);
    } else {
        showError(postal, "The postal code is not correct");
    };
};

postal.addEventListener("blur", runPostalValidation);


// Password
const pwd = document.getElementById("pwd");
function validatePassword(pwdinput) {
    const hasUpper = /[A-Z]/.test(pwdinput);
    const hasDigit = /\d/.test(pwdinput);
    const hasSpecial = /[^A-Za-z0-9]/.test(pwdinput);
    const longEnough = pwdinput.length >= 6;
    // all must be true.
    return hasUpper && hasDigit && hasSpecial && longEnough;
};


pwd.addEventListener("blur", () => {
    const isValid = validatePassword(pwd.value);
    if (isValid) {
        clearError(pwd);
    } else {
        showError(pwd, `Passwords must be at least 6 characters and include an uppercase letter, 
            a number, and a special character (e.g., !, @, *).
            `);
    };
});


// confirm password
const confirm = document.getElementById("pwd-confirm");

function validateConfirmPassword(confirmPwd) {
    const samePassword = pwd.value.test(confirmPwd)
}

