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
    const usernameInput = document.getElementById('Username');
    const passwordInput = document.getElementById('Password');

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

        const username = usernameInput.value.trim();
        if (username.length === 0) {
            showValidationError(usernameInput, 'Username is required');
            isValid = false;
        } else if (username.length < 3) {
            showValidationError(usernameInput, 'Username must be at least 3 characters');
            isValid = false;
        } else if (username.length > 20) {
            showValidationError(usernameInput, 'Username cannot exceed 20 characters');
            isValid = false;
        }

        const password = passwordInput.value;
        if (password.length === 0) {
            showValidationError(passwordInput, 'Password is required');
            isValid = false;
        } else if (password.length < 6) {
            showValidationError(passwordInput, 'Password must be at least 6 characters');
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

    usernameInput.addEventListener('input', function () {
        const username = this.value.trim();
        if (username.length === 0) {
            clearValidationError(this);
        } else if (username.length < 3) {
            showValidationError(this, 'Username must be at least 3 characters');
        } else if (username.length > 20) {
            showValidationError(this, 'Username cannot exceed 20 characters');
        } else {
            clearValidationError(this);
        }
    });

    passwordInput.addEventListener('input', function () {
        const password = this.value;
        if (password.length === 0) {
            clearValidationError(this);
        } else if (password.length < 6) {
            showValidationError(this, 'Password must be at least 6 characters');
        } else {
            clearValidationError(this);
        }
    });

    usernameInput.addEventListener('blur', function () {
        const username = this.value.trim();
        if (username.length === 0) {
            showValidationError(this, 'Username is required');
        }
    });

    passwordInput.addEventListener('blur', function () {
        const password = this.value;
        if (password.length === 0) {
            showValidationError(this, 'Password is required');
        }
    });
});