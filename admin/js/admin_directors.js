const getDirectors = () => {
    const formData = new FormData();
  
    formData.append("op", "getAllDirectors");
  
    axios({
      url: "http://localhost/rotten-tomatoe/admin/api/admin_api.php",
      method: "POST",
      data: formData,
    })
      .then((response) => {
        if (response.data.length == 0) {
          alert("No actors found");
        } else {
          listDirectors(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  const listDirectors = (data) => {
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
  
    data.forEach((director) => {
      html += `
                      <tr>
                          <td>
                              ${director.director_id}
                          </td>
          
                        <td>                      
                          <a class="text-heading font-semibold" href="#">
                           ${director.director_firstname}
                          </a>                   
                        </td>
  
                        <td>                      
                          <a class="text-heading font-semibold" href="#">
                           ${director.director_lastname}
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
  
  window.addEventListener("load", () => {
    getDirectors();
  });
  