export async function deleteCourse(courseID) {
	try {
		const token = sessionStorage.getItem('accessToken')

		console.log(courseID)

		const params = new URLSearchParams({id: courseID}).toString()

		const response = await fetch(`/api/student/enrolled-course?${params}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},

		});

		return response.ok;


	} catch (error) {
		console.error("Login error:", error);
	}
}