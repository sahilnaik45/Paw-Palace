<?php
include "db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $description = $_POST["description"];
    $price = $_POST["price"];
    $stock = $_POST["stock"];
    $category = $_POST["category"];
    
    // Image Upload
    $image = $_FILES["image"]["name"];
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($image);
    move_uploaded_file($_FILES["image"]["tmp_name"], $target_file);

    // Insert into database
    $sql = "INSERT INTO products (name, description, price, stock, category, image) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssdis", $name, $description, $price, $stock, $category, $target_file);

    if ($stmt->execute()) {
        echo "<script>alert('Product Added Successfully!'); window.location.href = 'admin_panel.php';</script>";
    } else {
        echo "Error: " . $stmt->error;
    }
}
?>
