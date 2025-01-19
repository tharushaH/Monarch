import React from 'react';



const TaskBox = ({ task }) => {
  const { id, title, description } = task;
  return (
    <div className="task-box border rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};




export default TaskBox;