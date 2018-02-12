import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Track.css";

class Track extends Component {
    constructor(props) {
        super(props);

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    renderAction() {
        const { isRemoval } = this.props;
        if (isRemoval) {
            return <a className="Track-action" onClick={this.removeTrack}>-</a>;
        } else {
            return <a className="Track-action" onClick={this.addTrack}>+</a>;
        }
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    render() {
        const { track } = this.props;

        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{track.name}</h3>
                    <p>{track.artist} | {track.album}</p>
                </div>
                {this.renderAction()}
            </div>
        );
    }
}

Track.propTypes = {
    isRemoval: PropTypes.bool,
    track: PropTypes.object,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func
};

export default Track;