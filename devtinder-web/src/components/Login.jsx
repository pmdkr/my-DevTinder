import axios from "axios";
import { useState } from "react";

const Login = () => {

    const [email, setEmail] = useState("pramod@gmail.com");
    const [password, setPassword] = useState("Pramod@123");

    const handleLoginClick = async() => {
        try{
           const res= await axios.post("http://localhost:3000/login",{
            email,password
           });
           console.log(res);
        

        }catch(err){
            console.log(err);

        }


    }

    return (
        <div className="flex justify-center justify-items-center h-auto" data-theme="dark">
            <div className="card bg-base-100 w-96 shadow-xl mt-10">
                <div className="card-body">
                    <h2 className="card-title flex justify-center">Login</h2>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Email</span>

                        </div>
                        <input type="text" placeholder="Enter your email" className="input input-bordered w-full max-w-xs" onChange={(e) => setEmail(e.target.value)} />

                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Password</span>

                        </div>
                        <input type="password" placeholder="Enter your password" className="input input-bordered w-full max-w-xs" onChange={(e) => setPassword(e.target.value)} />

                    </label>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={handleLoginClick}>Login</button>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Login;