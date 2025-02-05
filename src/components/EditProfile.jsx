import { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);

  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("")
    try {
      const res = await axios.patch(BASE_URL + '/profile/edit', { firstName, lastName, photoUrl, age, gender, about }, {
        withCredentials: true,
      })
      dispatch(addUser(res?.data?.data))
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }
    catch (error) {
      setError(error.response.data);
    }
  }

  return (
    <>
      <div className="flex justify-center my-10 gap-10">
        <div className="flex justify-center">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input type="text" value={firstName} placeholder="Enter your first name" className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)} />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input type="text" value={lastName} placeholder="Enter your last name" className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLastName(e.target.value)} />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Photo URL</span>
                  </div>
                  <input type="text" value={photoUrl} placeholder="Enter your photo url" className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setPhotoUrl(e.target.value)} />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input type="text" value={age} placeholder="Enter your age" className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAge(e.target.value)} />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="select select-bordered w-full max-w-xs"
                  >
                    <option value="" disabled>Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Other</option>
                  </select>
                </label>


                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">About</span>
                  </div>
                  <textarea
                    value={about}
                    placeholder="Enter your bio"
                    className="textarea textarea-bordered w-full max-w-xs"
                    onChange={(e) => setAbout(e.target.value)}
                    rows={3} // Adjust the number of rows as needed
                  />
                </label>


              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center mt-2">
                <button onClick={saveProfile} className="btn btn-primary">Save Profile</button>
              </div>
            </div>
          </div>
        </div>
        <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  )
}


export default EditProfile