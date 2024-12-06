import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditBlog.css";

function EditBlog() {
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    image: "",
    content: "",
    tags: "",
    category: ""
  });
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`https://backend-blog-p9a1.onrender.com/Blog/EditGet/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch blog data.");
        }

        const data = await response.json();
        setBlog(data.blog);
      } catch (error) {
        console.error("Error fetching blog data:", error);
        setError("An error occurred while fetching the blog. Please try again.");
      }
    };

    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!blog.title.trim() || !blog.description.trim()) {
      alert("Title and description are required.");
      return;
    }

    try {
      const response = await fetch(`https://backend-blog-p9a1.onrender.com/Blog/EditBlog`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...blog,
          tags: blog.tags.split(",").map((tag) => tag.trim()),
          id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Backend Error:", data.msg || response.statusText);
        alert(data.msg || "An error occurred while updating the blog.");
        return;
      }

      alert("Blog updated successfully.");
      navigate("/my-blogs");
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("An error occurred while updating the blog. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="edit-blog">
      <h1>Edit Blog</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={blog.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={blog.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={blog.image}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={blog.content}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            name="tags"
            placeholder="Comma-separated tags"
            value={blog.tags}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={blog.category}
            onChange={handleChange}
          />
        </div>

      

        <button type="submit" className="submit-btn">
          Update Blog
        </button>
      </form>
    </div>
  );
}

export default EditBlog;
