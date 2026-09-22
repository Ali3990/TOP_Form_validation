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

function runEmailValidation() {
    const isValid = validateEmail(email.value);
    if (isValid) {
        clearError(email);
    } else {
        showError(email, "Please enter a correct email format.");
    };
}

email.addEventListener("blur", runEmailValidation);


// Country code is required
const country = document.getElementById("country");
function validateCountry(countryOption) {
    return countryOption !== "";
};

function runCountryValidation() {
     const isValid = validateCountry(country.value);
    runPostalValidation(); // in case the user changes country after entering postal code.
    if (isValid) {
        clearError(country);
    } else {
        showError(country, "A country selection is required.");
    };
};

country.addEventListener("blur", runCountryValidation);
country.addEventListener("input", runCountryValidation);


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
postal.addEventListener("input", runPostalValidation);


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

function runPwdValidation() {
    const isValid = validatePassword(pwd.value);
    runConfirmPassword();
    if (isValid) {
        clearError(pwd);
    } else {
        showError(pwd, `Passwords must be at least 6 characters and include an uppercase letter, 
            a number, and a special character (e.g., !, @, *).
            `);
    };
};


pwd.addEventListener("blur", runPwdValidation);
pwd.addEventListener("input", runPwdValidation);

// confirm password
const confirmPwd = document.getElementById("pwd-confirm");

function validateConfirmPassword(confirmPwdInput) {
    const samePassword = pwd.value === confirmPwdInput;
    return samePassword;
};

function runConfirmPassword() {
    const isValid = validateConfirmPassword(confirmPwd.value);
    if (isValid) {
        clearError(confirmPwd);
    } else {
        showError(confirmPwd, "Your passwords must match.");
    };
};

confirmPwd.addEventListener("blur", runConfirmPassword);
confirmPwd.addEventListener("input", runConfirmPassword);

// submit button - checks all spans to see if empty. Empty = all form fields are correct.



const form = document.querySelector("form");
const formStatus = document.getElementById("form-status");

form.addEventListener("submit", (event) => {
    runEmailValidation();
    runCountryValidation();
    runPostalValidation();
    runPwdValidation();
    runConfirmPassword();

    const errorSpans = document.querySelectorAll(".error"); // grabs all the spans with class="error"
    const anySpanErrors = Array.from(errorSpans).some(span => span.textContent !== "");

    if (anySpanErrors) {
        event.preventDefault();
        formStatus.textContent = "Please fix the errors above before submitting.";
    } else {
        formStatus.textContent = "*high five* You have submitted successfully!";
    };
});