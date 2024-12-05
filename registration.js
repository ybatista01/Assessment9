document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");

    // Helper function to show error messages
    function showError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}Error`);
        errorElement.textContent = message;
        errorElement.style.color = "red";
    }

    // Helper function to clear error messages
    function clearError(fieldId) {
        const errorElement = document.getElementById(`${fieldId}Error`);
        errorElement.textContent = "";
    }

    // Validate individual fields
    function validateField(fieldId, value, errorMessage, regex = null) {
        if (!value.trim()) {
            showError(fieldId, `${errorMessage} is required.`);
            return false;
        }
        if (regex && !regex.test(value)) {
            showError(fieldId, `${errorMessage} does not meet the required format.`);
            return false;
        }
        clearError(fieldId);
        return true;
    }

    // Form submission handler
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent default submission

        let isValid = true;
        let firstErrorField = null;

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const passwordVerify = document.getElementById("passwordVerify").value;
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("email").value;
        const phoneNumber = document.getElementById("phoneNumber").value;

        // Validation logic
        if (!validateField("username", username, "Username (letters and numbers only)", /^[a-zA-Z0-9]+$/)) {
            isValid = false;
            firstErrorField = firstErrorField || "username";
        }
        if (!validateField("password", password, "Password (minimum 8 characters)", /^.{8,}$/)) {
            isValid = false;
            firstErrorField = firstErrorField || "password";
        }
        if (password !== passwordVerify) {
            showError("passwordVerify", "Passwords must match (minimum 8 characters).");
            isValid = false;
            firstErrorField = firstErrorField || "passwordVerify";
        } else {
            clearError("passwordVerify");
        }
        if (!validateField("firstName", firstName, "First Name (text only)")) {
            isValid = false;
            firstErrorField = firstErrorField || "firstName";
        }
        if (!validateField("lastName", lastName, "Last Name (text only)")) {
            isValid = false;
            firstErrorField = firstErrorField || "lastName";
        }
        if (email && !validateField("email", email, "Email (e.g., xxx@xxx.xxx)", /^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            isValid = false;
            firstErrorField = firstErrorField || "email";
        }
        if (phoneNumber && !validateField("phoneNumber", phoneNumber, "Phone Number (format: (xxx) xxx-xxxx)", /^\(\d{3}\) \d{3}-\d{4}$/)) {
            isValid = false;
            firstErrorField = firstErrorField || "phoneNumber";
        }

        // Focus on the first erroneous field
        if (firstErrorField) {
            document.getElementById(firstErrorField).focus();
        }

        // Submit form if valid
        if (isValid) {
            form.submit();
        }
    });
});
