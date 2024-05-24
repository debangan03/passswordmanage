import React, { useEffect, useState } from "react";
import PasswordViewTable from "./PasswordViewTable";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function PasswordForm(props) {
  const [sitename, setsitename] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");
  const [passwords, setpasswords] = useState([]);
  const [editview, seteditview] = useState(false);
  const [dataview, setdataview] = useState();

  const getpasswords = async () => {
    let res = await axios.post("http://localhost:5000/getpass", {
      email: props.email,
    });
    let resdata = res.data;
    //console.log(resdata);
    setpasswords(resdata);
    //console.log(passwords);
  };

  useEffect(() => {
    getpasswords();
  }, [getpasswords]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!sitename || !username || !password) {
      toast.error("please fill all credentials");
      return;
    }
    let data = {
      sitename,
      username,
      password,
      email: props.email,
    };

    let res = await axios.post("http://localhost:5000/savepassword", data);
    //console.log(res);

    if (res?.data?.success) {
      toast.success("data stored successfully");
      setpassword("");
      setsitename("");
      setusername("");
    }
  };

  const handlecopy = (str) => {
    navigator.clipboard.writeText(str);
    toast.success("password copied to clipboard");
  };
  const handledeleteitem = async (site, uname) => {
    alert("want to delete ??")
    let res = await axios.post("http://localhost:5000/deleteitem", {
      site,
      uname,
      email: props.email,
    });
    //console.log(res);
    if(res?.data?.status){
      toast.success("successfully deleted");

    }else{
      toast.error("failed to delete");
    }
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const edititem=(item)=>{
    console.log(item);
    seteditview(true);
    setpassword(item.password);
    setsitename(item.sitename);
    setusername(item.username);
    setdataview(item);
  };
  const handleedit=async(e)=>{
    e.preventDefault();
    if (!sitename || !username || !password) {
      toast.error("please fill all credentials");
      return;
    }
    let data = {
      sitename,
      username,
      password,
      email: props.email,
    };
    console.log(data);
    let res = await axios.post("http://localhost:5000/updatepassword", data);

    if (res?.data?.status) {
      toast.success("data stored successfully");
      setpassword("");
      setsitename("");
      setusername("");
      seteditview(false);
      setTimeout(() => {
        
        window.location.reload();
      }, 500);
    }else{
      toast.error("some error occured")
      seteditview(false)

    }
  }
  return (
    <div>
      <Toaster />
      {editview &&<div className="absolute flex justify-center items-center h-screen w-screen left-0 top-0 backdrop-blur-md bg-emerald-500/20 z-50">
          <div>
          <form className="mt-8 space-y-6 bg-white p-10" onSubmit={handleedit}>
          <div className="rounded-md shadow-sm space-y-4">
          <div>
              <label htmlFor="username">
                site name
              </label>
              <input
                id="email-address"
                name="siten"
                type="text"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={sitename}
                onChange={(e) => setsitename(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="username">
                Username
              </label>
              <input
                id="email-address"
                name="uname"
                type="text"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="text"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Submit
            </button>
          </div>
       
        </form>
          </div>
      </div>}
      <p className="text-center mt-4 text-xl font-bold">hello! {props.name}</p>
      <h1 className="text-center mt-4 lg:text-3xl text-2xl font-semibold">
        Enter Your Credentials to Store{" "}
      </h1>
      <form
        onSubmit={handlesubmit}
        className="flex justify-center flex-col space-y-4 px-10 py-10"
      >
        <div className="w-full flex flex-col space-y-2">
          <label htmlFor="sitename">Website Name / Url </label>
          <input
            onChange={(e) => setsitename(e.target.value)}
            className="p-2 outline outline-1 rounded-lg"
            type="text"
            name="sitename"
            value={sitename}
          />
        </div>
        <div className="w-full flex flex-col space-y-2">
          <label htmlFor="sername">Username </label>
          <input
            onChange={(e) => setusername(e.target.value)}
            className="p-2 outline outline-1 rounded-lg"
            type="text"
            name="username"
            value={username}
          />
        </div>
        <div className="w-full flex flex-col space-y-2">
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => setpassword(e.target.value)}
            className="p-2 outline outline-1 rounded-lg"
            type="password"
            value={password}
          />
        </div>
        <input
          type="submit"
          value="Submit"
          className="text-lg mx-auto bg-emerald-700 text-white p-2 px-4 rounded-lg w-fit"
        />
      </form>

      <div className="overflow-x-auto relative shadow-md rounded-lg mx-10 mb-10">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-emerald-500  ">
            <tr>
              <th scope="col" className="py-3 px-6">
                Site Name
              </th>
              <th scope="col" className="py-3 px-6">
                Username
              </th>
              <th scope="col" className="py-3 px-6">
                Password
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          {passwords && (
            <tbody>
              {passwords?.map((item,i) => (
                <tr
                  key={i}
                  className="bg-emerald-50 border-b hover:bg-emerald-100  "
                >
                  <td className="py-4 px-6">{item.sitename}</td>
                  <td className="py-4 px-6">{item.username}</td>
                  <td className="py-4 px-6 flex  space-x-2  items-center">
                    <span>{item.password} </span>
                    <button onClick={() => handlecopy(item.password)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-teal-600 hover:scale-105"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                        />
                      </svg>
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-4">
                      <button onClick={()=>edititem(item)} className="text-blue-500 hover:text-blue-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.232 5.232l3.536 3.536m-2.036-3.536a2.5 2.5 0 011.768 4.268l-3.536-3.536a2.5 2.5 0 01-4.268-1.768m4.268 1.768L5.75 16.75a2 2 0 002 2h6m3 0a2 2 0 002-2v-6l-6-6z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() =>
                          handledeleteitem(item.sitename, item.username)
                        }
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default PasswordForm;
