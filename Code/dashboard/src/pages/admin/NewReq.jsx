import React, { useEffect, useState } from "react";
import {
  approveUser,
  deleteUser,
  getAlluserDatas,
} from "../../services/AdminServices";
import { FaWindowClose, FaCheckSquare } from "react-icons/fa";
import { baseUrl } from "../../config";

function NewRequests() {
  const [data, setdata] = useState([]);

  useEffect(() => {
    getallUserDatas();
  }, []);

  const getallUserDatas = async () => {
    try {
      const res = await getAlluserDatas();
      const pendingUsers = res?.data?.userdata?.filter(
        (user) => user.status === "pending"
      );
      setdata(pendingUsers);
    } catch (error) {
      console.error(error);
    }
  };

  const Delete = async (id) => {
    try {
      const res = await deleteUser(id);
      console.log(res);

      if (res.status === 200) {
        getallUserDatas();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const approveuser = async (id) => {
    try {
      const updateData = {
        id: id,
        status: "approved",
      };
      const res = await approveUser(updateData);
      if (res.status === 200) {
        getallUserDatas();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!data || data?.length === 0) {
    return (
      <div className="main-panel">
        <div style={{ marginTop: "10px" }}>
          <span>No user data found</span>
        </div>
      </div>
    );
  }

  return (
    // <div style={{ marginTop: "70px" }}>
    <div className="main-panel">
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">User Status</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead className="">
                    <tr>
                      <th>
                        <div className="form-check form-check-muted m-0">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                            />
                          </label>
                        </div>
                      </th>
                      <th> User Name </th>
                      <th> Email </th>
                      <th> Contact </th>
                      <th> About </th>
                      <th> Type </th>
                      <th> Status </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data
                      .filter(
                        (item) =>
                          item.role !== "admin" && item.status === "pending"
                      )
                      .map((item, index) => (
                        <tr key={index}>
                          <td>
                            <div className="form-check form-check-muted m-0">
                              <label className="form-check-label">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                />
                              </label>
                            </div>
                          </td>
                          <td>
                            <img
                              // src={`/assets/images/faces/face1.jpg`}
                              src={`${baseUrl}/uploads/${item.profileImg}`}
                              alt="image"
                            />
                            <span className="pl-2">{item.name}</span>
                          </td>
                          <td>{item.email}</td>
                          <td>{item.contact}</td>
                          <td className="bio-column">{item.bio}</td>
                          <td>{item.role}</td>
                          <td className="d-flex gap-2">
                            <button
                              className="btn btn-success d-flex align-items-center mr-2 gap-1"
                              onClick={() => approveuser(item._id)}
                            >
                              <FaCheckSquare />
                            </button>
                            <button
                              className="btn btn-danger d-flex align-items-center gap-1"
                              onClick={() => Delete(item._id)}
                            >
                              <FaWindowClose />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewRequests;
