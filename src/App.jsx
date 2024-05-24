import React from "react";

import { useState } from "react";

import NavBar from "./Components/Navbar";

import Footer from "./Components/Footer";
import HomePage from "./Components/Homepage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PasswordManager from "./Components/PasswordManager";
import LoginPage from "./Components/Login";
import SignUp from "./Components/Signup";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          {" "}
          <NavBar />
          <HomePage />
        </>
      ),
    },
    {
      path: "/ManagePassword",
      element: (
        <>
          {" "}
          <NavBar />
          <PasswordManager />
        </>
      ),
    },
    {
      path: "/Login",
      element: (
        <>
          <NavBar />
          <LoginPage />
        </>
      ),
    },
    {
      path:'/Signup',
      element:<><NavBar/><SignUp/></>
    }
  ]);
  return (
    <>
      <RouterProvider router={routes} />
      <Footer />
    </>
  );
}



// function App() {
//   const [color,setColor] = useState("olive")

//   return (
//     <div className='w-full h-screen duration-200' style={{backgroundColor:color}}>
//       <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2'>
//         <div className='flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl'>
//           <button className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{backgroundColor:"red"}}>RED</button>
//           <button className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{backgroundColor:"green"}}>GREEN</button>
//           <button className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{backgroundColor:"blue"}}>BLUE</button>
//           <button className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{backgroundColor:"yellow"}}>YELLOW</button>
//         </div>
//       </div>
//     </div>
//   )
// }
export default App;
