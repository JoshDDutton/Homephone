/*
Form validation functionality
Handles all form validation logic
*/

// Regex patterns
const stateAbbreviations = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const zipRegex = /^\d{5}(-\d{4})?$/;

function initValidation(formId) {
    const form = document.querySelector(formId);
    if (!form) return;

    // Add validation on form submit
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validateForm()) {
            // Hide form and show thank you message
            form.style.display = 'none';
            document.getElementById('thankYouMessage').style.display = 'block';
        }
    });

    // Add validation on field change
    const inputs = form.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('change', () => {
            validateField(input);
        });
    });
}

function validateForm() {
    let isValid = true;

    // Required fields
    isValid = checkRequired('firstName', 'First name is required') && isValid;
    isValid = checkRequired('lastName', 'Last name is required') && isValid;
    isValid = checkRequired('address', 'Address is required') && isValid;
    isValid = checkRequired('city', 'City is required') && isValid;
    
    // State validation
    isValid = validateState('state', 'Please enter a valid state abbreviation') && isValid;
    
    // Format validations
    isValid = checkFormat('zip', 'Please enter a valid ZIP code', zipRegex) && isValid;
    isValid = checkFormat('phone', 'Please enter a valid phone number', phoneRegex) && isValid;
    isValid = checkFormat('email', 'Please enter a valid email address', emailRegex) && isValid;
    
    // Checkbox group validation
    isValid = validateCheckboxGroup('findUs', 'Please select at least one option') && isValid;

    return isValid;
}

function validateField(input) {
    input.classList.add('was-validated');
    
    switch(input.id) {
        case 'state':
            return validateState(input.id, 'Please enter a valid state abbreviation');
        case 'zip':
            return checkFormat(input.id, 'Please enter a valid ZIP code', zipRegex);
        case 'phone':
            return checkFormat(input.id, 'Please enter a valid phone number', phoneRegex);
        case 'email':
            return checkFormat(input.id, 'Please enter a valid email address', emailRegex);
        default:
            return checkRequired(input.id, `${input.name} is required`);
    }
}

function checkRequired(fieldId, message) {
    const field = document.getElementById(fieldId);
    const isValid = field.value.trim() !== '';
    setElementValidity(fieldId, isValid, message);
    return isValid;
}

function checkFormat(fieldId, message, regex) {
    const field = document.getElementById(fieldId);
    const isValid = regex.test(field.value.trim());
    setElementValidity(fieldId, isValid, message);
    return isValid;
}

function validateState(fieldId, message) {
    const field = document.getElementById(fieldId);
    const value = field.value.trim().toUpperCase();
    const isValid = stateAbbreviations.includes(value);
    setElementValidity(fieldId, isValid, message);
    return isValid;
}

function validateCheckboxGroup(groupName, message) {
    const checkboxes = document.querySelectorAll(`input[name="${groupName}"]`);
    const isValid = Array.from(checkboxes).some(cb => cb.checked);
    const errorDiv = document.getElementById(`${groupName}-error`);
    errorDiv.textContent = isValid ? '' : message;
    return isValid;
}

function setElementValidity(id, isValid, message) {
    const element = document.getElementById(id);
    const errorDiv = element.nextElementSibling;
    
    element.setCustomValidity(isValid ? '' : message);
    if (errorDiv && errorDiv.classList.contains('errorMsg')) {
        errorDiv.textContent = isValid ? '' : message;
    }
} 