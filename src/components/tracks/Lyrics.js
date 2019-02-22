import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../layout/Spinner";
import Moment from "react-moment";

class Lyrics extends React.Component {
  state = {
    track: {},
    lyrics: {}
  };

  componentDidMount = () => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
          this.props.match.params.id
        }&apikey=${process.env.REACT_APP_MUSIXMATCH_KEY}`
      )
      .then(res => {
        this.setState({ lyrics: res.data.message.body.lyrics.lyrics_body });

        return axios.get(
          `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${
            this.props.match.params.id
          }&apikey=${process.env.REACT_APP_MUSIXMATCH_KEY}`
        );
      })
      .then(res => {
        this.setState({ track: res.data.message.body.track });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { track, lyrics } = this.state;
    if (
      track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(lyrics).length === 0
    ) {
      return <Spinner />;
    } else {
      return (
        <React.Fragment>
          <div className="card">
            <h5 className="card-header">
              {track.track_name} -{" "}
              <span className="text-secondary">{track.artist_name}</span>
            </h5>
            <div className="card-body">
              <p className="card-text">{lyrics}</p>
            </div>
          </div>

          <ul className="list-group mt-3">
            <li className="list-group-item">
              <strong>Album ID</strong>: {track.album_id}
            </li>
            <li className="list-group-item">
              <strong>Explicit</strong>:{" "}
              {track.explicit === 0 ? (
                <i className="fas fa-times" />
              ) : (
                <i className="fas fa-check" />
              )}
            </li>
            <li className="list-group-item">
              <strong>Release Date</strong>:{" "}
              <Moment format="MM/DD/YYYY">{track.updated_time}</Moment>
            </li>
          </ul>
          <Link to="/" className="btn btn-dark btn-sm mt-4">
            Go Back
          </Link>
        </React.Fragment>
      );
    }
  }
}

export default Lyrics;
