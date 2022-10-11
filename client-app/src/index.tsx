import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "semantic-ui-css/semantic.min.css";
import "react-calendar/dist/Calendar.css";
import "./index.css";
import { StoreContext } from "../stores/store";
import { store } from "../stores/store";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import DetailsActivity from "../components/ui/activities/details/DetailsActivity";
import Dashboard from "../components/Layout/Dashboard";
import HomePage from "../pages/HomePage";
import FormActivity from "../components/ui/activities/FormActivity";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "activities",
        element: <Dashboard />,
      },
      {
        path: "activities/:id",
        element: <DetailsActivity />,
      },
      {
        path: "createActivity",
        element: <FormActivity />,
      },
      {
        path: "manage/:id",
        element: <FormActivity />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StoreContext.Provider value={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </StoreContext.Provider>
);
