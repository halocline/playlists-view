import React, { Component } from "react";
import { Box, Button, Grommet, Heading, ResponsiveContext } from "grommet";
import { Notification } from "grommet-icons";
import queryString from "query-string";

import theme from "./Themes/theme";
import { AppBar } from "./Components/AppBar";
import Filter from "./Containers/Filter";
import Playlists from "./Containers/Playlists";
import PlaylistsStats from "./Containers/PlaylistsStats";
import Sidebar from "./Components/Sidebar";
import Title from "./Components/Title";

class App extends Component {
  constructor() {
    super();
    this.state = {
      filterString: "",
      playlists: [],
      showSidebar: false
    };
  }

  componentDidMount() {
    let access_token = queryString.parse(window.location.search).access_token;
    if (!access_token) {
      console.log("No Access Token");
      return;
    }

    const handleErrors = response => {
      if (!response.ok) {
        response.json().then(data => {
          console.log(data.error);
        });
        throw Error(response);
      }
      return response.json();
    };

    /* Fetch User Data */
    fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + access_token }
    })
      .then(handleErrors)
      .then(data => {
        this.setState({ user: { name: data.display_name } });
      })
      .catch(error => {
        console.log(error);
        console.log(this.state.user);
      });

    /* Fetch User's Playlists */
    fetch("https://api.spotify.com/v1/me/playlists", {
      headers: { Authorization: "Bearer " + access_token }
    })
      .then(handleErrors)
      .then(playlistsData => {
        let playlistTracksUrls = playlistsData.items.map(playlist => {
          return playlist.tracks.href;
        });
        let playlistTracks = playlistTracksUrls.map(playlistTracksUrl => {
          //console.log('URL', playlistTracksUrl)
          let tracksPromise = fetch(playlistTracksUrl, {
            headers: { Authorization: "Bearer " + access_token }
          });
          return tracksPromise.then(response => response.json());
        });
        let allPlaylistsTracksPromises = Promise.all(playlistTracks);
        let playlistsPromise = allPlaylistsTracksPromises.then(
          playlistsTracks => {
            playlistsTracks.forEach((tracks, i) => {
              playlistsData.items[i].tracks = tracks;
            });
            return playlistsData;
          }
        );
        return playlistsPromise;
      })
      .then(playlistsData => {
        this.setState({
          playlists: playlistsData.items.map(playlist => {
            return {
              id: playlist.id,
              name: playlist.name,
              imageUrl: playlist.images.find(image =>
                image.width === 60 ? image.width === 60 : image.width === 640
              ).url,
              songs: playlist.tracks.items
            };
          })
        });
      })
      .catch(error => console.log(error));
  }

  closeSidebar = () => {
    this.setState({ showSidebar: false });
  };

  render() {
    const { showSidebar } = this.state;
    const handleFilterInput = input => {
      this.setState({ filterString: input });
    };

    /*
     * Applying search string to filter playlist results.
     * Search string is applied to both playlist names, as well as track names.
     * If search string is contained in either a playlist name or track name,
     * then the corresponding playlist is returned in the results.
     */
    let playlists =
      this.state.user && this.state.playlists
        ? this.state.playlists.filter(playlist => {
            let playlistNameFilter = playlist.name
              .toLowerCase()
              .includes(this.state.filterString.toLowerCase());

            let songNameFilter = false;
            playlist.songs.forEach(song => {
              if (
                song.track.name
                  .toLowerCase()
                  .includes(this.state.filterString.toLowerCase())
              ) {
                songNameFilter = true;
              }
            });

            let filterResults = playlistNameFilter || songNameFilter;

            return filterResults;
          })
        : [];

    return (
      <Grommet theme={theme} full>
        <ResponsiveContext.Consumer>
          {size => (
            <Box fill>
              <AppBar>
                <Heading level="3" margin="none">
                  Spotify Playlists
                </Heading>
                <Button
                  icon={<Notification />}
                  onClick={() => {
                    this.setState(prevState => ({
                      showSidebar: !prevState.showSidebar
                    }));
                  }}
                />
              </AppBar>
              <Box direction="row" flex overflow={{ horizontal: "hidden" }}>
                <Box flex fill="horizontal">
                  {this.state.user ? (
                    <Box as="div">
                      <Title name={this.state.user.name} />
                      <Filter onTextChange={text => handleFilterInput(text)} />
                      <PlaylistsStats playlists={playlists} />
                      <Playlists playlists={playlists} />
                    </Box>
                  ) : (
                    <Box>
                      <Button
                        label="Sign in to Spotify"
                        onClick={() => {
                          window.location = window.location.href.includes(
                            "localhost"
                          )
                            ? "http://localhost:8080/login"
                            : "http://localhost:8080/login";
                        }}
                        alignSelf="end"
                        margin="large"
                        primary
                      />
                    </Box>
                  )}
                </Box>
                <Sidebar
                  showSidebar={showSidebar}
                  size={size}
                  closeSidebar={this.closeSidebar}
                />
              </Box>
            </Box>
          )}
        </ResponsiveContext.Consumer>
      </Grommet>
    );
  }
}

export default App;
