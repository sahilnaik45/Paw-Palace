function checkLogin(event) {
    event.preventDefault(); // Page reload hone pasun thambavtoy

    // Hardcoded admin username & password
    const adminUsername = "admin";
    const adminPassword = "1234";

    // User-entered values (Trim extra spaces)
    const enteredUsername = document.getElementById("username").value.trim();
    const enteredPassword = document.getElementById("password").value.trim();

    console.log("Entered Username:", enteredUsername);
    console.log("Entered Password:", enteredPassword);

    if (enteredUsername === adminUsername && enteredPassword === adminPassword) {
        alert("Login Successful! Redirecting to Admin Panel...");
        window.location.href = "admin.html"; // Redirect to admin panel
    } else {
        alert("Invalid Credentials! Please try again.");
    }
}
