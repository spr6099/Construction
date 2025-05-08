import React from 'react';

const dummyEmployees = [
  {
    id: 1,
    name: 'Ravi Kumar',
    role: 'Electrician',
    experience: '5 years',
    contact: '9876543210',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Anita Sharma',
    role: 'Painter',
    experience: '3 years',
    contact: '9876512345',
    status: 'On Leave',
  },
  {
    id: 3,
    name: 'Suresh Reddy',
    role: 'Plumber',
    experience: '7 years',
    contact: '9123456789',
    status: 'Active',
  },
];

function DummyPage() {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Employee List</h2>
      <div className="row">
        {dummyEmployees.map((emp) => (
          <div className="col-md-4 mb-4" key={emp.id}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{emp.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{emp.role}</h6>
                <p className="card-text">
                  <strong>Experience:</strong> {emp.experience} <br />
                  <strong>Contact:</strong> {emp.contact}
                </p>
                <span
                  className={`badge ${
                    emp.status === 'Active' ? 'bg-success' : 'bg-secondary'
                  }`}
                >
                  {emp.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}




export default DummyPage;
