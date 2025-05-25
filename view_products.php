<?php
include "db.php";

$category = isset($_GET["category"]) ? $_GET["category"] : "all";
$limit = 8; // 8 products per page
$page = isset($_GET["page"]) ? (int)$_GET["page"] : 1;
$start = ($page - 1) * $limit;

// Query for total products
$total_sql = "SELECT COUNT(*) FROM products" . ($category !== "all" ? " WHERE category='$category'" : "");
$total_result = $conn->query($total_sql);
$total_rows = $total_result->fetch_row()[0];
$total_pages = ceil($total_rows / $limit);

// Fetch products with pagination
$sql = "SELECT * FROM products" . ($category !== "all" ? " WHERE category='$category'" : "") . " LIMIT $start, $limit";
$result = $conn->query($sql);
?>

<h2>Product List</h2>

<!-- CATEGORY FILTER -->
<form method="GET">
    <select name="category" onchange="this.form.submit()">
        <option value="all" <?= $category == "all" ? "selected" : "" ?>>All</option>
        <option value="food" <?= $category == "food" ? "selected" : "" ?>>Food</option>
        <option value="accessories" <?= $category == "accessories" ? "selected" : "" ?>>Accessories</option>
        <option value="toys" <?= $category == "toys" ? "selected" : "" ?>>Toys</option>
        <option value="treats" <?= $category == "treats" ? "selected" : "" ?>>Treats</option>
        <option value="pharmacy" <?= $category == "pharmacy" ? "selected" : "" ?>>Pharmacy</option>
        <option value="groomig" <?= $category == "grooming" ? "selected" : "" ?>>Grooming</option>
        <option value="clothes" <?= $category == "clothes" ? "selected" : "" ?>>Clothes</option>
    </select>
</form>

<table border="1">
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
        <th>Stock</th>
        <th>Category</th>
        <th>Image</th>
    </tr>
    <?php while ($row = $result->fetch_assoc()) { ?>
        <tr>
            <td><?= $row["id"]; ?></td>
            <td><?= $row["name"]; ?></td>
            <td><?= $row["description"]; ?></td>
            <td><?= $row["price"]; ?></td>
            <td><?= $row["stock"]; ?></td>
            <td><?= $row["category"]; ?></td>
            <td><img src="<?= $row["image"]; ?>" width="80"></td>
        </tr>
    <?php } ?>
</table>

<!-- PAGINATION -->
<div>
    <?php if ($page > 1) { ?>
        <a href="?category=<?= $category; ?>&page=<?= $page - 1; ?>">⬅️ Prev</a>
    <?php } ?>
    
    <span>Page <?= $page; ?> of <?= $total_pages; ?></span>
    
    <?php if ($page < $total_pages) { ?>
        <a href="?category=<?= $category; ?>&page=<?= $page + 1; ?>">Next ➡️</a>
    <?php } ?>
</div>
