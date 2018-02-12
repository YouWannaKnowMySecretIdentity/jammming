import PropTypes from "prop-types";
import React, { Component } from "react";
import TrackList from "../Tracklist/Tracklist";
import "./Playlist.css";

class Playlist extends Component {
    constructor(props) {
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(e) {
        this.props.onNameChanged(e.target.value);
    }

    render() {

        const { playlistName, playlistTracks, onRemove } = this.props; 

        return (
            <div className="Playlist">
                <input defaultValue={"New Playlist"} value={playlistName} onChange={this.handleNameChange}/>
                <TrackList tracks={playlistTracks} onRemove={onRemove} />
                <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
            </div>
        );
    }
}

Playlist.propTypes = {
    playlistName: PropTypes.string,
    playlistTracks: PropTypes.array,
    onRemove: PropTypes.func,
    onNameChanged: PropTypes.func,
    onSave: PropTypes.func
};

export default Playlist;