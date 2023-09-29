const getActors = () => {
  const formData = new FormData();

  formData.append("op", "getAllActors");

  axios({
    url: "http://localhost/rotten-tomatoe/admin/api/admin_api.php",
    method: "POST",
    data: formData,
  })
    .then((response) => {
      if (response.data.length == 0) {
        alert("No actors found");
      } else {
        listActors(response.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const listActors = (data) => {
  const insertToDiv = document.getElementById("mainDiv");
  var html = `
            <table class="table table-hover table-nowrap">
                <thead class="thead-light">
                    <tr>
                        <th scope="col">Actor ID</th>
                        <th scope="col">Actor Firstname</th>
                        <th scope="col">Actor Lastname</th>
                        <th scope="col" class="text-end">Actions</th>
                    </tr>
                </thead>
                <tbody>`;

  data.forEach((actor) => {
    html += `
                    <tr>
                        <td>
                            ${actor.actor_id}
                        </td>
        
                      <td>                      
                        <a class="text-heading font-semibold" href="#">
                         ${actor.actor_firstname}
                        </a>                   
                      </td>

                      <td>                      
                        <a class="text-heading font-semibold" href="#">
                         ${actor.actor_lastname}
                        </a>                   
                      </td>
      
                      <td class="text-end">
                                <a href="#" class="btn btn-sm btn-neutral">Update</a>
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

const addActors = () =>{

  const json = {
    actor_firstname: document.getElementById('fname').value,
    actor_lastname: document.getElementById('lname').value
  };

  const formData = new FormData();

  formData.append("json", JSON.stringify(json));
  formData.append("op", "add_actors");

  axios({
    url: "http://localhost/rotten-tomatoe/admin/api/admin_api.php",
    method: "POST",
    data: formData
  }).then((response) => {
    if(response.data == 0){
      alert("Error: " + response.data);
    }else{
      alert("Success");
    }
  }).catch((err) => {
    console.log(err);
  });

}

const eventListener = () =>{
  document.getElementById('save_changes').addEventListener("click", () => {
    addActors();
  })
}

eventListener();


window.addEventListener("load", () => {
    getActors();
});
