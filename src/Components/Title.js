import React, { Component } from "react";
import { Box } from "grommet";

export default class Title extends Component {
  render(props) {
    return (
      <Box direction="row" margin="medium">
        <h1>{this.props.name}'s Playlists</h1>
      </Box>
    );
  }
}
