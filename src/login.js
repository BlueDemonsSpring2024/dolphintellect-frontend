
async function loginUser(user, password) {
	try {
		console.log("Attempting login");
		const response = await fetch(`/api/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=utf-8"
			},
			body: JSON.stringify({ username: user, password: password })
		});

		console.log("Response status:", response.status);

		if (!response.ok) {
			console.log("Login failed");
			// Throw an error if response is not ok
			throw new Error(`Login failed with status ${response.status}`);
		}

		const responseData = await response.json();

		const { accessToken, tokenType } = responseData;

		console.log(`Access Token: ${accessToken}`);
		console.log(`Token Type: ${tokenType}`);

		return accessToken
		//save to session storage

		//check for access token



	} catch (error) {
		console.error("Login error:", error);
	}
}


function setToken(accessToken){
	let aToken = sessionStorage.getItem(accessToken);

	if(aToken){
		console.log("token exist")
	}
	else{
		sessionStorage.setItem('accessToken', accessToken)
	}
}




async function handleFormSubmit(event) {
	event.preventDefault(); // Prevent default form submission


	const userName = event.target[0].value
	const password = event.target[1].value
	console.log("USER", event.target[0].value)
	console.log("PASS", event.target[1].value)

	let token = await loginUser(userName, password)
	await setToken(token)

	console.log('accessToken', sessionStorage.getItem('accessToken'))
	//need to handle bad login
	// this.submit()

}

// Add event listener to the form for submission
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', handleFormSubmit);