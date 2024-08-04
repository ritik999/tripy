import React from "react";
import PlaceCard from "./PlaceCard";

const PlaceDetails = ({ trip }) => {
  return (
    <div>
      <h1 className="font-bold text-xl">Places to Visit</h1>
      {trip?.tripData?.itinerary?.map((ele, index) => (
        <>
          <div className="mt-4">
            <h1 className="font-bold text-md mt-10">Day {ele.day}</h1>
            <div className="grid grid-cols-2 gap-5">
              {ele.plan.map((place, index) => (
                <>
                  <PlaceCard place={place} />
                </>
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default PlaceDetails;
