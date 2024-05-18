import {getAllCourses} from "./getAllCourses.js";
import {coursesList} from "./coursesList.js";


document.addEventListener('DOMContentLoaded', async function () {

    const url = "/api/courses"

// function fetchData(url) {
//     return fetch(url)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         return data;
//       })
//     }


    let coursesListLocal = await getAllCourses();

    const courseContainer = document.getElementById('course-container');

    coursesListLocal.forEach(course => {
        const courseBox = document.createElement('div');
        courseBox.className = 'course-box';
        courseBox.setAttribute("data_courseID", course["id"])
        courseBox.innerHTML = `<div class="course-front"><h3 class="course-number">${course["subject"]} ${course["number"]}</h3><p class="course-name">${course.title}</p></div>`;
        courseBox.addEventListener('click', function() {
            document.getElementById('modal-course-number').innerText = course["subject"] + ' ' + course["number"];
            document.getElementById('modal-course-name').innerText = course.title;
            document.getElementById('modal-course-description').innerText = course.description;
            document.getElementById('modal-course-credits').innerText = `Credits: 4.00`;
            document.getElementById('modal').style.display = 'flex';
        });
            courseContainer.appendChild(courseBox);
    });




//     fetchData(url).then(
//     data => {
//         const courseArray = data;
//         const courseContainer = document.getElementById('course-container');
//     // Loop through each course in the array and create course boxes dynamically
//     courseArray.forEach(course => {
//         const courseBox = document.createElement('div');
//         courseBox.className = 'course-box';
//         courseBox.innerHTML = `<div class="course-front"><h3 class="course-number">${course.subject} ${course.number}</h3><p class="course-name">${course.title}</p></div>`;
//         courseBox.addEventListener('click', function() {
//             document.getElementById('modal-course-number').innerText = course.subject + ' ' + course.number;
//             document.getElementById('modal-course-name').innerText = course.title;
//             document.getElementById('modal-course-description').innerText = course.description;
//             document.getElementById('modal-course-credits').innerText = `Credits: 4.00`;
//             document.getElementById('modal').style.display = 'flex';
//         });
//         courseContainer.appendChild(courseBox);
//     });
//
//     }
// )
    
    // Add event listener to close the modal when close button is clicked
    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('modal').style.display = 'none';
    });
});

// Function to filter courses
function filterCourses() {
    let input = document.getElementById('searchInput').value.toUpperCase();
    let courses = document.querySelectorAll('.course-box');
    for (let i = 0; i < courses.length; i++) {
        let courseInfo = courses[i].querySelector(".course-front").innerText;
        if (courseInfo.toUpperCase().includes(input)) {
            courses[i].style.display = "";
        } else {
            courses[i].style.display = "none";
        }
    }
}

