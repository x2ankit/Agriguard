// src/pages/Login.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("User Info:", result.user);

      // Example: store user in localStorage (for session)
      localStorage.setItem("user", JSON.stringify(result.user));

      // Redirect after login
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login failed, please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-6">Login to Agriguard</h2>
      <button
        onClick={handleGoogleLogin}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
      >
        Continue with Google
      </button>
    </div>
  );
};

export default Login;
