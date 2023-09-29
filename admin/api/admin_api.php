<?php

use function PHPSTORM_META\override;

require("../../includes/connection.php");

class movie_info
{

    function add_movie_info($conn, $json)
    {

        $json = json_decode($_POST['json'], true);

        $title_name = $json['title_name'];
        $image_link = $json['image_link'];
        $synopsis = $json['synopsis'];

        $sql = "INSERT INTO `tbl_movie_info`(`title_name`, `movie_image`, `synopsis`)";
        $sql .= " VALUES (:title_name, :image_link, :synopsis)";

        $stmt = $conn->prepare($sql);

        $stmt->bindParam(":title_name", $title_name);
        $stmt->bindParam(":image_link", $image_link);
        $stmt->bindParam(":synopsis", $synopsis);

        $stmt->execute();

        $result = $stmt->rowCount() > 0 ? 1 : 0;

        return $result;

    }

    function update_movie_info($conn, $json)
    {

        $json = json_decode($_POST['json'], true);

        $title_id = $json['title_id'];
        $title_name = $json['title_name'];
        $image_link = $json['image_link'];
        $synopsis = $json['synopsis'];

        $sql = "UPDATE `tbl_movie_info` SET `title_name`= :title_name,`movie_image`=:image_link ,`synopsis`= :synopsis WHERE `title_id` = :title_id";

        $stmt = $conn->prepare($sql);

        $stmt->bindParam(":title_id", $title_id);
        $stmt->bindParam(":title_name", $title_name);
        $stmt->bindParam(":image_link", $image_link);
        $stmt->bindParam(":synopsis", $synopsis);

        $stmt->execute();

        $result = $stmt->rowCount() > 0 ? 1 : 0;

        echo $result;
    }


    function add_actors($conn, $json)
    {

        $json = json_decode($_POST['json'], true);

        $actor_firstname = $json['actor_firstname'];
        $actor_lastname = $json['actor_lastname'];

        $sql = "INSERT INTO `tbl_actors`(`actor_firstname`, `actor_lastname`)";
        $sql .= " VALUES (:actor_firstname, :actor_lastname)";

        $stmt = $conn->prepare($sql);

        $stmt->bindParam(":actor_firstname", $actor_firstname);
        $stmt->bindParam(":actor_lastname", $actor_lastname);

        if ($stmt->execute()) {
            echo 1;
        } else {

            echo 0;
        }

    }

    function add_director($conn, $json)
    {

        $json = json_decode($_POST['json'], true);

        $director_firstname = $json['director_firstname'];
        $director_lastname = $json['director_lastname'];

        $sql = "INSERT INTO `tbl_directors`(`director_firstname`, `director_lastname`)";
        $sql .= " VALUES (:director_firstname, :director_lastname)";

        $stmt = $conn->prepare($sql);

        $stmt->bindParam(":director_firstname", $director_firstname);
        $stmt->bindParam(":director_lastname", $director_lastname);

        $stmt->execute();

        $result = $stmt->rowCount() > 0 ? 1 : 0;

        echo $result;

    }

    function get_movies($conn)
    {

        $sql = "SELECT * FROM `tbl_movie_info`";

        $stmt = $conn->prepare($sql);
        $stmt->execute();

        $value = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $conn = null;
        $stmt = null;

        echo json_encode($value);
    }

    function get_users($conn)
    {
        $sql = "SELECT * FROM `tbl_users`";

        $stmt = $conn->prepare($sql);

        $stmt->execute();

        $user_result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($user_result);
    }

    function get_directors($conn)
    {
        $sql = "SELECT * FROM `tbl_directors`";

        $stmt = $conn->prepare($sql);
        $stmt->execute();

        $directors_result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($directors_result);
    }

    function get_actors($conn)
    {

        $sql = "SELECT * FROM `tbl_actors`";

        $stmt = $conn->prepare($sql);

        $stmt->execute();

        $actors_list = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($actors_list);

    }

    function getTotal_users($conn)
    {
        // SELECT COUNT(*) AS user_count FROM mysql.user;

        $sql = "SELECT COUNT(*) AS user_count FROM tbl_users";

        $stmt = $conn->prepare($sql);

        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode($result);

    }

    function getTotal_directors($conn)
    {
        $sql = "SELECT COUNT(*) AS director_count FROM tbl_directors";

        $stmt = $conn->prepare($sql);

        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode($result);
    }

    function getTotal_movies($conn)
    {
        $sql = "SELECT COUNT(*) AS movie_count FROM tbl_movie_info";

        $stmt = $conn->prepare($sql);

        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode($result);
    }

    function publish_movie($conn, $json)
    {

        $json = json_decode($_POST['json'], true);

        $title_id = $json['title_id'];
        $director_id = $json['director_id'];
        $actor_id = $json['actor_id'];

        $sql = "INSERT INTO `tbl_movies`(`title_id`, `director_id`, `actor_id`)";
        $sql .= " VALUES(:title_id, :director_id, :actor_id)";

        $stmt = $conn->prepare($sql);

        $stmt->bindParam(":title_id", $title_id);
        $stmt->bindParam(":director_id", $director_id);
        $stmt->bindParam(":actor_id", $actor_id);

        $stmt->execute();

        $result = $stmt->rowCount() > 0 ? 1 : 0;

        echo json_encode($result);
    }

    function getTotal_actors($conn)
    {
        $sql = "SELECT COUNT(*) AS actor_count FROM tbl_actors";

        $stmt = $conn->prepare($sql);

        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode($result);
    }

    function getAllMovieTitle($conn)
    {
        $sql = "SELECT `title_id` ,`title_name` FROM `tbl_movie_info`";
        $stmt1 = $conn->prepare($sql);
        $stmt1->execute();
        $result = $stmt1->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
    }

    function getAllDirectors($conn)
    {

        $sql2 = "SELECT * FROM `tbl_directors`";
        $stmt2 = $conn->prepare($sql2);
        $stmt2->execute();
        $result2 = $stmt2->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result2);
    }



    function getAllActors($conn)
    {
        $sql = "SELECT * FROM `tbl_actors`";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
    }

}

$movies = new movie_info();
$op = $_POST['op'];

$json = isset($_POST['json']) ? $_POST['json'] : "";

switch ($op) {

    case 'add_movie_info':
        echo $movies->add_movie_info($conn, $json);
        break;

    case 'add_actors':
        $movies->add_actors($conn, $json);
        break;

    case 'add_directors':
        $movies->add_director($conn, $json);
        break;

    case 'get_movies':
        $movies->get_movies($conn);
        break;

    case 'get_user':
        $movies->get_users($conn);
        break;

    case 'get_directors':
        $movies->get_directors($conn);
        break;

    case 'get_actors':
        $movies->get_actors($conn);
        break;

    case 'get_total_users':
        $movies->getTotal_users($conn);
        break;

    case 'get_total_directors':
        $movies->getTotal_directors($conn);
        break;

    case 'get_total_movie':
        $movies->getTotal_movies($conn);
        break;

    case 'get_total_actors':
        $movies->getTotal_actors($conn);
        break;

    case 'pub_movie':
        $movies->publish_movie($conn, $json);
        break;

    case 'getAllMovieTitle':
        $movies->getAllMovieTitle($conn);
        break;

    case 'getAllDirectors':
        $movies->getAllDirectors($conn);
        break;

    case 'getAllActors':
        $movies->getAllActors($conn);
        break;

    case 'update_movie_info':
        $movies->update_movie_info($conn, $json);
        break;
}


?>