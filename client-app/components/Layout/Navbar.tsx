import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../../stores/store";

function Navbar() {
  const { activityStore } = useStore();
  console.log("navbar is Running");

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header name="Reactivities">
          <img src="/assets/logo.png" alt="logo" />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities">Activities</Menu.Item>
        <Menu.Item>
          <Button positive content="Create Activity" onClick={activityStore.openCreateForm} />
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default Navbar;
