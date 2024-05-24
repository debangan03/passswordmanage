import React, { useEffect, useState } from "react";
import PasswordForm from "./PasswordForm";
import PasswordViewTable from "./PasswordViewTable";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function PasswordManager() {
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [login, setlogin] = useState(true);
  let token = localStorage.getItem("AccessToken");
  const getlogin = async (token) => {
    let res = await axios.post("http://localhost:5000/verifylogin", {
      token: token,
    });
    let status = res?.data?.status;
    // console.log(res?.data?.data?.name);
    if (!status) {
      toast.error("Please Login To Continue");
      setlogin(false);
      window.location = "http://localhost:5173/Login";
    } else {
      setemail(res?.data?.data?.email);
      setname(res?.data?.data?.name);
    }
  };

  useEffect(() => {
    if (token) {
      getlogin(token);
    } else {
      setlogin(false);
      toast.error("Please Login To Continue");
      setTimeout(() => {
        window.location = "http://localhost:5173/Login";
      }, 500);
    }
  }, [token]);
  return (
    <>
      <Toaster />

      <div className="min-h-screen">
        
        {login ? (

          <PasswordForm name={name} email={email}/>
        ) : (
          <p className="text-center my-20">Loading ...</p>
        )}
      </div>
    </>
  );
}

export default PasswordManager;
