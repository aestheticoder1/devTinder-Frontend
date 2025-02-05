// import React from 'react'

import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {

    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections);

    const fetchConnections = async () => {
        try {

            const res = await axios.get(BASE_URL + '/user/connections', {
                withCredentials: true,
            })

            // console.log(res?.data?.data);
            dispatch(addConnections(res?.data?.data));
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchConnections();
    }, [])

    if (!connections) return;

    if (connections.length === 0) return <h1 className="flex justify-center my-10">No Connections Found</h1>;


    return (
        <div className="text-center my-10">
            <h1 className="font-bold text-3xl text-white">Connections</h1>

            {connections.map((connection) => {
                const { firstName, lastName, photoUrl, age, gender, about } = connection
                return (
                    <div key={connection._id} className="flex m-4 p-4 bg-base-300 rounded-lg w-1/2 mx-auto">
                        <div className="mx-4">
                            <img src={photoUrl} alt="photo" className="w-20 h-20 rounded-full" />
                        </div>
                        <div className="mx-6 text-left">
                            <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                            {age && gender && <p>{age + ", " + gender}</p>}
                            <p>{about}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Connections