import React, { useContext, useEffect } from "react";
import ProfileCard from "../../components/ProfileCard";
import { AuthContext } from "../../context/AuthContext";

function Profile() {
  const { user } = useContext(AuthContext);

  useEffect(() => {}, []);

  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <ProfileCard userid={user._id} />
      </div>
    </div>
  );
}

export default Profile;
