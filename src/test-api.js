

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




// attempt login and JWT retrieval


// async function loginUser(){
// 	try{
// 		const response = await fetch("http://localhost:8081/api/auth/login",
// 			{
// 			"method": "POST",
// 			"headers": {
// 				"Content-Type": "application/json; charset=utf-8"
// 			},
// 			"body": "{\"username\":\"dshiland\",\"password\":\"password\"}"
// 		})
//
// 		if(!response.ok){
// 			throw new Error("Unable to login")
// 		}
//
// 		const {accessToken} = await response.json()
// 	}
// }


// fetch("http://localhost:8081/api/auth/login", {
// 	"method": "POST",
// 	"headers": {
// 		"Content-Type": "application/json; charset=utf-8"
// 	},
// 	"body": "{\"username\":\"dshiland\",\"password\":\"password\"}"
// })
// 	.then((res) => res.text())
// 	.then(console.log.bind(console))
// 	.catch(console.error.bind(console));