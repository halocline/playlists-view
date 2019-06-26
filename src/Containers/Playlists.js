import React, { Component } from "react";
import { Box, Grid } from "grommet";
import Playlist from "./Playlist";

export default class Playlists extends Component {
  render() {
    let playlists = this.props.playlists
      .map(playlist => {
        return <Playlist key={playlist.name} playlist={playlist} />;
      })
      .sort((a, b) => {
        if (
          a.props.playlist.name.toLowerCase() <
          b.props.playlist.name.toLowerCase()
        ) {
          return -1;
        } else {
          return 1;
        }
      });
    return (
      <Box pad="medium" background="light-2">
        <Grid
          align="start"
          columns={{ count: "fill", size: "small" }}
          gap="medium"
        >
          {playlists}
        </Grid>
      </Box>
    );
  }
}
