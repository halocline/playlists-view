import React, { Component } from 'react';
import { 
  Box, 
  Button, 
  Collapsible,
  Grid,
  Grommet, 
  Heading,
  Image,
  Layer, 
  ResponsiveContext,
  Text,
  TextInput
} from 'grommet';
import { FormClose, Notification } from 'grommet-icons';
import queryString from 'query-string';

const theme = {
  global: {
    colors: {
      brand: '#228BE6',
    },
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
};


const AppBar = (props) => ( 
  <Box 
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: 'medium', right: 'small', vertical: 'small'}}
    elevation="medium"
    style={{ zIndex: '1'}}
    {...props}
  />
)

class PlaylistsNum extends Component {
  render() {
    return (
      <Box>
        <h2>{this.props.playlists.length} Playlists</h2>
      </Box>
    )
  }
}

class PlaylistsSongs extends Component {
  render() {
    let allSongs = this.props.playlists.reduce( (songs, playlist) => {
      return songs.concat(playlist.songs)
    }, [])
    return (
      <Box>
        <h2>{allSongs.length} Songs</h2>
      </Box>
    )
  }
}

class PlaylistsTime extends Component {
  render() {
    let allSongs = this.props.playlists.reduce( (songs, playlist) => {
      return songs.concat(playlist.songs)
    }, [])
    let totalPlayTime = allSongs.reduce((playTime, song) => {
      if (song.duration) {
        return playTime + song.duration 
      } else {
        return playTime
      }
    }, 0)

    return (
      <Box>
        <h2>{Math.round(totalPlayTime / 60)} Minutes of Music</h2>
      </Box>
    )
  }
}

class PlaylistsStats extends Component {
  render() {
    return (
      <Box direction="row" margin="medium" gap="large">
        <PlaylistsNum playlists={this.props.playlists}/>
        <PlaylistsSongs playlists={this.props.playlists}/>
        <PlaylistsTime playlists={this.props.playlists}/>
      </Box>
    )
  }
}

class Filter extends Component {
  render() {
    return (
      <Box 
        direction="row" 
        width="medium"
        margin="medium"
      >
        <TextInput 
          type="text" 
          placeholder="Search" 
          onChange={ event => this.props.onTextChange(event.target.value)}
        />
      </Box>
    )
  }
}

class Title extends Component {
  render(props) {
    return (
      <Box direction="row" margin="medium">
        <h1>{this.props.name}'s Playlists</h1>
      </Box>
    )
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist
    let songPreviewLength = 3

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
          a11yTitle={'Album cover preview for playlist named ' + playlist.name}
        />
        <h3>{playlist.name}</h3>
        {
          playlist.songs
            .slice(0, songPreviewLength)
        .map( song => 
            <Text 
              key={song.track.id} 
              size="small"
            >
              {song.track.name}
            </Text> 
          )
        }
      </Box>
    )
  }
}

class Playlists extends Component {
  render() {
    let playlists = this.props.playlists.map( (playlist) => {
      return (
        <Playlist key={playlist.name} playlist={playlist}/>
      )
    })
    .sort( (a, b) => {
      if (a.props.playlist.name.toLowerCase() < b.props.playlist.name.toLowerCase()) { return -1 }
      else { return 1} 
    })
    return (
      <Box  
        pad="medium" 
        background="light-2"
      >
        <Grid 
          align="start"
          columns={{ count: "fill", size: "small" }}
          gap="medium"
        >
          {playlists}
        </Grid>
      </Box>
    )
  }
}

class Sidebar extends Component {
  render() {
    const showSidebar = this.props.showSidebar
    const size = this.props.size

    return (
      (!showSidebar || size !== 'small') ? (
        <Collapsible direction="horizontal" open={showSidebar}>
          <Box flex width="medium" background="light-2" elevation="small" align="center" justify="center">
            Sidebar
          </Box>
        </Collapsible>
      ) : (
        <Layer>
          <Box direction="row" background="light-2" tag="header" justify="end" align="center">
            <Button 
              icon={<FormClose/>}
              onClick={this.props.closeSidebar}
            />
          </Box>
          <Box fill background="light-2" align="center" justify="center">
            Sidebar
          </Box>
        </Layer>
      )
    )
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      filterString: '',
      playlists: [],
      showSidebar: false
    }
  }

  componentDidMount() {
    let access_token = queryString.parse(window.location.search).access_token
    if (!access_token) {
      console.log('No Access Token')
      return  
    }

    const handleErrors = (response) => {
      if(!response.ok) { 
        response.json().then( data => {
          console.log(data.error)
        })
        throw Error(response)
      }
      return response.json()
    }

    /* Fetch User Data*/
    fetch('https://api.spotify.com/v1/me', {headers: {Authorization: 'Bearer ' + access_token} })
    .then(handleErrors)
    .then( data => {
      this.setState( {user: {name: data.display_name}} ) 
    })
    .catch( error => {
      console.log(error)
      console.log(this.state.user)
    })

    /* Fetch User's Playlists */
    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {Authorization: 'Bearer ' + access_token}
    })
      .then(handleErrors)
      .then( playlistsData => {
        let playlistTracksUrls = playlistsData.items.map( playlist => {
          return playlist.tracks.href
        })
        let playlistTracks = playlistTracksUrls.map( playlistTracksUrl => {
          //console.log('URL', playlistTracksUrl)
          let tracksPromise = fetch(playlistTracksUrl, {headers: {Authorization: 'Bearer ' + access_token} })
          return tracksPromise.then( response => response.json() )
        })
        let allPlaylistsTracksPromises = Promise.all(playlistTracks)
        let playlistsPromise = allPlaylistsTracksPromises
          .then( playlistsTracks => {
            playlistsTracks.forEach( (tracks, i) => {
              playlistsData.items[i].tracks = tracks
            })
            return playlistsData
          })
        return playlistsPromise
      })
      .then( playlistsData => {
        this.setState({
          playlists: playlistsData.items.map( playlist => {
            return ({
              id: playlist.id,
              name: playlist.name,
              imageUrl: playlist.images.find( image => image.width === 60 ? image.width === 60 : image.width === 640 ).url,
              songs: playlist.tracks.items
            })
          })
        }) 
        console.log('State - Playlists:', this.state.playlists)
      })
      .catch( error => console.log(error) )
  }

  closeSidebar = () => {
    this.setState({ showSidebar: false })
  }

  render() {
    const { showSidebar } = this.state
    const handleFilterInput = (input) => {
      this.setState({ filterString: input })
    }
    
    let playlists = this.state.user && this.state.playlists
      ? this.state.playlists
          .filter( playlist => {
            return playlist.name
              .toLowerCase()
              .includes(this.state.filterString.toLowerCase())
          })
      : []

    return (
      <Grommet theme={theme} full>
        <ResponsiveContext.Consumer>
          {size => (
            <Box fill>
              <AppBar>
                <Heading level="3" margin="none">Spotify Playlists</Heading>
                <Button 
                  icon={<Notification />} 
                  onClick={ () => { 
                    this.setState( prevState => ({ showSidebar: !prevState.showSidebar}) ) 
                  }}
                >
                </Button>
              </AppBar>
              <Box direction="row" flex overflow={{ horizontal: 'hidden' }}>
                <Box flex fill="horizontal">
                {this.state.user
                  ? <div>
                      <Title name={this.state.user.name}/>
                      <Filter onTextChange={ text => handleFilterInput(text)} />
                      <PlaylistsStats playlists={playlists}/>
                      <Playlists playlists={playlists} />
                    </div> 
                  : <div>
                      <Button 
                        label="Sign in to Spotify"
                        onClick={() => {
                          window.location = window.location.href.includes('localhost')
                            ? 'http://localhost:8080/login'
                            : 'http://localhost:8080/login'
                        }}
                        alignSelf="end"
                        margin="large"
                        primary
                      />
                    </div>
                }
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
