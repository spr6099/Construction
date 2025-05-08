import React from "react";

function ViewWorks() {
  return (
    <div className="main-panel">
      <div className="content-wrapper">
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
    </div>
  );
}

export default ViewWorks;
