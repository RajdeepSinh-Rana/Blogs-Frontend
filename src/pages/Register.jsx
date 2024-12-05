import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";
import "./Register.css"; 

function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    gsap.to(".register", { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power2.out" });

    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => {
      input.addEventListener("focus", () => {
        gsap.to(input, { borderColor: "#007bff", duration: 0.3 });
      });
      input.addEventListener("blur", () => {
        gsap.to(input, { borderColor: "#ccc", duration: 0.3 });
      });
    });

    const button = document.querySelector("button");
    button.addEventListener("mouseenter", () => {
      gsap.to(button, { scale: 1.05, duration: 0.3 });
    });
    button.addEventListener("mouseleave", () => {
      gsap.to(button, { scale: 1, duration: 0.3 });
    });

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://backend-blog-p9a1.onrender.com//User/Ragister", formData);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Failed to register.");
    }
  };

  return (
    <form className="register" onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
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
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
