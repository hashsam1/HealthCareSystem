import { useState } from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import React from "react";
function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  // Google login handler
  const login = useGoogleLogin({
    onSuccess: (res) => {
      console.log("Google Login Success:", res);
      // TODO: send res.access_token or res.credential to backend
    },
    onError: () => {
      console.log("Google Login Failed");
    },
  });

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
        <form className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
          />
          <input
            type="password"
            placeholder="Password"
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
            onClick={() => login()}
            className="flex items-center justify-center w-full py-3 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            <span className="text-gray-700 font-medium">Continue with Google</span>
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
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <AuthForm />
    </GoogleOAuthProvider>
  );
}
