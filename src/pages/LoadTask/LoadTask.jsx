
import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";




const LoadTask = () => {

    const [tasks, setTasks] = useState([])

    useEffect( () =>{
        fetch('https://task-management-server-side-orcin.vercel.app/addTask')
        .then(res => res.json())
        .then(data => setTasks(data))
    },[])

    return (
        <div>
            <div className="text-center">
                <h3 className="text-2xl  font-bold text-[#4a64e4]">To-Do</h3>
                
            </div>
            <div className="grid grid-cols-1  max-w-6xl mx-auto  mt-5">
                {
                    tasks.map(task => <TaskCard key={task._id} task={task}></TaskCard>)
                }
            </div>

        </div>
    );
};

export default LoadTask;