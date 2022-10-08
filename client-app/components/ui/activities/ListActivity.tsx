import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";

function ListActivity() {
  const { activityStore } = useStore();
  return (
    <Segment>
      <Item.Group divided>
        {activityStore.activities.map((activity: any) => (
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
                <Button floated="right" color="red" content="Delete" onClick={() => activityStore.deleteActivity(activity.id)} />
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
