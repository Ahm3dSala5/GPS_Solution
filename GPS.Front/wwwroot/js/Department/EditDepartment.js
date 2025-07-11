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
        const nameRegex = /^[a-zA-Z\s\-'\.&]+$/;
        return nameRegex.test(name);
    }

    // Helper function to check if values have changed
    function hasFormChanged() {
        const originalName = '@Html.Raw(Model.Name)';
        const originalManager = '@Html.Raw(Model.Manager)';
        const currentName = departmentNameInput.value.trim();
        const currentManager = departmentManagerInput.value.trim();

        return originalName !== currentName || originalManager !== currentManager;
    }

    // Get form and input elements
    const form = document.querySelector('form');
    const departmentNameInput = document.getElementById('Department_Name');
    const departmentManagerInput = document.getElementById('Department_Manager');
    const submitButton = document.querySelector('button[type="submit"]');

    // Store original values for comparison
    const originalValues = {
        name: departmentNameInput.value.trim(),
        manager: departmentManagerInput.value.trim()
    };

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
            showValidationError(departmentNameInput, 'Department name can only contain letters, spaces, hyphens, apostrophes, periods, and ampersands');
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
            showValidationError(departmentManagerInput, 'Department manager name can only contain letters, spaces, hyphens, apostrophes, periods, and ampersands');
            isValid = false;
        }

        // Check if form has actually changed
        if (isValid && !hasFormChanged()) {
            e.preventDefault();
            alert('No changes were made to update.');
            return;
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
            showValidationError(this, 'Department name can only contain letters, spaces, hyphens, apostrophes, periods, and ampersands');
        } else {
            clearValidationError(this);
        }
        updateSubmitButton();
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
            showValidationError(this, 'Department manager name can only contain letters, spaces, hyphens, apostrophes, periods, and ampersands');
        } else {
            clearValidationError(this);
        }
        updateSubmitButton();
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

    // Update submit button based on form changes
    function updateSubmitButton() {
        const changed = hasFormChanged();
        const hasErrors = document.querySelectorAll('.is-invalid').length > 0;

        if (changed && !hasErrors) {
            submitButton.textContent = 'Update';
            submitButton.classList.remove('btn-secondary');
            submitButton.classList.add('btn-primary');
            submitButton.disabled = false;
        } else if (!changed) {
            submitButton.textContent = 'No Changes';
            submitButton.classList.remove('btn-primary');
            submitButton.classList.add('btn-secondary');
            submitButton.disabled = true;
        } else {
            submitButton.textContent = 'Fix Errors';
            submitButton.classList.remove('btn-primary');
            submitButton.classList.add('btn-warning');
            submitButton.disabled = true;
        }
    }

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

    // Initialize submit button state
    updateSubmitButton();

    // Warn user about unsaved changes
    window.addEventListener('beforeunload', function (e) {
        if (hasFormChanged()) {
            e.preventDefault();
            e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
            return e.returnValue;
        }
    });

    // Remove beforeunload listener when form is submitted
    form.addEventListener('submit', function () {
        window.removeEventListener('beforeunload', function () { });
    });
});