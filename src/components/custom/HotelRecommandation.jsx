import React, { useState } from "react";
import { Link } from "react-router-dom";
import HotelCard from "./HotelCard";

const HotelRecommandation = ({ trip }) => {

  return (
    <div>
      <h1 className="font-bold text-lg mb-5">Hotel Recommandation</h1>
      <div className="grid grid-cols-3 gap-7">
        {trip?.tripData?.hotel.map((ele, index) => (
          <>
            <HotelCard ele={ele} />
          </>
        ))}
      </div>
    </div>
  );
};

export default HotelRecommandation;
