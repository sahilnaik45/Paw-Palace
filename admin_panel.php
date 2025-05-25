<?php
include "db.php";
$sql = "SELECT * FROM products";
$result = $conn->query($sql);
?>

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
            <td><?php echo $row["id"]; ?></td>
            <td><?php echo $row["name"]; ?></td>
            <td><?php echo $row["description"]; ?></td>
            <td><?php echo $row["price"]; ?></td>
            <td><?php echo $row["stock"]; ?></td>
            <td><?php echo $row["category"]; ?></td>
            <td><img src="<?php echo $row["image"]; ?>" width="100"></td>
        </tr>
    <?php } ?>
</table>
