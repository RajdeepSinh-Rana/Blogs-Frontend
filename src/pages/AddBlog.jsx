import { useState, useEffect } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import "./AddBlog.css";

function AddBlog() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    content: "",
    tags: "",
    category: ""
  });
  const [token, setToken] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`https://backend-blog-p9a1.onrender.com/Blog/Add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(",").map((tag) => tag.trim()), // Convert tags to array
        }),
      });

      const resData = await response.json();
      alert("Blog added successfully!");

      gsap.to(".add-blog-box", {
        opacity: 0,
        y: -50,
        duration: 0.5,
        onComplete: () => {
          setFormSubmitted(true);
          navigate("/");
        },
      });
    } catch (err) {
      console.error("Error adding blog:", err);
      alert("An error occurred while adding the blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-blog-container">
      {!formSubmitted && (
        <div className="add-blog-box">
          <h2>Add New Blog</h2>
          <form onSubmit={handleSubmit} className="add-blog-form">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter the blog title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter the blog description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image URL</label>
              <input
                type="text"
                id="image"
                name="image"
                placeholder="Enter the image URL"
                value={formData.image}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                name="content"
                placeholder="Enter the blog content"
                value={formData.content}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="tags">Tags</label>
              <input
                type="text"
                id="tags"
                name="tags"
                placeholder="Comma-separated tags (e.g., tech, health)"
                value={formData.tags}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                placeholder="Enter the blog category"
                value={formData.category}
                onChange={handleInputChange}
              />
            </div>
          
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Adding Blog..." : "Add Blog"}
            </button>
          </form>
        </div>
      )}
      {formSubmitted && (
        <div className="success-message">
          <h3>Blog Added Successfully!</h3>
        </div>
      )}
    </div>
  );
}

export default AddBlog;
