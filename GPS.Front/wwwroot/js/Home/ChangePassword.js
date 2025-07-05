const passwordRequirements = {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true
};

const oldPasswordInput = document.getElementById('OldPassword');
const newPasswordInput = document.getElementById('NewPassword');
const form = document.querySelector('form');

function createValidationMessage(inputId, messageId) {
    const input = document.getElementById(inputId);
    const existingMessage = document.getElementById(messageId);

    if (!existingMessage) {
        const messageDiv = document.createElement('div');
        messageDiv.id = messageId;
        messageDiv.style.cssText = 'margin-top: 5px; font-size: 12px; min-height: 16px;';
        input.parentNode.insertBefore(messageDiv, input.nextSibling);
    }
}

createValidationMessage('OldPassword', 'oldPasswordMessage');
createValidationMessage('NewPassword', 'newPasswordMessage');

function validatePassword(password) {
    const errors = [];

    if (password.length < passwordRequirements.minLength) {
        errors.push(`Password must be at least ${passwordRequirements.minLength} characters long`);
    }

    if (passwordRequirements.requireUppercase && !/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }

    if (passwordRequirements.requireLowercase && !/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }

    if (passwordRequirements.requireNumbers && !/\d/.test(password)) {
        errors.push('Password must contain at least one number');
    }

    if (passwordRequirements.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push('Password must contain at least one special character');
    }

    return errors;
}

function validatePasswordsMatch(oldPassword, newPassword) {
    if (oldPassword === newPassword) {
        return ['New password must be different from old password'];
    }
    return [];
}

function displayValidationMessage(messageId, errors, isValid) {
    const messageDiv = document.getElementById(messageId);

    if (errors.length === 0 && isValid) {
        messageDiv.innerHTML = '<span style="color: #28a745;">✓ Valid</span>';
    } else if (errors.length > 0) {
        messageDiv.innerHTML = errors.map(error =>
            `<span style="color: #dc3545;">✗ ${error}</span>`
        ).join('<br>');
    } else {
        messageDiv.innerHTML = '';
    }
}

function validateOldPassword() {
    const password = oldPasswordInput.value;
    const errors = [];

    if (password.length === 0) {
        displayValidationMessage('oldPasswordMessage', [], false);
        return false;
    }

    if (password.length < passwordRequirements.minLength) {
        errors.push('Password is too short');
    }

    displayValidationMessage('oldPasswordMessage', errors, errors.length === 0);
    return errors.length === 0;
}

function validateNewPassword() {
    const newPassword = newPasswordInput.value;
    const oldPassword = oldPasswordInput.value;

    if (newPassword.length === 0) {
        displayValidationMessage('newPasswordMessage', [], false);
        return false;
    }

    const passwordErrors = validatePassword(newPassword);
    const matchErrors = oldPassword ? validatePasswordsMatch(oldPassword, newPassword) : [];
    const allErrors = [...passwordErrors, ...matchErrors];

    displayValidationMessage('newPasswordMessage', allErrors, allErrors.length === 0);
    return allErrors.length === 0;
}

oldPasswordInput.addEventListener('input', function () {
    validateOldPassword();
    if (newPasswordInput.value) {
        validateNewPassword();
    }
});

newPasswordInput.addEventListener('input', validateNewPassword);

form.addEventListener('submit', function (e) {
    const isOldPasswordValid = validateOldPassword();
    const isNewPasswordValid = validateNewPassword();

    if (!isOldPasswordValid || !isNewPasswordValid) {
        e.preventDefault();

        const errors = [];
        if (!isOldPasswordValid) errors.push('Please enter a valid old password');
        if (!isNewPasswordValid) errors.push('Please enter a valid new password');

        alert('Please fix the following errors:\n• ' + errors.join('\n• '));

        if (!isOldPasswordValid) {
            oldPasswordInput.focus();
        } else if (!isNewPasswordValid) {
            newPasswordInput.focus();
        }
    }
});

function getPasswordStrength(password) {
    let strength = 0;
    const checks = [
        password.length >= 8,
        /[A-Z]/.test(password),
        /[a-z]/.test(password),
        /\d/.test(password),
        /[!@#$%^&*(),.?":{}|<>]/.test(password),
        password.length >= 12
    ];

    strength = checks.filter(check => check).length;

    if (strength <= 2) return { level: 'weak', color: '#dc3545' };
    if (strength <= 4) return { level: 'medium', color: '#ffc107' };
    return { level: 'strong', color: '#28a745' };
}

newPasswordInput.addEventListener('input', function () {
    const password = this.value;
    const strengthIndicatorId = 'passwordStrength';

    let strengthDiv = document.getElementById(strengthIndicatorId);
    if (!strengthDiv) {
        strengthDiv = document.createElement('div');
        strengthDiv.id = strengthIndicatorId;
        strengthDiv.style.cssText = 'margin-top: 5px; font-size: 12px; font-weight: bold;';
        this.parentNode.insertBefore(strengthDiv, this.nextSibling);
    }

    if (password.length > 0) {
        const strength = getPasswordStrength(password);
        strengthDiv.innerHTML = `Password strength: <span style="color: ${strength.color};">${strength.level.toUpperCase()}</span>`;
    } else {
        strengthDiv.innerHTML = '';
    }
});

function addPasswordToggle(inputId) {
    const input = document.getElementById(inputId);
    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.innerHTML = '👁️';
    toggleBtn.style.cssText = `
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;
        font-size: 16px;
        z-index: 10;
    `;

    input.parentNode.style.position = 'relative';
    input.style.paddingRight = '40px';

    toggleBtn.addEventListener('click', function () {
        if (input.type === 'password') {
            input.type = 'text';
            toggleBtn.innerHTML = '🙈';
        } else {
            input.type = 'password';
            toggleBtn.innerHTML = '👁️';
        }
    });

    input.parentNode.appendChild(toggleBtn);
}

document.addEventListener('DOMContentLoaded', function () {
    addPasswordToggle('OldPassword');
    addPasswordToggle('NewPassword');
});

document.addEventListener('DOMContentLoaded', function () {
    const messageIds = ['oldPasswordMessage', 'newPasswordMessage'];
    messageIds.forEach(id => {
        const messageDiv = document.getElementById(id);
        if (messageDiv) {
            messageDiv.innerHTML = '';
        }
    });
});