import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// Signup
async function signup(username, phone) {
  const res = await fetch("http://127.0.0.1:5000/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, phone })
  });
  const data = await res.json();
  console.log("Signup:", data);
}

// Login
async function login(username, phone) {
  const res = await fetch("http://127.0.0.1:8080/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, phone })
  });
  const data = await res.json();
  console.log("Login:", data);
}

// Example usage:
// signup("kazu123", "+1234567890", "mypassword123");
// login("+1234567890", "mypassword123");