import { Container, Grid } from "semantic-ui-react";
import ListActivity from "../ui/activities/ListActivity";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import FilterActivity from "../ui/activities/FilterActivity";

function Dashboard() {
  return (
    <Container style={{ marginTop: "100px" }}>
      <Grid>
        <Grid.Column width="10">
          <ListActivity />
        </Grid.Column>
        <Grid.Column width="6">
          <FilterActivity />
        </Grid.Column>
      </Grid>
    </Container>
  );
}

export default observer(Dashboard);
