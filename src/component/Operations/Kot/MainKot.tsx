import React from "react";
import Kot from "./Kot";
import KotListing from "./kotListing";
import { kotListingData } from "./kotListingData";
import KotDetails from "./KotDetails ";


function MainKot() {
  return (
    <div className="w-full bg-white">
      {/* <Kot /> */}
      <KotListing KotListingData={kotListingData} />
      {/* <KotDetails /> */}
    </div>
  );
}

export default MainKot;
