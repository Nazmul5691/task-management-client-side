import { useContext } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/Authproviders";
import { FaHome } from "react-icons/fa";
import { MdAddTask } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { GrLinkPrevious } from "react-icons/gr";

const Dashboard = () => {

  const { user } = useContext(AuthContext);
  const {  logOut } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();


  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate(location?.state ? location?.state: '/')
      })
      .catch((error) => {
        console.error("Logout error", error);
      });
  };

  return (
    <div className="flex p-10 ">
      <div className="w-64 min-h-screen font-semibold  bg-slate-300 rounded-md p-10">
        {user ? (
          <>
            <div className="h-[50px] ml-0 lg:h-[100px] lg:ml-20 mb-12">
              <img
                className="rounded-full"
                src={user?.photoURL}
                alt="User Avatar"
              />
            </div>

            <ul className="list-none  p-0">
              <li className="flex items-center text-xs my-1 lg:text-lg no-list-style">
                <FaHome className="mr-2" /> {/* Adjust the margin as needed */}
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="flex items-center text-xs lg:text-lg no-list-style">
                <MdAddTask className="mr-2" />
                <NavLink to="/dashboard/newTask">New Task</NavLink>
              </li>
              <li className="flex items-center text-xs my-1 lg:text-lg no-list-style">
                <GrLinkPrevious className="mr-2" />
                <NavLink to="/dashboard/previousTask">Previous Task</NavLink>
              </li>
              <li className="flex items-center text-xs lg:text-lg no-list-style">
                <TbLogout className="mr-2" />
                <NavLink onClick={handleLogout}>Log Out</NavLink>
              </li>
            </ul>
          </>
        ) : (
          <p></p>
        )}
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default Dashboard;
