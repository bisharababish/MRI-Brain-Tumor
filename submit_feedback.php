<?php
$servername = "localhost:3307";
$username = "root";
$password = "";
$database = "feedbackdatabase";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $stmt = $conn->prepare("INSERT INTO feedbackdb (name, email, feedback_message) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $feedback_message);
    $name = $_POST['name'];
    $email = $_POST['email'];
    $feedback_message = $_POST['message'];
    $stmt->execute();
    $stmt->close();
    $conn->close();
    header("Location: /index.html");
    exit();
}

?>