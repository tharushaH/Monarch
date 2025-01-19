import React, { useEffect, useState } from "react";
import { api } from "../api";
import TaskBox from "../components/TaskBox";


async function fetchAllTasks() {
  const allTasks = []; // Store all records
  let records = await api.task.findMany({
    first: 250, // Fetch up to 250 records at a time
    select: {
      id: true,
      title: true,
      description: true,
    },
    filter: {
      // Optionally add filter conditions here, e.g., { status: { equals: "active" } }
    },
  });

  console.log(records);

  allTasks.push(...records);

  // Paginate through additional pages
  while (records.hasNextPage) {
    records = await records.nextPage(); // Fetch the next page
    allTasks.push(...records);
  }

  return allTasks; // Return all tasks
}


export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchAllTasks();
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

  return (
    <div>
      <div className="task-grid">
        {tasks.map((task) => (
          <TaskBox key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
