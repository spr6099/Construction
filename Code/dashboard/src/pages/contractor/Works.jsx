import React, { useContext, useEffect, useState } from "react";
import Work from "../../components/Work";
import { AuthContext } from "../../context/AuthContext";
import { getAllWorksAPI } from "../../services/ContractorService";

function Works() {
  const context = useContext(AuthContext);
  const [tenders, settenders] = useState([]);

  const id = {
    id: context?.user?._id,
  };

  useEffect(() => {
    getnewWorks();
  }, []);

  const getnewWorks = async () => {
    try {
      const response = await getAllWorksAPI(id);
      const data = response?.data?.data || [];

      const filteredTenders = data.filter(
        (work) =>
          work.contractorId?._id === id?.id ||
          work.contractorId?.toString() === id?.id
      );

      settenders(filteredTenders);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(tenders);
  return (
    <div className="main-panel">
      Works
      {tenders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {tenders.map((item) => (
            <Work
              key={item._id}
              workId={item._id}
              title={item.workType}
              totalArea={item?.totalSqFt}
              deadline={item?.contractor?.Deadline}
              budjet={item?.contractor?.Amount}
              description={item.description}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl font-bold">No Works Available</h1>
        </div>
      )}
    </div>
  );
}

export default Works;
