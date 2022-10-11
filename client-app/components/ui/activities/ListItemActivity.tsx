import { Button, Icon, Item, Label, Segment, SegmentGroup } from "semantic-ui-react";
import { Activity } from "../../../models/ActivityModel";
import { Link } from "react-router-dom";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/store";

interface Props {
  activity: Activity;
}

function ListItemActivity({ activity }: Props) {
  const { activityStore } = useStore();

  const [target, setTarget] = useState("");
  const handleActivityDelete = (e: any, id: string) => {
    setTarget(e.target.name);
    activityStore.deleteActivity(id);
  };
  return (
    <SegmentGroup>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>Hosted by Bob</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {activity.date}
          <Icon name="marker" /> {activity.venue}
        </span>
      </Segment>
      <Segment secondary>Attendes go here</Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button as={Link} to={`/activities/${activity.id}`} color="teal" floated="right" content="View" />
      </Segment>
    </SegmentGroup>
  );
}

export default observer(ListItemActivity);
