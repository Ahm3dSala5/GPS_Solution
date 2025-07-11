const validationRules = {
    username: {
        minLength: 3,
        maxLength: 20,
        allowedChars: /^[a-zA-Z0-9_.-]+$/,
        requireAlphaNumeric: true
    },
    verificationCode: {
        exactLength: 6,
        numericOnly: true
    }
};

const usernameInput = document.getElementById('UserName');
const verificationCodeInput = document.getElementById('VerificationCode');
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

createValidationMessage('UserName', 'usernameMessage');
createValidationMessage('VerificationCode', 'verificationCodeMessage');

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

function addInputBorder(input, isValid) {
    if (isValid) {
        input.style.borderColor = '#28a745';
        input.style.boxShadow = '0 0 0 0.2rem rgba(40, 167, 69, 0.25)';
    } else {
        input.style.borderColor = '#dc3545';
        input.style.boxShadow = '0 0 0 0.2rem rgba(220, 53, 69, 0.25)';
    }
}

function resetInputBorder(input) {
    input.style.borderColor = '#ccc';
    input.style.boxShadow = 'none';
}

function validateUsername() {
    const username = usernameInput.value.trim();
    const errors = [];

    if (username.length === 0) {
        displayValidationMessage('usernameMessage', [], false);
        resetInputBorder(usernameInput);
        return false;
    }

    if (username.length < validationRules.username.minLength) {
        errors.push(`Username must be at least ${validationRules.username.minLength} characters long`);
    }

    if (username.length > validationRules.username.maxLength) {
        errors.push(`Username must be no more than ${validationRules.username.maxLength} characters long`);
    }

    if (!validationRules.username.allowedChars.test(username)) {
        errors.push('Username can only contain letters, numbers, underscores, dots, and hyphens');
    }

    if (validationRules.username.requireAlphaNumeric && !/(?=.*[a-zA-Z])(?=.*[0-9])|^[a-zA-Z]+$/.test(username)) {
        if (/^[0-9_.-]+$/.test(username)) {
            errors.push('Username must contain at least one letter');
        }
    }

    if (/[_.-]{2,}/.test(username)) {
        errors.push('Username cannot contain consecutive special characters');
    }

    if (/^[_.-]|[_.-]$/.test(username)) {
        errors.push('Username cannot start or end with special characters');
    }

    const isValid = errors.length === 0;
    displayValidationMessage('usernameMessage', errors, isValid);
    addInputBorder(usernameInput, isValid);

    return isValid;
}

function validateVerificationCode() {
    const code = verificationCodeInput.value.trim();
    const errors = [];

    if (code.length === 0) {
        displayValidationMessage('verificationCodeMessage', [], false);
        resetInputBorder(verificationCodeInput);
        return false;
    }

    if (code.length !== validationRules.verificationCode.exactLength) {
        errors.push(`Verification code must be exactly ${validationRules.verificationCode.exactLength} digits`);
    }

    if (!/^\d+$/.test(code)) {
        errors.push('Verification code must contain only numbers');
    }

    if (code.length === 6) {
        if (/^(\d)\1{5}$/.test(code)) {
            errors.push('Invalid verification code pattern');
        }

        //if (code === '123456' || code === '654321' || code === '000000') {
        //    errors.push('Invalid verification code pattern');
        //}
    }

    const isValid = errors.length === 0;
    displayValidationMessage('verificationCodeMessage', errors, isValid);
    addInputBorder(verificationCodeInput, isValid);

    return isValid;
}

usernameInput.addEventListener('input', function () {
    let value = this.value;
    value = value.replace(/[^a-zA-Z0-9_.-]/g, '');

    if (value !== this.value) {
        this.value = value;
    }

    validateUsername();
});

verificationCodeInput.addEventListener('input', function () {
    let value = this.value.replace(/\D/g, '');
    if (value.length > 6) {
        value = value.substring(0, 6);
    }

    if (value !== this.value) {
        this.value = value;
    }

    validateVerificationCode();
});

verificationCodeInput.addEventListener('input', function () {
    let value = this.value.replace(/\D/g, '');
    if (value.length > 6) {
        value = value.substring(0, 6);
    }

    let formattedValue = value;
    if (value.length > 3) {
        formattedValue = value.substring(0, 3) + ' ' + value.substring(3);
    }

    if (formattedValue !== this.value) {
        const cursorPos = this.selectionStart;
        this.value = formattedValue;

        let newCursorPos = cursorPos;
        if (cursorPos === 4 && formattedValue.length > 3) {
            newCursorPos = 4;  
        }
        this.setSelectionRange(newCursorPos, newCursorPos);
    }
});

verificationCodeInput.addEventListener('paste', function (e) {
    e.preventDefault();
    const paste = (e.clipboardData || window.clipboardData).getData('text');
    const numericPaste = paste.replace(/\D/g, '').substring(0, 6);
    this.value = numericPaste;
    validateVerificationCode();
});

form.addEventListener('submit', function (e) {
    const isUsernameValid = validateUsername();
    const isVerificationCodeValid = validateVerificationCode();

    if (!isUsernameValid || !isVerificationCodeValid) {
        e.preventDefault();

        const errors = [];
        if (!isUsernameValid) errors.push('Please enter a valid username');
        if (!isVerificationCodeValid) errors.push('Please enter a valid verification code');

        alert('Please fix the following errors:\n• ' + errors.join('\n• '));

        if (!isUsernameValid) {
            usernameInput.focus();
        } else if (!isVerificationCodeValid) {
            verificationCodeInput.focus();
        }

        return false;
    }

    verificationCodeInput.value = verificationCodeInput.value.replace(/\s/g, '');

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Verifying...';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 10000);
});

/*function addResendCodeLink() {
    const resendLink = document.createElement('div');
    resendLink.style.cssText = 'margin-top: 15px; text-align: center;';
    resendLink.innerHTML = `
        <span style="font-size: 14px; color: #666;">
            Didn't receive a code? 
            <a href="#" id="resendCode" style="color: #007bff; text-decoration: none; font-weight: bold;">
                Resend Code
            </a>
        </span>
        <div id="resendTimer" style="font-size: 12px; color: #666; margin-top: 5px;"></div>
    `;

    form.appendChild(resendLink);

    let resendTimer = 0;
    const resendCodeLink = document.getElementById('resendCode');
    const resendTimerDiv = document.getElementById('resendTimer');

    function startResendTimer() {
        resendTimer = 60;
        resendCodeLink.style.pointerEvents = 'none';
        resendCodeLink.style.color = '#ccc';

        const interval = setInterval(() => {
            resendTimerDiv.textContent = `Resend available in ${resendTimer}s`;
            resendTimer--;

            if (resendTimer < 0) {
                clearInterval(interval);
                resendCodeLink.style.pointerEvents = 'auto';
                resendCodeLink.style.color = '#007bff';
                resendTimerDiv.textContent = '';
            }
        }, 1000);
    }

    resendCodeLink.addEventListener('click', function (e) {
        e.preventDefault();
        if (resendTimer <= 0) {
            alert('Verification code sent! Please check your email/SMS.');
            startResendTimer();
        }
    });
}
*/

document.addEventListener('DOMContentLoaded', function () {
    const messageIds = ['usernameMessage', 'verificationCodeMessage'];
    messageIds.forEach(id => {
        const messageDiv = document.getElementById(id);
        if (messageDiv) {
            messageDiv.innerHTML = '';
        }
    });

    addResendCodeLink();

    usernameInput.focus();
});

usernameInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        verificationCodeInput.focus();
    }
});

verificationCodeInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (validateUsername() && validateVerificationCode()) {
            form.submit();
        }
    }
});

verificationCodeInput.addEventListener('input', function () {
    const code = this.value.replace(/\s/g, '');
    if (code.length === 6) {
        if (validateUsername() && validateVerificationCode()) {
            setTimeout(() => {
                const submitBtn = form.querySelector('button[type="submit"]');
                submitBtn.focus();
            }, 100);
        }
    }
});