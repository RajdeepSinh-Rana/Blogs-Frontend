import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ResetPassword.css"; // Importing CSS for styling

function ResetPassword() {
  const [formData, setFormData] = useState({ email: "", otp: "", newpassword: "" });
  const [step, setStep] = useState(1); // Step 1: Enter Email, Step 2: Enter OTP and New Password
  const [loading, setLoading] = useState(false); // Track loading state
  const [errorMessage, setErrorMessage] = useState(""); // To store error messages
  const navigate = useNavigate(); // Navigate for redirection after success

  // Step 1: Handle sending OTP to email
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Clear any previous error messages
    try {
      const response = await axios.post("https://backend-blog-p9a1.onrender.com/User/ForgotPassword", { email: formData.email });
      alert(response.data.msg); // Show OTP sent success message
      setStep(2); // Move to Step 2
    } catch (error) {
      console.error(error);
      alert("Error sending OTP. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Step 2: Handle resetting the password
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setErrorMessage(""); // Clear previous error message
    try {
      const response = await axios.post("https://backend-blog-p9a1.onrender.com/User/Resetpassword", {
        email: formData.email,
        otp: formData.otp,
        newpassword: formData.newpassword,
      });
      alert(response.data.message); // Show success message
      navigate("/login"); // Redirect to login after successful reset
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || "Error resetting password. Please check your details and try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        <h2>Reset Password</h2>
        {step === 1 ? (
          <form onSubmit={handleEmailSubmit} className="reset-password-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your registered email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetSubmit} className="reset-password-form">
            <div className="form-group">
              <label htmlFor="otp">Enter OTP</label>
              <input
                id="otp"
                type="text"
                placeholder="Enter the OTP sent to your email"
                value={formData.otp}
                onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="newpassword">New Password</label>
              <input
                id="newpassword"
                type="password"
                placeholder="Enter your new password"
                value={formData.newpassword}
                onChange={(e) => setFormData({ ...formData, newpassword: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
          </form>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
