import React, { Component } from "react";
import { Box, Heading, Image, Text } from "grommet";

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
        direction="column"
        height="medium"
        overflow="hidden"
        pad={{
          horizontal: "small",
          vertical: "medium"
        }}
        round="xsmall"
        elevation="small"
      >
        <Image
          alignSelf="center"
          fit="contain"
          height="small"
          src={playlist.imageUrl}
          a11yTitle={"Album cover preview for playlist named " + playlist.name}
        />
        <Box
          alignSelf="start"
          pad={{
            horizontal: "xsmall"
          }}
        >
          <Heading level="4" alignSelf="start" margin={{ bottom: "xsmall"}}>
            {playlist.name}
          </Heading>
          {playlist.songs.slice(0, songPreviewLength).map(song => (
            <Text key={song.track.id} size="small" truncate="true">
              {song.track.name},{" "}
              {song.track.artists
                .slice(0, artistsPreviewLength)
                .map(artist => artist.name)}
            </Text>
          ))}
        </Box>
      </Box>
    );
  }
}
