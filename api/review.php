<?php

require('../includes/connection.php');
class Review
{

    function add_review($conn, $json)
    {

        $json = json_decode($_POST['json'], true);

        $title_id = $json['title_id'];
        $user_id = $json['user_id'];
        $review_rate = $json['review_rate'];
        $review = $json['review'];

        $sql = "INSERT INTO `tbl_reviews`(`title_id`, `user_id`, `review_rate`, `review`) ";
        $sql .= " VALUES (:title_id, :user_id, :review_rate, :review)";

        $stmt = $conn->prepare($sql);

        $stmt->bindParam(":title_id", $title_id);
        $stmt->bindParam(":user_id", $user_id);
        $stmt->bindParam(":review_rate", $review_rate);
        $stmt->bindParam(":review", $review);

        $stmt->execute();

        $result = $stmt->rowCount() > 0 ? 1 : 0;

        echo $result;
    }

    function get_reviews($conn, $json)
    {

        $json = json_decode($_POST['json'], true);
        $title_id = $json['title_id'];

        $sql = "SELECT tbl_reviews.review_id, 
        tbl_users.user_fname,
        tbl_users.user_lname,
        tbl_users.username,
        tbl_reviews.review
        FROM tbl_reviews
        INNER JOIN tbl_users ON tbl_reviews.user_id = tbl_users.user_id
        WHERE tbl_reviews.title_id = :title_id";

        $stmt = $conn->prepare($sql);

        $stmt->bindParam(":title_id", $title_id);

        $stmt->execute();

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($result);
    }


}

$review = new Review();
$json = isset($_POST['json']) ? $_POST['json'] : "";
$op = $_POST['op'];

switch ($op) {
    case 'add_review':
        $review->add_review($conn, $json);
        break;

    case 'get_reviews':
        $review->get_reviews($conn, $json);
        break;
}

?>