import axios from "axios";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
    const user = useSelector((store) => store.feed);
    const dispatch = useDispatch();

    // console.log(userFeed[0]);
    useEffect(() => {
        fetchFeed();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchFeed = async () => {
        if (user) return;
        try {
            const res = await axios.get(BASE_URL + "/feed", {
                withCredentials: true,
            });
            dispatch(addFeed(res.data.data));


        } catch (err) {
            console.log(err);

        }


    }
    if (!user) return;
    if (user.length <= 0) return <div className="flex justify-center m-auto text-4xl">NO new user found</div>
    return (
        user && <div className="flex justify-center flex-col m-auto">
            <h1 className="text-3xl text-white m-auto ">Your Feed</h1>
            <div className="flex mt-2">
                <UserCard user={user[0]} />

            </div>


        </div>
    )
}
export default Feed;