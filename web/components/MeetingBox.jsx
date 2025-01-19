import React, { useEffect, useState } from 'react';
import TaskBox from './TaskBox';
import { api } from "../api";

async function fetchAllTasks(meetingId) {
  const allTasks = []; // Store all records
  let records = await api.task.findMany({
    filter: {
      meetingId: { equals: meetingId},
    },
  });

  allTasks.push(...records);

  return allTasks; // Return all tasks
}

const MeetingBox = ({ meeting }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id, meetingName } = meeting;

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchAllTasks(id);
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  // const formatDate = (dateString) => {
  //   const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  //   return new Date(dateString).toLocaleDateString(undefined, options);
  // };

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">{meetingName}</h2>
        {/* <span className="text-gray-600">{formatDate(date)}</span> */}
      </div>
      <div className="overflow-y-auto max-h-64">
        {tasks.map((task) => (
          <TaskBox key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default MeetingBox;