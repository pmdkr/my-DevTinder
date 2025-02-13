import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const Navbar = () => {
    const [userPhoto, setUserPhoto] = useState(null);
    const user = useSelector((store) => store.user);
    useEffect(() => {
        fetchPhotoUrl();

    })
    const fetchPhotoUrl = async () => {
        const data = await fetch(user.photoURL);
        setUserPhoto(data);

    }
    // console.log(user);
    return (
        <div>
            <div className="navbar bg-base-100" data-theme="dark">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">👨‍💻DevTinder</a>
                </div>
                {user &&
                    <div className="flex-none gap-2">
                        Welcome {user.firstName}
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mr-10">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src={userPhoto} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li><a>Logout</a></li>
                            </ul>
                        </div>
                    </div>}
            </div>

        </div>




    )
}
export default Navbar;