import { useContext } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/Authproviders";
import { FaHome } from "react-icons/fa";
import { MdAddTask } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { GrLinkPrevious } from "react-icons/gr";
import AddTask from "../AddTask/AddTask";
import LoadTask from "../../pages/LoadTask/LoadTask";
import OnGoing from "../../pages/Ongonig/OnGoing";
import Completed from "../../pages/Completed/Completed";


const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { logOut } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate(location?.state ? location?.state : "/");
      })
      .catch((error) => {
        console.error("Logout error", error);
      });
  };

  return (
    <div className="flex p-10  ">
      <div className="w-64  min-h-screen font-semibold  bg-slate-300 rounded-md p-10">
        {user ? (
          <>
            <div className="h-[50px]  lg:h-[100px] ml-5 mb-12">
              <img
                className="rounded-full"
                src={user?.photoURL}
                alt="User Avatar"
              />
            </div>

            <hr className="my-4 border-gray-500" />
            <ul className="list-none  p-0">
              <li className="flex items-center text-xs my-1 lg:text-lg no-list-style">
                <FaHome className="mr-2" />
                <NavLink to="/">Home</NavLink>
              </li>

              <li className="flex items-center text-xs lg:text-lg no-list-style">
                <MdAddTask className="mr-2" />
                <button
                  className=""
                  onClick={() =>
                    document.getElementById("my_modal_4").showModal()
                  }
                >
                  Add Task
                </button>
                <dialog
                  id="my_modal_4"
                  className="modal fixed inset-0 flex items-center justify-center overflow-auto"
                >
                  <div className="modal-overlay absolute w-full h-full bg-gray-800 opacity-50"></div>
                  <div className="modal-box w-11/12 max-w-5xl bg-white p-8 rounded-lg shadow-lg">
                    <AddTask />
                    <div className="modal-action mt-4 flex justify-end">
                      {/* Manually close the modal on button click */}
                      <button
                        className="btn bg-gray-500 hover:bg-gray-400 text-white"
                        onClick={() =>
                          document.getElementById("my_modal_4").close()
                        }
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </dialog>
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
      <div className="grid grid-cols-3 gap-5 w-9/12 ml-5">
        <div className="">
          <LoadTask></LoadTask>
        </div>
        <div>
          <OnGoing></OnGoing>
        </div>
        <div>
          <Completed></Completed>
        </div>
      </div>
      <Outlet></Outlet>
      
    </div>
  );
};

export default Dashboard;
