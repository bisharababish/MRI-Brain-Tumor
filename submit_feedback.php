<?php
// feedbackdatabase
// bisharababish
// Bishara112#
$servername = "fdb1029.awardspace.net";
$username = "4566618_feedbackdatabase";
$password = "Bishara112#";
$database = "4566618_feedbackdatabase";

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
    header(header: "Location: index.html");
    exit();
}

?>