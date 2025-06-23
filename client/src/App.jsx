import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import CreatePost from "./components/CreatePost";
import AllPosts from "./components/AllPosts";
import PostDetails from "./components/PostDetails";
import EditPost from "./components/EditPost";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoggedIn from "./components/LoggedIn";
import LoggedOut from "./components/LoggedOut";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/allpost" element={<AllPosts />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/loggedin" element={<LoggedIn/>} />
        <Route path="/loggedout" element={<LoggedOut/>} />
      </Routes>
      <ToastContainer position="top-right" autoClose={1500} />
    </>
  );
}

export default App;
