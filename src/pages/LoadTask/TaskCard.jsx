/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const TaskCard = ({ task, onTaskDeleted }) => {
  const { _id, title, description, datelines, priority } = task;
  const [tasks, setTasks] = useState([]);

  const handleDelete = async () => {
    const proceed = window.confirm("Are you sure you want to delete?");
    if (proceed) {
      try {
        const response = await axios.delete(`https://task-management-server-side-orcin.vercel.app/addTask/${_id}`);
        console.log(response.data);

        if (response.data.deletedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Task deleted successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });

          // Update the UI by notifying the parent component
          if (onTaskDeleted) {
            onTaskDeleted(_id);
          }
        }
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  return (
    <div className="card lg:card-side bg-base-100 my-2 shadow-xl">
      <div className="card-body">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <p className="text-lg overflow-hidden whitespace-nowrap overflow-ellipsis w-[270px]">
          {description}
        </p>
        <p className="text-base font-semibold">Due Date: {datelines}</p>
        <p className="text-base font-semibold">Priority Level: {priority}</p>

        <div className="mt-4 inline-block">
          <Link to={`/dashboard/updateTask/${_id}`}>
            <button className="py-1 px-4 mr-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
              Update
            </button>
          </Link>
          <button
            onClick={handleDelete}
            className="py-1 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;











// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */

// import axios from "axios";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import Swal from "sweetalert2";

// const TaskCard = ({ task }) => {
//   const { _id, title, description, datelines, priority } = task;
//   const [ tasks, setTasks ]  = useState([])



// //   const handleDelete = () => {
// //     console.log(_id);
// //     axios.delete(`https://task-management-server-side-orcin.vercel.app/addTask/${_id}`)
// //     .then(res=>{
// //       console.log(res.data);
// //     })

// // }

// const handleDelete =  ({ task, onTaskDeleted }) => {
//   const proceed = window.confirm("Are you sure you want to delete?");
//   if (proceed) {
//     axios
//       .delete(`https://task-management-server-side-orcin.vercel.app/addTask/${_id}`)
//       .then((res) => {
//         console.log(res.data);
//         if (res.data.deletedCount > 0) {
//           Swal.fire({
//             title: "Success!",
//             text: "Task deleted successfully",
//             icon: "success",
//             confirmButtonText: "Cool",
//           });

//           // Update the UI by notifying the parent component
//           if (onTaskDeleted) {
//             onTaskDeleted(_id);
//           }
//         }
//       })
//       .catch((error) => {
//         console.error("Error deleting task:", error);
//       });
//   }
// };


//   return (
//     <div className="card lg:card-side bg-base-100 my-2 shadow-xl">
//       <div className="card-body">
//         <h2 className="text-xl font-bold text-gray-800">{title}</h2>
//         <p className="text-lg overflow-hidden whitespace-nowrap overflow-ellipsis w-[270px]">
//           {description}
//         </p>
//         <p className="text-base  font-semibold">Due Date: {datelines}</p>
//         <p className="text-base font-semibold">Priority Level: {priority}</p>

//         <div className="mt-4 inline-block">
        
//           <Link to={`/dashboard/updateTask/${_id}`}>
//             <button className="py-1 px-4 mr-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
//               Update
//             </button>
//           </Link>
//           <button onClick={() => handleDelete(_id)} className=" py-1 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700">
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaskCard;
