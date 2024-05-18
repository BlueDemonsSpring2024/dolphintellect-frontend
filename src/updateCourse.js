export async function updateCourse(courseData) {
	try {
		const token = sessionStorage.getItem('accessToken')

		console.log(courseData)
		console.log(JSON.stringify(courseData))


		const response = await fetch(`/api/student/enrolled-course`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json; charset=utf-8"
			},
			body: JSON.stringify(courseData)
		});

		return response.ok;


	} catch (error) {
		console.error("Login error:", error);
	}
}