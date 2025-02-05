// import React from 'react'

import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);

    const reviewRequest = async (status, _id) => {
        try {
            const res = await axios.post(BASE_URL + '/request/review/' + status + "/" + _id, {}, {
                withCredentials: true,
            })
            dispatch(removeRequest(_id));
        }
        catch (error) {
            console.error(error);
        }
    }

    const fetchRequests = async () => {
        try {
            const response = await axios.get(BASE_URL + '/user/requests/received', {
                withCredentials: true,
            });
            dispatch(addRequest(response?.data?.data));
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchRequests();
    }, [])

    if (!requests) return;

    if (requests.length === 0) return <h1 className="flex justify-center my-10">No Connection Request Found</h1>;


    return (
        <div className="text-center my-10">
            <h1 className="font-bold text-3xl text-white">Connection Requests</h1>

            {requests.map((req) => {
                const { _id, firstName, lastName, photoUrl, age, gender, about } = req.fromUserId
                return (
                    <div key={_id} className="flex m-4 p-4 bg-base-300 rounded-lg w-2/3 mx-auto justify-between items-center">
                        <div className="mx-4">
                            <img src={photoUrl} alt="photo" className="w-20 rounded-full" />
                        </div>
                        <div className="mx-6 text-left">
                            <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                            {age && gender && <p>{age + ", " + gender}</p>}
                            <p>{about}</p>
                        </div>
                        <div className="flex justify-center items-center">
                            <button className="btn btn-outline btn-success mx-2" onClick={() => reviewRequest("accepted", req._id)}>Accept</button>
                            <button className="btn btn-outline btn-error mx-2" onClick={() => reviewRequest("rejected", req._id)}>Reject</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Requests