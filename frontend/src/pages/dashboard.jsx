import React, { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut } from "react-chartjs-2";
import Navbar from "../component/navbar";
import axios from "axios";

export default function Dashboard() {
  const [status, setStatus] = useState({});
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/task", {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        const tasks = response.data.Task;
        console.log(tasks);
        const initialCounts = {
          pending: 0,
          inProgress: 0,
          completed: 0,
        };
        const counts = tasks.reduce((accumulator, task) => {
          if (task.status === "Pending") {
            accumulator.pending++;
          } else if (task.status === "In Progress") {
            accumulator.inProgress++;
          } else if (task.status === "Completed") {
            accumulator.completed++;
          }
          return accumulator;
        }, initialCounts);

        setStatus(counts);
        console.log(counts);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTasks();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-neutral-200">
        <div className="w-1/2 h-1/2 bg-white p-10 rounded-lg">
          <Bar
            data={{
              labels: ["Pending", "In Progress", "Completed"],
              datasets: [
                {
                  label: "Status",
                  data: [status.pending, status.inProgress, status.completed],
                },
              ],
            }}
          />
        </div>
      </div>
    </>
  );
}
