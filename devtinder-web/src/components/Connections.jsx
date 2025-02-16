import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();
    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/request/connections", {
                withCredentials: true,
            });
            dispatch(addConnections(res.data.data));

        } catch (err) {
            console.log(err);

        }



    }

    useEffect(() => {
        fetchConnections();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!connections) return;
    if (connections.length === 0) return <div className="flex justify-center text-4xl text-white">No connections found</div>;

    return (
        <div className="flex justify-center flex-col">
            <h1 className="text-4xl text-white m-auto my-4">Connections</h1>
            {
                connections.map((connection) => {
                    const { _id, firstName, lastName, age, gender, about, photoURL } = connection;
                    return (
                        <div key={_id} className=" flex p-4 rounded-lg bg-base-300 m-auto w-1/2">
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

                        </div>
                    )
                })
            }

        </div>

    )

}
export default Connections;