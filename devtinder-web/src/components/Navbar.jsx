// import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";


const Navbar = () => {
    const user = useSelector((store) => store.user);
    const userPhoto = user?.photoURL;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = async () => {
        try {
            await axios.post(BASE_URL + "/logout");
            dispatch(removeUser());
            navigate("/login");
        } catch (err) {
            if (err.status === 400) {
                navigate("/login");
            }
        }
    }
    return (
        <div>
            <div className="navbar bg-base-100" data-theme="dark">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost text-xl">👨‍💻DevTinder</Link>
                </div>
                {user &&
                    <div className="flex-none gap-2">
                        Welcome {user.firstName}
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mr-10">
                                {userPhoto && <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src={userPhoto} />
                                </div>}
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>
                                    <Link to="/profile" className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </Link>
                                </li>
                                <li><a>Settings</a></li>
                                <li><a onClick={handleLogout}>Logout</a></li>
                            </ul>
                        </div>
                    </div>}
            </div>

        </div>




    )
}
export default Navbar;