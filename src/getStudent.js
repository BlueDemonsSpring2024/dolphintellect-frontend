export async function getStudent() {
	try {
		console.log("Getting Student")

		const token = sessionStorage.getItem('accessToken')
		const response = await fetch(`/api/student`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`
			},
		});

		let student =  await response.json()

		console.log("Student", student)

		return student
	} catch (error) {
		console.error(error);
	}
}



