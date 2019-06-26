import React, { Component } from "react";
import { Box } from "grommet";

export default class PlaylistsSongs extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, playlist) => {
      return songs.concat(playlist.songs);
    }, []);
    return (
      <Box>
        <h2>{allSongs.length} Songs</h2>
      </Box>
    );
  }
}
