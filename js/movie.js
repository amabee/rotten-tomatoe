window.addEventListener("load", function () {
  const user_session = sessionStorage.getItem("user_id");

  this.document.getElementById("usr").style.display = "none";
  this.document.getElementById("btn_review").style.display = "none";

  if (user_session) {
    var auth = document.getElementById("auth");
    auth.href = "index.html";
    auth.textContent = "Sign Out";

    auth.onclick = function () {
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("user_id");
      window.location.href = "index.html";
    };

    this.document.getElementById("username").textContent =
      this.sessionStorage.getItem("username");
    this.document.getElementById("btn_review").style.display = "block";
    this.document.getElementById("usr").style.display = "inline";
    this.document.getElementById("reg").style.display = "none";
  }

  getMovieDetails();
  getReviews();
});

const urlParams = new URLSearchParams(window.location.search);
const data = urlParams.get("title_id");

const getReviews = () => {
  const json = {
    title_id: data, 
  };

  const formData = new FormData();

  formData.append("op", "get_reviews");
  formData.append("json", JSON.stringify(json));

  axios({
    url: "http://localhost/rotten-tomatoe/api/review.php",
    method: "POST",
    data: formData,
  })
    .then((response) => {
      if (response.data.length === 0) { 
        alert("There are no reviews."); 
      } else {
        console.log(response.data);
        displayReviews(response.data);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const displayReviews = (data) => {
  const myDiv = document.getElementById("reviewss");

  data.forEach((review) => {
    const reviewDiv = document.createElement('div');
    reviewDiv.classList.add('reviews-column');

    const quoteElement = document.createElement('p');
    const quote = document.createElement('q');
    const tomatoeState = document.createElement('img');
    tomatoeState.src = 'assets/fresh.gif';
    tomatoeState.alt = 'http://t.me/pinay_alter';
    quote.textContent = review.review;
    quoteElement.appendChild(tomatoeState);
    quoteElement.appendChild(quote);
    
    const userInfoElement = document.createElement('p');
    const criticImage = document.createElement('img');
    criticImage.src = 'assets/critic.gif';
    criticImage.alt = 'Critic';
    const userName = document.createTextNode(`${review.user_fname} ${review.user_lname}`);
    const emElement = document.createElement('em');
    emElement.textContent = `${review.username}`;

    userInfoElement.appendChild(criticImage);
    userInfoElement.appendChild(userName);
    userInfoElement.appendChild(document.createElement('br'));
    userInfoElement.appendChild(emElement);

    reviewDiv.appendChild(quoteElement);
    reviewDiv.appendChild(userInfoElement);

    myDiv.appendChild(reviewDiv);
  });
};



const getMovieDetails = () => {
  const showIdButton = document.getElementById("btn_review");
  showIdButton.setAttribute("data-title-id", data);

  if (!data) {
    console.log("No title_id in URL");
    return;
  }

  const formData = new FormData();
  const json = {
    title_id: data,
  };
  formData.append("op", "display_movie_details");
  formData.append("json", JSON.stringify(json));

  axios({
    url: "http://localhost/movie/api/movie.php",
    method: "POST",
    data: formData,
  })
    .then((response) => {
      console.log(response);
      if (response.data && response.data.title_name) {
        displayMovieDetails(response.data);
      } else {
        console.log("No Data here");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const displayMovieDetails = (data) => {
  const dlDisplay = document.getElementById("desc_list");
  const titleDisplay = document.getElementById("title_here");
  const movieImageElement = document.getElementById("movie_image");

  dlDisplay.innerHTML = "";
  titleDisplay.textContent = "";

  titleDisplay.textContent = data.title_name;

  const dtDirector = document.createElement("dt");
  dtDirector.textContent = "Directors:";
  dlDisplay.appendChild(dtDirector);

  data.directors.forEach((director) => {
    const ddDirector = document.createElement("dd");
    ddDirector.textContent = director;
    dlDisplay.appendChild(ddDirector);
  });

  const dtActors = document.createElement("dt");
  dtActors.textContent = "Cast:";
  dlDisplay.appendChild(dtActors);

  data.actors.forEach((actor) => {
    const ddActor = document.createElement("dd");
    ddActor.textContent = actor;
    dlDisplay.appendChild(ddActor);
  });

  const dtSynopsis = document.createElement("dt");
  const ddSynopsis = document.createElement("dd");
  dtSynopsis.textContent = "Synopsis:";
  ddSynopsis.textContent = data.title_id;
  dlDisplay.appendChild(dtSynopsis);
  dlDisplay.appendChild(ddSynopsis);

  movieImageElement.src = data.movie_image;
};

const reviewModal = document.getElementById("btn_review");

reviewModal.addEventListener("click", () => {
  const titleId = reviewModal.getAttribute("data-title-id");

  document.getElementById("title_id").value = titleId;

  document.getElementById("txt-username").value =
    this.sessionStorage.getItem("username");
});

const movie_rate = () => {
  document.getElementById("movie-range").addEventListener("input", () => {
    const rangeValueSpan = document.getElementById("rangeValue");

    const value = document.getElementById("movie-range").value;
    rangeValueSpan.textContent = value;
  });
};

const publishReview = () => {
  const json = {
    title_id: document.getElementById("title_id").value,
    user_id: sessionStorage.getItem("user_id"),
    review_rate: document.getElementById("movie-range").value,
    review: document.getElementById("review-content").value,
  };

  const formData = new FormData();

  formData.append("json", JSON.stringify(json));
  formData.append("op", "add_review");

  axios({
    url: "http://localhost/rotten-tomatoe/api/review.php",
    method: "POST",
    data: formData,
  })
    .then((response) => {
      if (response.data == 0) {
        alert("Something went wrong: " + response);
      } else {
        alert("Success");
        location.reload();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const setEventListener = () => {
  const pub = document.getElementById("btn_publish");
  pub.addEventListener("click", () => {
    publishReview();
  });
};

setEventListener();
