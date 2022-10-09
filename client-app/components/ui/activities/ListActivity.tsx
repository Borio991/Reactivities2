import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import { useState } from "react";

function ListActivity() {
  const { activityStore } = useStore();
  const [target, setTarget] = useState("");
  console.log("List is Running");
  const handleActivityDelete = (e: any, id: string) => {
    setTarget(e.target.name);
    activityStore.deleteActivity(id);
  };

  return (
    <Segment>
      <Item.Group divided>
        {activityStore.ActivitiesByDate.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div> {activity.description} </div>
                <div>
                  {" "}
                  {activity.city} , {activity.venue}{" "}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button floated="right" color="blue" content="View" onClick={() => activityStore.selectActivity(activity.id)} />
                <Button
                  name={activity.id}
                  floated="right"
                  color="red"
                  content="Delete"
                  onClick={(e) => handleActivityDelete(e, activity.id)}
                  loading={activityStore.submitting && target === activity.id}
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}

export default observer(ListActivity);
