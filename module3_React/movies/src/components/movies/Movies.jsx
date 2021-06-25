import React, { Component } from 'react';
import Movie from '../movie/Movie.jsx';
import './Movies.css';

class Movies extends Component {
    state = {};

    render() {
        return <div className="movies">
            {this.props.moviesData.map((movieObj) => {
                return <Movie key={movieObj.id} movieObj={movieObj} />
            })}
        </div>
    }
}

export default Movies;