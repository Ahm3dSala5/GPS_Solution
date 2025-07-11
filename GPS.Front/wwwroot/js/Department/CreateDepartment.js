document.addEventListener('DOMContentLoaded', function () {
    // Helper function to show validation error
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

    // Helper function to clear validation error
    function clearValidationError(element) {
        element.classList.remove('is-invalid');
        const feedbackElement = element.nextElementSibling;
        if (feedbackElement && feedbackElement.classList.contains('invalid-feedback')) {
            feedbackElement.remove();
        }
    }

    // Helper function to validate name format (letters, spaces, hyphens only)
    function isValidName(name) {
        const nameRegex = /^[a-zA-Z\s\-'\.]+$/;
        return nameRegex.test(name);
    }

    // Get form and input elements
    const form = document.querySelector('form');
    const departmentNameInput = document.getElementById('depatName');
    const departmentManagerInput = document.getElementById('departManager');

    // Form submission validation
    form.addEventListener('submit', function (e) {
        let isValid = true;

        // Clear all previous validation errors
        const invalidElements = document.querySelectorAll('.is-invalid');
        invalidElements.forEach(element => {
            element.classList.remove('is-invalid');
        });

        const feedbackElements = document.querySelectorAll('.invalid-feedback');
        feedbackElements.forEach(element => {
            element.remove();
        });

        // Department Name validation
        const departmentName = departmentNameInput.value.trim();
        if (departmentName.length === 0) {
            showValidationError(departmentNameInput, 'Department name is required');
            isValid = false;
        } else if (departmentName.length < 2) {
            showValidationError(departmentNameInput, 'Department name must be at least 2 characters');
            isValid = false;
        } else if (departmentName.length > 100) {
            showValidationError(departmentNameInput, 'Department name cannot exceed 100 characters');
            isValid = false;
        } else if (!isValidName(departmentName)) {
            showValidationError(departmentNameInput, 'Department name can only contain letters, spaces, hyphens, apostrophes, and periods');
            isValid = false;
        }

        // Department Manager validation
        const departmentManager = departmentManagerInput.value.trim();
        if (departmentManager.length === 0) {
            showValidationError(departmentManagerInput, 'Department manager is required');
            isValid = false;
        } else if (departmentManager.length < 2) {
            showValidationError(departmentManagerInput, 'Department manager name must be at least 2 characters');
            isValid = false;
        } else if (departmentManager.length > 50) {
            showValidationError(departmentManagerInput, 'Department manager name cannot exceed 50 characters');
            isValid = false;
        } else if (!isValidName(departmentManager)) {
            showValidationError(departmentManagerInput, 'Department manager name can only contain letters, spaces, hyphens, apostrophes, and periods');
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault();
            // Focus on first invalid field
            const firstInvalidField = document.querySelector('.is-invalid');
            if (firstInvalidField) {
                firstInvalidField.focus();
            }
        }
    });

    // Real-time validation for Department Name
    departmentNameInput.addEventListener('input', function () {
        const departmentName = this.value.trim();
        if (departmentName.length === 0) {
            clearValidationError(this);
        } else if (departmentName.length < 2) {
            showValidationError(this, 'Department name must be at least 2 characters');
        } else if (departmentName.length > 100) {
            showValidationError(this, 'Department name cannot exceed 100 characters');
        } else if (!isValidName(departmentName)) {
            showValidationError(this, 'Department name can only contain letters, spaces, hyphens, apostrophes, and periods');
        } else {
            clearValidationError(this);
        }
    });

    // Real-time validation for Department Manager
    departmentManagerInput.addEventListener('input', function () {
        const departmentManager = this.value.trim();
        if (departmentManager.length === 0) {
            clearValidationError(this);
        } else if (departmentManager.length < 2) {
            showValidationError(this, 'Department manager name must be at least 2 characters');
        } else if (departmentManager.length > 50) {
            showValidationError(this, 'Department manager name cannot exceed 50 characters');
        } else if (!isValidName(departmentManager)) {
            showValidationError(this, 'Department manager name can only contain letters, spaces, hyphens, apostrophes, and periods');
        } else {
            clearValidationError(this);
        }
    });

    // Blur validation for required fields
    departmentNameInput.addEventListener('blur', function () {
        const departmentName = this.value.trim();
        if (departmentName.length === 0) {
            showValidationError(this, 'Department name is required');
        }
    });

    departmentManagerInput.addEventListener('blur', function () {
        const departmentManager = this.value.trim();
        if (departmentManager.length === 0) {
            showValidationError(this, 'Department manager is required');
        }
    });

    // Prevent leading/trailing spaces on paste
    [departmentNameInput, departmentManagerInput].forEach(input => {
        input.addEventListener('paste', function (e) {
            setTimeout(() => {
                this.value = this.value.trim();
                // Trigger validation after paste
                this.dispatchEvent(new Event('input'));
            }, 0);
        });
    });

    // Auto-capitalize first letter of each word
    function capitalizeWords(input) {
        input.addEventListener('input', function () {
            const cursorPosition = this.selectionStart;
            const value = this.value;
            const capitalizedValue = value.replace(/\b\w/g, char => char.toUpperCase());

            if (value !== capitalizedValue) {
                this.value = capitalizedValue;
                this.setSelectionRange(cursorPosition, cursorPosition);
            }
        });
    }

    // Apply auto-capitalization
    capitalizeWords(departmentNameInput);
    capitalizeWords(departmentManagerInput);
});