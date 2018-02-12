import PropTypes from "prop-types";
import React, { Component } from "react";
import TrackList from "../Tracklist/Tracklist";
import "./SearchResults.css";

class SearchResults extends Component {
    render() {
        const { searchResults, onAdd } = this.props;

        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <TrackList tracks={searchResults} onAdd={onAdd} />
            </div>
        );
    }
}

SearchResults.propTypes = {
    searchResults: PropTypes.array,
    onAdd: PropTypes.func
};

export default SearchResults;