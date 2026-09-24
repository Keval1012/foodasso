import React, { useState } from "react";
import Expense from "./Expense";
import ExpenseListing from "./ExpenseListing";
import { ExpenseListingData } from "./ExpenseListingData";
import ExpenseMangment from "./ExpenseMangment";
import ExpenseDatelis from "./ExpenseDatelis";
import ExpenseDatelisListing from "./ExpenseDatelisListing";

function Mainexpense() {
  const [currentComponent, setCurrentComponent] = useState("expense");

  const handleNavigation = (component:any) => {
    setCurrentComponent(component);
  };

  return (
    <div className="w-full bg-white">
      {currentComponent === "expense" && (
        <Expense onAddExpense={() => handleNavigation("expenseManagement")} />
      )}
      {currentComponent === "expenseManagement" && <ExpenseMangment />}
      <ExpenseListing ExpenseListingData={ExpenseListingData} />
    
    </div>
  );
}

export default Mainexpense;
