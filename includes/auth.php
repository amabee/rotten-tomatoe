<?php
// Start a session or resume the existing session
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['op']) && $_POST['op'] === 'signin') {
    // Validate username and password (you should hash and compare passwords securely)
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Authenticate the user (you would typically query a database)
    if ($username === 'valid_username' && $password === 'valid_password') {
        // Store user data in the session
        $_SESSION['username'] = $username;

        // Send a success response to the client
        echo 1;
    } else {
        echo "Invalid username or password";
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['op']) && $_GET['op'] === 'logout') {
    // Log the user out by destroying the session
    session_destroy();
    echo "Logged out successfully";
} else {
    // Handle other requests or provide protected resources
    // Check if the user is authenticated by checking the session
    if (isset($_SESSION['username'])) {
        // User is authenticated
        echo "Welcome, " . $_SESSION['username'];
    } else {
        echo "Not authenticated";
    }
}
?>
