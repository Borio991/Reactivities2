import { Grid } from "semantic-ui-react";
import ListActivity from "../ui/activities/ListActivity";
import DetailActivity from "../ui/activities/DetailsActivity";
import FormActivity from "../ui/activities/FormActivity";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";

function Dashboard() {
  const { activityStore } = useStore();

  return (
    <Grid>
      <Grid.Column width="10">
        <ListActivity />
      </Grid.Column>
      <Grid.Column width="6">
        {activityStore.selectedActivity && <DetailActivity />}

        {activityStore.editmode && <FormActivity key={activityStore.selectedActivity?.id} />}
      </Grid.Column>
    </Grid>
  );
}

export default observer(Dashboard);
