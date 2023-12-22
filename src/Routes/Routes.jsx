import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Main from "../Layout/Main";
import About from "../pages/About/About";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardHome from "../Dashboard/DashboardHome/DashboardHome";
import Dashboard from "../Dashboard/Dashboard/Dashboard";
import AddTask from "../Dashboard/AddTask/AddTask";
import UpdateTask from "../Dashboard/UpdateTask/UpdateTask";
import PreviousTask from "../pages/PreviousTask/PreviousTask";
import ErrorPage from "../pages/ErrorPage/ErrorPage";


const Router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/signIn",
        element: <SignIn></SignIn>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
      
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboardHome",
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "/dashboard/addTask",
        element: <AddTask></AddTask>,
        
      },
      {
        path: '/dashboard/updateTask/:id',
        element: <UpdateTask></UpdateTask>,
        loader: ({ params }) => fetch(`https://task-management-server-side-orcin.vercel.app/addTask/${params.id}`)

      },
      {
        path: '/dashboard/previousTask',
        element: <PreviousTask></PreviousTask>
      }

      
    ],
  },
]);

export default Router;
