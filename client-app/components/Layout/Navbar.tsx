import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import { Link } from "react-router-dom";

function Navbar() {
  const { activityStore } = useStore();

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={Link} to="/" header name="Reactivities">
          <img src="/assets/logo.png" alt="logo" />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" as={Link} to="/activities">
          Activities
        </Menu.Item>
        <Menu.Item>
          <Button as={Link} to="/createActivity" positive content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default Navbar;
