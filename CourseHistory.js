document.addEventListener('DOMContentLoaded', function() {
    const courseArray = [
        { term: 'December Intersession 2024', course: 'CSC373', progress: '95%', grade: 'A' },
        { term: 'Fall 1998', course: 'CSC374', progress: '85%', grade: 'B' },
        { term: 'Spring 2001', course: 'CSC394', progress: '90%', grade: 'A-' },
        { term: 'Spring 2004', course: 'CSC347', progress: '89%', grade: 'B+' }
    ];

    sortCoursesByTerm(courseArray);

    const container = document.getElementById('table-container');

    courseArray.forEach(course => {
        let table = document.getElementById(`table-${course.term}`);
        if (!table) {
            table = createTable(course.term);
            container.appendChild(table);
        }
        addRow(table, course);
    });

    document.getElementById('add-course-btn').addEventListener('click', function() {
        const newCourse = { term: prompt('Enter Term:'), course: prompt('Enter Course:'), progress: prompt('Enter Progress:'), grade: prompt('Enter Grade:') };
        let table = document.getElementById(`table-${newCourse.term}`);
        if (!table) {
            table = createTable(newCourse.term);
            container.appendChild(table);
        }
        addRow(table, newCourse);
    });

    function createTable(term) {
        const table = document.createElement('table');
        table.id = `table-${term}`;
        table.className = 'table';
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');
        ['Course', 'Progress', 'Grade', 'Actions'].forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            tr.appendChild(th);
        });
        thead.appendChild(tr);
        table.appendChild(thead);
        const tbody = document.createElement('tbody');
        table.appendChild(tbody);
        const tableHeader = document.createElement('caption');
        tableHeader.textContent = `${term} Term`;
        tableHeader.className = 'table-header';
        table.appendChild(tableHeader);

        return table;
    }

    function addRow(table, course) {
        const tbody = table.getElementsByTagName('tbody')[0];
        const row = tbody.insertRow();
        const cellCourse = row.insertCell(0);
        const cellProgress = row.insertCell(1);
        const cellGrade = row.insertCell(2);
        const cellActions = row.insertCell(3);
        cellCourse.textContent = course.course;
        cellProgress.textContent = course.progress;
        cellGrade.textContent = course.grade;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => row.remove());
        cellActions.appendChild(deleteBtn);
    }
});

function sortCoursesByTerm(courses) {
    const quarters = ['Winter', 'Spring', 'Summer I', 'Summer II', 'Fall', 'December Intersession'];
    courses.sort(function(a, b) {
        const firstYear = parseInt(a.term.split(' ')[1], 10);
        const secondYear = parseInt(b.term.split(' ')[1], 10);
        const firstQuarter = a.term.split(' ')[0];
        const secondQuarter = b.term.split(' ')[0];
        if (firstYear !== secondYear) {
            return firstYear - secondYear;
        } else {
            return quarters.indexOf(firstQuarter) - quarters.indexOf(secondQuarter);
        }
    });
}
