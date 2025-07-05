
document.addEventListener('DOMContentLoaded', function () {
    initializeStudentFormValidations();
});

function initializeStudentFormValidations() {
    const form = document.querySelector('form[asp-action="Create"]');
    if (!form) return;

    form.addEventListener('submit', handleFormSubmit);

    addRealTimeValidations(form);

    setupCustomValidations(form);

    initializeGPAFormatting(form);

    addFormResetValidation(form);
}

function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    clearAllErrors(form);

    const validationResult = validateStudentForm(form);

    if (validationResult.isValid) {
        showLoadingState(form);

        submitStudentForm(form);
    } else {
        displayValidationErrors(form, validationResult.errors);
        showNotification('Please correct the errors below before submitting.', 'error');
        focusFirstErrorField(form);
    }
}

function addRealTimeValidations(form) {
    const fields = form.querySelectorAll('input');

    fields.forEach(field => {
        field.addEventListener('blur', function () {
            validateField(this);
        });

        field.addEventListener('focus', function () {
            clearFieldError(this);
        });

        if (field.name === 'Student_FName' || field.name === 'Student_LName') {
            field.addEventListener('input', debounce(function () {
                validateNameField(this);
            }, 300));
        }

        if (field.name === 'Student_GPA') {
            field.addEventListener('input', debounce(function () {
                validateGPAField(this);
            }, 300));
        }

        if (field.name === 'Student_BirthDate') {
            field.addEventListener('change', function () {
                validateBirthDateField(this);
            });
        }

        if (field.name === 'Student_Level') {
            field.addEventListener('input', debounce(function () {
                validateLevelField(this);
            }, 300));
        }

        if (field.name === 'Student_DepartmentId' || field.name === 'Student_SupervisorId') {
            field.addEventListener('input', debounce(function () {
                validateIdField(this);
            }, 300));
        }
    });
}

function setupCustomValidations(form) {
    const textFields = form.querySelectorAll('input[type="text"]');
    textFields.forEach(field => {
        addCharacterCounter(field);
    });

    const gpaField = form.querySelector('#Student_GPA');
    if (gpaField) {
        addGPAIndicator(gpaField);
    }

    const birthDateField = form.querySelector('#Student_BirthDate');
    if (birthDateField) {
        addAgeCalculator(birthDateField);
    }
}

function validateStudentForm(form) {
    const errors = [];

    const fields = form.querySelectorAll('input');
    fields.forEach(field => {
        const fieldError = validateField(field);
        if (fieldError) {
            errors.push(fieldError);
        }
    });

    const crossValidationErrors = performCrossValidations(form);
    errors.push(...crossValidationErrors);

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

function validateField(field) {
    const fieldName = field.name;
    const fieldValue = field.value.trim();

    if (field.required && !fieldValue) {
        showFieldError(field, `${getFieldLabel(field)} is required.`);
        return { field: fieldName, message: `${getFieldLabel(field)} is required.` };
    }

    switch (fieldName) {
        case 'Student_FName':
        case 'Student_LName':
            return validateNameField(field);
        case 'Student_Address':
            return validateAddressField(field);
        case 'Student_BirthDate':
            return validateBirthDateField(field);
        case 'Student_GPA':
            return validateGPAField(field);
        case 'Student_Level':
            return validateLevelField(field);
        case 'Student_DepartmentId':
        case 'Student_SupervisorId':
            return validateIdField(field);
        default:
            return null;
    }
}

function validateNameField(field) {
    const name = field.value.trim();
    const fieldLabel = getFieldLabel(field);

    if (!name && field.required) {
        showFieldError(field, `${fieldLabel} is required.`);
        return { field: field.name, message: `${fieldLabel} is required.` };
    }

    if (name.length < 2) {
        showFieldError(field, `${fieldLabel} must be at least 2 characters long.`);
        return { field: field.name, message: `${fieldLabel} too short.` };
    }

    if (name.length > 50) {
        showFieldError(field, `${fieldLabel} cannot exceed 50 characters.`);
        return { field: field.name, message: `${fieldLabel} too long.` };
    }

    const nameRegex = /^[a-zA-Z\s\-'\.]+$/;
    if (!nameRegex.test(name)) {
        showFieldError(field, `${fieldLabel} contains invalid characters.`);
        return { field: field.name, message: `${fieldLabel} contains invalid characters.` };
    }

    if (/\s{2,}|--/.test(name)) {
        showFieldError(field, `${fieldLabel} contains consecutive spaces or hyphens.`);
        return { field: field.name, message: `${fieldLabel} formatting error.` };
    }

    clearFieldError(field);
    return null;
}

function validateAddressField(field) {
    const address = field.value.trim();

    if (address && address.length < 5) {
        showFieldError(field, 'Address must be at least 5 characters long.');
        return { field: field.name, message: 'Address too short.' };
    }

    if (address.length > 200) {
        showFieldError(field, 'Address cannot exceed 200 characters.');
        return { field: field.name, message: 'Address too long.' };
    }

    if (address && !/^[a-zA-Z0-9\s\-\,\.\#\/]+$/.test(address)) {
        showFieldError(field, 'Address contains invalid characters.');
        return { field: field.name, message: 'Address contains invalid characters.' };
    }

    clearFieldError(field);
    return null;
}

function validateBirthDateField(field) {
    const birthDate = field.value;

    if (!birthDate) {
        clearFieldError(field);
        return null;
    }

    const selectedDate = new Date(birthDate);
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 80, today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());

    if (selectedDate > today) {
        showFieldError(field, 'Birth date cannot be in the future.');
        return { field: field.name, message: 'Birth date in future.' };
    }

    if (selectedDate < minDate) {
        showFieldError(field, 'Birth date seems too far in the past.');
        return { field: field.name, message: 'Birth date too old.' };
    }

    if (selectedDate > maxDate) {
        showFieldError(field, 'Student must be at least 16 years old.');
        return { field: field.name, message: 'Student too young.' };
    }

    clearFieldError(field);
    updateAgeDisplay(field, selectedDate);
    return null;
}

function validateGPAField(field) {
    const gpa = field.value.trim();

    if (!gpa) {
        clearFieldError(field);
        return null;
    }

    const gpaValue = parseFloat(gpa);

    if (isNaN(gpaValue)) {
        showFieldError(field, 'GPA must be a valid number.');
        return { field: field.name, message: 'Invalid GPA format.' };
    }

    if (gpaValue < 0) {
        showFieldError(field, 'GPA cannot be negative.');
        return { field: field.name, message: 'GPA cannot be negative.' };
    }

    if (gpaValue > 4.0) {
        showFieldError(field, 'GPA cannot exceed 4.0.');
        return { field: field.name, message: 'GPA too high.' };
    }

    if (gpa.includes('.') && gpa.split('.')[1].length > 2) {
        showFieldError(field, 'GPA can have at most 2 decimal places.');
        return { field: field.name, message: 'Too many decimal places.' };
    }

    clearFieldError(field);
    updateGPAIndicator(field, gpaValue);
    return null;
}

function validateLevelField(field) {
    const level = field.value.trim();

    if (!level) {
        clearFieldError(field);
        return null;
    }

    const levelValue = parseInt(level);

    if (isNaN(levelValue)) {
        showFieldError(field, 'Level must be a valid number.');
        return { field: field.name, message: 'Invalid level format.' };
    }

    if (levelValue < 1 || levelValue > 8) {
        showFieldError(field, 'Level must be between 1 and 8.');
        return { field: field.name, message: 'Level out of range.' };
    }

    clearFieldError(field);
    return null;
}

function validateIdField(field) {
    const id = field.value.trim();
    const fieldLabel = getFieldLabel(field);

    if (!id && field.required) {
        showFieldError(field, `${fieldLabel} is required.`);
        return { field: field.name, message: `${fieldLabel} is required.` };
    }

    if (id) {
        const idValue = parseInt(id);

        if (isNaN(idValue)) {
            showFieldError(field, `${fieldLabel} must be a valid number.`);
            return { field: field.name, message: `Invalid ${fieldLabel} format.` };
        }

        if (idValue <= 0) {
            showFieldError(field, `${fieldLabel} must be greater than 0.`);
            return { field: field.name, message: `${fieldLabel} must be positive.` };
        }

        if (idValue > 999999) {
            showFieldError(field, `${fieldLabel} is too large.`);
            return { field: field.name, message: `${fieldLabel} too large.` };
        }
    }

    clearFieldError(field);
    return null;
}

function performCrossValidations(form) {
    const errors = [];

    const gpaField = form.querySelector('#Student_GPA');
    const levelField = form.querySelector('#Student_Level');

    if (gpaField.value && levelField.value) {
        const gpa = parseFloat(gpaField.value);
        const level = parseInt(levelField.value);

        const expectedGPA = {
            1: { min: 0.0, max: 4.0 },
            2: { min: 1.5, max: 4.0 },
            3: { min: 2.0, max: 4.0 },
            4: { min: 2.0, max: 4.0 },
            5: { min: 2.5, max: 4.0 },
            6: { min: 2.5, max: 4.0 },
            7: { min: 3.0, max: 4.0 },
            8: { min: 3.0, max: 4.0 }
        };

        if (expectedGPA[level] && gpa < expectedGPA[level].min) {
            showFieldError(gpaField, `GPA seems low for level ${level}. Expected minimum: ${expectedGPA[level].min}`);
            errors.push({ field: 'Student_GPA', message: 'GPA/Level mismatch' });
        }
    }

    const birthDateField = form.querySelector('#Student_BirthDate');
    if (birthDateField.value && levelField.value) {
        const birthDate = new Date(birthDateField.value);
        const age = Math.floor((Date.now() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
        const level = parseInt(levelField.value);

        const expectedAge = 16 + level;
        if (age < expectedAge - 3 || age > expectedAge + 8) {
            showFieldError(birthDateField, `Age (${age}) seems unusual for level ${level}.`);
            errors.push({ field: 'Student_BirthDate', message: 'Age/Level mismatch' });
        }
    }

    return errors;
}

function initializeGPAFormatting(form) {
    const gpaField = form.querySelector('#Student_GPA');
    if (gpaField) {
        gpaField.addEventListener('input', function () {
            this.addEventListener('blur', function () {
                if (this.value && !isNaN(parseFloat(this.value))) {
                    this.value = parseFloat(this.value).toFixed(2);
                }
            });
        });
    }
}

function addFormResetValidation(form) {
    const resetButton = document.createElement('button');
    resetButton.type = 'button';
    resetButton.className = 'btn btn-secondary me-2';
    resetButton.textContent = 'Reset Form';
    resetButton.addEventListener('click', function () {
        resetFormWithConfirmation(form);
    });

    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.parentNode.insertBefore(resetButton, submitButton);
    }
}

function resetFormWithConfirmation(form) {
    if (confirm('Are you sure you want to reset the form? All entered data will be lost.')) {
        form.reset();
        clearAllErrors(form);
        removeAllHelpers(form);
        showNotification('Form has been reset.', 'info');
    }
}

function addCharacterCounter(field) {
    const maxLength = field.name.includes('Name') ? 50 : 200;

    const counter = document.createElement('small');
    counter.className = 'form-text text-muted character-counter';
    counter.textContent = `0/${maxLength} characters`;

    field.parentNode.appendChild(counter);

    field.addEventListener('input', function () {
        const currentLength = this.value.length;
        counter.textContent = `${currentLength}/${maxLength} characters`;

        if (currentLength > maxLength * 0.8) {
            counter.className = 'form-text text-warning character-counter';
        } else {
            counter.className = 'form-text text-muted character-counter';
        }
    });
}

function addGPAIndicator(field) {
    const indicator = document.createElement('div');
    indicator.className = 'gpa-indicator mt-1';
    indicator.innerHTML = '<small class="text-muted">GPA Status: <span class="gpa-status">-</span></small>';

    field.parentNode.appendChild(indicator);
}

function updateGPAIndicator(field, gpaValue) {
    const indicator = field.parentNode.querySelector('.gpa-status');
    if (indicator) {
        let status = '';
        let className = '';

        if (gpaValue >= 3.7) {
            status = 'Excellent';
            className = 'text-success';
        } else if (gpaValue >= 3.3) {
            status = 'Very Good';
            className = 'text-info';
        } else if (gpaValue >= 3.0) {
            status = 'Good';
            className = 'text-primary';
        } else if (gpaValue >= 2.5) {
            status = 'Satisfactory';
            className = 'text-warning';
        } else if (gpaValue >= 2.0) {
            status = 'Needs Improvement';
            className = 'text-warning';
        } else {
            status = 'Poor';
            className = 'text-danger';
        }

        indicator.textContent = status;
        indicator.className = `gpa-status ${className}`;
    }
}

function addAgeCalculator(field) {
    const ageDisplay = document.createElement('small');
    ageDisplay.className = 'form-text text-muted age-display';
    ageDisplay.textContent = 'Age: -';

    field.parentNode.appendChild(ageDisplay);
}

function updateAgeDisplay(field, birthDate) {
    const ageDisplay = field.parentNode.querySelector('.age-display');
    if (ageDisplay) {
        const age = Math.floor((Date.now() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
        ageDisplay.textContent = `Age: ${age} years`;
    }
}

function submitStudentForm(form) {
    const formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
        .then(response => response.json())
        .then(data => {
            hideLoadingState(form);

            if (data.success) {
                showNotification('Student added successfully!', 'success');
                setTimeout(() => {
                    window.location.href = data.redirectUrl || '/Student';
                }, 2000);
            } else {
                showNotification(data.message || 'An error occurred while adding the student.', 'error');
                if (data.errors) {
                    displayValidationErrors(form, data.errors);
                }
            }
        })
        .catch(error => {
            hideLoadingState(form);
            showNotification('An unexpected error occurred. Please try again.', 'error');
            console.error('Form submission error:', error);
        });
}
function showFieldError(field, message) {
    clearFieldError(field);

    field.classList.add('is-invalid');

    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    errorDiv.id = `${field.name}-error`;

    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.classList.remove('is-invalid');

    const existingError = document.getElementById(`${field.name}-error`);
    if (existingError) {
        existingError.remove();
    }
}

function clearAllErrors(form) {
    const errorFields = form.querySelectorAll('.is-invalid');
    errorFields.forEach(field => {
        clearFieldError(field);
    });
}

function removeAllHelpers(form) {
    const helpers = form.querySelectorAll('.character-counter, .gpa-indicator, .age-display');
    helpers.forEach(helper => {
        const status = helper.querySelector('.gpa-status');
        if (status) {
            status.textContent = '-';
            status.className = 'gpa-status text-muted';
        } else if (helper.classList.contains('character-counter')) {
            const maxLength = helper.textContent.includes('50') ? 50 : 200;
            helper.textContent = `0/${maxLength} characters`;
            helper.className = 'form-text text-muted character-counter';
        } else if (helper.classList.contains('age-display')) {
            helper.textContent = 'Age: -';
        }
    });
}

function displayValidationErrors(form, errors) {
    errors.forEach(error => {
        const field = form.querySelector(`[name="${error.field}"]`);
        if (field) {
            showFieldError(field, error.message);
        }
    });
}

function focusFirstErrorField(form) {
    const firstErrorField = form.querySelector('.is-invalid');
    if (firstErrorField) {
        firstErrorField.focus();
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function getFieldLabel(field) {
    const label = document.querySelector(`label[for="${field.id}"]`);
    return label ? label.textContent.trim() : field.name.replace('Student_', '');
}

function showLoadingState(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Adding Student...';
    }
}

function hideLoadingState(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Add Student';
    }
}

function showNotification(message, type = 'info') {
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.className = 'alert alert-dismissible fade show position-fixed';
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 1050; min-width: 300px;';
        document.body.appendChild(notification);
    }

    const alertClass = {
        'success': 'alert-success',
        'error': 'alert-danger',
        'warning': 'alert-warning',
        'info': 'alert-info'
    }[type] || 'alert-info';

    notification.className = `alert ${alertClass} alert-dismissible fade show position-fixed`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}