import {getAllCourses} from "./getAllCourses.js";
import {getStudent} from "./getStudent.js";
import {enrollCourse} from "./enrollCourse.js"
import {deleteCourse} from "./deleteCourse.js";
import {updateCourse} from "./updateCourse.js"



document.addEventListener('DOMContentLoaded', async function () {

    //get courses list
    let coursesListLocal = await getAllCourses();
    let student = await getStudent()

    //get student info

    setStudentInfo()

    function setStudentInfo(){
        document.getElementById('studentName').innerText = student["name"];
        document.getElementById('cumulativeGPA').innerText = student["gpa"];
    }


    function getEnrolledTerms(){
        const termSet = new Set();

        student["enrolledCourses"].forEach(
            course => {
                const termObj = {term: course.term, year: course.year}
                termSet.add(JSON.stringify(termObj));
            }
        )

        let Terms = Array.from(termSet).map(termStr => JSON.parse(termStr));

        //SORT THE TERMS
        Terms = sortTerms(Terms)

        return Terms
    }




    let Terms = getEnrolledTerms()

    let termdropdown = renderCurrentTermDropDown(Terms)



    if(Terms.length > 0){
        let currentOptionElement =  setDefaultCurrentTerm(Terms[Terms.length-1])
        renderCurrentCourseTable(currentOptionElement)

        let selectedTerm = getCurrentlySelectedTerm()
    }
    else{
        setDefaultCurrentTerm()
    }





    termdropdown.addEventListener('change', onDropdownChange);


    function renderCurrentCourseTable(currentSelection){
        removeDashboardTable();

        let selectedOption = currentSelection;

        let selectedTerm = {}

        //get term data attribute
        selectedTerm.term = selectedOption.getAttribute("data_term")

        //get year data attribute
        selectedTerm.year = parseInt(selectedOption.getAttribute("data_year"))

        let courseArray = []

        student["enrolledCourses"].forEach(course => {
            let termMatch = course.term === selectedTerm.term;
            let yearMatch = course.year === selectedTerm.year;

            let courseMatch = termMatch && yearMatch;

            if(courseMatch){
                courseArray.push(course)
            }
        })

        const container = document.getElementById('table-container');


        courseArray.forEach(course => {
            let table = document.getElementById(`table-${course.term} ${course.year}`);
            if (!table) {
                table = createTable(course.term + ' ' + course.year);
                container.appendChild(table);
            }

            let courseRow = renderCourseRow(course)
            table.appendChild(courseRow)
        });


    }


    function onDropdownChange(event) {

        let options = event.target.options;
        let selectedOption

        for (const option of options) {
            if(option.selected){
                selectedOption = option;
            }
        }

        renderCurrentCourseTable(selectedOption)


    }



    function getCurrentlySelectedTerm(){
        let dropdown = document.getElementById("termdropdown");
        let selectedOption;

        for(let i = 0; i< dropdown.options.length; i++){
            let optionElement = dropdown.options[i];

            if(optionElement.selected ===true){
                selectedOption = optionElement
            }

        }

        return selectedOption
    }



    // Render current Term Dropdown
    function renderCurrentTermDropDown(terms){
        // get the dropdown
        let dropdown = document.getElementById("termdropdown");

        //clear the elements
        dropdown.innerHTML = ''

        //set new elements
        terms.forEach(term => {
            let option = document.createElement("option");
            option.setAttribute("data_term", term.term)
            option.setAttribute("data_year", term.year)

            option.text = `${term.term} ${term.year}`
            dropdown.add(option);
        })

        return dropdown
    }



    // sort current term
    function sortTerms(termArray){

        const seasonOrder = ["Autumn", "Winter",  "December Intersession", "Spring" ,"Summer I" , "Summer II" ]

        termArray.sort((a,b)=>{
            let indexA = seasonOrder.indexOf(a.term)
            let indexB = seasonOrder.indexOf(b.term)

            if(indexA !== indexB){
                return indexA - indexB
            }
            else {
                return a.year - b.year
            }


        })

        return termArray

    }


    function setDefaultCurrentTerm(currentTerm= null){
        // get the dropdown
        let dropdown = document.getElementById("termdropdown");

        //get options


        if(currentTerm){

            for(let i = 0; i< dropdown.options.length; i++){
                let optionElement = dropdown.options[i];

                let data_year = optionElement.getAttribute("data_year")
                let data_term =  optionElement.getAttribute("data_term")

                if(data_year == currentTerm.year && data_term == currentTerm.term){
                    optionElement.selected = true;

                    return optionElement

                }

            }

        }


    }



    async function refetchStudent() {
        student = await getStudent()
    }


    //FUNCTION RERENDER ELEMENTS

    function reRenderUpdatedElements(){
        // get currently selected term
        let selectedTerm = getCurrentlySelectedTerm()

        let termObject = {
            term: selectedTerm.getAttribute('data_term'),
            year: selectedTerm.getAttribute('data_year')
        }

        let terms = getEnrolledTerms()
        renderCurrentTermDropDown(terms)

        setDefaultCurrentTerm(termObject)

        renderCurrentCourseTable(selectedTerm)

        setStudentInfo()



    }



    //TODO: CREATING A ROW FOR COURSE HISTORY TABLE

    //needs: subject,number,calcgrade,finalgrade,savebutton,delete button

    function renderCourseRow(enrolledCourse){

        let row = document.createElement('tr')
        row.setAttribute("data_id", enrolledCourse.id)

        //create table data elements

        //courseName
        const cellCourse = row.insertCell(0);
        cellCourse.textContent=`${enrolledCourse.course.subject} ${enrolledCourse.course.number}`
        cellCourse.classList.add('clickable')

        //calc grade

        const cellProgress = row.insertCell(1);
        cellProgress.textContent = isNaN(enrolledCourse.calculatedGrade) ? 0 : enrolledCourse.calculatedGrade

        const cellGrade = row.insertCell(2);

        const finalGradeSelect = createGradeDropDown(['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'], enrolledCourse.finalGrade)
        cellGrade.appendChild(finalGradeSelect)

        //save
        const cellSave = row.insertCell(3);
        cellSave.innerHTML = "<button class= 'savebtn'><i class='bx bx-save'></i></button>";
        cellSave.addEventListener("click",() => updateEnrolledCourseFinalGrade(enrolledCourse, finalGradeSelect.value))

        //delete
        const cellDelete = row.insertCell(4);
        cellDelete.innerHTML = '<span class="delete-btn">X</span>';
        cellDelete.addEventListener("click", () => deleteEnrolledCourse(enrolledCourse.id))


        return row;
    }

    function createGradeDropDown(options, defaultOption=null){
        const select = document.createElement('select')

        if(!defaultOption){
            let disabledOption = document.createElement('option')
            disabledOption.disabled = true
            disabledOption.text = "Select Final Grade"
            select.appendChild(disabledOption)
        }

        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option
            optionElement.textContent = option

            if(defaultOption === option){
                optionElement.selected = true
            }

            select.appendChild(optionElement)
        })






        return select;
    }




    async function deleteEnrolledCourse(id) {
        await deleteCourse(id)

        refetchStudent().then(() => reRenderUpdatedElements())

    }

    async function updateEnrolledCourseFinalGrade(course, grade) {
        course.finalGrade = grade;
        await updateCourse(course)

        refetchStudent().then(() => reRenderUpdatedElements())
    }




    //FILLS COURSE DROP DOWN

    let coursedropdown = document.getElementById("coursedropdown");

    coursesListLocal.forEach(course => {
        let option = document.createElement("option");
        option.text = `${course["subject"]} ${course["number"]}`;

        option.value = course["id"]
            coursedropdown.add(option);
        }
    )



    const addCourseButton = document.querySelector('.bottom-container .create-btn');
    addCourseButton.addEventListener('click', async function () {

        const term = document.getElementById("seasondropdown").value;
        let year = parseInt(document.getElementById("yeartext").value);

        // year = parseInt(year)

        const courseID = document.getElementById("coursedropdown").value;

        let courseObj = {term, year, courseID, finalGrade: 'C', credits: 4}


        let success = await enrollCourse(courseObj)

        if(success){
            refetchStudent().then(()=> reRenderUpdatedElements())
            // reRenderUpdatedElements()
        }


    });


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
    /*
	const courseArray = [
			{ term: 'Winter 2021', course: 'CSC373', progress: '20%', grade: 'Select Final Grade' },
			{ term: 'Winter 2021', course: 'CSC374', progress: '20%', grade: 'Select Final Grade' },
			{ term: 'Winter 2021', course: 'CSC394', progress: '20%', grade: 'Select Final Grade' },
			{ term: 'Winter 2021', course: 'CSC347', progress: '20%', grade: 'Select Final Grade' }
	];
	sortCoursesByTerm(courseArray)
	*/
    const container = document.getElementById('table-container');


//create modal for each course
    function EditGradeCourseModal(course) {
        document.getElementById('modal-course-number').innerText = course.course.subject + ' ' + course.course.number;
        document.getElementById('modal').style.display = 'flex';
        document.querySelector('.close').addEventListener('click', function () {
            document.getElementById('modal').style.display = 'none';
            removeTable();
        });
    }

//creaste table for term if not exist, otherwise add row for corresponding term
    /*
	courseArray.forEach(course => {
	let table = document.getElementById(`table-${course.term}`);
	if (!table) {
		table = createTable(course.term);
		container.appendChild(table);
	}
	addRow(table, course);
	});
	*/
    function createTable(term) {
//build table
        const table = document.createElement('table');
        table.id = `table-${term}`;
        table.className = 'table';
        const thead = document.createElement('thead');
//build initial row
        const tr = document.createElement('tr');
        ['Course', 'Calculated Grade', 'Final Grade', 'Save', 'Delete'].forEach(text => {
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


});








function sortCoursesByTerm(courses) {
var quarters = ['Winter', 'Spring', 'Fall'];
courses.sort(function(a, b) {
//get Years from the Term
let firstYear = parseInt(a.term.split(' ')[1],10);
let secondYear = parseInt(b.term.split(' ')[1],10);
let firstQuarter = a.term.split(' ')[0];
let secondQuarter = b.term.split(' ')[0];
if(firstYear !== secondYear){
    return firstYear - secondYear;}
else {
    return quarters.indexOf(firstQuarter) - quarters.indexOf(secondQuarter);
}
});

}
function sortCoursesByYear(courses) {
courses.sort(function(a, b) {
let firstYear = a.term.split(' ');
let secondYear = b.term.split(' ');
 return sortOrder.indexOf(a.term) - sortOrder.indexOf(b.term);
});

}

//------------------------------This is popup table when they click on the cpurse------------------------------------------------------//

            // List of items
            const itemArray = [
                { item: 'Assignment 1', score: '50/100', weight: '10%' },
                { item: 'Assignment 2', score: '100/100', weight: '10%' },
                { item: 'Quiz 1', score: '75/100', weight: '20%' },
                { item: 'Assignment 3', score: '80/100', weight: '10%' }
            ];


            
            const itemArrayContainer = document.getElementById('grade-table-container');
            
            function createTable() {
                // Build table
                const table = document.createElement('table');
                table.className = 'table';
                table.id = 'grade-table';
                table.classList.add('edit-grade-table');
                const thead = document.createElement('thead');
                // Build initial row
                const tr = document.createElement('tr');
                ['Item', 'Score', 'Weight', 'Edit', 'Save', 'Delete'].forEach(text => {
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
            
            function addRow(table, item = { item: '', score: '', weight: '' }) {
                const tbody = table.getElementsByTagName('tbody')[0];
                const row = tbody.insertRow();
                const cellItem = row.insertCell(0);
                const cellScore = row.insertCell(1);
                const cellWeight = row.insertCell(2);
                const cellEdit = row.insertCell(3);
                const cellSave = row.insertCell(4);
                const cellDelete = row.insertCell(5);
            
                // Make "Item" cell editable
                const itemInput = document.createElement('input');
                itemInput.value = item.item;
                itemInput.disabled = true;
                cellItem.appendChild(itemInput);
            
                // Make "Score" cell editable
                const scoreInput = document.createElement('input');
                scoreInput.value = item.score;
                scoreInput.disabled = true; 
                cellScore.appendChild(scoreInput);
            
                // Make "Weight" cell editable
                const weightInput = document.createElement('input');
                weightInput.value = item.weight;
                weightInput.disabled = true;
                cellWeight.appendChild(weightInput);
            
                // Edit button
                const editButton = document.createElement('button');
                editButton.innerHTML = "<i class='bx bxs-pencil'></i>";
                editButton.className = 'edit-btn';
                editButton.addEventListener('click', function() {
                    itemInput.disabled = false;
                    scoreInput.disabled = false;
                    weightInput.disabled = false;
                });
                cellEdit.appendChild(editButton);
            
                // Save button
                const saveButton = document.createElement('button');
                saveButton.innerHTML = "<i class='bx bx-save'></i>";
                saveButton.addEventListener('click', function() {
                    itemInput.disabled = true;
                    scoreInput.disabled = true;
                    weightInput.disabled = true;
            
                    // Update itemArray with new values or add new item
                    const rowIndex = row.rowIndex - 1; 
                    if (rowIndex >= itemArray.length) {
                        itemArray.push({ item: itemInput.value, score: scoreInput.value, weight: weightInput.value });
                    } else {
                        itemArray[rowIndex].item = itemInput.value;
                        itemArray[rowIndex].score = scoreInput.value;
                        itemArray[rowIndex].weight = weightInput.value;
                    }
                });
                cellSave.appendChild(saveButton);
            
                // Delete button
                const deleteButton = document.createElement('button');
                deleteButton.innerHTML = 'X';
                deleteButton.addEventListener('click', function() {
                    row.remove();
                    itemArray.splice(row.rowIndex - 1, 1); // Remove the item from itemArray
                });
                cellDelete.appendChild(deleteButton);
            }
            
            // Initialize the table and add rows
            function initTable() {
                const table = createTable();
                itemArrayContainer.appendChild(table);
                itemArray.forEach(item => addRow(table, item));
            }
            
            // Add new row button
            const addNewRowButton = document.createElement('button');
            addNewRowButton.textContent = 'Add New Row';
            addNewRowButton.addEventListener('click', function() {
                const table = document.getElementById('grade-table');
                addRow(table);
            });
            itemArrayContainer.appendChild(addNewRowButton);
            
            // Remove table FOR MAIN DASHBOARD
            function removeDashboardTable() {
                const container = document.getElementById('table-container');
                container.removeChild(container.lastChild);
            }
            
             // Remove table FOR POPUP
             function removeTable() {
                const table = document.getElementById('grade-table');
                if (table) {
                    table.remove();
                }
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
