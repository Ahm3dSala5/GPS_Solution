
document.addEventListener('DOMContentLoaded', function () {
    function showValidationError(element, message) {
        element.classList.add('is-invalid');
        const existingFeedback = element.nextElementSibling;
        if (!existingFeedback || !existingFeedback.classList.contains('invalid-feedback')) {
            const feedbackDiv = document.createElement('div');
            feedbackDiv.className = 'invalid-feedback';
            feedbackDiv.textContent = message;
            element.parentNode.insertBefore(feedbackDiv, element.nextSibling);
        } else {
            existingFeedback.textContent = message;
        }
    }
    function clearValidationError(element) {
        element.classList.remove('is-invalid');
        const feedbackElement = element.nextElementSibling;
        if (feedbackElement && feedbackElement.classList.contains('invalid-feedback')) {
            feedbackElement.remove();
        }
    }
    const form = document.querySelector('form');
    const userNameInput = document.getElementById('UserName');
    const addressInput = document.getElementById('Address');
    const emailInput = document.getElementById('Email');
    const passwordInput = document.getElementById('Password');
    const confirmPasswordInput = document.getElementById('ConfirmPassword');

    form.addEventListener('submit', function (e) {
        let isValid = true;
        const invalidElements = document.querySelectorAll('.is-invalid');
        invalidElements.forEach(element => {
            element.classList.remove('is-invalid');
        });

        const feedbackElements = document.querySelectorAll('.invalid-feedback');
        feedbackElements.forEach(element => {
            element.remove();
        });

        const userName = userNameInput.value.trim();
        if (userName.length < 3 || userName.length > 20) {
            showValidationError(userNameInput, 'Username must be between 3 and 20 characters');
            isValid = false;
        }
        if (addressInput.value.trim() === '') {
            showValidationError(addressInput, 'Address is required');
            isValid = false;
        }

        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showValidationError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }

        const password = passwordInput.value;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            showValidationError(passwordInput, 'Password must be at least 8 characters with at least 1 letter and 1 number');
            isValid = false;
        }

        if (passwordInput.value !== confirmPasswordInput.value) {
            showValidationError(confirmPasswordInput, 'Passwords do not match');
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault();
            const firstInvalidField = document.querySelector('.is-invalid');
            if (firstInvalidField) {
                firstInvalidField.focus();
            }
        }
    });

    userNameInput.addEventListener('input', function () {
        const userName = this.value.trim();
        if (userName.length === 0) {
            clearValidationError(this);
        } else if (userName.length < 3 || userName.length > 20) {
            showValidationError(this, 'Username must be between 3 and 20 characters');
        } else {
            clearValidationError(this);
        }
    });

    addressInput.addEventListener('input', function () {
        const address = this.value.trim();
        if (address.length === 0) {
            clearValidationError(this);
        } else {
            clearValidationError(this);
        }
    });

    emailInput.addEventListener('input', function () {
        const email = this.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.length === 0) {
            clearValidationError(this);
        } else if (!emailRegex.test(email)) {
            showValidationError(this, 'Please enter a valid email address');
        } else {
            clearValidationError(this);
        }
    });

    passwordInput.addEventListener('input', function () {
        const password = this.value;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        if (password.length === 0) {
            clearValidationError(this);
        } else if (!passwordRegex.test(password)) {
            showValidationError(this, 'Password must be at least 8 characters with at least 1 letter and 1 number');
        } else {
            clearValidationError(this);
        }

        const confirmPassword = confirmPasswordInput.value;
        if (confirmPassword.length > 0) {
            if (password !== confirmPassword) {
                showValidationError(confirmPasswordInput, 'Passwords do not match');
            } else {
                clearValidationError(confirmPasswordInput);
            }
        }
    });

    confirmPasswordInput.addEventListener('input', function () {
        const confirmPassword = this.value;
        const password = passwordInput.value;
        if (confirmPassword.length === 0) {
            clearValidationError(this);
        } else if (confirmPassword !== password) {
            showValidationError(this, 'Passwords do not match');
        } else {
            clearValidationError(this);
        }
    });
});