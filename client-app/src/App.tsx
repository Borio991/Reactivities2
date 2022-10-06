import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios";
import { Header, List } from "semantic-ui-react";

function App() {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/activities")
      .then(function (response: any) {
        setActivities(response.data);
        console.log(response.data);
      });
  }, []);
  return (
    <div className="App">
      <Header icon="users" as="h2" content="Activities" />
      <List>
        {activities.map((activity: any) => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
