import React from "react";
import { Header, Menu } from "semantic-ui-react";
import Calendar from "react-calendar";

function FilterActivity() {
  return (
    <>
      <Menu
        vertical
        size="large"
        style={{
          width: "100%",
          marginTop: 30,
        }}
      >
        <Header icon="filter" attached color="teal" content="filter" />
        <Menu.Item content="All Activities" />
        <Menu.Item content="I'm Going" />
        <Menu.Item content="I'm Hosting" />
      </Menu>
      <Calendar />
    </>
  );
}

export default FilterActivity;
