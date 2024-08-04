import { getPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HotelCard = ({ ele }) => {
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    ele && getPlacePhoto();
  }, [ele]);

  const getPlacePhoto = async () => {
    const data = {
      textQuery: ele.name,
    };
    const result = await getPlaceDetails(data).then((res) => {
      console.log(res.data);
      const photoURL = PHOTO_REF_URL.replace(
        "{NAME}",
        res.data.places[0].photos[5].name
      );
      console.log(photoURL);
      setPhotoURL(photoURL);
    });
  };

  return (
    <div className="hover:scale-110 transition-all cursor-pointer">
      <Link
        to={
          "https://www.google.com/maps/search/?api=1&query=" +
          ele.name +
          "," +
          ele.address
        }
        target="_blank"
      >
        <img src={photoURL} className="mb-3 rounded-lg h-[200px] w-full" />
        <div className="px-2">
          <div className="flex flex-col gap-1">
            <p className="font-semibold ">{ele.name}</p>
            <p className="text-sm text-gray-700">📍 {ele.address}</p>
            <p className="font-semibold">💰 {ele.price} per night</p>
            <p className="font-semibold">⭐ {ele.rating} stars</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HotelCard;
