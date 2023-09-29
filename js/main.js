
const getAllMovies = () => {
  const formData = new FormData();
  formData.append("op", "display_all_movie");
  axios({
    url: "http://localhost/movie/api/movie.php",
    method: "POST",
    data: formData,
  })
    .then((response) => {
      if (response.data.length == 0) {
        alert("No data here");
      } else {
        displayAllMovies(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};


const displayAllMovies = (data) => {
  const movieContainer = document.getElementById("movie_container");
  movieContainer.innerHTML = "";

  data.forEach((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie-tile");

    const movieImage = document.createElement("img");
    movieImage.src = movie.movie_image;
    movieImage.alt = movie.title_name;

    const movieLink = document.createElement("a");
    movieLink.href =
      "http://localhost/rotten-tomatoe/movie.html?title_id=" + movie.title_id;

    const movieTitle = document.createElement("p");
    movieTitle.classList.add("header");
    movieTitle.innerText = movie.title_name;

    movieDiv.appendChild(movieImage);
    movieLink.appendChild(movieTitle);
    movieDiv.appendChild(movieLink);

    movieContainer.appendChild(movieDiv);
  });
};


window.addEventListener("load", function () {
  const user_session = sessionStorage.getItem("user_id");

  this.document.getElementById("usr").style.display = "none";
  if (user_session) {
    var auth = document.getElementById("auth");
    auth.href = "index.html";
    auth.textContent = "Sign Out";

    auth.onclick = function() {
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("user_id");
      window.location.href = "index.html";
    }

    this.document.getElementById('username').textContent = this.sessionStorage.getItem("username");
    this.document.getElementById("usr").style.display = "inline";
    this.document.getElementById("reg").style.display = "none";
  }

  getAllMovies();
});


