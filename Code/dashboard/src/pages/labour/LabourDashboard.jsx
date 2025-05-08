import React from "react";

function LabourDashBoard() {
  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="row">
          <div className="col-12 grid-margin stretch-card">
            <div className="card corona-gradient-card">
              <div className="card-body py-0 px-0 px-sm-3">
                <div className="row align-items-center">
                  <div className="col-4 col-sm-3 col-xl-2">
                    <img
                      src="/assets/images/dashboard/Group126@2x.png"
                      className="gradient-corona-img img-fluid"
                      alt=""
                    />
                  </div>
                  <div className="col-5 col-sm-7 col-xl-8 p-0">
                    <h4 className="mb-1 mb-sm-0">Want even more features?</h4>
                    <p className="mb-0 font-weight-normal d-none d-sm-block">
                      Check out our Pro version with 5 unique layouts!
                    </p>
                  </div>
                  <div className="col-3 col-sm-2 col-xl-2 pl-0 text-center">
                    <span>
                      <a
                        href="https://www.bootstrapdash.com/product/corona-admin-template/"
                        target="_blank"
                        className="btn btn-outline-light btn-rounded get-started-btn"
                        rel="noopener noreferrer"
                      >
                        Upgrade to PRO
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {[
            {
              value: "$12.34",
              change: "+3.5%",
              changeClass: "text-success",
              iconClass: "mdi-arrow-top-right",
              label: "Potential growth",
            },
            {
              value: "$17.34",
              change: "+11%",
              changeClass: "text-success",
              iconClass: "mdi-arrow-top-right",
              label: "Revenue current",
            },
            {
              value: "$12.34",
              change: "-2.4%",
              changeClass: "text-danger",
              iconClass: "mdi-arrow-bottom-left",
              label: "Daily Income",
            },
            {
              value: "$31.53",
              change: "+3.5%",
              changeClass: "text-success",
              iconClass: "mdi-arrow-top-right",
              label: "Expense current",
            },
          ].map((card, index) => (
            <div
              key={index}
              className="col-xl-3 col-sm-6 grid-margin stretch-card"
            >
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-9">
                      <div className="d-flex align-items-center align-self-start">
                        <h3 className="mb-0">{card.value}</h3>
                        <p
                          className={`${card.changeClass} ml-2 mb-0 font-weight-medium`}
                        >
                          {card.change}
                        </p>
                      </div>
                    </div>
                    <div className="col-3">
                      <div
                        className={`icon icon-box-${
                          card.changeClass === "text-danger"
                            ? "danger"
                            : "success"
                        }`}
                      >
                        <span
                          className={`mdi ${card.iconClass} icon-item`}
                        ></span>
                      </div>
                    </div>
                  </div>
                  <h6 className="text-muted font-weight-normal">
                    {card.label}
                  </h6>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row">
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Transaction History</h4>
                <canvas
                  id="transaction-history"
                  className="transaction-chart"
                ></canvas>
                <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                  <div className="text-md-center text-xl-left">
                    <h6 className="mb-1">Transfer to Paypal</h6>
                    <p className="text-muted mb-0">07 Jan 2019, 09:12AM</p>
                  </div>
                  <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                    <h6 className="font-weight-bold mb-0">$236</h6>
                  </div>
                </div>
                <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                  <div className="text-md-center text-xl-left">
                    <h6 className="mb-1">Tranfer to Stripe</h6>
                    <p className="text-muted mb-0">07 Jan 2019, 09:12AM</p>
                  </div>
                  <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                    <h6 className="font-weight-bold mb-0">$593</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-8 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-row justify-content-between">
                  <h4 className="card-title mb-1">Open Projects</h4>
                  <p className="text-muted mb-1">Your data status</p>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="preview-list">
                      {[
                        {
                          title: "Admin dashboard design",
                          desc: "Broadcast web app mockup",
                          time: "15 minutes ago",
                          stats: "30 tasks, 5 issues",
                          iconClass: "mdi mdi-file-document",
                          iconBg: "bg-primary",
                        },
                        {
                          title: "Wordpress Development",
                          desc: "Upload new design",
                          time: "1 hour ago",
                          stats: "23 tasks, 5 issues",
                          iconClass: "mdi mdi-cloud-download",
                          iconBg: "bg-success",
                        },
                        {
                          title: "Project meeting",
                          desc: "New project discussion",
                          time: "35 minutes ago",
                          stats: "15 tasks, 2 issues",
                          iconClass: "mdi mdi-clock",
                          iconBg: "bg-info",
                        },
                        {
                          title: "Broadcast Mail",
                          desc: "Sent release details to team",
                          time: "55 minutes ago",
                          stats: "35 tasks, 7 issues",
                          iconClass: "mdi mdi-email-open",
                          iconBg: "bg-danger",
                        },
                        {
                          title: "UI Design",
                          desc: "New application planning",
                          time: "50 minutes ago",
                          stats: "27 tasks, 4 issues",
                          iconClass: "mdi mdi-chart-pie",
                          iconBg: "bg-warning",
                        },
                      ].map((item, idx) => (
                        <div
                          className={`preview-item ${
                            idx < 4 ? "border-bottom" : ""
                          }`}
                          key={idx}
                        >
                          <div className="preview-thumbnail">
                            <div className={`preview-icon ${item.iconBg}`}>
                              <i className={item.iconClass}></i>
                            </div>
                          </div>
                          <div className="preview-item-content d-sm-flex flex-grow">
                            <div className="flex-grow">
                              <h6 className="preview-subject">{item.title}</h6>
                              <p className="text-muted mb-0">{item.desc}</p>
                            </div>
                            <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                              <p className="text-muted">{item.time}</p>
                              <p className="text-muted mb-0">{item.stats}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-4 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Revenue</h5>
                <div className="row">
                  <div className="col-8 col-sm-12 col-xl-8 my-auto">
                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                      <h2 className="mb-0">$32123</h2>
                      <p className="text-success ml-2 mb-0 font-weight-medium">
                        +3.5%
                      </p>
                    </div>
                    <h6 className="text-muted font-weight-normal">
                      11.38% Since last month
                    </h6>
                  </div>
                  <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                    <i className="icon-lg mdi mdi-codepen text-primary ml-auto"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-4 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Sales</h5>
                <div className="row">
                  <div className="col-8 col-sm-12 col-xl-8 my-auto">
                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                      <h2 className="mb-0">$45850</h2>
                      <p className="text-success ml-2 mb-0 font-weight-medium">
                        +8.3%
                      </p>
                    </div>
                    <h6 className="text-muted font-weight-normal">
                      9.61% Since last month
                    </h6>
                  </div>
                  <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                    <i className="icon-lg mdi mdi-wallet-travel text-danger ml-auto"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-4 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Purchase</h5>
                <div className="row">
                  <div className="col-8 col-sm-12 col-xl-8 my-auto">
                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                      <h2 className="mb-0">$2039</h2>
                      <p className="text-danger ml-2 mb-0 font-weight-medium">
                        -2.1%
                      </p>
                    </div>
                    <h6 className="text-muted font-weight-normal">
                      2.27% Since last month
                    </h6>
                  </div>
                  <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                    <i className="icon-lg mdi mdi-monitor text-success ml-auto"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
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
        </div>

        {/* Messages */}
        <div className="row">
          <div className="col-md-6 col-xl-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-row justify-content-between">
                  <h4 className="card-title">Messages</h4>
                  <p className="text-muted mb-1 small">View all</p>
                </div>
                <div className="preview-list">
                  {[
                    {
                      name: "Leonard",
                      image: "face6.jpg",
                      time: "5 minutes ago",
                      msg: "Well, it seems to be working now.",
                    },
                    {
                      name: "Luella Mills",
                      image: "face8.jpg",
                      time: "10 Minutes Ago",
                      msg: "Well, it seems to be working now.",
                    },
                    {
                      name: "Ethel Kelly",
                      image: "face9.jpg",
                      time: "2 Hours Ago",
                      msg: "Please review the tickets",
                    },
                    {
                      name: "Herman May",
                      image: "face11.jpg",
                      time: "4 Hours Ago",
                      msg: "Thanks a lot. It was easy to fix it .",
                    },
                  ].map((msg, index) => (
                    <div className="preview-item border-bottom" key={index}>
                      <div className="preview-thumbnail">
                        <img
                          src={`/assets/images/faces/${msg.image}`}
                          alt="image"
                          className="rounded-circle"
                        />
                      </div>
                      <div className="preview-item-content d-flex flex-grow">
                        <div className="flex-grow">
                          <div className="d-flex d-md-block d-xl-flex justify-content-between">
                            <h6 className="preview-subject">{msg.name}</h6>
                            <p className="text-muted text-small">{msg.time}</p>
                          </div>
                          <p className="text-muted">{msg.msg}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Portfolio */}
         

          {/* To-do List */}
          <div className="col-md-12 col-xl-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">To do list</h4>
                <div className="add-items d-flex">
                  <input
                    type="text"
                    className="form-control todo-list-input"
                    placeholder="enter task.."
                  />
                  <button className="add btn btn-primary todo-list-add-btn">
                    Add
                  </button>
                </div>
                <div className="list-wrapper">
                  <ul className="d-flex flex-column-reverse text-white todo-list todo-list-custom">
                    {[
                      { task: "Create invoice", completed: false },
                      { task: "Meeting with Alita", completed: false },
                      {
                        task: "Prepare for presentation",
                        completed: true,
                      },
                      { task: "Plan weekend outing", completed: false },
                      {
                        task: "Pick up kids from school",
                        completed: false,
                      },
                    ].map((todo, i) => (
                      <li key={i} className={todo.completed ? "completed" : ""}>
                        <div className="form-check form-check-primary">
                          <label className="form-check-label">
                            <input
                              className="checkbox"
                              type="checkbox"
                              defaultChecked={todo.completed}
                            />
                            {todo.task}
                          </label>
                        </div>
                        <i className="remove mdi mdi-close-box"></i>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visitors by Countries */}
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Visitors by Countries</h4>
                <div className="row">
                  <div className="col-md-5">
                    <div className="table-responsive">
                      <table className="table">
                        <tbody>
                          {[
                            ["us", "USA", 1500, "56.35%"],
                            ["de", "Germany", 800, "33.25%"],
                            ["au", "Australia", 760, "15.45%"],
                            ["gb", "United Kingdom", 450, "25.00%"],
                            ["ro", "Romania", 620, "10.25%"],
                            ["br", "Brasil", 230, "75.00%"],
                          ].map(([code, country, count, percent], i) => (
                            <tr key={i}>
                              <td>
                                <i
                                  className={`flag-icon flag-icon-${code}`}
                                ></i>
                              </td>
                              <td>{country}</td>
                              <td className="text-right">{count}</td>
                              <td className="text-right font-weight-medium">
                                {percent}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div id="audience-map" className="vector-map"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="footer">
          <div className="d-sm-flex justify-content-center justify-content-sm-between">
            <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">
              Copyright © bootstrapdash.com 2020
            </span>
            <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
              Free{" "}
              <a
                href="https://www.bootstrapdash.com/bootstrap-admin-template/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bootstrap admin templates
              </a>{" "}
              from Bootstrapdash.com
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default LabourDashBoard  ;
