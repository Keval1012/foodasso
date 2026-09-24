// MainCashFlow.tsx
import React, { useState } from "react";
import CashFlow from "./CashFlow";
import CashFlowListing, { CashFlowOrder } from "./CashFlowListing";
import SettlementPayment from "./SettlementPayment";
import { CashFlowListingData } from "./CashFlowListingData";

const MainCashFlow = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showSettlementPayment, setShowSettlementPayment] = useState(false);

  const handleSettlementClick = (id: number) => {
    setSelectedId(id);
    setShowSettlementPayment(true);
  };

  return (
    <div className="w-full bg-white">
      <CashFlow />
      {showSettlementPayment ? (
        <SettlementPayment />
      ) : (
        <CashFlowListing
          CashFlowListingData={CashFlowListingData}
          onSettlementClick={handleSettlementClick}
        />
      )}
    
    </div>
  );
};

export default MainCashFlow;
