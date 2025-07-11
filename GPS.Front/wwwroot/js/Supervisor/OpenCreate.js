document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        if (!validateForm()) {
            event.preventDefault();
        }
    });

    function validateForm() {
        let isValid = true;

        document.querySelectorAll('.text-danger').forEach(el => el.textContent = '');
        document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

        const firstName = document.getElementById('FirstName');
        if (!firstName.value.trim()) {
            showError(firstName, 'First name is required');
            isValid = false;
        } else if (firstName.value.trim().length > 50) {
            showError(firstName, 'First name cannot exceed 50 characters');
            isValid = false;
        }

        const lastName = document.getElementById('LastName');
        if (!lastName.value.trim()) {
            showError(lastName, 'Last name is required');
            isValid = false;
        } else if (lastName.value.trim().length > 50) {
            showError(lastName, 'Last name cannot exceed 50 characters');
            isValid = false;
        }

        const position = document.getElementById('Position');
        if (!position.value.trim()) {
            showError(position, 'Position is required');
            isValid = false;
        } else if (position.value.trim().length > 100) {
            showError(position, 'Position cannot exceed 100 characters');
            isValid = false;
        }

        const address = document.getElementById('Address');
        if (address.value.trim().length > 200) {
            showError(address, 'Address cannot exceed 200 characters');
            isValid = false;
        }
        const birthDate = document.getElementById('BirthDate');
        if (birthDate.value) {
            const inputDate = new Date(birthDate.value);
            const currentDate = new Date();

            if (inputDate > currentDate) {
                showError(birthDate, 'Birth date cannot be in the future');
                isValid = false;
            }
            const minAgeDate = new Date();
            minAgeDate.setFullYear(minAgeDate.getFullYear() - 18);

            if (inputDate > minAgeDate) {
                showError(birthDate, 'Supervisor must be at least 18 years old');
                isValid = false;
            }
        }

        const departmentId = document.getElementById('DepartmentId');
        if (!departmentId.value.trim()) {
            showError(departmentId, 'Department ID is required');
            isValid = false;
        } else if (isNaN(departmentId.value) || parseInt(departmentId.value) <= 0) {
            showError(departmentId, 'Department ID must be a positive number');
            isValid = false;
        }

        return isValid;
    }

    function showError(inputElement, message) {
        inputElement.classList.add('is-invalid');
        const errorElement = inputElement.nextElementSibling;
        if (errorElement && errorElement.classList.contains('text-danger')) {
            errorElement.textContent = message;
        } else {
            const errorSpan = document.createElement('span');
            errorSpan.className = 'text-danger';
            errorSpan.textContent = message;
            inputElement.parentNode.appendChild(errorSpan);
        }
    }
});