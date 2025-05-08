import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Work = ({ workId, title, totalArea, deadline, budjet, description }) => {
  const [expandedWorkId, setExpandedWorkId] = useState(null);
  const navigate = useNavigate();
  const toggleExpand = (id) => {
    setExpandedWorkId(expandedWorkId === id ? null : id);
  };
  // console.log(workId);

  const handleMoreDetails = () => {
    // Handle the logic for showing more details here
    navigate(`/contractor/work-page/${workId}`);
    navigate(`/admin/work-page/${workId}`);
  };

  return (
    <div>
      <div className="p-6 max-w-4xl ">
        <div className=" shadow-md rounded-lg mb-4 p-4 border ">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="text-sm text-gray-600">location</p>
            </div>
            <button
              onClick={() => toggleExpand(workId)}
              className="text-blue-600 hover:underline"
            >
              {expandedWorkId === workId ? "Hide Details" : "View Details"}
            </button>
          </div>

          {expandedWorkId === workId && (
            <div className="mt-4 text-gray-700">
              <p>
                <strong>Total Area:</strong> {totalArea} sq ft
              </p>
              <p>
                <strong>Deadline:</strong> {deadline}
              </p>
              <p>
                <strong>Budget:</strong> ₹{budjet}
              </p>
              <p>
                <strong>Description:</strong> {description}
              </p>

              <div className="mt-4 flex gap-4">
                <button
                  onClick={handleMoreDetails}
                  className="bg-blue-500  px-4 py-2 rounded hover:bg-blue-600"
                >
                  click more details
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Work;
