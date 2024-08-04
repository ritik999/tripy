import HotelRecommandation from '@/components/custom/HotelRecommandation'
import InfoSection from '@/components/custom/InfoSection'
import PlaceDetails from '@/components/custom/PlaceDetails'
import { db } from '@/service/FirebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ViewTrip = () => {
    const {tripId}=useParams()
    const [trip,setTrip]=useState([]);

    useEffect(()=>{
        tripId && getTripData();
    },[tripId])

    const getTripData=async()=>{
        const docRef=doc(db,'AItrip',tripId);
        const docSnap=await getDoc(docRef);

        if (docSnap.exists()) {
            setTrip(docSnap.data());
          } else {
            console.log("No such document!");
          }
    }
  return (
    <div className='flex flex-col gap-12 p-10 md:p-20 lg:p-24 xl:p-16'>
        <InfoSection trip={trip} />
        <HotelRecommandation trip={trip} />
        <PlaceDetails trip={trip} />
    </div>
  )
}

export default ViewTrip