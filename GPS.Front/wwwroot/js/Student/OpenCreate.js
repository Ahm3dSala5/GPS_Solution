
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const isFirstNameValid = validateName('Student_FName', 'First name');
        const isLastNameValid = validateName('Student_LName', 'Last name');
        const isAddressValid = validateAddress();
        const isBirthDateValid = validateBirthDate();
        const isGPAValid = validateGPA();
        const isLevelValid = validateLevel();
        const isDeptValid = validateDepartment();
        const isSupervisorValid = validateSupervisor();

        if (isFirstNameValid && isLastNameValid && isAddressValid &&
            isBirthDateValid && isGPAValid && isLevelValid &&
            isDeptValid && isSupervisorValid) {
            form.submit();
        }
    });

    // Validation functions
    function validateName(id, fieldName) {
        const input = document.getElementById(id);
        const value = input.value.trim();
        const errorSpan = input.nextElementSibling;

        if (!value) {
            showError(input, errorSpan, `${fieldName} is required`);
            return false;
        }

        if (value.length > 50) {
            showError(input, errorSpan, `${fieldName} cannot exceed 50 characters`);
            return false;
        }

        if (!/^[a-zA-Z\s\-']+$/.test(value)) {
            showError(input, errorSpan, `${fieldName} contains invalid characters`);
            return false;
        }

        clearError(input, errorSpan);
        return true;
    }

    function validateAddress() {
        const input = document.getElementById('Student_Address');
        const value = input.value.trim();
        const errorSpan = input.nextElementSibling;

        if (value && value.length > 200) {
            showError(input, errorSpan, 'Address cannot exceed 200 characters');
            return false;
        }

        clearError(input, errorSpan);
        return true;
    }

    function validateBirthDate() {
        const input = document.getElementById('Student_BirthDate');
        const value = input.value;
        const errorSpan = input.nextElementSibling;

        if (value) {
            const birthDate = new Date(value);
            const minDate = new Date();
            minDate.setFullYear(minDate.getFullYear() - 100); // 100 years ago
            const maxDate = new Date();
            maxDate.setFullYear(maxDate.getFullYear() - 16); // At least 16 years old

            if (birthDate < minDate) {
                showError(input, errorSpan, 'Birth date seems too old');
                return false;
            }

            if (birthDate > maxDate) {
                showError(input, errorSpan, 'Student must be at least 16 years old');
                return false;
            }
        }

        clearError(input, errorSpan);
        return true;
    }

    function validateGPA() {
        const input = document.getElementById('Student_GPA');
        const value = input.value;
        const errorSpan = input.nextElementSibling;

        if (value) {
            const gpa = parseFloat(value);
            if (isNaN(gpa) || gpa < 0 || gpa > 4) {
                showError(input, errorSpan, 'GPA must be between 0 and 4');
                return false;
            }
        }

        clearError(input, errorSpan);
        return true;
    }

    function validateLevel() {
        const input = document.getElementById('Student_Level');
        const value = input.value;
        const errorSpan = input.nextElementSibling;

        if (value) {
            const level = parseInt(value);
            if (isNaN(level) || level < 1 || level > 5) {
                showError(input, errorSpan, 'Level must be between 1 and 5');
                return false;
            }
        }

        clearError(input, errorSpan);
        return true;
    }

    function validateDepartment() {
        const input = document.getElementById('Student_DepartmentId');
        const value = input.value.trim();
        const errorSpan = input.nextElementSibling;

        if (!value) {
            showError(input, errorSpan, 'Department ID is required');
            return false;
        }

        if (isNaN(value) || parseInt(value) <= 0) {
            showError(input, errorSpan, 'Department ID must be a positive number');
            return false;
        }

        clearError(input, errorSpan);
        return true;
    }

    function validateSupervisor() {
        const input = document.getElementById('Student_SupervisorId');
        const value = input.value.trim();
        const errorSpan = input.nextElementSibling;

        if (!value) {
            showError(input, errorSpan, 'Supervisor ID is required');
            return false;
        }

        if (isNaN(value) || parseInt(value) <= 0) {
            showError(input, errorSpan, 'Supervisor ID must be a positive number');
            return false;
        }

        clearError(input, errorSpan);
        return true;
    }

    // Helper functions
    function showError(input, errorSpan, message) {
        input.classList.add('is-invalid');
        if (errorSpan && errorSpan.classList.contains('text-danger')) {
            errorSpan.textContent = message;
        }
    }

    function clearError(input, errorSpan) {
        input.classList.remove('is-invalid');
        if (errorSpan && errorSpan.classList.contains('text-danger')) {
            errorSpan.textContent = '';
        }
    }
});