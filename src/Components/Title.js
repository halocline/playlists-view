import React, { Component } from "react";
import { Box, Heading } from "grommet";

export default class Title extends Component {
  render(props) {
    return (
      <Heading level="1" size="small">{this.props.name}'s Playlists</Heading>
    );
  }
}
