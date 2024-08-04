import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constants/options";
import { chatSession } from "@/service/AiModel";
import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { ImSpinner8 } from "react-icons/im";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/FirebaseConfig";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDailog, setOpenDailog] = useState(false);
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();

  const handleInputChange = (name, value) => {

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onGenerate = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDailog(true);
      return;
    }

    if (
      formData["noOfDays"] > 5 ||
      !formData["location"] ||
      !formData["budget"] ||
      !formData["traveler"]
    ) {
      toast("Please fill all detailes");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    setLoading(false);
    saveAiTrip(result?.response?.text())
  };

  const login=useGoogleLogin({
    onSuccess:(credRes)=>getUserInfo(credRes),
    onError:(error)=>console.log(error)
  })

  const getUserInfo=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenInfo?.access_token}`)
    .then((res)=>{
    localStorage.setItem("user",JSON.stringify(res.data));
    setOpenDailog(false);
    onGenerate()
    })
  }

  const saveAiTrip=async(TripData)=>{
    const user=JSON.parse(localStorage.getItem('user'));
    const docId=Date.now().toString();
    await setDoc(doc(db, "AItrip", docId), {
      userSelection:formData,
      tripData:JSON.parse(TripData),
      userEmail:user?.email,
      docId:docId
    });
    navigate('/view-trip/'+docId)
  }

  return (
    <div className="sm:px-10 md:px-34 lg:px-56 py-5 mt-10">
      <h1 className="font-extrabold text-4xl mb-2">
        Tell us your travel preferences 🏕️🌴
      </h1>
      <p className="text-xl text-gray-600">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-16 flex flex-col gap-10">
        <div>
          <h1 className="text-2xl font-medium my-2">
            What is destination of choice?
          </h1>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>

        <div>
          <h1 className="text-2xl font-medium my-2">
            How many days are you planning your trip?
          </h1>
          <Input
            placeholder={"Ex.3"}
            type={"number"}
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        <div>
          <h1 className="text-2xl font-medium my-2">What is Your Budget?</h1>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((k, i) => (
              <div
                key={k.id}
                className={`border p-3 rounded-lg hover:shadow-md cursor-pointer ${
                  formData?.budget == k.title && "shadow-lg border-2"
                }`}
                onClick={() => handleInputChange("budget", k.title)}
              >
                <p className="text-4xl">{k.icon}</p>
                <h1 className="font-extrabold text-xl">{k.title}</h1>
                <p className="text-sm text-gray-500">{k.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-medium my-2">
            Who do you plan on traveling with on your next adventure?
          </h1>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelesList.map((k, i) => (
              <div
                key={k.id}
                className={`border p-3 rounded-lg hover:shadow-md cursor-pointer ${
                  formData?.traveler == k.people && "shadow-lg border-2"
                }`}
                onClick={() => handleInputChange("traveler", k.people)}
              >
                <p className="text-4xl">{k.icon}</p>
                <h1 className="font-extrabold text-xl">{k.title}</h1>
                <p className="text-sm text-gray-500">{k.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end" onClick={() => onGenerate()}>
          <Button disabled={loading}>
            {
              loading? <ImSpinner8 className="w-7 h-7 animate-spin" />:"Generate Trip"
            }
            
            </Button>
        </div>
      </div>

      <Dialog open={openDailog}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <img src="/logo.svg" />
            </DialogTitle>
            <DialogDescription>
              <h1 className="font-bold text-xl text-black">Sign In With Google</h1>
              <p>Sign in to the App with Google authentication</p>
              <Button onClick={()=>login()} className='w-full mt-5'>Sign In With Google</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
