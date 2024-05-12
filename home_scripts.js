// Event listener for when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Selecting the home link in the navigation
    const homeLink = document.querySelector('.nav-links ul li a[href="index.html"]');

    // Preventing the default behavior of the home link when clicked
    homeLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default behavior of the link when clicked
    });

    // Selecting the add and calculate buttons, course number input, course grade input, and popup
    const addButton = document.querySelector('.addbtn');
    const calcButton = document.querySelector('.calcbtn');
    const courseNumberInput = document.getElementById('courseName');
    const courseGradeInput = document.getElementById('grade');
    const popup = document.getElementById('popup');

    // Initially hiding the popup and its contents
    popup.style.display = 'none';
    document.querySelector('.popup-content').style.display = 'none';

    // Function to check inputs and show popup if necessary
    function checkInputsAndShowPopup() {
        // Selecting all table rows in the table body
        const tableRows = document.querySelectorAll('#tbl tbody tr');
        const popup = document.getElementById('popup');
        const popupContent = document.querySelector('.popup-content');
        const popupMessage = document.getElementById('popupMessage');

        // Checking if both course number and grade inputs are missing and there are no existing table rows
        if ((!courseNumberInput.value || !courseGradeInput.value) && tableRows.length === 0) {
            // Setting the popup message based on the missing inputs
            popupMessage.innerText = 'Invalid Entry: Missing ' +
                (!courseNumberInput.value ? 'Course Number' : '') +
                (!courseNumberInput.value && !courseGradeInput.value ? ' and ' : '') +
                (!courseGradeInput.value ? 'Course Grade' : '');
            popup.style.display = 'flex'; // Displaying the popup
            popupContent.style.display = 'block'; // Displaying the popup content
        }
    }

    // Adding event listeners to the add and calculate buttons to check inputs and show popup if necessary
    addButton.addEventListener('click', checkInputsAndShowPopup);
    calcButton.addEventListener('click', checkInputsAndShowPopup);
});

// Function to add a new course to the table
function addCourse() {
    var courseName = document.getElementById('courseName').value.trim();
    var grade = document.getElementById('grade').value.trim().toUpperCase();
    var table = document.getElementById('tbl').getElementsByTagName('tbody')[0];
    var courseNameError = document.getElementById('courseNameError');
    var gradeError = document.getElementById('gradeError');
    var popup = document.getElementById('popup');

    courseNameError.innerHTML = '';
    gradeError.innerHTML = '';

    // Validating course name and grade inputs
    if (!courseName && !grade) {
        displayPopup('Invalid Entry: Missing Course Number and Grade');
        courseNameError.innerHTML = 'Missing Course Number';
        gradeError.innerHTML = 'Missing Course Grade';
    } else if (!courseName) {
        displayPopup('Invalid Entry: Missing Course Number');
        courseNameError.innerHTML = 'Missing Course Number';
    } else if (!grade) {
        displayPopup('Invalid Entry: Missing Course Grade');
        gradeError.innerHTML = 'Missing Course Grade';
    } else if (!['A', 'B', 'C', 'D', 'F'].includes(grade)) {
        displayPopup('Invalid Entry: Please Enter A Valid Grade'); // Specific validation for the grade
        gradeError.innerHTML = 'Invalid Grade Entered';
    } else {
        // Adding the new course to the table
        var newRow = table.insertRow(table.length);
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);

        // Populating cells with course name, grade, and delete button
        cell1.innerHTML = courseName.toUpperCase(); // Convert to uppercase
        cell2.innerHTML = grade; // Already converted to uppercase
        cell3.innerHTML = '<span class="delete-btn" onclick="deleteRow(this)">X</span>'; // Adds the delete button

        // Clearing input fields and hiding the popup after adding courses
        document.getElementById('courseName').value = '';
        document.getElementById('grade').value = '';
        dismissPopup();
    }
}

// Function to delete a row from the table
function deleteRow(row) {
    var rowIndex = row.parentNode.parentNode.rowIndex;
    document.getElementById('tbl').deleteRow(rowIndex);
}

// Function to dismiss the popup
function dismissPopup() {
    var popup = document.getElementById('popup');
    popup.style.display = 'none';
    document.querySelector('.popup-content').style.display = 'none'; // Hide the popup content
}

// Function to display a popup message
function displayPopup(message) {
    var popup = document.getElementById('popup');
    var popupMessage = document.getElementById('popupMessage');
    popupMessage.innerText = message;
    popup.style.display = 'flex';
    document.querySelector('.popup-content').style.display = 'block'; // Show the popup content
}

// Placeholder function for form validation or GPA calculation
function validateForm() {
    // Placeholder function for GPA calculation maybe??
}
