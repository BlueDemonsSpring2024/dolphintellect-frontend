// Execute the script when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    var usernameInput = document.getElementById('username');
    var passwordInput = document.getElementById('password');

    // Clear custom validity message when user starts typing in the username input field
    usernameInput.addEventListener('input', function() {
        usernameInput.setCustomValidity('');
        usernameInput.checkValidity();
    });

    // Set custom validity message if the username input field is left empty
    usernameInput.addEventListener('invalid', function() {
        if (usernameInput.value.trim() === '') {
            usernameInput.setCustomValidity('Enter university username');
        } else {
            usernameInput.setCustomValidity('');
        }
    });

    // Clear custom validity message when user starts typing in the password input field
    passwordInput.addEventListener('input', function() {
        passwordInput.setCustomValidity('');
        passwordInput.checkValidity();
    });
});
