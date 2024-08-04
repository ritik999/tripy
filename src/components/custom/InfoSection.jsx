import React, { useEffect, useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { Button } from "../ui/button";
import { getPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";



const InfoSection = ({ trip }) => {

    const[photoURL,setPhotoURL]=useState('');

    useEffect(()=>{
        trip && getPlacePhoto()
    },[trip])

    const getPlacePhoto=async()=>{
        const data={
            textQuery:trip?.tripData?.trip?.location
        }
        const result=await getPlaceDetails(data).then((res)=>{
            const photoURL=PHOTO_REF_URL.replace('{NAME}',res.data.places[0].photos[5].name)
            setPhotoURL(photoURL);
        })
    }

  return (
    <div>
      <img
        src={photoURL}
        className="h-[300px] w-full object-cover rounded-lg mb-7"
      />
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl">
            {trip?.tripData?.trip?.location}
          </h1>
          <div className="flex gap-4 mt-2">
            <h1 className="font-semibold bg-gray-300 px-3 rounded-sm text-gray-700">
              📅 Duration: {trip?.tripData?.trip?.duration}
            </h1>
            <h1 className="font-semibold bg-gray-300 px-3 rounded-sm text-gray-700">
              💰 Budget: {trip?.tripData?.trip?.budget}
            </h1>
            <h1 className="font-semibold bg-gray-300 px-3 rounded-sm text-gray-700">
              🥂 Travelers: {trip?.tripData?.trip?.travelers}
            </h1>
          </div>
        </div>
        <Button><FaTelegramPlane size={'lg'} /></Button>
      </div>
    </div>
  );
};

export default InfoSection;
