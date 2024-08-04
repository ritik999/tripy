import { getPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const MyTripsCard = ({tripData}) => {
    const [photoURL, setPhotoURL] = useState("");

    useEffect(() => {
        console.log('effect');
        
      tripData && getPlacePhoto();
    }, []);
  
    const getPlacePhoto = async () => {
      const data = {
        textQuery: tripData?.userSelection?.location?.label,
      };
      const result = await getPlaceDetails(data).then((res) => {
        const photoURL = PHOTO_REF_URL.replace(
          "{NAME}",
          res.data.places[0].photos[5].name
        );
        setPhotoURL(photoURL);
      });
    };
  
    return (
      <div className="hover:scale-110 transition-all cursor-pointer">
        <Link
          to={
            '/view-trip/'+tripData?.docId
          }
          target="_blank"
        >
          <img src={photoURL} className="mb-3 rounded-lg h-[200px] w-full" />
          <div className="px-2">
            <div className="flex flex-col gap-1">
              <p className="font-semibold ">{tripData?.userSelection?.location?.label}</p>
              <p className="font-semibold">💰 {tripData?.tripData?.trip?.duration} trip with {tripData?.tripData?.trip?.budget} budget</p>
            </div>
          </div>
        </Link>
      </div>
    );
}

export default MyTripsCard