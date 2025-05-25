<?php
$host = "localhost";
$dbname = "paw_palace";  // Tujha database nav tak
$user = "root"; 
$password = ""; 

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Category GET parameter gheu
    $category = isset($_GET['category']) ? $_GET['category'] : '';

    // Query
    $sql = "SELECT * FROM products WHERE category = :category";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':category', $category);
    $stmt->execute();

    // Data Fetch
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($products);

} catch (PDOException $e) {
    echo "Database Error: " . $e->getMessage();
}
?>
