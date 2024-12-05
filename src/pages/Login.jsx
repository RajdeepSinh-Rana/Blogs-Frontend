import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Animate the login form when the component mounts
  useEffect(() => {
    gsap.to(".login", { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power2.out" });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://backend-blog-p9a1.onrender.com/User/Login", formData);
      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Failed to log in.");
    }
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <button type="submit">Login</button>
      
      {/* Forgot Password Button */}
      <button 
        type="button" 
        className="forgot-password-btn" 
        onClick={() => navigate("/reset-password")}>
        Forgot Password?
      </button>
    </form>
  );
}

export default Login;
