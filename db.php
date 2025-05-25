<?php
$host = "localhost";
$dbname = "paw_palace";
$username = "root";
$password = ""; // XAMPP madhun default empty asto

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Database Connection Failed: " . $conn->connect_error);
}
?>
