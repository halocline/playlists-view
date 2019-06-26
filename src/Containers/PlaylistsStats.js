import React, { Component } from "react";
import { Box } from "grommet";
import PlaylistsNum from "./PlaylistsNum";
import PlaylistsSongs from "./PlaylistsSongs";
import PlaylistsTime from "./PlaylistsTime";

export default class PlaylistsStats extends Component {
  render() {
    return (
      <Box direction="row" margin="medium" gap="large">
        <PlaylistsNum playlists={this.props.playlists} />
        <PlaylistsSongs playlists={this.props.playlists} />
        <PlaylistsTime playlists={this.props.playlists} />
      </Box>
    );
  }
}
