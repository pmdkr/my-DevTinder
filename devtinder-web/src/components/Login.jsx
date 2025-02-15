import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
// import 'dotenv/config'


const Login = () => {

    const [email, setEmail] = useState("pramod@gmail.com");
    const [password, setPassword] = useState("Pramod@123");
    // const [loggedIn, setLoggedIn] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const BaseURL = import.meta.env.VITE_BASE_URL;
    console.log(BaseURL);
    const handleLoginClick = async () => {
        try {
            const res = await axios.post(BASE_URL+"/login", {
                email, password
            }, {
                withCredentials: true,
            });
            const resData = await res.data;
            console.log(resData.data);
            dispatch(addUser(resData.data));
            return navigate("/");


        } catch (err) {
            console.log(err);

        }


    }

    return (
        <div className="flex justify-center items-center flex-grow" data-theme="dark">
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title flex justify-center">Login</h2>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Email</span>
                        </div>
                        <input
                            type="text"
                            value={email}
                            placeholder="Enter your email"
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
                            placeholder="Enter your password"
                            className="input input-bordered w-full max-w-xs"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={handleLoginClick}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );


}
export default Login;