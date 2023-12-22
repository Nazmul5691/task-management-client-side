/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm, Controller } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useLoaderData, useParams } from 'react-router-dom';

const UpdateTask = () => {
  const { id } = useParams();
  const {
    control,
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://task-management-server-side-orcin.vercel.app/addTask/${id}`);
        const taskData = await response.json();

        // Set the task data to the form fields
        setValue('title', taskData.title);
        setValue('description', taskData.description);
        setValue('priority', taskData.priority);

        // Set default datelines value, using taskData.datelines if available, or a default value otherwise
        const defaultDatelines = taskData.datelines ? new Date(taskData.datelines) : new Date();
        setValue('datelines', defaultDatelines);

        // Set other fields similarly
      } catch (error) {
        console.error('Error fetching task data:', error);
      }
    };

    fetchData();
  }, [id, setValue]);

  const handleUpdateTask = async (data) => {
    data.datelines = data.datelines || null;

    const response = await fetch(`https://task-management-server-side-orcin.vercel.app/addTask/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    console.log(responseData);

    if (responseData.modifiedCount > 0) {
      Swal.fire({
        title: 'Success!',
        text: 'Task updated successfully',
        icon: 'success',
        confirmButtonText: 'Cool',
      });
    }
  };

  return (
    <div className="w-full p-10">
      <div className="bg-gray-300 p-14 rounded-md">
        <h2 className="text-3xl font-extrabold text-center mb-5">Update Task</h2>
        <form onSubmit={handleSubmit(handleUpdateTask)}>
          <div className="md:flex mb-8">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Task Title</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  placeholder="Task Title"
                  {...register('title', { required: 'Task Title is required' })}
                  className={`input input-bordered w-full ${errors.title ? 'border-red-500' : ''}`}
                />
              </label>
              {errors.title && (
                <span className="text-red-500 text-xs mt-1">{errors.title.message}</span>
              )}
            </div>
          </div>

          <div className="md:flex mb-8">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  placeholder="Description"
                  {...register('description', { required: 'Description is required' })}
                  className={`input input-bordered w-full ${errors.description ? 'border-red-500' : ''}`}
                />
              </label>
              {errors.description && (
                <span className="text-red-500 text-xs mt-1">{errors.description.message}</span>
              )}
            </div>
          </div>

          <div className="md:flex mb-8">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Priority Level</span>
              </label>
              <label className="select">
                <Controller
                  control={control}
                  name="priority"
                  render={({ field }) => (
                    <select
                      {...field}
                      className={`select w-full ${errors.priority ? 'border-red-500' : ''}`}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  )}
                  rules={{ required: 'Priority is required' }}
                />
              </label>
              {errors.priority && (
                <span className="text-red-500 text-xs mt-1">{errors.priority.message}</span>
              )}
            </div>
          </div>

          <div className="md:flex mb-8">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Datelines</span>
              </label>
              <label className="input-group w-full">
                <Controller
                  control={control}
                  name="datelines"
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => setValue('datelines', date)}
                      placeholderText="Datelines"
                      className={`input input-bordered w-full ${errors.datelines ? 'border-red-500' : ''}`}
                    />
                  )}
                />
              </label>
              {errors.datelines && (
                <span className="text-red-500 text-xs mt-1">{errors.datelines.message}</span>
              )}
            </div>
          </div>

         

          <input
            type="submit"
            value="Update Task"
            className="bg-slate-800 text-white hover:bg-slate-600 btn btn-block"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;










// /* eslint-disable no-unused-vars */
// import { useEffect } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { useForm, Controller } from 'react-hook-form';
// import Swal from 'sweetalert2';
// import { useLoaderData, useParams } from 'react-router-dom';

// const UpdateTask = () => {
//   const { id } = useParams();
//   const { control, handleSubmit, setValue, register, formState: { errors } } = useForm();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`https://task-management-server-side-orcin.vercel.app/addTask/${id}`);
//         const taskData = await response.json();
//         // Set the task data to the form fields
//         setValue('title', taskData.title);
//         setValue('description', taskData.description);
//         setValue('priority', taskData.priority); // Set priority field
//         // Set other fields similarly
//       } catch (error) {
//         console.error('Error fetching task data:', error);
//       }
//     };

//     fetchData();
//   }, [id, setValue]);

//   const handleUpdateTask = async (data) => {
//     data.datelines = data.datelines || null;

//     const response = await fetch(`https://task-management-server-side-orcin.vercel.app/addTask/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });

//     const responseData = await response.json();
//     console.log(responseData);

//     if (responseData.modifiedCount > 0) {
//       Swal.fire({
//         title: 'Success!',
//         text: 'Task updated successfully',
//         icon: 'success',
//         confirmButtonText: 'Cool',
//       });
//     }
//   };

//   return (
//     <div className="w-full p-10">
//       <div className="bg-gray-300 p-14 rounded-md">
//         <h2 className="text-3xl font-extrabold text-center mb-5">Update Task</h2>
//         <form onSubmit={handleSubmit(handleUpdateTask)}>
//           <div className="md:flex mb-8">
//             <div className="form-control md:w-1/2">
//               <label className="label">
//                 <span className="label-text">Task Title</span>
//               </label>
//               <label className="input-group">
//                 <input
//                   type="text"
//                   placeholder="Task Title"
//                   {...register('title', { required: 'Task Title is required' })}
//                   className={`input input-bordered w-full ${errors.title ? 'border-red-500' : ''}`}
//                 />
//               </label>
//               {errors.title && (
//                 <span className="text-red-500 text-xs mt-1">{errors.title.message}</span>
//               )}
//             </div>
//           </div>

//           <div className="md:flex mb-8">
//             <div className="form-control md:w-1/2">
//               <label className="label">
//                 <span className="label-text">Description</span>
//               </label>
//               <label className="input-group">
//                 <input
//                   type="text"
//                   placeholder="Description"
//                   {...register('description', { required: 'Description is required' })}
//                   className={`input input-bordered w-full ${errors.description ? 'border-red-500' : ''}`}
//                 />
//               </label>
//               {errors.description && (
//                 <span className="text-red-500 text-xs mt-1">{errors.description.message}</span>
//               )}
//             </div>
//           </div>

//           <div className="md:flex mb-8">
//             <div className="form-control md:w-1/2">
//               <label className="label">
//                 <span className="label-text">Priority Level</span>
//               </label>
//               <label className="select">
//                 <Controller
//                   control={control}
//                   name="priority"
//                   render={({ field }) => (
//                     <select
//                       {...field}
//                       className={`select w-full ${errors.priority ? 'border-red-500' : ''}`}
//                     >
//                       <option value="low">Low</option>
//                       <option value="medium">Medium</option>
//                       <option value="high">High</option>
//                     </select>
//                   )}
//                   rules={{ required: 'Priority is required' }}
//                 />
//               </label>
//               {errors.priority && (
//                 <span className="text-red-500 text-xs mt-1">{errors.priority.message}</span>
//               )}
//             </div>
//           </div>

//           <div className="md:flex mb-8">
//             <div className="form-control md:w-1/2">
//               <label className="label">
//                 <span className="label-text">Datelines</span>
//               </label>
//               <label className="input-group w-full">
//                 <Controller
//                   control={control}
//                   name="datelines"
//                   render={({ field }) => (
//                     <DatePicker
//                       selected={field.value}
//                       onChange={(date) => setValue('datelines', date)}
//                       placeholderText="Datelines"
//                       className={`input input-bordered w-full ${errors.datelines ? 'border-red-500' : ''}`}
//                     />
//                   )}
//                 />
//               </label>
//               {errors.datelines && (
//                 <span className="text-red-500 text-xs mt-1">{errors.datelines.message}</span>
//               )}
//             </div>
//           </div>

//           <input
//             type="submit"
//             value="Update Task"
//             className="bg-slate-800 text-white hover:bg-slate-600 btn btn-block"
//           />
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateTask;

















// /* eslint-disable no-unused-vars */
// import { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { useForm, Controller } from 'react-hook-form';
// import Swal from 'sweetalert2';
// import { useLoaderData, useParams } from 'react-router-dom';

// const UpdateTask = () => {
//   const { id } = useParams();
//   const {  control, handleSubmit, setValue, register, formState: { errors } } = useForm();
//   console.log('_id:', id);

//   const taskData = useLoaderData();

//   const handleUpdateTask = async (data) => {
//     data.datelines = data.datelines || null;

//     const response = await fetch(`https://task-management-server-side-orcin.vercel.app/addTask/${id}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     });

//     const responseData = await response.json();
//     console.log(responseData);

//     if (responseData.modifiedCount > 0) {
//         Swal.fire({
//             title: 'Success!',
//             text: 'Task updated successfully',
//             icon: 'success',
//             confirmButtonText: 'Cool',
//         });
//     }
// };


//   return (
//     <div className="w-full p-10">
//       <div className="bg-gray-300 p-14 rounded-md">
//         <h2 className="text-3xl font-extrabold text-center mb-5">Update Task</h2>
//         <form onSubmit={handleSubmit(handleUpdateTask)}>
//           <div className="md:flex mb-8">
//             <div className="form-control md:w-1/2">
//               <label className="label">
//                 <span className="label-text">Task Title</span>
//               </label>
//               <label className="input-group">
//                 <input
//                   type="text"
//                   placeholder="Task Title"
//                   defaultValue={taskData.title}
//                   {...register('title', { required: 'Task Title is required' })}
//                   className={`input input-bordered w-full ${errors.title ? 'border-red-500' : ''}`}
//                 />
//               </label>
//               {errors.title && (
//                 <span className="text-red-500 text-xs mt-1">{errors.title.message}</span>
//               )}
//             </div>
//           </div>

//           <div className="md:flex mb-8">
//             <div className="form-control md:w-1/2">
//               <label className="label">
//                 <span className="label-text">Description</span>
//               </label>
//               <label className="input-group">
//                 <input
//                   type="text"
//                   placeholder="Description"
//                   defaultValue={taskData.description}
//                   {...register('description', { required: 'Description is required' })}
//                   className={`input input-bordered w-full ${errors.description ? 'border-red-500' : ''}`}
//                 />
//               </label>
//               {errors.description && (
//                 <span className="text-red-500 text-xs mt-1">{errors.description.message}</span>
//               )}
//             </div>
//           </div>

//           <div className="md:flex mb-8">
//             <div className="form-control md:w-1/2">
//               <label className="label">
//                 <span className="label-text">Datelines</span>
//               </label>
//               <label className="input-group w-full">
//                 <Controller
//                   control={control}
//                   name="datelines"
//                   render={({ field }) => (
//                     <DatePicker
//                       selected={field.value}
//                       onChange={(date) => setValue('datelines', date)}
//                       placeholderText="Datelines"
//                       className={`input input-bordered w-full ${errors.datelines ? 'border-red-500' : ''}`}
//                     />
//                   )}
//                 />
//               </label>
//               {errors.datelines && (
//                 <span className="text-red-500 text-xs mt-1">{errors.datelines.message}</span>
//               )}
//             </div>
//           </div>

//           <div className="md:flex mb-8">
//             <div className="form-control md:w-1/2">
//               <label className="label">
//                 <span className="label-text">Priority Level</span>
//               </label>
//               <label className="select">
//                 <Controller
//                   control={control}
//                   name="priority"
//                   render={({ field }) => (
//                     <select
//                       {...field}
//                       defaultValue={taskData.priority}
//                       className={`select w-full ${errors.priority ? 'border-red-500' : ''}`}
//                     >
//                       <option value="low">Low</option>
//                       <option value="medium">Medium</option>
//                       <option value="high">High</option>
//                     </select>
//                   )}
//                   rules={{ required: 'Priority is required' }}
//                 />
//               </label>
//               {errors.priority && (
//                 <span className="text-red-500 text-xs mt-1">{errors.priority.message}</span>
//               )}
//             </div>
//           </div>

//           <input
//             type="submit"
//             value="Update Task"
//             className="bg-slate-800 text-white hover:bg-slate-600 btn btn-block"
//           />
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateTask;
