import PropTypes from "prop-types";

const UserCard = ({ user }) => {
    // console.log(user);
    const { firstName, lastName, age, about, photoURL } = user;

    if (!user) return null; // Prevent errors if user is undefined or null

    return (
        <div>
            <div className="card bg-base-100 w-96 shadow-xl">
                <figure>
                    <img
                        src={photoURL}
                        alt="User"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName + " " + lastName || "Unknown"}</h2>
                    <h2>{age}</h2>
                    <p>{about}</p>
                    <div className="card-actions justify-between">
                        <button className="btn btn-primary bg-red-500">Interested</button>
                        <button className="btn btn-primary">Rejected</button>
                    </div>
                </div>
            </div>
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

    }),
};

export default UserCard;
