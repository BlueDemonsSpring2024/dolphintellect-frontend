// JavaScript for Course History Page

// Function to sort courses by term
import {getStudent} from "./getStudent.js";

function sortCoursesByTerm(courses) {
    var quarters = ['Winter', 'Spring', 'Summer I', 'Summer II', 'Fall', 'December Intersession'];
    courses.sort(function(a, b) {
        /*
        const firstYear = parseInt(a.term.split(' ')[1], 10);
        const secondYear = parseInt(b.term.split(' ')[1], 10);
        const firstQuarter = a.term.split(' ')[0];
        const secondQuarter = b.term.split(' ')[0];
        */
        const firstYear = parseInt(a.year);
        const secondYear = parseInt(b.year);
        const firstQuarter = a.term;
        const secondQuarter = b.term;
        if (firstYear !== secondYear) {
            return firstYear - secondYear;
        } else {
            return quarters.indexOf(firstQuarter) - quarters.indexOf(secondQuarter);
        }
    });
}

// Function to create a new table for a term
function createTable(term) {
    // Create table elements
    const table = document.createElement('table');
    table.id = `table-${term}`;
    table.className = 'table';

    // Create table header
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    ['Course', 'Progress', 'Grade'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    // Create table caption
    const tableHeader = document.createElement('caption');
    tableHeader.textContent = `${term} Term`;
    tableHeader.className = 'table-header';
    table.appendChild(tableHeader);

    return table;
}

// Function to add a row to an existing table
function addRow(table, course) {
    const tbody = table.getElementsByTagName('tbody')[0];
    const row = tbody.insertRow();
    const cellCourse = row.insertCell(0);
    const cellProgress = row.insertCell(1);
    const cellGrade = row.insertCell(2);
    cellCourse.textContent = course.course.subject + ' ' + course.course.number;
    if (isNaN(course.calculatedGrade)) {cellProgress.textContent = "0"}
    else {cellProgress.textContent = course.calculatedGrade;}
    cellGrade.textContent = course.finalGrade;
}

// Function to handle DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {

        getStudent().then(
        data => {
            const courseArray = data.enrolledCourses;
         // Sort courses by term
        sortCoursesByTerm(courseArray);

        // Get the container for the tables
        const container = document.getElementById('table-container');

        // Create tables and add rows
        courseArray.forEach(course => {
            let term = course.term + ' ' + course.year
            let table = document.getElementById(`table-${term}`);
            if (!table) {
                table = createTable(term);
                container.appendChild(table);
            }
            addRow(table, course);
        });
        }
    )
   
});