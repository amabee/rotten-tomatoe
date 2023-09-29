function onLoadCheck(){

    const user_id = sessionStorage.getItem("user_id");
    if(!user_id){
        window.location = "main.html";
    }
    
        document.getElementById('username').innerText = sessionStorage.getItem('username');  
}


