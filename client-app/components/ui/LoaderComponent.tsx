import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

function LoaderComponent() {
  return (
    <Dimmer active={true} inverted>
      <Loader size="huge">Loading...</Loader>
    </Dimmer>
  );
}

export default LoaderComponent;
