import React, { useContext, useEffect, useState } from "react";
import LabourCard from "../../components/LabourCard";
import {
  getLaboursAPI,
  NewofferLetterAPI,
} from "../../services/ContractorService";
import useNewWorks from "../../hooks/useNewWork";
import context from "react-bootstrap/esm/AccordionContext";
import { AuthContext } from "../../context/AuthContext";

function Labours() {
  const [Labours, setLabours] = useState([]);
  const context = useContext(AuthContext);

  const userId = context?.user?._id; // Get the user ID from context
  const { works, loading, error } = useNewWorks(userId);

  useEffect(() => {
    getLabours();
  }, []);

  const getLabours = async () => {
    const response = await getLaboursAPI();
    console.log(response.data?.data);
    setLabours(response.data?.data);
  };

  if (loading) return <p>Loading works...</p>;
  if (error) return <p>Error loading works: {error.message}</p>;

  const handleOfferLetter = async (labourId, offerDetails) => {
    // console.log("Offer Letter Details for Labourer ID:", id);
    // console.log("Work Days:", offerDetails.workDays);
    // console.log("WorkId:", offerDetails.workId);
    // console.log("Salary:", offerDetails.salary);
    // console.log("Location:", offerDetails.location);
    // console.log("Description:", offerDetails.description);

    const data = {
      labourId: labourId,
      clientWorkId: offerDetails.workId,
      contractorId: userId,
      workDays: offerDetails.workDays,
      salary: offerDetails.salary,
      location: offerDetails.location,
      description: offerDetails.description,
    };

    try {
      console.log("data", data);

      const response = await NewofferLetterAPI(data);
      console.log(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="main-panel">
      Labours
      <div className="row">
        {Labours?.map((item) => {
          return (
            <div
              key={item._id}
              className="col-md-4 col-sm-6 d-flex justify-content-center mb-4"
            >
              <LabourCard
                id={item._id}
                labourId={item.labourId._id}
                name={item.labourId.name}
                email={item.labourId.email}
                contact={item.labourId.contact}
                address={item.labourId.address}
                profileImg={item.labourId.profileImg}
                bio={item.labourId.bio}
                onOfferLetter={handleOfferLetter} // Passing the handler function
                works={works} // Pass the works data to LabourCard if needed
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Labours;
