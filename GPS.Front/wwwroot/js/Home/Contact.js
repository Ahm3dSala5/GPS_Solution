const validationRules = {
    name: {
        minLength: 2,
        maxLength: 50,
        allowedChars: /^[a-zA-Z\s'-]+$/,
        required: true
    },
    email: {
        required: true,
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        maxLength: 100
    },
    phone: {
        required: false,
        minLength: 10,
        maxLength: 15,
        pattern: /^\d+$/
    },
    message: {
        minLength: 10,
        maxLength: 1000,
        required: true
    }
};

const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const messageInput = document.getElementById('message');

function createValidationMessage(inputId, messageId) {
    const input = document.getElementById(inputId);
    const existingMessage = document.getElementById(messageId);

    if (!existingMessage) {
        const messageDiv = document.createElement('div');
        messageDiv.id = messageId;
        messageDiv.style.cssText = 'margin-top: 5px; font-size: 12px; min-height: 16px; line-height: 1.3;';
        input.parentNode.insertBefore(messageDiv, input.nextSibling);
    }
}

createValidationMessage('name', 'nameMessage');
createValidationMessage('email', 'emailMessage');
createValidationMessage('phone', 'phoneMessage');
createValidationMessage('message', 'messageMessage');

function displayValidationMessage(messageId, errors, isValid, showSuccess = true) {
    const messageDiv = document.getElementById(messageId);

    if (errors.length === 0 && isValid && showSuccess) {
        messageDiv.innerHTML = '<span style="color: #28a745;">✓ Valid</span>';
    } else if (errors.length > 0) {
        messageDiv.innerHTML = errors.map(error =>
            `<span style="color: #dc3545;">✗ ${error}</span>`
        ).join('<br>');
    } else {
        messageDiv.innerHTML = '';
    }
}

function updateInputBorder(input, isValid, isEmpty = false) {
    if (isEmpty) {
        input.style.borderColor = '#ccc';
        input.style.boxShadow = 'none';
    } else if (isValid) {
        input.style.borderColor = '#28a745';
        input.style.boxShadow = '0 0 0 0.2rem rgba(40, 167, 69, 0.15)';
    } else {
        input.style.borderColor = '#dc3545';
        input.style.boxShadow = '0 0 0 0.2rem rgba(220, 53, 69, 0.15)';
    }
}

function validateName() {
    const name = nameInput.value.trim();
    const errors = [];

    if (name.length === 0) {
        if (validationRules.name.required) {
            errors.push('Name is required');
        }
        displayValidationMessage('nameMessage', errors, false, false);
        updateInputBorder(nameInput, false, !validationRules.name.required);
        return !validationRules.name.required;
    }

    if (name.length < validationRules.name.minLength) {
        errors.push(`Name must be at least ${validationRules.name.minLength} characters long`);
    }

    if (name.length > validationRules.name.maxLength) {
        errors.push(`Name must be no more than ${validationRules.name.maxLength} characters long`);
    }

    if (!validationRules.name.allowedChars.test(name)) {
        errors.push('Name can only contain letters, spaces, hyphens, and apostrophes');
    }

    if (/\s{2,}/.test(name)) {
        errors.push('Name cannot contain multiple consecutive spaces');
    }

    if (name.replace(/\s/g, '').length < 2) {
        errors.push('Name must contain at least 2 letters');
    }

    const isValid = errors.length === 0;
    displayValidationMessage('nameMessage', errors, isValid);
    updateInputBorder(nameInput, isValid);

    return isValid;
}

function validateEmail() {
    const email = emailInput.value.trim();
    const errors = [];

    if (email.length === 0) {
        if (validationRules.email.required) {
            errors.push('Email is required');
        }
        displayValidationMessage('emailMessage', errors, false, false);
        updateInputBorder(emailInput, false, !validationRules.email.required);
        return !validationRules.email.required;
    }

    if (email.length > validationRules.email.maxLength) {
        errors.push(`Email must be no more than ${validationRules.email.maxLength} characters long`);
    }

    if (!validationRules.email.pattern.test(email)) {
        errors.push('Please enter a valid email address');
    }

    if (email.includes('..')) {
        errors.push('Email cannot contain consecutive dots');
    }

    if (email.startsWith('.') || email.endsWith('.')) {
        errors.push('Email cannot start or end with a dot');
    }

    const isValid = errors.length === 0;
    displayValidationMessage('emailMessage', errors, isValid);
    updateInputBorder(emailInput, isValid);

    return isValid;
}

function validatePhone() {
    const phone = phoneInput.value.trim();
    const errors = [];

    if (phone.length === 0) {
        if (validationRules.phone.required) {
            errors.push('Phone number is required');
        }
        displayValidationMessage('phoneMessage', errors, false, false);
        updateInputBorder(phoneInput, false, !validationRules.phone.required);
        return !validationRules.phone.required;
    }

    const numericPhone = phone.replace(/\D/g, '');

    if (numericPhone.length < validationRules.phone.minLength) {
        errors.push(`Phone number must be at least ${validationRules.phone.minLength} digits`);
    }

    if (numericPhone.length > validationRules.phone.maxLength) {
        errors.push(`Phone number must be no more than ${validationRules.phone.maxLength} digits`);
    }

    if (!validationRules.phone.pattern.test(phone)) {
        errors.push('Phone number can only contain digits, spaces, hyphens, parentheses, and plus signs');
    }

    const isValid = errors.length === 0;
    displayValidationMessage('phoneMessage', errors, isValid);
    updateInputBorder(phoneInput, isValid);

    return isValid;
}

function validateMessage() {
    const message = messageInput.value.trim();
    const errors = [];

    if (message.length === 0) {
        if (validationRules.message.required) {
            errors.push('Message is required');
        }
        displayValidationMessage('messageMessage', errors, false, false);
        updateInputBorder(messageInput, false, !validationRules.message.required);
        return !validationRules.message.required;
    }

    if (message.length < validationRules.message.minLength) {
        errors.push(`Message must be at least ${validationRules.message.minLength} characters long`);
    }

    if (message.length > validationRules.message.maxLength) {
        errors.push(`Message must be no more than ${validationRules.message.maxLength} characters long`);
    }

    const isValid = errors.length === 0;
    displayValidationMessage('messageMessage', errors, isValid);
    updateInputBorder(messageInput, isValid);

    return isValid;
}

nameInput.addEventListener('input', function () {
    let value = this.value;

    value = value.replace(/[^a-zA-Z\s'-]/g, '');

    value = value.replace(/\s+/g, ' ');

    value = value.replace(/\b\w/g, char => char.toUpperCase());

    if (value !== this.value) {
        const cursorPos = this.selectionStart;
        this.value = value;
        this.setSelectionRange(cursorPos, cursorPos);
    }

    validateName();
});

emailInput.addEventListener('input', function () {
    let value = this.value.toLowerCase().replace(/\s/g, '');

    if (value !== this.value) {
        const cursorPos = this.selectionStart;
        this.value = value;
        this.setSelectionRange(cursorPos, cursorPos);
    }

    validateEmail();
});

phoneInput.addEventListener('input', function () {
   
    if (value !== this.value) {
        const cursorPos = this.selectionStart;
        this.value = value;
        this.setSelectionRange(cursorPos, cursorPos);
    }

    validatePhone();
});

messageInput.addEventListener('input', function () {
    validateMessage();

    updateCharacterCount();
});

function updateCharacterCount() {
    const messageLength = messageInput.value.length;
    const maxLength = validationRules.message.maxLength;

    let countDisplay = document.getElementById('messageCount');
    if (!countDisplay) {
        countDisplay = document.createElement('div');
        countDisplay.id = 'messageCount';
        countDisplay.style.cssText = 'font-size: 11px; color: #666; margin-top: 5px; text-align: right;';
        messageInput.parentNode.appendChild(countDisplay);
    }

    countDisplay.textContent = `${messageLength}/${maxLength} characters`;

    if (messageLength > maxLength * 0.9) {
        countDisplay.style.color = '#dc3545';
    } else if (messageLength > maxLength * 0.8) {
        countDisplay.style.color = '#ffc107';
    } else {
        countDisplay.style.color = '#666';
    }
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isMessageValid = validateMessage();

    const isFormValid = isNameValid && isEmailValid && isPhoneValid && isMessageValid;

    if (!isFormValid) {
        const errors = [];
        if (!isNameValid) errors.push('Please enter a valid name');
        if (!isEmailValid) errors.push('Please enter a valid email address');
        if (!isPhoneValid) errors.push('Please enter a valid phone number');
        if (!isMessageValid) errors.push('Please enter a valid message');

        alert('Please fix the following errors:\n• ' + errors.join('\n• '));

        if (!isNameValid) {
            nameInput.focus();
        } else if (!isEmailValid) {
            emailInput.focus();
        } else if (!isPhoneValid) {
            phoneInput.focus();
        } else if (!isMessageValid) {
            messageInput.focus();
        }

        return false;
    }

    showSubmissionSuccess();
});

nameInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        emailInput.focus();
    }
});

emailInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        phoneInput.focus();
    }
});

phoneInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        messageInput.focus();
    }
});

messageInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && e.ctrlKey) {
        e.preventDefault();
        form.dispatchEvent(new Event('submit'));
    }
});

document.addEventListener('DOMContentLoaded', function () {
    ['nameMessage', 'emailMessage', 'phoneMessage', 'messageMessage'].forEach(id => {
        const messageDiv = document.getElementById(id);
        if (messageDiv) {
            messageDiv.innerHTML = '';
        }
    });

    updateCharacterCount();

    nameInput.focus();

    const shortcutHint = document.createElement('div');
    shortcutHint.style.cssText = 'font-size: 11px; color: #666; margin-top: 10px; text-align: center;';
    shortcutHint.textContent = 'Press Ctrl+Enter in message field to submit quickly';
    form.appendChild(shortcutHint);
});