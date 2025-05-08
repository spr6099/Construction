import React, { useEffect, useState } from "react";
import ConsultancyCards from "../components/ConsultancyCards";
import Services from "../../components/Services";

function Dashboard() {
  return (
    <div>
      <Services />
      <ConsultancyCards />
    </div>
  );
}

export default Dashboard;
