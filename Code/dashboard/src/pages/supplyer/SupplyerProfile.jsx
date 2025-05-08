import React, { useContext } from "react";
import ProfileCard from "../../components/ProfileCard";
import { AuthContext } from "../../context/AuthContext";

function SupplyerProfile() {
  const { user } = useContext(AuthContext);
  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <ProfileCard userid={user._id} />
      
      </div>
    </div>
  );
}

export default SupplyerProfile;
