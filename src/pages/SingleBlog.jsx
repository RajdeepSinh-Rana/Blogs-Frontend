import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./SingleBlog.css";

function SingleBlog() {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null); // State to store the blog data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`https://backend-blog-p9a1.onrender.com//Blog/single/${id}`);
        setBlog(response.data.singleBlog);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>; // Show loading state
  }

  if (!blog) {
    return <p>Blog not found.</p>; // Handle case where no blog is returned
  }

  return (
    <div className="single-blog-container">
      <h1>{blog.title}</h1>
      {blog.image && <img src={blog.image} alt={blog.title} className="blog-imagea1" />}
      <div className="blog-meta">
        <p><strong>Author:</strong>  {blog.userId?.name || "Anonymous"}</p>
        <p><strong>Created:</strong> {new Date(blog.createdTime).toLocaleDateString()}</p>
        {/* <p><strong>Updated:</strong> {new Date(blog.updatedTime).toLocaleDateString()}</p> */}
      </div>
      <p><strong>Description:</strong> {blog.description}</p>
      <p><strong>Content:</strong> {blog.content || "No content available"}</p>
      <p><strong>Tags:</strong> {blog.tags?.join(", ") || "No tags available"}</p>
      <p><strong>Category:</strong> {blog.category || "No category specified"}</p>
    </div>
  );
}

export default SingleBlog;
