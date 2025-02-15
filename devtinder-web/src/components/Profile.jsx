import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const Profile = () => {
    const user = useSelector((store) => store?.user);

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [photoURL, setPhotoURL] = useState(user.photoURL);
    const [about, setAbout] = useState(user.about);

    const [error, setError] = useState(null);
    const [savedData, setSavedData] = useState(false);
    const dispatch = useDispatch();

    const handleSaveProfileClick = async () => {
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName,
                lastName,
                age,
                gender,
                about,
                photoURL
            }, {
                withCredentials: true
            });
            dispatch(addUser(res.data.data));
            setSavedData(true);
            setTimeout(() => {
                setSavedData(false);
            }, 3000)


        } catch (err) {
            setError(err.response.data);
        }

    }


    return (
        <div className="flex my-20 justify-between mx-10">
            <div className="flex justify-center items-center flex-grow">
                <div className="card bg-base-300 w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title flex justify-center">User Profile</h2>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">FirstName</span>
                            </div>
                            <input
                                type="text"
                                value={firstName}
                                placeholder="Enter your email"
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">LastName</span>
                            </div>
                            <input
                                type="text"
                                value={lastName}
                                placeholder="Enter your password"
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Age</span>
                            </div>
                            <input
                                type="text"
                                value={age}
                                placeholder="Enter your Age"
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Gender</span>
                            </div>
                            <input
                                type="text"
                                value={gender}
                                placeholder="Enter your gender"
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => setGender(e.target.value)}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">About</span>
                            </div>
                            <input
                                type="text"
                                value={about}
                                placeholder="Enter your password"
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => setAbout(e.target.value)}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Photo URL</span>
                            </div>
                            <input
                                type="text"
                                value={photoURL}
                                placeholder="Enter your password"
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => setPhotoURL(e.target.value)}
                            />
                        </label>
                        <p className="text-red-600">{error}</p>
                        <div className="card-actions justify-center">
                            <button className="btn btn-primary" onClick={handleSaveProfileClick}>Save Profile</button>
                        </div>
                    </div>
                </div>
            </div>
            <UserCard user={{ firstName, lastName, age, gender, about, photoURL }} />
            {savedData && <div className="toast toast-top toast-start">

                <div className="alert alert-success">
                    <span>Profile saved successfully.</span>
                </div>
            </div>}
        </div>
    )
}
export default Profile;