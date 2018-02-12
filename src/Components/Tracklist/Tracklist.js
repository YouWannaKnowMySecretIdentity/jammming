import PropTypes from "prop-types";
import React, { Component } from "react";
import Track from "../Track/Track";
import "./Tracklist.css";

class TrackList extends Component {
    render() {
        const { tracks, onAdd, onRemove, isRemoval } = this.props;

        return (
            <div className="TrackList">
                {/*<!-- You will add a map method that renders a set of Track components  -->*/}
                {tracks.map(track => {
                    return <Track key={track.id} track={track} onAdd={onAdd} onRemove={onRemove} isRemoval={isRemoval} />;
                })}
            </div>
        );
    }
}

TrackList.propTypes = {
    tracks: PropTypes.array,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
    isRemoval: PropTypes.bool
};

TrackList.defaultProps = {
    isRemoval: false
};

export default TrackList;