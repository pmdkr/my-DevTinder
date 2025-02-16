import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { removeFeed } from "../utils/feedSlice";
import { setTheme } from "../utils/themeSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  // Get the current theme from Redux store. Make sure your theme slice returns an object like { theme: "light" }
  const currentTheme = useSelector((store) => store.theme.theme);
  const userPhoto = user?.photoURL;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout");
      dispatch(removeUser());
      dispatch(removeFeed());
      navigate("/login");
    } catch (err) {
      if (err.status === 400) {
        navigate("/login");
      }
    }
  };

  // Dispatch setTheme when the select value changes
  const handleThemeChange = (e) => {
    dispatch(setTheme(e.target.value));
  };

  return (
    <div>
      {/* Apply the current theme via data-theme */}
      <div className="navbar bg-base-100" data-theme={currentTheme}>
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            👨‍💻DevTinder
          </Link>
        </div>
        <div className=" mr-6">
          <label>
            Theme:&nbsp;
            <select
              name="selectedTheme"
              value={currentTheme}
              onChange={handleThemeChange}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="cupcake">Cupcake</option>
            </select>
          </label>
        </div>
        {user && (
          <div className="flex-none gap-2">
            Welcome {user.firstName}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar mr-10"
              >
                {userPhoto && (
                  <div className="w-10 rounded-full">
                    <img alt="User avatar" src={userPhoto} />
                  </div>
                )}
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections">Connections</Link>
                </li>
                <li>
                  <Link to="/request">Pending request</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
