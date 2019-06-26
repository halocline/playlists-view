import React, { Component } from "react";
import { Box } from "grommet";

export default class PlaylistsTime extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, playlist) => {
      return songs.concat(playlist.songs);
    }, []);
    let totalPlayTime_ms = allSongs.reduce((playTime, song) => {
      if (song.track.duration_ms) {
        return playTime + song.track.duration_ms;
      } else {
        return playTime;
      }
    }, 0);
    let totalPlayTime_minutes = totalPlayTime_ms / 1000 / 60;

    return (
      <Box>
        {totalPlayTime_minutes > 60 ? (
          <h2>{Math.round(totalPlayTime_minutes / 60)} Hours</h2>
        ) : (
          <h2>{Math.round(totalPlayTime_minutes)} Minutes</h2>
        )}
      </Box>
    );
  }
}
