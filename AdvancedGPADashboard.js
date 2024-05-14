document.addEventListener('DOMContentLoaded', function() {
    // Initialize terms and populate the term dropdown
    var terms = ["Fall 2020", "Winter 2021", "Spring 2021", "Fall 2021"];
    var termdropdown = document.getElementById("termdropdown");
    for (var i = 0; i < terms.length; i++) {
        var option = document.createElement("option");
        option.text = terms[i];
        termdropdown.add(option);
    }

    // Add event listener to the create term button
    const createTermButton = document.querySelector('.bottom-container .create-btn');
    createTermButton.addEventListener('click', function() {
        // Display the "Create Class" popup
        createClassPopup();
    });

    // Function to display the create class popup
    function createClassPopup() {
        // Create popup container
        const popupContainer = document.createElement('div');
        popupContainer.classList.add('popup-container');

        // Create popup content
        const popupContent = document.createElement('div');
        popupContent.classList.add('popup-content');

        // Create a classname input
        const classnameInput = document.createElement('input');
        classnameInput.setAttribute('type', 'text');
        classnameInput.setAttribute('maxlength', '8');
        classnameInput.setAttribute('placeholder', 'Enter Course Name');
        popupContent.appendChild(classnameInput);

        // Create a "Finish Creation" button
        const finishCreationButton = document.createElement('button');
        finishCreationButton.textContent = 'Finish Creation';
        finishCreationButton.classList.add('btn');
        finishCreationButton.addEventListener('click', function() {
            const classname = classnameInput.value.trim();
            if (classname.length > 0) {
                const term = document.getElementById("seasondropdown").value;
                const year = document.getElementById("yeartext").value;
                const termyear = term + " " + year;
                courseArray.push({ term: termyear, course: classname, progress: '0%', grade: 'N/A' });
                updateTerms();
                // Close the popup
                document.body.removeChild(popupContainer);
            } else {
                alert('Please enter a class name.');
            }
        });
        popupContent.appendChild(finishCreationButton);

        popupContainer.appendChild(popupContent);
        document.body.appendChild(popupContainer);
    }

    // Function to update terms and populate the dropdown
    function updateTerms() {
        courseArray.forEach(course => {
            if (!terms.includes(course.term)) {
                terms.push(course.term);
                var option = document.createElement("option");
                option.text = course.term;
                termdropdown.add(option);
            }
        });
    }

    // Array to store course information
    const courseArray = [
        { term: 'Winter 2021', course: 'CSC373', progress: '20%', grade: '-Select-' },
        { term: 'Winter 2021', course: 'CSC374', progress: '20%', grade: '-Select-' },
        { term: 'Winter 2021', course: 'CSC394', progress: '20%', grade: '-Select-' },
        { term: 'Winter 2021', course: 'CSC347', progress: '20%', grade: '-Select-' }
    ];

    // Sort courses by term and populate the table
    sortCoursesByTerm(courseArray);

    const container = document.getElementById('table-container');

    // Create table for each term and add rows
    courseArray.forEach(course => {
        let table = document.getElementById(`table-${course.term}`);
        if (!table) {
            table = createTable(course.term);
            container.appendChild(table);
        }
        addRow(table, course);
    });

    // Function to create a table for a term
    function createTable(term) {
        // Build table
        const table = document.createElement('table');
        table.id = `table-${term}`;
        table.className = 'table';
        const thead = document.createElement('thead');
        // Build initial row
        const tr = document.createElement('tr');
        ['Course', 'Progress', 'Grade', 'Delete'].forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            tr.appendChild(th);
        });
        thead.appendChild(tr);
        table.appendChild(thead);
        const tbody = document.createElement('tbody');
        table.appendChild(tbody);
        return table;
    }

    // Function to add a row to a table
    function addRow(table, course) {
        const tbody = table.getElementsByTagName('tbody')[0];
        const row = tbody.insertRow();
        const cellCourse = row.insertCell(0);
        const cellProgress = row.insertCell(1);
        const cellGrade = row.insertCell(2);
        const cellDelete = row.insertCell(3);
        cellCourse.textContent = course.course;
        cellProgress.textContent = course.progress;
        cellGrade.textContent = course.grade;
        cellDelete.innerHTML = '<span class="delete-btn" onclick="deleteRow(this)">X</span>';
    }

    // Function to delete a row from a table
    function deleteRow(button) {
        const row = button.closest('tr');
        const tbody = row.parentNode;
        const table = row.parentNode.parentNode;
        // Delete row
        tbody.removeChild(row);
        if (tbody.rows.length == 0) {
            table.parentNode.removeChild(table);
        }
    }

    // Function to sort courses by term
    function sortCoursesByTerm(courses) {
        var quarters = ['Winter', 'Spring', 'Fall'];
        courses.sort(function(a, b) {
            // Get years from the term
            firstYear = parseInt(a.term.split(' ')[1], 10);
            secondYear = parseInt(b.term.split(' ')[1], 10);
            firstQuarter = a.term.split(' ')[0];
            secondQuarter = b.term.split(' ')[0];
            if (firstYear !== secondYear) {
                return firstYear - secondYear;
            } else {
                return quarters.indexOf(firstQuarter) - quarters.indexOf(secondQuarter);
            }
        });
    }
});