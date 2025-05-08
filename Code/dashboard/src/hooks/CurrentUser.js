import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useProfileLink = () => {
  const { user } = useContext(AuthContext);

  switch (user?.role) {
    case "consultancy":
      return "/consultancy/profile";
    case "supplier":
      return "/supplier/supplyer_profile";
    case "contractor":
      return "/contractor/contractor_profile";
    case "labour":
      return "/labour/profile";
    default:
      return "#";
  }
};

export default useProfileLink;
