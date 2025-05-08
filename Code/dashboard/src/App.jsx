import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import AdminDashBoard from "./pages/admin/AdminDashboard";
import LandingPage from "./pages/LandingPage";
import { AuthContext } from "./context/AuthContext";
import { useState } from "react";
import AdminLayout from "./layout/AdminLayout";
import User from "./pages/admin/User";
import Labours from "./pages/admin/Labours";
import ContractorLabours from "./pages/contractor/Labours";
import Contractors from "./pages/admin/Contractors";
import Supplyers from "./pages/admin/Supplyers";
import NewRequests from "./pages/admin/NewReq";
import ConsultancyLayout from "./layout/ConsultancyLayout";
import Dashboard from "./pages/consultancy/Dashboard";
import SupplyerLayout from "./layout/SupplyerLayout";
import SupplyerDashBoard from "./pages/supplyer/SupplyerDashboard";
import ContractorLayout from "./layout/ContractorLayout";
import ContractorDashBoard from "./pages/contractor/ContractorDashboard";
import LabourLayout from "./layout/LabourLayout";
import Profile from "./pages/consultancy/ConsultancyProfile";
import LabourDashBoard from "./pages/labour/LabourDashboard";
import LabourProfile from "./pages/labour/LabourProfile";
import AddWorks from "./pages/consultancy/AddPromoWorks";
import ViewWorks from "./pages/consultancy/ViewPromoWorks";
import ContractorProfile from "./pages/contractor/ContractorProfile";
import SupplyerProfile from "./pages/supplyer/SupplyerProfile";
import AddProducts from "./pages/supplyer/AddProducts";
import DummyPage from "./pages/DummyPage";
import NewProposals from "./pages/consultancy/NewProposals";
import BiddingProposals from "./pages/consultancy/BiddingProposals";
import NewTender from "./pages/contractor/NewTender";
import ContractorProposals from "./pages/consultancy/ContractorProposals";
import Tenders from "./pages/consultancy/Tenders";
import OngoingProjects from "./pages/consultancy/OngoingProjects";
import Reports from "./pages/admin/Reports";
import Products from "./pages/contractor/Products";
import Works from "./pages/contractor/Works";
import WorkPage from "./pages/contractor/WorkPage";
import Cart from "./pages/contractor/Cart";
import OfferLetters from "./pages/labour/OfferLetters";

function App() {
  const [user, setuser] = useState(JSON.parse(sessionStorage.getItem("user")));

  return (
    <>
      <AuthContext.Provider value={{ user, setuser }}>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/dummy" element={<DummyPage />}></Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" index element={<AdminDashBoard />} />
            <Route path="supplyer" element={<Supplyers />} />
            <Route path="contractor" element={<Contractors />} />
            <Route path="newrequests" element={<NewRequests />} />
            <Route path="labour" element={<Labours />} />
            <Route path="user" element={<User />} />
            <Route path="reports" element={<Reports />} />
            <Route path="work-page/:id" element={<WorkPage />} />

          </Route>
          <Route path="/consultancy" element={<ConsultancyLayout />}>
            <Route path="dashboard" index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="addworks" element={<AddWorks />} />
            <Route path="viewworks" element={<ViewWorks />} />
            <Route path="newProposals" element={<NewProposals />} />
            <Route path="bidding_proposals" element={<BiddingProposals />} />
            <Route
              path="contractorProposals"
              element={<ContractorProposals />}
            />
            <Route path="tenders" element={<Tenders />} />
            <Route path="startingprojects" element={<OngoingProjects />} />
          </Route>
          <Route path="/supplier" element={<SupplyerLayout />}>
            <Route path="dashboard" index element={<SupplyerDashBoard />} />
            <Route path="supplyer_profile" element={<SupplyerProfile />} />
            <Route path="add_products" element={<AddProducts />} />
          </Route>
          <Route path="/contractor" element={<ContractorLayout />}>
            <Route path="dashboard" index element={<ContractorDashBoard />} />
            <Route path="contractor_profile" element={<ContractorProfile />} />
            <Route path="newtenders" element={<NewTender />} />
            <Route path="products" element={<Products />} />
            <Route path="labours" element={<ContractorLabours />} />
            <Route path="works" element={<Works />} />
            <Route path="work-page/:id" element={<WorkPage />} />
            <Route path="cart/:id" element={<Cart />} />
          </Route>
          <Route path="/labour" element={<LabourLayout />}>
            <Route path="dashboard" index element={<LabourDashBoard />} />
            <Route path="profile" element={<LabourProfile />} />
            <Route path="offerLetter" element={<OfferLetters />} />
          </Route>
        </Routes>
      </AuthContext.Provider>
    </>
  );
}

export default App;
