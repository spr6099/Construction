import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashBoard from "./pages/admin/AdminDashboard";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
