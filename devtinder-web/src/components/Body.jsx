import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const userData = useSelector((store) => store.user);
  const currentTheme = useSelector((store) => store.theme.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.log(err);
    }
  };

  return (
    // Here we add data-theme so that the entire Body picks up the current theme.
    <div className="flex flex-col min-h-screen" data-theme={currentTheme}>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
