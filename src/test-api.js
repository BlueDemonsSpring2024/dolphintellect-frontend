

console.log("API HEALTH TEST");

async function healthCheck() {
	try {
		let response = await fetch("/api/health", {
			method: "GET",
			headers: {}
		});

		if (!response.ok) {
			throw new Error("Failed to fetch health status");
		}

		const result = await response.text();
		console.log(result);
	} catch (error) {
		console.error("Error performing health check:", error);
	}
}

healthCheck().then(r => {}); // Call the async function




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


		//save to session storage

		//check for access token
		let aToken = sessionStorage.getItem(accessToken);

		if(aToken){
			console.log("token exist")
		}
		else{
			sessionStorage.setItem('accessToken', accessToken)
		}


	} catch (error) {
		console.error("Login error:", error);
	}
}


loginUser("admin", "tempPassword").then(r => {})



