const getUsers = () => {
  const formData = new FormData();

  formData.append("op", "get_user");

  axios({
    url: "http://localhost/rotten-tomatoe/admin/api/admin_api.php",
    method: "POST",
    data: formData,
  })
    .then((response) => {
      if (response.data.length == 0) {
        alert("No user found");
      } else {
        displayUser(response.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const displayUser = (rdUsers) => {
  const insertToDiv = document.getElementById("mainDiv");
  var html = `
    <table class="table table-hover table-nowrap">
        <thead class="thead-light">
            <tr>
                <th scope="col">User ID</th>
                <th scope="col">Username</th>
                <th scope="col">Active State</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>`;

  rdUsers.forEach((user) => {
    html += `
            <tr>
                <td>
                    ${user.user_id}
                </td>

              <td>
                <img
                  alt="..."
                  src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                  class="avatar avatar-sm rounded-circle me-2"
                />
                <a class="text-heading font-semibold" href="#">
                 ${user.username}
                </a>
              </td>

              <td>
                <span class="badge badge-lg badge-dot">
                    <i class="bg-success"></i>Online
                </span>
              </td>

              <td class="text-end">
                        <a href="#" class="btn btn-sm btn-neutral">View</a>
                        <button
                          type="button"
                          class="btn btn-sm btn-square btn-neutral text-danger-hover"
                        >
                          <i class="bi bi-trash"></i>
                        </button>
                      </td>

            </tr>
            `;
  });

  html += ` </tbody></table>`;
  insertToDiv.innerHTML = html;
};

const getTotalUsers = () => {
  const data = new FormData();
  data.append("op", "get_total_users");

  axios({
    url: "http://localhost/rotten-tomatoe/admin/api/admin_api.php",
    method: "POST",
    data: data,
  })
    .then((respose) => {
      if (respose.data.length == 0) {
        document.getElementById("user-count").textContent = "0";
      } else {
        document.getElementById("user-count").textContent =
          respose.data.user_count;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const getTotalDirector = () => {
  const data = new FormData();
  data.append("op", "get_total_directors");

  axios({
    url: "http://localhost/rotten-tomatoe/admin/api/admin_api.php",
    method: "POST",
    data: data,
  })
    .then((respose) => {
      if (respose.data.length == 0) {
        document.getElementById("director-count").textContent = "0";
      } else {
        document.getElementById("director-count").textContent =
          respose.data.director_count;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const getTotalMovie = () => {
  const data = new FormData();
  data.append("op", "get_total_movie");

  axios({
    url: "http://localhost/rotten-tomatoe/admin/api/admin_api.php",
    method: "POST",
    data: data,
  })
    .then((respose) => {
      if (respose.data.length == 0) {
        document.getElementById("movie-count").textContent = "0";
      } else {
        document.getElementById("movie-count").textContent =
          respose.data.movie_count;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const getTotalActors = () => {
  const data = new FormData();
  data.append("op", "get_total_actors");

  axios({
    url: "http://localhost/rotten-tomatoe/admin/api/admin_api.php",
    method: "POST",
    data: data,
  })
    .then((respose) => {
      if (respose.data.length == 0) {
        document.getElementById("actor-count").textContent = "0";
      } else {
        document.getElementById("actor-count").textContent =
          respose.data.actor_count;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const getMovieTitles = () => {
  const formData = new FormData();
  formData.append("op", "getAllMovieTitle");

  axios({
    url: "http://localhost/rotten-tomatoe/admin/api/admin_api.php",
    method: "POST",
    data: formData,
  })
    .then((response) => {
      if (response.data.length === 0) {
        alert("No data to be retrieved!");
      } else {
        populateDropdown(response.data);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const populateDropdown = (data) => {
  const dropdown = document.getElementById("title_id");

  dropdown.innerHTML = "";

  data.forEach((record) => {
    const option = document.createElement("option");
    option.text = record.title_name;
    option.value = record.title_id;
    dropdown.appendChild(option);
  });
};

const getAllDirectors = () => {
  const formData = new FormData();
  formData.append("op", "getAllDirectors");

  axios({
    url: "http://localhost/rotten-tomatoe/admin/api/admin_api.php",
    method: "POST",
    data: formData,
  })
    .then((response) => {
      if (response.data.length === 0) {
        alert("No data to be retrieved!");
      } else {
        directorDropDown(response.data);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const directorDropDown = (data) => {
  const dropdown = document.getElementById("directorDropDown");

  dropdown.innerHTML = "";

  data.forEach((director) => {
    const option = document.createElement("option");
    option.text = `${director.director_firstname}, ${director.director_lastname}`;
    option.value = director.director_id;
    dropdown.appendChild(option);
  });
};

const getAllActors = () => {
  const formData = new FormData();
  formData.append("op", "getAllActors");

  axios({
    url: "http://localhost/rotten-tomatoe/admin/api/admin_api.php",
    method: "POST",
    data: formData,
  })
    .then((response) => {
      if (response.data.length === 0) {
        alert("No data to be retrieved!");
      } else {
        actorDropDown(response.data);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const actorDropDown = (data) => {
  const dropdown = document.getElementById("actorDropDown");

  dropdown.innerHTML = "";

  data.forEach((actor) => {
    const option = document.createElement("option");
    option.text = `${actor.actor_firstname}, ${actor.actor_lastname}`;
    option.value = actor.actor_id;
    dropdown.appendChild(option);
  });
};

const publish_movie = () => {
  let json = {
    title_id: document.getElementById("title_id").value,
    director_id: document.getElementById("directorDropDown").value,
    actor_id: document.getElementById("actorDropDown").value,
  };

  console.log(json);

  const formData = new FormData();

  formData.append("json", JSON.stringify(json));
  formData.append("op", "pub_movie");

  axios({
    url: "http://localhost/rotten-tomatoe/admin/api/admin_api.php",
    method: "POST",
    data: formData
  }).then((response) => {
       if(response.data == 0){
        console.log("Something went wrong");
       }else{
        alert("Success");
        console.log(response.data);
        //location.reload();
       }
  }).catch((err) => {
    console.log(err)
  });
};

const eventHandler = () => {

    document.getElementById('save_changes').addEventListener('click', () => {
        publish_movie();
    })

    document.getElementById('title_id').addEventListener('change', () => {
        console.log(document.getElementById('title_id').value);
    })
}

eventHandler();

window.addEventListener("load", function () {
  getUsers();
  getTotalUsers();
  getTotalDirector();
  getTotalMovie();
  getTotalActors();
  getMovieTitles();
  getAllDirectors();
  getAllActors();
});
