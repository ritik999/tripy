import { getPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";

const PlaceCard = ({ place }) => {
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    place && getPlacePhoto();
  }, [place]);

  const getPlacePhoto = async () => {
    const data = {
      textQuery: place.place,
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
    <div className="mt-1">
      <h1 className="font-semibold text-orange-600">{place.time}</h1>
      <div className="h-[150px] px-4 py-2 rounded-lg border flex">
        <img
          src={photoURL}
          className="w-[150px] h-[140px] object-cover rounded-lg mr-5"
        />
        <div>
          <div className="flex gap-4 mb-4">
            <h1 className="font-bold">{place.place}</h1>
            <p className="bg-gray-400 rounded-lg px-3">
              rating: {place.rating} ⭐
            </p>
          </div>
          <h1 className="text-gray-700 mb-5">{place.details}</h1>
          <p>
            Ticket Price:{" "}
            <span className="bg-gray-400 font-semibold rounded-lg px-3">
              {place.ticket}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
