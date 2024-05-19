export async function getStudent() {
	try {

		const token = sessionStorage.getItem('accessToken')
		const response = await fetch(`/api/student`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`
			},
		});

		let student =  await response.json()


		return student
	} catch (error) {
		console.error(error);
	}
}



