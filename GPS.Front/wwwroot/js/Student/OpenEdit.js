document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form[asp-action="Update"]');
    const inputs = {
        firstName: document.getElementById('Student_FName'),
        lastName: document.getElementById('Student_LName'),
        address: document.getElementById('Student_Address'),
        birthDate: document.getElementById('Student_FBirthDate'),
        gpa: document.getElementById('Student_GPA'),
        level: document.getElementById('Student_Level'),
        departmentId: document.getElementById('Student_DepartmentId'),
        projectId: document.getElementById('Student_ProjectId'),
        supervisorId: document.getElementById('Student_SupervisorId')
    };

    const validationRules = {
        firstName: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'First name must be 2-50 characters and contain only letters and spaces'
        },
        lastName: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Last name must be 2-50 characters and contain only letters and spaces'
        },
        address: {
            required: false,
            maxLength: 200,
            message: 'Address cannot exceed 200 characters'
        },
        birthDate: {
            required: false,
            custom: validateBirthDate,
            message: 'Birth date must be between 16 and 100 years ago'
        },
        gpa: {
            required: false,
            min: 0,
            max: 4.0,
            step: 0.01,
            message: 'GPA must be between 0.00 and 4.00'
        },
        level: {
            required: false,
            min: 1,
            max: 8,
            message: 'Level must be between 1 and 8'
        },
        departmentId: {
            required: false,
            min: 1,
            message: 'Department ID must be a positive number'
        },
        projectId: {
            required: false,
            min: 1,
            message: 'Project ID must be a positive number'
        },
        supervisorId: {
            required: false,
            min: 1,
            message: 'Supervisor ID must be a positive number'
        }
    };

    function createErrorElement(inputId) {
        const errorElement = document.createElement('div');
        errorElement.id = inputId + '_error';
        errorElement.className = 'invalid-feedback d-block';
        errorElement.style.display = 'none';
        return errorElement;
    }

    Object.keys(inputs).forEach(key => {
        const input = inputs[key];
        if (input) {
            const errorElement = createErrorElement(input.id);
            input.parentNode.appendChild(errorElement);
        }
    });

    function validateField(fieldName, value) {
        const rules = validationRules[fieldName];
        if (!rules) return { isValid: true, message: '' };

        if (rules.required && (!value || value.trim() === '')) {
            return { isValid: false, message: `${fieldName} is required` };
        }

        if (!value || value.trim() === '') {
            return { isValid: true, message: '' };
        }

        if (rules.minLength && value.length < rules.minLength) {
            return { isValid: false, message: rules.message };
        }
        if (rules.maxLength && value.length > rules.maxLength) {
            return { isValid: false, message: rules.message };
        }

        if (rules.pattern && !rules.pattern.test(value)) {
            return { isValid: false, message: rules.message };
        }

        if (rules.min !== undefined || rules.max !== undefined) {
            const numValue = parseFloat(value);
            if (isNaN(numValue)) {
                return { isValid: false, message: 'Must be a valid number' };
            }
            if (rules.min !== undefined && numValue < rules.min) {
                return { isValid: false, message: rules.message };
            }
            if (rules.max !== undefined && numValue > rules.max) {
                return { isValid: false, message: rules.message };
            }
        }

        if (rules.custom) {
            const customResult = rules.custom(value);
            if (!customResult.isValid) {
                return { isValid: false, message: customResult.message || rules.message };
            }
        }

        return { isValid: true, message: '' };
    }

    function validateBirthDate(dateString) {
        if (!dateString) return { isValid: true };

        const birthDate = new Date(dateString);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 16 || age > 100) {
            return { isValid: false, message: 'Student must be between 16 and 100 years old' };
        }

        return { isValid: true };
    }

    function showError(input, message) {
        const errorElement = document.getElementById(input.id + '_error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
        }
    }

    function showSuccess(input) {
        const errorElement = document.getElementById(input.id + '_error');
        if (errorElement) {
            errorElement.style.display = 'none';
            input.classList.add('is-valid');
            input.classList.remove('is-invalid');
        }
    }

    function clearValidation(input) {
        const errorElement = document.getElementById(input.id + '_error');
        if (errorElement) {
            errorElement.style.display = 'none';
            input.classList.remove('is-invalid', 'is-valid');
        }
    }

    Object.keys(inputs).forEach(key => {
        const input = inputs[key];
        if (input) {
            input.addEventListener('blur', function () {
                const validation = validateField(key, this.value);
                if (!validation.isValid) {
                    showError(input, validation.message);
                } else {
                    showSuccess(input);
                }
            });

            input.addEventListener('input', function () {
                if (input.classList.contains('is-invalid')) {
                    clearValidation(input);
                }
            });
        }
    });

    form.addEventListener('submit', function (e) {
        let isFormValid = true;
        const errors = [];

        Object.keys(inputs).forEach(key => {
            const input = inputs[key];
            if (input) {
                const validation = validateField(key, input.value);
                if (!validation.isValid) {
                    showError(input, validation.message);
                    errors.push(`${key}: ${validation.message}`);
                    isFormValid = false;
                } else {
                    showSuccess(input);
                }
            }
        });

        if (isFormValid) {
            if (inputs.level.value && !inputs.gpa.value) {
                showError(inputs.gpa, 'GPA is required when level is specified');
                isFormValid = false;
            }
        }

        if (!isFormValid) {
            e.preventDefault();

            const errorSummary = document.getElementById('error-summary');
            if (errorSummary) {
                errorSummary.innerHTML = '<strong>Please fix the following errors:</strong><ul>' +
                    errors.map(error => `<li>${error}</li>`).join('') + '</ul>';
                errorSummary.style.display = 'block';
            }

            const firstErrorInput = form.querySelector('.is-invalid');
            if (firstErrorInput) {
                firstErrorInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstErrorInput.focus();
            }
        }
    });

    function formatFieldName(fieldName) {
        return fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    }

    Object.keys(inputs).forEach(key => {
        const input = inputs[key];
        if (input && input.value) {
            const validation = validateField(key, input.value);
            if (!validation.isValid) {
                showError(input, validation.message);
            }
        }
    });
});