window.addEventListener("load", function () {

  const user_session = this.sessionStorage.getItem("user_id");

  if(user_session){
    this.window.location = "index.html";
  }else{
    operation(action);
    }
});

function operation(action) {
  switch (action) {
    case "signup":
      user_signup();
      break;
    case "signin":
      user_signin();
      break;
    case "signout":
      sign_out();
      break;
  }
}

const user_signup = () => {
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (fname.trim() === "") {
    alert("Please enter your first name.");
    return;
  }
  if (lname.trim() === "") {
    alert("Please enter your last name.");
    return;
  }
  if (username.trim() === "") {
    alert("Please enter a username.");
    return;
  }
  if (password.trim() === "") {
    alert("Please enter a password.");
    return;
  }

  const json = {
    fname: fname,
    lname: lname,
    username: username,
    password: password,
  };

  const formData = new FormData();
  formData.append("json", JSON.stringify(json));
  formData.append("op", "signup");

  axios({
    url: "http://localhost/movie/api/user_api.php",
    method: "POST",
    data: formData,
  })
    .then((response) => {
      if (response.data == 1) {
        alert("Registration Success!");
      } else {
        alert(response.data);
      }
      location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
};

const user_signin = () => {
  const username = document.getElementById("username_login").value;
  const password = document.getElementById("pwd").value;

  if (username.trim() === "") {
    alert("Please enter your username.");
    return;
  }
  if (password.trim() === "") {
    alert("Please enter your password.");
    return;
  }

  const json = {
    username: username,
    password: password,
  };

  const formData = new FormData();
  formData.append("json", JSON.stringify(json));
  formData.append("op", "signin");

  axios({
    url: "http://localhost/movie/api/user_api.php",
    method: "POST",
    data: formData,
  })
    .then((response) => {
      if (response.data == 0) {
        alert("Invalid Credentials");
      } else {
        console.log(response.data);
        sessionStorage.setItem("username", response.data.username);
        sessionStorage.setItem("user_id", response.data.user_id);
        window.location = "index.html";
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
