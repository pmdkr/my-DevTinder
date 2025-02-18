import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../utils/constants";
// import 'dotenv/config'


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    // console.log(BaseURL);
    const handleLoginClick = async () => {
        try {
            const res = await axios.post(BASE_URL + "/login", {
                email, password
            }, {
                withCredentials: true,
            });
            const resData = await res.data;
            // console.log(resData.data);
            dispatch(addUser(resData.data));
            return navigate("/");


        } catch (err) {
            setError(err?.response.data || "Something went wrong");
            console.log(err);

        }


    }
    const handleSignUpClick = async () => {
        try {
            const res = await axios.post(BASE_URL + "/signup",
                { firstName, lastName, email, password },
                { withCredentials: true });
            dispatch(addUser(res.data.data));
            navigate("/profile");

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="flex justify-center items-center flex-grow">
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title flex justify-center">{isLoginForm ? "Login" : "Sign UP"}</h2>
                    {!isLoginForm && (
                        <>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">First Name</span>
                                </div>
                                <input
                                    type="text"
                                    value={firstName}
                                    placeholder="Enter First name"
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Last Name</span>
                                </div>
                                <input
                                    type="text"
                                    value={lastName}
                                    placeholder="Enter Last name"
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </label>
                        </>)}
                    < label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Email</span>
                        </div>
                        <input
                            type="text"
                            value={email}
                            placeholder="Enter email"
                            className="input input-bordered w-full max-w-xs"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <input
                            type="password"
                            value={password}
                            placeholder="Enter password"
                            className="input input-bordered w-full max-w-xs"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <p className="text-red-600">{error}</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={isLoginForm ? handleLoginClick : handleSignUpClick}>{isLoginForm ? "Login" : "Signup"}</button>
                    </div>
                    <p className="m-auto cursor-pointer" onClick={() => setIsLoginForm((value) => !value)}>{isLoginForm ? "New User? Please SignUp Here" : "Registerd User? Login Here"}</p>
                </div>
            </div>
        </div >
    );


}
export default Login;