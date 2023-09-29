<?php

require('../includes/connection.php');


class Movies
{

  function add_movie($conn, $json)
  {
    $json = json_decode($_POST['json'], true);

    $title = $json['title'];

    try {

      $conn->beginTransaction();

      $sql_movieTitle = "INSERT INTO `tbl_movie_info`(`title_name`) VALUES (:title)";
      $stmt1 = $conn->prepare($sql_movieTitle);
      $stmt1->bindParam(":title", $title);
      $stmt1->execute();

      $conn->commit();
      $returnVal = 1;

    } catch (Exception $ex) {
      echo $ex->getMessage();
      $conn->rollback();
      $returnVal = 0;
    }
    echo $returnVal;

  }


  function display_movie_details($conn, $json)
  {
    $json = json_decode($_POST['json'], true);
    $title_id = $json['title_id'];

    $sql = "SELECT
    tbl_movies.title_id,
    tbl_movie_info.title_name,
    tbl_movie_info.movie_image,
    tbl_movie_info.synopsis,
    GROUP_CONCAT(tbl_actors.actor_firstname, ' ', tbl_actors.actor_lastname) AS actors,
    GROUP_CONCAT(tbl_directors.director_firstname, ' ', tbl_directors.director_lastname) AS directors
FROM
    tbl_movies
    INNER JOIN tbl_movie_info ON tbl_movies.title_id = tbl_movie_info.title_id
    INNER JOIN tbl_actors ON tbl_movies.actor_id = tbl_actors.actor_id
    INNER JOIN tbl_directors ON tbl_movies.director_id = tbl_directors.director_id
WHERE
    tbl_movies.title_id = :title_id
GROUP BY
    tbl_movies.title_id, tbl_movie_info.title_name, tbl_movie_info.movie_image;
";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':title_id', $title_id, PDO::PARAM_INT);
    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC);



    $conn = null;
    $stmt = null;

    $movieTitle = $result['title_name'];
    $actors = explode(',', $result['actors']);
    $directors = explode(',', $result['directors']);
    $movieImage = $result['movie_image'];
    $synopsis = $result['synopsis'];

    $response = [
      'title_id' => $title_id,
      'title_name' => $movieTitle,
      'actors' => $actors,
      'directors' => array_unique($directors),
      'movie_image' => $movieImage,
      'synopsis' => $synopsis,
    ];

    echo json_encode("hello");
  }


  function display_all_movie($conn)
  {

    $sql = "SELECT * FROM tbl_movie_info";

    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    //echo json_encode($result);

  }


}

$movie = new Movies();
$json = isset($_POST['json']) ? $_POST['json'] : "";
$op = $_POST['op'];

switch ($op) {

  case 'add_movie':
    echo $movie->add_movie($conn, $json);
    break;
  case 'display_movie_details':
    echo $movie->display_movie_details($conn, $json);
    break;
  case 'display_all_movie':
    echo $movie->display_all_movie($conn);
    break;
}
?>