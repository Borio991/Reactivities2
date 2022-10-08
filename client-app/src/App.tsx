import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import Navbar from "../components/Layout/Navbar";
import Dashboard from "../components/Layout/Dashboard";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { activityStore } = useStore();
  console.log("App is Running");
  useEffect(() => {
    activityStore.loadActivities();
  }, []);

  return (
    <>
      <Navbar />
      <Container style={{ marginTop: "100px" }}>
        <Dashboard />
      </Container>
    </>
  );
}

export default observer(App);
