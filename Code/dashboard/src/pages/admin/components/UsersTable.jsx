import React, { useEffect, useState } from "react";
import { deleteUser, getAlluserDatas } from "../../../services/AdminServices";
import { baseUrl } from "../../../config";

function UsersTable() {
  const [data, setdata] = useState([]);

  useEffect(() => {
    getallUserDatas();
  }, []);
  console.log(data);

  const getallUserDatas = async () => {
    try {
      const res = await getAlluserDatas();
      const users = res?.data?.userdata?.filter(
        (item) => item.role !== "admin"
      );
      setdata(users);
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

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">User Status</h4>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>
                  <div className="form-check form-check-muted m-0">
                    <label className="form-check-label">
                      <input type="checkbox" className="form-check-input" />
                    </label>
                  </div>
                </th>
                <th> User Name </th>
                <th> Email </th>
                <th> Contact </th>
                <th> Type </th>
                <th> User Status </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="form-check form-check-muted m-0">
                      <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" />
                      </label>
                    </div>
                  </td>
                  <td>
                    <img
                      src={`${baseUrl}/uploads/${item.profileImg}`}
                      alt="image"
                    />
                    <span className="pl-2">{item.name}</span>
                  </td>
                  <td>{item.email}</td>
                  <td>{item.contact}</td>
                  <td>{item.role}</td>
                  <td>
                    <div
                      className={`badge ${
                        item.status === "approved"
                          ? "badge-outline-success"
                          : "badge-outline-danger"
                      }`}
                    >
                      {item.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UsersTable;

/* <div className="row">
<div className="col-12 grid-margin">
  <div className="card">
    <div className="card-body">
      <h4 className="card-title">Order Status</h4>
      <div className="table-responsive">
        <table className="table">
          <thead>
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
              <th> Client Name </th>
              <th> Order No </th>
              <th> Product Cost </th>
              <th> Project </th>
              <th> Payment Mode </th>
              <th> Start Date </th>
              <th> Payment Status </th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                name: "Henry Klein",
                image: "face1.jpg",
                status: "Approved",
                badge: "success",
              },
              {
                name: "Estella Bryan",
                image: "face2.jpg",
                status: "Pending",
                badge: "warning",
              },
              {
                name: "Lucy Abbott",
                image: "face5.jpg",
                status: "Rejected",
                badge: "danger",
              },
              {
                name: "Peter Gill",
                image: "face3.jpg",
                status: "Approved",
                badge: "success",
              },
              {
                name: "Sallie Reyes",
                image: "face4.jpg",
                status: "Approved",
                badge: "success",
              },
            ].map((order, index) => (
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
                    src={`/assets/images/faces/${order.image}`}
                    alt="image"
                  />
                  <span className="pl-2">{order.name}</span>
                </td>
                <td>02312</td>
                <td>$14,500</td>
                <td>Dashboard</td>
                <td>Credit card</td>
                <td>04 Dec 2019</td>
                <td>
                  <div
                    className={`badge badge-outline-${order.badge}`}
                  >
                    {order.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</div> */
