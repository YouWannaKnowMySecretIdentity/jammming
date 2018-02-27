import Playlist from "../Playlist/Playlist";
import React, { Component } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Spotify from "../../util/Spotify";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResults: [],
            playlistName: "New Playlist",
            playlistTracks: []
        };

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);

        Spotify.getAccessToken();
    }

    addTrack(track) {
        let { playlistTracks } = this.state;
        if(!this.state.playlistTracks.some(t => t.id === track.id)) {
            track.isRemoval = true;
            playlistTracks.push(track);
            this.setState({playlistTracks});
        }
    }

    removeTrack(track) {        
        let { playlistTracks } = this.state;
        playlistTracks = playlistTracks.filter(t => {
            return t.id !== track.id;
        });
        this.setState({playlistTracks});
    }

    updatePlaylistName(name) {
        this.setState({playlistName: name});
    }

    savePlaylist() {
        let { playlistName, playlistTracks } = this.state;
        Spotify.savePlaylist(playlistName, playlistTracks);
        this.setState({playlistName: "New Playlist", playlistTracks: []});
    }

    async search(term) {
        let searchResults = await Spotify.search(term);
        this.setState({searchResults});
    }

    render() {
        const { searchResults, playlistName, playlistTracks } = this.state;

        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar onSearch={this.search} />
                    <SearchBar onSearch={this.search} />
                    <SearchBar onSearch={this.search} />
                    <SearchBar onSearch={this.search} />
                    <div>Ben c</div>
                    <div className="App-playlist">
                        <SearchResults searchResults={searchResults} onAdd={this.addTrack} />
                        <Playlist 
                            playlistName={playlistName} 
                            playlistTracks={playlistTracks} 
                            onRemove={this.removeTrack} 
                            onNameChanged={this.updatePlaylistName} 
                            onSave={this.savePlaylist} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;