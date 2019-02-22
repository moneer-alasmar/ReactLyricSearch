import React, { Component } from "react";
import axios from "axios";
import { Consumer } from "../../context";

class Search extends Component {
  state = {
    trackTitle: ""
  };

  onChange = e => {
    this.setState({ trackTitle: e.target.value });
  };

  onSongSubmit = e => {
    e.preventDefault();
    axios
      .get(
        `http://api.musixmatch.com/ws/1.1/track.search?q_track=${
          this.state.trackTitle
        }&page_size=3&page=1&s_track_rating=desc&apikey=${
          process.env.REACT_APP_MUSIXMATCH_KEY
        }`
      )
      .then(res => {
        this.setState({ track_list: res.data.message.body.track_list });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Consumer>
        {value => {
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas-fa-music" /> Search For A Song
              </h1>
              <p className="lead text-center">
                Find the lyrics for your favorite songs
              </p>
              <form onSubmit={this.onSongSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Song title..."
                    name="trackTitle"
                    value={this.state.trackTitle}
                    onChange={this.onChange}
                  />
                </div>
                <button
                  className="btn btn-primary btn-lg btn-block mb-3"
                  type="submit"
                >
                  Find Lyrics
                </button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
