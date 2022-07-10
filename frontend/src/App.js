import react, { Fragment } from "react";
import "./App.css";
import Landing from "./components/layout/Landing";
import NavBar from "./components/layout/NavBar";
import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import useHttp from "./hooks/useHttp";
import { useEffect } from "react";
import Dashboard from "./components/dashboard/Dashboard";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Profiles from "./profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";

const App = () => {
  const { setAuthUser } = useHttp();
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    if (localStorage.token) {
      setAuthUser();
    }
  }, [setAuthUser]);

  return (
    <Fragment>
      <NavBar />
      <section className="container">
        <Alert />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute to={"/login"} isAuth={isAuth} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<ProtectedRoute to={"/login"} isAuth={isAuth} />}>
            <Route path="/create-profile" element={<CreateProfile />} />
          </Route>
          <Route element={<ProtectedRoute to={"/login"} isAuth={isAuth} />}>
            <Route path="/edit-profile" element={<EditProfile />} />
          </Route>
          <Route element={<ProtectedRoute to={"/login"} isAuth={isAuth} />}>
            <Route path="/add-experience" element={<AddExperience />} />
          </Route>
          <Route element={<ProtectedRoute to={"/login"} isAuth={isAuth} />}>
            <Route path="/add-education" element={<AddEducation />} />
          </Route>
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route element={<ProtectedRoute to={"/login"} isAuth={isAuth} />}>
            <Route path="/posts" element={<Posts />} />
          </Route>
          <Route path="*" element={<Landing />} />
        </Routes>
      </section>
    </Fragment>
  );
};
export default App;
