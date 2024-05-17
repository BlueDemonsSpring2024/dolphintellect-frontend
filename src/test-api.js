// const apiEndpoint = "http://localhost:8080"



// fetch("http://localhost:8080/student/all", {
// 	"method": "GET",
// 	"headers": {
// 		"Authorization": "Bearer",
// 		"Cookie": "JSESSIONID=221FFF3E607AA4D6998C5F1E4EB44EE0"
// 	}
// })
// 	.then((res) => res.text())
// 	.then(console.log.bind(console))
// 	.catch(console.error.bind(console));


console.log("API SCRIPT TEST")


fetch("/api/health", {
	"method": "GET",
	"headers": {}
})
	.then((res) => res.text())
	.then(console.log.bind(console))
	.catch(console.error.bind(console));



// fetch("http://dolphintellect-api:8080/api/health", {
// 	"method": "GET",
// 	"headers": {}
// })
// 	.then((res) => res.text())
// 	.then(console.log.bind(console))
// 	.catch(console.error.bind(console));



// fetch("http://0.0.0.0:8080/api/health", {
// 	"method": "GET",
// 	"headers": {}
// })
// 	.then((res) => res.text())
// 	.then(console.log.bind(console))
// 	.catch(console.error.bind(console));


// fetch("http://localhost:8081/api/health", {
// 	"method": "GET",
// 	"headers": {}
// })
// 	.then((res) => res.text())
// 	.then(console.log.bind(console))
// 	.catch(console.error.bind(console));