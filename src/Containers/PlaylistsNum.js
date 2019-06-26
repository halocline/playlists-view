import React, { Component } from "react";
import { Box } from 'grommet';

export default class PlaylistsNum extends Component {
  render() {
    return (
      <Box>
        <h2>{this.props.playlists.length} Playlists</h2>
      </Box>
    );
  }
}
