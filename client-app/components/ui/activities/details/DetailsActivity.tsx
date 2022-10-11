import { Grid } from "semantic-ui-react";
import { useStore } from "../../../../stores/store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import DetailedHeaderActivity from "./DetailedHeaderActivity";
import DetailedInfoActivity from "./DetailedInfoActivity";
import DetailedChatActivity from "./DetailedChatActivity";
import DetailedSidebar from "./DetailedSidebar";

function DetailsActivity() {
  const { activityStore } = useStore();
  const { id } = useParams();
  useEffect(() => {
    if (id) activityStore.loadActivity(id);
  }, [id, activityStore.loadActivity]);

  return (
    <Grid>
      <Grid.Column width={10}>
        <DetailedHeaderActivity activity={activityStore.selectedActivity!} />
        <DetailedInfoActivity activity={activityStore.selectedActivity!} />
        <DetailedChatActivity />
      </Grid.Column>
      <Grid.Column width={6}>
        <DetailedSidebar />
      </Grid.Column>
    </Grid>
  );
}

export default observer(DetailsActivity);
