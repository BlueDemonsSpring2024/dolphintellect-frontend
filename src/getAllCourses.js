

export async function getAllCourses() {
	try {
		const response = await fetch(`/api/courses`, {
			method: "GET",
			headers: {},
		});

		return await response.json()


		// console.log(responseData)


	} catch (error) {
		console.error(error);
	}
}