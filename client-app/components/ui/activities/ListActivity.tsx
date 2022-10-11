import { Header, Item, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ListItemActivity from "./ListItemActivity";
import { useStore } from "../../../stores/store";
import { Fragment } from "react";

function ListActivity() {
  const { activityStore } = useStore();

  return (
    <>
      {activityStore.groupedActivities.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>
          {activities.map((activity) => (
            <ListItemActivity key={activity.id} activity={activity} />
          ))}
        </Fragment>
      ))}
    </>
  );
}

export default observer(ListActivity);
