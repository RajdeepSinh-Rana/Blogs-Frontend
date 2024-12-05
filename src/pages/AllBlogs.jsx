import  { useEffect, useState } from "react";
import axios from "axios";
// import BlogCard from "../components/BlogCard";

function AllBlogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("https://backend-blog-p9a1.onrender.com//Blog/All");
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="all-blogs">
      <h1>All Blogs</h1>
     
    </div>
  );
}

export default AllBlogs;
