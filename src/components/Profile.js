import React, { useEffect, useState } from 'react';
import Post from './Post';
import ProfileStyle from './Styles/Profile.module.css';

const Profile = ({ username, pending, setPending }) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    fetch(
      ` https://banaosocialmedia.herokuapp.com/useredd?username=${username}`
    )
      .then((res) => res.json())
      .then((data) => {
        setUser(data?.[0]);
        console.log(user);
      });
  }, [username]);

  return (
    <>
      <div className="container  mt-3 p-1 rounded-3">
        <div className="d-flex flex-column text-center">
          <div>
            <img
              style={{ width: '120px' }}
              className="rounded-circle"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>
          <div className="w-100">
            <h4 className={ProfileStyle.userName}>{user?.username}</h4>
            <h5 style={{}} className={ProfileStyle.email}>
              {user?.email}
            </h5>
            {/* <button type='button' className={ProfileStyle.updateProfileBtn} data-bs-toggle="modal" data-bs-target="#staticBackdrop">Update Profile</button> */}
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Update Your Profile
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <input
                  placeholder="enter name"
                  type="text"
                  className="form-control mt-3"
                  required
                />
                <input
                  placeholder="enter email"
                  type="email"
                  className="form-control my-3"
                  required
                />
                <div class="d-flex justify-content-center  py-2">
                  <button type="button" class="btn btn-success">
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Post pending={pending} setPending={setPending} username={username} />
      {/* <Post username={username}/> */}
    </>
  );
};

export default Profile;
