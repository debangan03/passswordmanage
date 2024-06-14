import React, { useEffect, useState } from "react";
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
    alert("want to delete ??");
    let res = await axios.post("http://localhost:5000/deleteitem", {
      site,
      uname,
      email: props.email,
    });
    //console.log(res);
    if (res?.data?.status) {
      toast.success("successfully deleted");
    } else {
      toast.error("failed to delete");
    }
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const edititem = (item) => {
    console.log(item);
    seteditview(true);
    setpassword(item.password);
    setsitename(item.sitename);
    setusername(item.username);
    setdataview(item);
  };
  const handleedit = async (e) => {
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
    } else {
      toast.error("some error occured");
      seteditview(false);
    }
  };
  return (
    <div>
      <Toaster />
      {editview && (
        <div className="fixed flex justify-center items-center h-screen w-screen left-0 top-0 backdrop-blur-md bg-emerald-500/20 z-50">
          <div>
            <form
              className="mt-8 rounded-xl lg:w-[400px] space-y-6 bg-emerald-50 p-10 relative"
              onSubmit={handleedit}
            >
              <span
                onClick={() => {
                  seteditview(false);
                }}
                className="cursor-pointer absolute hover:scale-105 top-2 right-2 text-2xl text-red-500 rounded-full   font-bold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.2}
                  stroke="currentColor"
                  className="size-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </span>
              <div className="rounded-md shadow-sm space-y-4">
                <div>
                  <label htmlFor="username">site name <span className="text-[0.6rem] text-rose-400">read only</span></label>
                  <input
                    id="email-address"
                    name="siten"
                    type="text"
                    autoComplete="email"
                    readOnly={true}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={sitename}
                    onChange={(e) => setsitename(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="username">Username <span className="text-[0.6rem] text-rose-400">read only</span></label>
                  <input
                    id="email-address"
                    name="uname"
                    type="text"
                    autoComplete="email"
                    required
                    readOnly={true}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="">
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
        </div>
      )}
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
          className="cursor-pointer text-lg mx-auto bg-emerald-700 text-white p-2 px-4 rounded-lg w-fit"
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
              {passwords?.map((item, i) => (
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
                      <button
                        onClick={() => edititem(item)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6 hover:scale-105"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
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
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6 hover:scale-105"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
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
