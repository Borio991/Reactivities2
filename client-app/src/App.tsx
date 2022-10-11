import { Suspense, useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import Navbar from "../components/Layout/Navbar";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import LoaderComponent from "../components/ui/LoaderComponent";
import { Outlet } from "react-router-dom";
import agent from "../api/agent";

function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      activityStore.loadActivities();
    }
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default observer(App);

export async function loader() {
  const activities = await agent.Activities.list();
  return { activities };
}
