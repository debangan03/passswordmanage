import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [login, setlogin] = useState(false);
  let token = localStorage.getItem("AccessToken");
  const getlogin = async (token) => {
    let res = await axios.post("http://localhost:5000/verifylogin", {
      token: token,
    });
    let status = res?.data?.status;
    // console.log(status);
    if (status) {
        setlogin(true);
    }
  };

  useEffect(() => {
    if (token) {
      getlogin(token);
    }
  }, []);
  return (
    <nav className="bg-emerald-700 sticky top-0 text-white p-4 flex justify-between items-center">
      <a href="/" className="font-bold text-xl">
        Key Keeper
      </a>

      {login ? (
        <button onClick={()=>{localStorage.removeItem('AccessToken');window.location.reload();}} className="bg-slate-800/60 px-4 py-2 rounded-md">Logout</button>
      ) : (
        <Link to="/Login" className="bg-slate-800/60 px-4 py-2 rounded-md">
          Login / Register
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
