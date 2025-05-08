

import { useContext, useState } from "react";
import "./App.css";
import { AuthContext } from "./context/Authcontext";
import { Route, Routes } from "react-router-dom";
import UserLayout from "./layout/userLayout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/user/Dashboard";

function App() {
  const [user, setuser] = useState(JSON.parse(sessionStorage.getItem("user")));
  return (
    <>
      <AuthContext.Provider value={{ user, setuser }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/user" element={<UserLayout />}>
            <Route path="dashboard" index element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthContext.Provider>
    </>
  );
}

export default App;
