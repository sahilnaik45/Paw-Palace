<?php
session_start();
include('C:\xampp\htdocs\paw_palace\db.php'); // Ensure db.php is correctly linked

// Fetch users
$user_query = "SELECT * FROM users";
$users = $conn->query($user_query);

// Fetch products
$category = $_GET['category'] ?? 'all';
$product_query = "SELECT * FROM products";
if ($category != 'all') {
    $product_query .= " WHERE category='$category'";
}
$products = $conn->query($product_query);

// Fetch orders
$order_query = "SELECT orders.id, users.username, products.name AS product_name, orders.amount, orders.status 
                FROM orders 
                JOIN users ON orders.user_id = users.id 
                JOIN products ON orders.product_id = products.id";
$orders = $conn->query($order_query);

// Fetch pet adoption data
$pet_query = "SELECT * FROM pets";
$pets = $conn->query($pet_query);

// Fetch adoption requests
$adoption_query = "SELECT adoptions.id, users.username, pets.name AS pet_name, adoptions.status 
                   FROM adoptions 
                   JOIN users ON adoptions.user_id = users.id 
                   JOIN pets ON adoptions.pet_id = pets.id";
$adoptions = $conn->query($adoption_query);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel - Paw Palace</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Paw Palace Admin Panel</h1>
    
    <h2>Users</h2>
    <table>
        <tr><th>ID</th><th>Username</th><th>Email</th></tr>
        <?php while ($user = $users->fetch_assoc()): ?>
            <tr><td><?= $user['id'] ?></td><td><?= $user['username'] ?></td><td><?= $user['email'] ?></td></tr>
        <?php endwhile; ?>
    </table>

    <h2>Products</h2>
    <form method="GET">
        <select name="category" onchange="this.form.submit()">
            <option value="all">All</option>
            <option value="food">Food</option>
            <option value="accessories">Accessories</option>
            <option value="toys">Toys</option>
            <option value="treats">Treats</option>
            <option value="pharmacy">Pharmacy</option>
            <option value="grooming">Grooming</option>
            <option value="clothes">Clothes</option>
        </select>
    </form>
    <table>
        <tr><th>ID</th><th>Name</th><th>Price</th><th>Stock</th><th>Category</th></tr>
        <?php while ($product = $products->fetch_assoc()): ?>
            <tr><td><?= $product['id'] ?></td><td><?= $product['name'] ?></td><td><?= $product['price'] ?></td><td><?= $product['stock'] ?></td><td><?= $product['category'] ?></td></tr>
        <?php endwhile; ?>
    </table>

    <h2>Orders</h2>
    <table>
        <tr><th>ID</th><th>User</th><th>Product</th><th>Amount</th><th>Status</th><th>Action</th></tr>
        <?php while ($order = $orders->fetch_assoc()): ?>
            <tr>
                <td><?= $order['id'] ?></td>
                <td><?= $order['username'] ?></td>
                <td><?= $order['product_name'] ?></td>
                <td><?= $order['amount'] ?></td>
                <td>
                    <form method="POST" action="update_order.php">
                        <input type="hidden" name="order_id" value="<?= $order['id'] ?>">
                        <select name="status" onchange="this.form.submit()">
                            <option value="Pending" <?= $order['status'] == 'Pending' ? 'selected' : '' ?>>Pending</option>
                            <option value="Completed" <?= $order['status'] == 'Completed' ? 'selected' : '' ?>>Completed</option>
                            <option value="Cancelled" <?= $order['status'] == 'Cancelled' ? 'selected' : '' ?>>Cancelled</option>
                        </select>
                    </form>
                </td>
            </tr>
        <?php endwhile; ?>
    </table>

    <h2>Pet Adoption</h2>
    <table>
        <tr><th>ID</th><th>Name</th><th>Age</th><th>Breed</th></tr>
        <?php while ($pet = $pets->fetch_assoc()): ?>
            <tr><td><?= $pet['id'] ?></td><td><?= $pet['name'] ?></td><td><?= $pet['age'] ?></td><td><?= $pet['breed'] ?></td></tr>
        <?php endwhile; ?>
    </table>

    <h2>Adoption Requests</h2>
    <table>
        <tr><th>ID</th><th>User</th><th>Pet</th><th>Status</th><th>Action</th></tr>
        <?php while ($adoption = $adoptions->fetch_assoc()): ?>
            <tr>
                <td><?= $adoption['id'] ?></td>
                <td><?= $adoption['username'] ?></td>
                <td><?= $adoption['pet_name'] ?></td>
                <td>
                    <form method="POST" action="update_adoption.php">
                        <input type="hidden" name="adoption_id" value="<?= $adoption['id'] ?>">
                        <select name="status" onchange="this.form.submit()">
                            <option value="Pending" <?= $adoption['status'] == 'Pending' ? 'selected' : '' ?>>Pending</option>
                            <option value="Approved" <?= $adoption['status'] == 'Approved' ? 'selected' : '' ?>>Approved</option>
                            <option value="Rejected" <?= $adoption['status'] == 'Rejected' ? 'selected' : '' ?>>Rejected</option>
                        </select>
                    </form>
                </td>
            </tr>
        <?php endwhile; ?>
    </table>
</body>
</html>
