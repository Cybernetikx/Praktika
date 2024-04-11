async function Click(){
    var username = document.getElementById("user").value;
    var password = document.getElementById("pass").value;

    axios.post('http://localhost:3000/auth/login', {
        username: username,
        password: password
    })
    .then(function (response){
        const token = response.data.access_token;
        if (token) {
            window.location.href = 'acount.html?username=' + username + "&token=" + token; 
        }else{
            console.error("Токен на связи")
        }
    })
    .catch(function(error){
        var errormes = document.getElementById("error");
        errormes.textContent = "Ты кто? Такого логина и пароля нет"
    })
}

var urlp = new URLSearchParams(window.location.search);
var username = urlp.get("username");
username = username.charAt(0).toUpperCase() + username.slice(1);
document.getElementById('user').textContent = username;