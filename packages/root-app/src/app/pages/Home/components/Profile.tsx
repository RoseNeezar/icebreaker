import React from "react";

const Profile = () => {
  return (
    <div className="bg-dark-third rounded-lg w-full mt-10">
      <div className="py-3">
        <div className="text-4xl text-indigo-500 mx-auto  w-20 h-20 rounded-full bg-dark-main flex items-center justify-center">
          <i className="bx bx-ghost"></i>
        </div>

        <div className="flex flex-row justify-between text-xl p-2 text-dark-txt bg-dark-main m-2 rounded-xl text-center ">
          <div className="pulse " />
          <div className="pulse " />
          <div className="pulse " />
        </div>
      </div>
    </div>
  );
};

export default Profile;
