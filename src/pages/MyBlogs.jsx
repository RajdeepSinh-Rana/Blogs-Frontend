import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  
import "./MyBlogs.css";

function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();  

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`https://backend-blog-p9a1.onrender.com/Blog/GetMine`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Response data:", data);
        if (data.blogs) {
          setBlogs(data.blogs);
        } else {
          setError(data.msg || "Failed to fetch blogs.");
        }
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setError("An error occurred while fetching blogs.");
      });
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`https://backend-blog-p9a1.onrender.com//Blog/Delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Blog deleted successfully.");
        setBlogs(blogs.filter((blog) => blog._id !== id)); // Remove the blog from the list
      } else {
        alert(data.msg || "Failed to delete the blog.");
      }
    } catch (err) {
      console.error("Error deleting blog:", err);
      alert("An error occurred while deleting the blog.");
    }
  };

  // Handle edit action using useNavigate
  const handleEdit = (id) => {
    navigate(`/EditBlog/${id}`);  // Use navigate to go to the edit page
  };

  return (
    <div className="my-blogs">
      <h1>My Blogs</h1>
      {error ? (
        <p>{error}</p>
      ) : blogs.length === 0 ? (
        <p>No blogs found. Start creating your first blog!</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog._id} className="blog-card">
            {/* Each blog card is a table */}
            <div className="blog-row">
              {/* First cell: Image */}
              <div className="blog-cell">
                {blog.image && <img src={blog.image} alt={blog.title} />}
              </div>

              {/* Second cell: Title */}
              <div className="blog-cell">
                <h2>{blog.title}</h2>
              </div>

              {/* Third cell: Actions (Edit/Delete buttons) */}
              <div className="blog-cell">
                <div className="blog-actions">
                  <button onClick={() => handleEdit(blog._id)}>Edit</button>
                  <button onClick={() => handleDelete(blog._id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyBlogs;
