import { useEffect } from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router";
import { Provider } from "@gadgetinc/react";
import { api } from "../api"; // Ensure you have the correct path to your api client
import Home from "../routes/Home";
import Meeting from "../routes/Meetings";
import Task from "../routes/Task";
import Header from "../components/Header";
import TaskBox from "./TaskBox";
import "./App.css";

const App = () => {
  useEffect(() => {
    document.title = `${process.env.GADGET_APP}`;
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path = "/">
        <Route
          index
          element={
            <Home />
          }
        />
        <Route path="meetings" element={<Meeting/>} />
        <Route path="tasks" element={<Task />} />
      </Route>
    )
  );

  return (
    <>
      <Header/>
      <Provider api={api}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
};

export default App;