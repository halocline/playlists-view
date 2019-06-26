import React, { Component } from "react";
import { Box, Image, Text } from "grommet";

export default class Playlist extends Component {
  render() {
    let playlist = this.props.playlist;
    let songPreviewLength = 3;
    let artistsPreviewLength = 1;

    return (
      <Box
        background={{
          color: "light-1"
        }}
        border={{
          color: "light-2",
          size: "xsmall",
          style: "solid",
          side: "all"
        }}
        pad="medium"
        round="small"
        elevation="small"
      >
        <Image
          width="100%"
          fit="contain"
          src={playlist.imageUrl}
          a11yTitle={"Album cover preview for playlist named " + playlist.name}
        />
        <h3>{playlist.name}</h3>
        {playlist.songs.slice(0, songPreviewLength).map(song => (
          <Text key={song.track.id} size="small">
            {song.track.name},{" "}
            {song.track.artists
              .slice(0, artistsPreviewLength)
              .map(artist => artist.name)}
          </Text>
        ))}
      </Box>
    );
  }
}
