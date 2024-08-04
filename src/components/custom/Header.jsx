import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";

const Header = () => {
  const [openDailog, setOpenDailog] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    console.log(user);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (credRes) => getUserInfo(credRes),
    onError: (error) => console.log(error),
  });

  const getUserInfo = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenInfo?.access_token}`
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDailog(false);
        // onGenerate()
        window.location.reload();
      });
  };

  return (
    <div className="flex justify-between items-center p-3 shadow-md">
      <img src="/logo.svg" />
      <div className="flex gap-4">
        {user ? (
          <>
            <a href={'/my-trips'}>
              <Button variant="outline" className="rounded-full">
                My Trips
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} className="w-10 h-10 rounded-full" />
              </PopoverTrigger>
              <PopoverContent>
                <h1
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </h1>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <>
            <Button onClick={() => setOpenDailog(true)}>Sign In</Button>
          </>
        )}
      </div>
      <Dialog open={openDailog}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <img src="/logo.svg" />
            </DialogTitle>
            <DialogDescription>
              <h1 className="font-bold text-xl text-black">
                Sign In With Google
              </h1>
              <p>Sign in to the App with Google authentication</p>
              <Button onClick={() => login()} className="w-full mt-5">
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
