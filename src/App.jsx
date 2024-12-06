import  { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const AddBlog = lazy(() => import("./pages/AddBlog"));
const AllBlogs = lazy(() => import("./pages/AllBlogs"));
const MyBlogs = lazy(() => import("./pages/MyBlogs"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const SingleBlog = lazy(() => import("./pages/SingleBlog"));
const EditBlog = lazy(() => import("./pages/EditBlog"));

function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/add-blog"
            element={<ProtectedRoute component={<AddBlog />} />}
          />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route
            path="/all-blogs"
            element={<ProtectedRoute component={<AllBlogs />} />}
          />
          <Route
            path="/my-blogs"
            element={<ProtectedRoute component={<MyBlogs />} />}
          />
          <Route path="/EditBlog/:id" element={<EditBlog />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
