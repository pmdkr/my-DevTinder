import axios from "axios";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { BASE_URL } from '../utils/constants';
import { removeUserFromFeed } from "../utils/feedSlice";
import { useState } from "react";

const UserCard = ({ user }) => {
    // console.log(user);
    const { _id, firstName, lastName, age, about, photoURL, gender } = user;
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false);
    const handleFeedCard = async (status, _id) => {
        try {
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + _id,
                {},
                { withCredentials: true }
            )
            console.log(res);
            dispatch(removeUserFromFeed(_id));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);

            }, 3000);

        } catch (err) {
            console.log(err);

        }

    }

    if (!user) return null; // Prevent errors if user is undefined or null

    return (
        <div>
            <div className="card bg-base-100 w-80 shadow-xl">
                <figure>
                    <img
                        src={photoURL}
                        alt="User"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName + " " + lastName || "Unknown"}</h2>
                    {age && <h2>{age}</h2>}
                    {gender && <h2>{gender}</h2>}
                    <p>{about}</p>
                    <div className="card-actions justify-between">
                        <button className="btn btn-primary bg-red-500" onClick={() => handleFeedCard("ignored", _id)}>Ignore</button>
                        <button className="btn btn-primary" onClick={() => handleFeedCard("interested", _id)}>Intrested</button>
                    </div>
                </div>
            </div>
            {showToast && <div className="toast toast-top toast-start">
                <div className="alert alert-success">
                    <span>Connection request sent successfully.</span>
                </div>
            </div>}
        </div>
    );
};

// Define PropTypes
UserCard.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string.isRequired, // Adjust according to actual data
        lastName: PropTypes.string.isRequired,
        age: PropTypes.string.isRequired,
        gender: PropTypes.string.isRequired,
        about: PropTypes.string.isRequired,
        photoURL: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,

    }),
};

export default UserCard;
