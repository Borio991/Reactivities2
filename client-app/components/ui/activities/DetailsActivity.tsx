import { Card, Image, Icon, Button } from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";

function DetailsActivity() {
  const { activityStore } = useStore();
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activityStore.selectedActivity?.category}.jpg`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{activityStore.selectedActivity?.title}</Card.Header>
        <Card.Meta>
          <span>{activityStore.selectedActivity?.date}</span>
        </Card.Meta>
        <Card.Description>{activityStore.selectedActivity?.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button content="Edit" color="blue" basic onClick={() => activityStore.setEditMode(true)} />
          <Button content="Cancel" color="grey" basic onClick={() => activityStore.selectActivity("")} />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}

export default observer(DetailsActivity);
