import { useState } from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import React from "react";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const CLIENT_ID =
  "825183319721-q914ps4kvp1q5s0rohcpnvjsbpq312q3.apps.googleusercontent.com";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const { login } = useAuth();

  // Google login handler
  const LoginGoogle = useGoogleLogin({
    onSuccess: async (res) => {
      try {
        // fetch user profile from Google
        const profileRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${res.access_token}`,
          },
        });

        const profile = await profileRes.json();
        console.log("Google Profile:", profile);

        localStorage.setItem("username", profile.name || "");
        localStorage.setItem("isAdmin", "false"); // default non-admin

        login(); // update auth context
        navigate("/dashboard");
      } catch (err) {
        console.error("Fetching Google profile failed", err);
      }
    },
    onError: () => {
      console.log("Google Login Failed");
    },
  });

  // Handle signup
  const handleSignup = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }
    const passwordHash = CryptoJS.SHA256(password).toString();
    const userData = { username, passwordHash };

    localStorage.setItem("user", JSON.stringify(userData));

    alert("Signup successful! You can now login.");
    setIsLogin(true);
    setUsername("");
    setPassword("");
  };

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    // Check for admin credentials first
    if (username === "admin" && password === "admin") {
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("username", username)
      login();
      alert("Admin login successful!");
      navigate("/dashboard");
      return;
    }
    else {
      localStorage.setItem("isAdmin", "false");
    }
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      alert("No user found. Please sign up first.");
      return;
    }

    const enteredHash = CryptoJS.SHA256(password).toString();

    if (
      savedUser.username === username &&
      savedUser.passwordHash === enteredHash
    ) {
      localStorage.setItem("username", username)
      login(); // <-- call AuthContext login()
      alert("Login successful!");
      navigate("/dashboard"); // redirect after login
    } else {
      alert("Invalid username or password!");
    }
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-100 via-blue-50 to-teal-100 font-sans">
      <div className="w-full max-w-xl p-10 bg-white rounded-2xl shadow-2xl">
        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-center text-teal-700 mb-2 tracking-wide font-serif">
          Healthcare Management System
        </h1>
        <p className="text-center text-gray-500 mb-6">
          {isLogin ? "Login to your account" : "Create a new account"}
        </p>

        {/* Form */}
        <form
          className="space-y-4"
          onSubmit={isLogin ? handleLogin : handleSignup}
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
          />

          <button
            type="submit"
            className="w-full py-3 text-white text-lg font-medium bg-gradient-to-r from-teal-600 to-blue-600 rounded-lg hover:from-teal-700 hover:to-blue-700 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-sm text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Custom Google Login */}
        <div className="flex justify-center">
          <button
            onClick={() => LoginGoogle()}
            className="flex items-center justify-center w-full py-3 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            <span className="text-gray-700 font-medium">
              Continue with Google
            </span>
          </button>
        </div>

        {/* Toggle */}
        <p className="text-sm text-center text-gray-600 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-teal-600 font-semibold hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default function Auth() {
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <AuthForm />
    </GoogleOAuthProvider>
  );
}
