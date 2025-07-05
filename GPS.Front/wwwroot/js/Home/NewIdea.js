
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const nameInput = document.querySelector('#Name');
    const descriptionInput = document.querySelector('#Description');
    const collegeSelect = document.querySelector('#CollegeId');
    const departmentSelect = document.querySelector('#DepartmentId');
    const supervisorSelect = document.querySelector('#SupervisorId');
    const fileInput = document.querySelector('#projectFile');

    // Validation rules
    const validationRules = {
        name: {
            minLength: 5,
            maxLength: 100,
            required: true,
            pattern: /^[a-zA-Z0-9\s\-_.,()]+$/
        },
        description: {
            minLength: 20,
            maxLength: 500,
            required: true
        },
        college: {
            required: true
        },
        department: {
            required: true
        },
        supervisor: {
            required: true
        },
        file: {
            required: true,
            maxSize: 50 * 1024 * 1024, // 50MB
            allowedTypes: ['.pdf', '.doc', '.docx', '.zip', '.rar']
        }
    };

    nameInput.addEventListener('input', validateName);
    descriptionInput.addEventListener('input', validateDescription);
    collegeSelect.addEventListener('change', validateCollege);
    departmentSelect.addEventListener('change', validateDepartment);
    supervisorSelect.addEventListener('change', validateSupervisor);
    fileInput.addEventListener('change', validateFile);

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const isNameValid = validateName();
        const isDescriptionValid = validateDescription();
        const isCollegeValid = validateCollege();
        const isDepartmentValid = validateDepartment();
        const isSupervisorValid = validateSupervisor();
        const isFileValid = validateFile();

        if (isNameValid && isDescriptionValid && isCollegeValid &&
            isDepartmentValid && isSupervisorValid && isFileValid) {
            form.submit();
        } else {
            showValidationSummary();
        }
    });

    function validateName() {
        const value = nameInput.value.trim();
        const errors = [];

        if (!value && validationRules.name.required) {
            errors.push('Project name is required');
        } else if (value.length < validationRules.name.minLength) {
            errors.push(`Name must be at least ${validationRules.name.minLength} characters`);
        } else if (value.length > validationRules.name.maxLength) {
            errors.push(`Name must be less than ${validationRules.name.maxLength} characters`);
        } else if (!validationRules.name.pattern.test(value)) {
            errors.push('Invalid characters in project name');
        }

        showErrors(nameInput, errors);
        return errors.length === 0;
    }

    function validateDescription() {
        const value = descriptionInput.value.trim();
        const errors = [];

        if (!value && validationRules.description.required) {
            errors.push('Description is required');
        } else if (value.length < validationRules.description.minLength) {
            errors.push(`Description must be at least ${validationRules.description.minLength} characters`);
        } else if (value.length > validationRules.description.maxLength) {
            errors.push(`Description must be less than ${validationRules.description.maxLength} characters`);
        }

        showErrors(descriptionInput, errors);
        return errors.length === 0;
    }

    function validateCollege() {
        const value = collegeSelect.value;
        const errors = [];

        if (!value && validationRules.college.required) {
            errors.push('College selection is required');
        }

        showErrors(collegeSelect, errors);
        return errors.length === 0;
    }

    function validateDepartment() {
        const value = departmentSelect.value;
        const errors = [];

        if (!value && validationRules.department.required) {
            errors.push('Department selection is required');
        }

        showErrors(departmentSelect, errors);
        return errors.length === 0;
    }

    function validateSupervisor() {
        const value = supervisorSelect.value;
        const errors = [];

        if (!value && validationRules.supervisor.required) {
            errors.push('Supervisor selection is required');
        }

        showErrors(supervisorSelect, errors);
        return errors.length === 0;
    }

    function validateFile() {
        const file = fileInput.files[0];
        const errors = [];

        if (!file && validationRules.file.required) {
            errors.push('Project file is required');
        } else if (file) {
            if (file.size > validationRules.file.maxSize) {
                const maxMB = validationRules.file.maxSize / (1024 * 1024);
                errors.push(`File size must be less than ${maxMB}MB`);
            }

            const fileExt = file.name.split('.').pop().toLowerCase();
            const allowedExts = validationRules.file.allowedTypes.map(ext => ext.replace('.', ''));
            if (!allowedExts.includes(fileExt)) {
                errors.push(`Allowed file types: ${validationRules.file.allowedTypes.join(', ')}`);
            }
        }

        showErrors(fileInput, errors);
        return errors.length === 0;
    }

    function showErrors(inputElement, errors) {
        const errorSpan = inputElement.nextElementSibling;

        if (errors.length > 0) {
            inputElement.classList.add('is-invalid');
            errorSpan.textContent = errors[0]; 
        } else {
            inputElement.classList.remove('is-invalid');
            errorSpan.textContent = '';
        }
    }

    function showValidationSummary() {
        const firstInvalid = form.querySelector('.is-invalid');
        if (firstInvalid) {
            firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstInvalid.focus();
        }
    }
});