import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";

function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("https://backend-blog-p9a1.onrender.com/Blog/All")
      .then((response) => {
        console.log(response);
        setBlogs(response.data.blogs);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  return (
    <div className="home-container">
      <h1>Latest Stories</h1>
      {blogs.map((blog) => (
        <Fragment key={blog.i_id}>
        <div className="blog">
            {blog.image && (
              <img src={blog.image} alt={blog.title} className="blog-image" />
            )}
            <div className="blog-content">
              <h2>{blog.title}</h2>
              <div className="blog-meta">
              <span>By {blog.userId.name}</span>

                <span>{new Date(blog.createdTime).toLocaleDateString()}</span>
              </div>
              <p className="blog-description">{blog.description}</p>
              
            </div>
            <Link to={`/blog/${blog._id}`} key={blog._id} className="blog-link">
            Read More...
           </Link>
          </div>
        </Fragment>
      ))}
    </div>
  );
}

export default Home;
