const getMovies = () => {
  const formData = new FormData();

  formData.append("op", "get_movies");

  axios({
    url: "http://localhost/rotten-tomatoe/admin/api/admin_api.php",
    method: "POST",
    data: formData,
  })
    .then((response) => {
      if (response.data.length == 0) {
        alert("No movies found");
      } else {
        listMovie(response.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const listMovie = (rdMovies) => {
  const insertToDiv = document.getElementById("mainDiv");
  var html = `
      <table class="table table-hover table-nowrap">
          <thead class="thead-light">
              <tr>
                  <th scope="col">Movie ID</th>
                  <th scope="col">Movie Title</th>
                  <th scope="col" class="text-end">Actions</th>
              </tr>
          </thead>
          <tbody>`;

  rdMovies.forEach((movie) => {
    html += `
              <tr>
                <td>${movie.title_id}</td>
                <td>
                  <img alt="..." src="${movie.movie_image}" class="avatar avatar-lg rounded-circle me-2" />
                  <a class="text-heading font-semibold" href="#">${movie.title_name}</a>
                </td>
                <td class="text-end">
                  <a href="#" class="btn btn-sm btn-neutral"
                    data-bs-toggle="modal"
                    data-bs-target="#updateModal"
                    data-id = "${movie.title_id}"
                    data-title="${movie.title_name}"
                    data-image="${movie.movie_image}"
                    data-synopsis="${movie.synopsis}"
                    onclick="updateButtonEvent(this)">Update</a>
                  <button type="button" class="btn btn-sm btn-square btn-neutral text-danger-hover">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            `;
  });

  html += ` </tbody></table>`;
  insertToDiv.innerHTML = html;
};

const addMovies = () => {
  const json = {
    title_name: document.getElementById("title").value,
    image_link: document.getElementById("movie_image").value,
    synopsis: document.getElementById("synopsis").value,
  };

  const formData = new FormData();

  formData.append("json", JSON.stringify(json));
  formData.append("op", "add_movie_info");

  axios({
    url: "http://localhost/rotten-tomatoe/admin/api/admin_api.php",
    method: "POST",
    data: formData,
  })
    .then((response) => {
      if (response.data == 1) {
        alert("Success!");
        window.location = "movies.html";
      } else {
        alert("Failed");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateButtonEvent = (button) => {

    const id = button.getAttribute("data-id")
    const title = button.getAttribute("data-title");
    const image = button.getAttribute("data-image");
    const synopsis = button.getAttribute("data-synopsis");

    document.getElementById("up-id").value = id; 
    document.getElementById("up-title").value = title; 
    document.getElementById("up-movie_image").value = image; 
    document.getElementById("up-synopsis").value = synopsis; 
};

const updateMovies = () => {
  const json = {
    title_id: document.getElementById('up-id').value,
    title_name: document.getElementById("up-title").value,
    image_link: document.getElementById("up-movie_image").value,
    synopsis: document.getElementById("up-synopsis").value,
  };

  const formData = new FormData();

  formData.append("json", JSON.stringify(json));
  formData.append("op", "update_movie_info");

  axios({
    url: "http://localhost/rotten-tomatoe/admin/api/admin_api.php",
    method: "POST",
    data: formData,
  })
    .then((response) => {
      if (response.data == 1) {
        alert("Success!");
        window.location = "movies.html";
      } else {
        console.log(response.data);
        alert("Failed");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const eventHandler = () => {
  document.getElementById("save_changes").addEventListener("click", () => {
    addMovies();
  });

  document.getElementById('save_update').addEventListener("click", () => {
    updateMovies();
  })
};

window.addEventListener("load", function () {
  getMovies();
});

eventHandler();
