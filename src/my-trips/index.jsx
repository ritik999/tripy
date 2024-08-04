import { db } from "@/service/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyTripsCard from "./components/MyTripsCard";

const MyTrips = () => {
  const navigate = useNavigate();
  const [userTrips,setUserTrips]=useState([]);

  useEffect(()=>{
    getUserTrips();
  },[])

  const getUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/");
      return;
    }
    const q = query(
        collection(db, "AItrip"),
        where("userEmail", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);
    setUserTrips([]);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setUserTrips((prev)=>[...prev,doc.data()]);
    });
  };

  console.log(userTrips);
  

  return(
    <div className="px-20 py-16">
      <h1 className="font-bold text-lg mb-8">My Trips</h1>
      <div className="grid grid-cols-3 gap-12">
        {userTrips.map((e,index)=>(
                  <MyTripsCard tripData={e} key={index} />
        ))} 
      </div>
    </div>
  );
};

export default MyTrips;
