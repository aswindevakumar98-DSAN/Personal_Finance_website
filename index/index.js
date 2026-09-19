const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");


// Show Signup
function showSignup() {
    loginForm.classList.add("hidden");
    signupForm.classList.remove("hidden");
}


// Show Login
function showLogin() {
    signupForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
}


// Show / Hide Password
function togglePassword(id) {

    const password = document.getElementById(id);

    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}


// Login Validation
loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const message = document.getElementById("loginMessage");

    if (email === "" || password === "") {
        message.textContent = "Please fill in all fields.";
        message.style.color = "red";
        return;
    }

    message.textContent = "Login successful!";
    message.style.color = "green";
    window.location.href = "./dashboard/dashboard.html";
});


// Signup Validation
signupForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const message = document.getElementById("signupMessage");

    if (name === "" || email === "" || password === "" ||
        confirmPassword === "") {

        message.textContent = "Please fill in all fields.";
        message.style.color = "red";
        return;
    }

    if (password.length < 6) {
        message.textContent =
            "Password must contain at least 6 characters.";

        message.style.color = "red";
        return;
    }

    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match.";
        message.style.color = "red";
        return;
    }

    message.textContent = "Account created successfully!";
    message.style.color = "green";
});