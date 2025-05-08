import React from "react";
import NewProposals from "./NewProposals";
import BiddingProposals from "./BiddingProposals";
import ContractorProposals from "./ContractorProposals";

function Tenders() {
  return (
    <div className="main-panel">
      <h3>Tenders</h3>
      <div>
        <NewProposals />
      </div>
      <div>
        <BiddingProposals />
      </div>
      <div>
        <ContractorProposals />
      </div>
    </div>
  );
}

export default Tenders;
