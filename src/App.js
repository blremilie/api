async function request(){
let api = await fetch("https://cleanuri.com/api/v1/shorten", 

{method: "POST", 
headers: {"Content-Type": "application/x-www-form-urlencoded"}, 
body: document.getElementById ("url")})
    return api.json()
}

request();