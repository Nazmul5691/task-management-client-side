import  { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';

const AddTask = () => {
  const [datelines, setDatelines] = useState(null);

  const handleAddTask = (event) => {
    event.preventDefault();

    const form = event.target;
    const title = form.title.value;
    const description = form.description.value;
    const priority = form.priority.value;
    

    const newProduct = { title, description, datelines, priority };
    console.log(newProduct);

    // Send data to the server 
    fetch('http://localhost:3000/addTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: 'Success!',
            text: 'Assignment created successfully',
            icon: 'success',
            confirmButtonText: 'Cool',
          });
        }
      });
  };

  return (
    <div>
      <div className="bg-gray-300 p-24">
        <h2 className="text-3xl font-extrabold text-center mb-5">Add a Task</h2>
        <form onSubmit={handleAddTask}>
          <div className="md:flex mb-8">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Task Title</span>
              </label>
              <label className="input-group">
                <input type="text" placeholder="Task Title" name="title" className="input input-bordered w-full" />
              </label>
            </div>

            
          </div>

          <div className="md:flex mb-8">
            <div className="form-control md:w-1/2 ">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <label className="input-group">
                <input type="text" placeholder="Description" name="description" className="input input-bordered w-full" />
              </label>
            </div>

            
          </div>

          <div className="md:flex mb-8">
        

            <div className="form-control ml-4">
                <label className="label">
                <span className="label-text">Datelines</span>
                </label>
                <label className="input-group">
                <DatePicker
                    selected={datelines}
                    onChange={(date) => setDatelines(date)}
                    placeholderText="Datelines"
                    name="datelines"
                    className="input input-bordered w-full"
                />
                </label>
        </div>
  
</div>


          <div className="md:flex mb-8">
            <div className="form-control md:w-1/2 mb-16">
              <label className="label">
                <span className="label-text">Priority Level</span>
              </label>
              <label className="select">
                <select name="priority" className="select  w-full">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </label>
            </div>
          </div>

          <input
            type="submit"
            value="Add Task"
            className="bg-slate-800 text-white hover:bg-slate-600 btn btn-block"
          />
        </form>
      </div>
    </div>
  );
};

export default AddTask;
