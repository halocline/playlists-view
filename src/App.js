import React, { Component } from 'react';
import { 
  Box, 
  Button, 
  Collapsible,
  Grommet, 
  Heading,
  Layer, 
  ResponsiveContext 
} from 'grommet';
import { FormClose, Notification } from 'grommet-icons';

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

const defaultStyle = {
  color: 'gray'
}

const playlistsStatsStyle = {
  width: '33%',
  display: 'inline-block'
}

const fakeServerData = {
  user: {
    name: 'Matt',
    playlists: [
      {
        name: 'Gettin on up',
        songs: [
          {
            title: 'Over the Rainbow',
            artist: 'Izzy',
            duration: 231
          },
          {
            title: 'Three Little Birds',
            artist: 'Bob Marley',
            duration: 231
          },
          {
            title: 'Enter Sandman',
            artist: 'Metallica',
            duration: 231
          },
          {
            title: 'Burn One Down',
            artist: 'Ben Harper',
            duration: 301
          },
          {
            title: 'MFC',
            artist: 'Pearl Jam',
            duration: 231
          }
        ]
      },{
        name: 'Gettin on down',
        songs: [
          {
            title: 'Down',
            artist: 'Nine Inch Nails',
            duration: 231
          },
          {
            title: 'Down in a Hole',
            artist: 'Sound Garden',
            duration: 231
          },
          {
            title: 'Smells Like Teen Spirit',
            artist: 'Nirvana',
            duration: 231
          }
        ]
      },{
        name: 'Slidin\' Home',
        songs: [
          {
            title: 'Down',
            artist: 'Nine Inch Nails',
            duration: 231
          },
          {
            title: 'Down in a Hole',
            artist: 'Sound Garden',
            duration: 231
          },
          {
            title: 'Smells Like Teen Spirit',
            artist: 'Nirvana',
            duration: 231
          }
        ]
      },{
        name: 'Songs of the West',
        songs: [
          {
            title: 'Mariah',
            artist: 'Nine Inch Nails',
            duration: 231
          },
          {
            title: 'Leave Your Guns at Home',
            artist: 'Sound Garden',
            duration: 231
          },
          {
            title: 'Rawhide',
            artist: 'Nirvana'
          }
        ]
      },{
        name: 'Songs of the West',
        songs: [
          {
            title: 'Mariah',
            artist: 'Nine Inch Nails',
            duration: 231
          },
          {
            title: 'Leave Your Guns at Home',
            artist: 'Sound Garden',
            duration: 231
          },
          {
            title: 'Rawhide',
            artist: 'Nirvana'
          }
        ]
      }
    ]
  }
}

class PlaylistsNum extends Component {
  render() {
    return (
      <div className="PlaylistsNum"
            style={{
              ...defaultStyle,
              ...playlistsStatsStyle
          }}>
        <h2>{this.props.playlists.length} Playlists</h2>
      </div>
    )
  }
}

class PlaylistsSongs extends Component {
  render() {
    let allSongs = this.props.playlists.reduce( (songs, playlist) => {
      return songs.concat(playlist.songs)
    }, [])
    return (
      <div className="PlaylistsNum"
            style={{
              ...defaultStyle,
              ...playlistsStatsStyle
          }}>
        <h2>{allSongs.length} Songs</h2>
      </div>
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
      <div className="PlaylistsTime"
            style={{
              ...defaultStyle,
              ...playlistsStatsStyle
          }}>
        <h2>{Math.round(totalPlayTime / 60)} Minutes of Music</h2>
      </div>
    )
  }
}

class PlaylistsStats extends Component {
  render() {
    return (
      <div>
        <PlaylistsNum playlists={this.props.playlists}/>
        <PlaylistsSongs playlists={this.props.playlists}/>
        <PlaylistsTime playlists={this.props.playlists}/>
      </div>
    )
  }
}

class Filter extends Component {
  render() {
    return (
      <div className="Filter">
        <input 
          type="text" 
          placeholder="Search" 
          onChange={ event => this.props.onTextChange(event.target.value)}
        />
      </div>
    )
  }
}

class Title extends Component {
  render(props) {
    return (
      <div className="Title" style={defaultStyle}>
        <h1>{this.props.name}'s Playlists</h1>
      </div>
    )
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist
    let songPreviewLength = 3

    return (
      <Grommet>
      {/*
      <div style={{
        ...defaultStyle,
        width: "25%", 
        display: "inline-block"
      }}>
    */}
      <Box 
        background="light-1" 
        border={{
          color: "border",
          size: "xsmall",
          style: "solid",
          side: "all"
        }}
        margin="medium"
        pad="small"
        round="small"
        width="20%"
        display="inline-block"
      >
        <h3>{playlist.name}</h3>
        <ul>
          {
            playlist.songs
              .slice(0, songPreviewLength)
              .map( song => <li>{song.title}</li> )
          }
        </ul>
      </Box>
      {/*</div>*/}
      </Grommet>
    )
  }
}

class Playlists extends Component {
  render() {
    let playlists = this.props.playlists.map( (playlist) => {
      return (
        <Playlist playlist={playlist}/>
      )
    })
    return (
      <Grommet>
        <Box fill>
          <div>
            {playlists}
          </div>
        </Box>
      </Grommet>
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
              //onClick={() => { this.setState({ showSidebar: false })}}
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
      serverData: {},
      showSidebar: false
    }
  }

  componentDidMount() {
    setTimeout( () => {
      this.setState({
        serverData: fakeServerData
      })
    }, 1200)
  }

  closeSidebar = () => {
    this.setState({ showSidebar: false })
  }

  render() {
    const { showSidebar } = this.state
    const handleFilterInput = (input) => {
      this.setState({ filterString: input })
    }
    let playlists = this.state.serverData.user ? this.state.serverData.user.playlists
      .filter( playlist => {
        return playlist.name
          .toLowerCase()
          .includes(this.state.filterString.toLowerCase())
      }
    ) : []

    return (
      <Grommet theme={theme} full>
        <ResponsiveContext.Consumer>
          {size => (
            <Box fill>
              <AppBar>
                <Heading level="3" margin="none">Better Playlists</Heading>
                <Button 
                  icon={<Notification />} 
                  onClick={ () => { 
                    this.setState( prevState => ({ showSidebar: !prevState.showSidebar}) ) 
                  }}
                >
                </Button>
              </AppBar>
              <Box direction="row" flex overflow={{ horizontal: 'hidden' }}>
                <Box flex align="" fill="horizontal">
                {this.state.serverData.user ?
                  <div>
                    <Title name={this.state.serverData.user.name}/>
                    <PlaylistsStats playlists={playlists}/>
                    <Filter onTextChange={ text => handleFilterInput(text)} />
                    <Playlists playlists={playlists} />
                  </div> : <div style={defaultStyle}>Fetching playlist data...</div>
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
