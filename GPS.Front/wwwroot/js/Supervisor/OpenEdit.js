document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        if (!validateForm()) {
            event.preventDefault();
        }
    });

    document.getElementById('supFirstName').addEventListener('input', validateFirstName);
    document.getElementById('supLastName').addEventListener('input', validateLastName);
    document.getElementById('supPosition').addEventListener('input', validatePosition);
    document.getElementById('supAddress').addEventListener('input', validateAddress);
    document.getElementById('supBirthDate').addEventListener('change', validateBirthDate);
    document.getElementById('supDepartmentId').addEventListener('input', validateDepartmentId);

    function validateForm() {
        let isValid = true;
        isValid = validateFirstName() && isValid;
        isValid = validateLastName() && isValid;
        isValid = validatePosition() && isValid;
        isValid = validateAddress() && isValid;
        isValid = validateBirthDate() && isValid;
        isValid = validateDepartmentId() && isValid;

        return isValid;
    }

    function validateFirstName() {
        const firstName = document.getElementById('supFirstName');
        const value = firstName.value.trim();

        clearError(firstName);

        if (!value) {
            showError(firstName, 'First name is required');
            return false;
        }

        if (value.length > 50) {
            showError(firstName, 'First name cannot exceed 50 characters');
            return false;
        }

        return true;
    }

    function validateLastName() {
        const lastName = document.getElementById('supLastName');
        const value = lastName.value.trim();

        clearError(lastName);

        if (!value) {
            showError(lastName, 'Last name is required');
            return false;
        }

        if (value.length > 50) {
            showError(lastName, 'Last name cannot exceed 50 characters');
            return false;
        }

        return true;
    }

    function validatePosition() {
        const position = document.getElementById('supPosition');
        const value = position.value.trim();

        clearError(position);

        if (!value) {
            showError(position, 'Position is required');
            return false;
        }

        if (value.length > 100) {
            showError(position, 'Position cannot exceed 100 characters');
            return false;
        }

        return true;
    }

    function validateAddress() {
        const address = document.getElementById('supAddress');
        const value = address.value.trim();

        clearError(address);

        if (value.length > 200) {
            showError(address, 'Address cannot exceed 200 characters');
            return false;
        }

        return true;
    }

    function validateBirthDate() {
        const birthDate = document.getElementById('supBirthDate');
        const value = birthDate.value;

        clearError(birthDate);

        if (value) {
            const inputDate = new Date(value);
            const currentDate = new Date();

            if (inputDate > currentDate) {
                showError(birthDate, 'Birth date cannot be in the future');
                return false;
            }

            const minAgeDate = new Date();
            minAgeDate.setFullYear(minAgeDate.getFullYear() - 18);

            if (inputDate > minAgeDate) {
                showError(birthDate, 'Supervisor must be at least 18 years old');
                return false;
            }
        }

        return true;
    }

    function validateDepartmentId() {
        const departmentId = document.getElementById('supDepartmentId');
        const value = departmentId.value.trim();

        clearError(departmentId);

        if (!value) {
            showError(departmentId, 'Department ID is required');
            return false;
        }

        if (isNaN(value) || parseInt(value) <= 0) {
            showError(departmentId, 'Department ID must be a positive number');
            return false;
        }

        return true;
    }

    function showError(inputElement, message) {
        inputElement.classList.add('is-invalid');
        let errorElement = inputElement.nextElementSibling;

        if (!errorElement || !errorElement.classList.contains('invalid-feedback')) {
            errorElement = document.createElement('div');
            errorElement.className = 'invalid-feedback';
            inputElement.parentNode.appendChild(errorElement);
        }

        errorElement.textContent = message;
    }

    function clearError(inputElement) {
        inputElement.classList.remove('is-invalid');

        const errorElement = inputElement.nextElementSibling;
        if (errorElement && errorElement.classList.contains('invalid-feedback')) {
            errorElement.textContent = '';
        }
    }
});