document.addEventListener('DOMContentLoaded', function() {
            
    var terms = ["Fall 2020", "Winter 2021", "Spring 2021", "Fall 2021"];
    var termdropdown = document.getElementById("termdropdown");
    for (var i = 0; i < terms.length; i++) {
        var option = document.createElement("option");
        option.text = terms[i];
        termdropdown.add(option);
    }

    const createTermButton = document.querySelector('.bottom-container .create-btn');
    createTermButton.addEventListener('click', function() {
        // Display the "Create Class" popup
        createClassPopup();
    });

    function createClassPopup() {
        // Create popup container
        const popupContainer = document.createElement('div');
        popupContainer.classList.add('popup-container');
        
        // Create a popup content
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
        finishCreationButton.textContent = 'Add';
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
/*
    function createTable(term) {
        const table = document.createElement('table');
        table.id = `table-${term}`;
        table.classList.add('course-table');
        const thead = table.createTHead();
        const row = thead.insertRow();
        const headers = ['Course', 'Progress', 'Final Grade'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            row.appendChild(th);
        });
        return table;
    }

    function addRow(table, course) {
        const tbody = table.createTBody();
        const row = tbody.insertRow();
        const values = [course.course, course.progress, course.grade];
        values.forEach(value => {
            const cell = row.insertCell();
            cell.textContent = value;
        });
    }
});
*/
//current classlist tables item
const courseArray = [
        { term: 'Winter 2021', course: 'CSC373', progress: '20%', grade: '-Select-' },
        { term: 'Winter 2021', course: 'CSC374', progress: '20%', grade: '-Select-' },
        { term: 'Winter 2021', course: 'CSC394', progress: '20%', grade: '-Select-' },
        { term: 'Winter 2021', course: 'CSC347', progress: '20%', grade: '-Select-' }
    ];
    sortCoursesByTerm(courseArray)

const container = document.getElementById('table-container');

//create table for term if not exist, otherwise add row for corresponding term
courseArray.forEach(course => {
let table = document.getElementById(`table-${course.term}`);
if (!table) {
    table = createTable(course.term);
    container.appendChild(table);
}
addRow(table, course);
});

function createTable(term) {
//build table
const table = document.createElement('table');
table.id = `table-${term}`;
table.className = 'table';
const thead = document.createElement('thead');
//build initial row
const tr = document.createElement('tr');
['Course','Progress', 'Grade', 'Delete'].forEach(text => {
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
});

function deleteRow(button) {
const row = button.closest('tr');
const tbody = row.parentNode;
const table = row.parentNode.parentNode;
//delete row
tbody.removeChild(row);
if (tbody.rows.length == 0){
table.parentNode.removeChild(table);
}
}

function sortCoursesByTerm(courses) {
var quarters = ['Winter', 'Spring', 'Fall'];
courses.sort(function(a, b) {
//get Years from the Term
firstYear = parseInt(a.term.split(' ')[1],10);
secondYear = parseInt(b.term.split(' ')[1],10);
firstQuarter = a.term.split(' ')[0];
secondQuarter = b.term.split(' ')[0];
if(firstYear !== secondYear){
    return firstYear - secondYear;}
else {
    return quarters.indexOf(firstQuarter) - quarters.indexOf(secondQuarter);
}
});

}
function sortCoursesByYear(courses) {
courses.sort(function(a, b) {
firstYear = a.term.split(' ');
secondYear = b.term.split(' ');
 return sortOrder.indexOf(a.term) - sortOrder.indexOf(b.term);
});

}
/*
function createTable() {
//build table
const table = document.createElement('table');
table.id = `table-${term}`;
table.className = 'table';
const thead = document.createElement('thead');
//build initial row
const tr = document.createElement('tr');
['Course', 'Progress','Final Grade', 'Delete'].forEach(text => {
    const th = document.createElement('th');
    th.textContent = text;
    tr.appendChild(th);
});
thead.appendChild(tr);
table.appendChild(thead);
const tbody = document.createElement('tbody');
table.appendChild(tbody);
//build header
const tableHeader = document.createElement('caption');
tableHeader.textContent = `${term} Term`;
tableHeader.className = 'table-header';
table.appendChild(tableHeader);

return table;
}
    var table = document.getElementById("table");
    courseArray.forEach(function(item) { 
        var row = document.createElement("tr"); 
    
        var courseCell = document.createElement("th"); 
        courseCell.textContent = item.course; 
        row.appendChild(courseCell); 
    
        var progressCell = document.createElement("th"); 
        progressCell.textContent = item.progress; 
        row.appendChild(progressCell); 
    
        var gradeCell = document.createElement("td");
        var select = document.createElement("select");
        select.className = "termList";

        var grades = ['-Select-', 'A', 'A-', 'B+','B', 'B-', 'C+','C', 'C-','D+', 'D','D-', 'F'];
        grades.forEach(grade => {
            var option = document.createElement("option");
            option.textContent = grade;
            select.appendChild(option);
        });



        //to select the grade for Final Grade column
        var selectGrade = item.grade;
        select.value = selectGrade;
        gradeCell.appendChild(select);
        row.appendChild(gradeCell);
        */
/*
function createTable(term) {
//build table
const table = document.createElement('table');
table.id = `table-${term}`;
table.className = 'table';
const thead = document.createElement('thead');
//build initial row
const tr = document.createElement('tr');
['Edit','Course', 'Progress','Final Grade', 'Delete'].forEach(text => {
    const th = document.createElement('th');
    th.textContent = text;
    tr.appendChild(th);
});
thead.appendChild(tr);
table.appendChild(thead);
const tbody = document.createElement('tbody');
table.appendChild(tbody);
//build header
const tableHeader = document.createElement('caption');
tableHeader.textContent = `${term} Term`;
tableHeader.className = 'table-header';
table.appendChild(tableHeader);

return table;
}
*/
/*
    //data is shown for the table in for testing purpose in current classlist
    var tblBody = document.getElementById("tblBody");
    


    courseArray.forEach(function(item) { 
        var row = document.createElement("tr"); 
    
        var courseCell = document.createElement("th"); 
        courseCell.textContent = item.course; 
        row.appendChild(courseCell); 
    
        var progressCell = document.createElement("th"); 
        progressCell.textContent = item.progress; 
        row.appendChild(progressCell); 
    
        var gradeCell = document.createElement("td");
        var select = document.createElement("select");
        select.className = "termList";

        var grades = ['-Select-', 'A', 'A-', 'B+','B', 'B-', 'C+','C', 'C-','D+', 'D','D-', 'F'];
        grades.forEach(grade => {
            var option = document.createElement("option");
            option.textContent = grade;
            select.appendChild(option);
        });



        //to select the grade for Final Grade column
        var selectGrade = item.grade;
        select.value = selectGrade;
        gradeCell.appendChild(select);
        row.appendChild(gradeCell);

        //delete function for the currentclasslist table in the 
        var deleteCell = document.createElement("td");
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function() {
            deleteRow(this);
        };
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        
        tblBody.appendChild(row);

    })


    function deleteRow(button) {
        const row = button.closest('tr');
        const tbody = row.parentNode;
        const table = tbody.parentNode;
        // Delete row
        tbody.removeChild(row);
        if (tbody.rows.length === 0) {
            table.parentNode.removeChild(table);
        }
    }
    */