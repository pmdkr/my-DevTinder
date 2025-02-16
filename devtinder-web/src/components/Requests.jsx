import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
const Requests = () => {
    const requests = useSelector((store) => store.request);
    const dispatch = useDispatch();
    const [toastStatus, setToastStatus] = useState(false);

    useEffect(() => {
        fetchRequest();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const fetchRequest = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/request/recived", { withCredentials: true });
            dispatch(addRequest(res.data.data));

        } catch (err) {
            console.log(err)
        }

    }

    const handleRequest = async (status, _id) => {
        console.log(_id);
        try {
            // eslint-disable-next-line no-unused-vars
            const res = await axios.post(BASE_URL + "/review/recived" + "/" + status + "/" + _id,
                {},
                { withCredentials: true }
            )
            dispatch(removeRequest(_id));
            setToastStatus(true);
            setTimeout(() => {
                setToastStatus(false);

            }, 300);

        } catch (err) {
            console.log(err);
        }


    }
    if (!requests) return;
    if (requests.length === 0) return <div className="flex justify-center text-3xl text-white">No New Pending found</div>;

    return (
        <div className="flex justify-center flex-col">
            <h1 className="text-4xl text-white m-auto my-4">Pending request connections</h1>
            {
                requests.map((request) => {
                    const { _id, firstName, lastName, age, gender, about, photoURL } = request.fromUserId;
                    return (
                        <div key={_id} className=" flex justify-between items-center p-4 rounded-lg bg-base-300 m-auto w-2/3">
                            <div>
                                <img
                                    alt="photo"
                                    className="w-20 h-20 rounded-full"
                                    src={photoURL}
                                />
                            </div>
                            <div className="text-left mx-4">
                                <h2>{firstName + " " + lastName}</h2>
                                <p>{age + ", " + gender}</p>
                                <p>{about}</p>

                            </div>
                            <div>
                                <button className="btn btn-primary mx-2" onClick={() => handleRequest("rejected", request._id)}>Reject</button>
                                <button className="btn btn-secondary mx-2" onClick={() => handleRequest("accepted", request._id)}>Accept</button>
                            </div>

                        </div>
                    )
                })
            }
            {toastStatus && <div className="toast toast-top toast-end">

                <div className="alert alert-success">
                    <span>Request reviewed successfully.</span>
                </div>
            </div>}

        </div>

    )

}

export default Requests;