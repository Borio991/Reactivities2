import { Suspense, useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import Navbar from "../components/Layout/Navbar";
import Dashboard from "../components/Layout/Dashboard";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import LoaderComponent from "../components/ui/LoaderComponent";

function App() {
  const { activityStore } = useStore();
  console.log("App is Running");
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
      <Container style={{ marginTop: "100px" }}>{activityStore.initialLoading ? <LoaderComponent /> : <Dashboard />}</Container>
    </>
  );
}

export default observer(App);
