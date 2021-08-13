import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { API_KEY, API_URL, IMAGE_URL } from '../../API/sercret';
import axios from 'axios';

class Favourite extends Component {
    state = {
        favMovies: [],
    };
    componentDidMount() {
        console.log(this.props.location.favMovies);
        this.setState({ favMovies: this.props.location.favMovies });
        console.log(this.state.favMovies.length);
    }

    componentDidUpdate () {
        console.log('movie component updated 1');
        console.log(this.props.location.favMovies);
    }

    render() {
        return <div className="movies">
            {this.props.location.favMovies.length > 0 ? this.props.location.favMovies.map((movieObj) => {
                return <FavouriteMovies key={movieObj.id}
                    movieObj={movieObj} removeFavouriteMovie={this.props.location.removeFavouriteMovie} />
            }) : <div>No favourite Movies</div>}
        </div>
    }
}

class FavouriteMovies extends Component {
    state = {
        detailedMovieObj: {},
        deleted: false
    };

    async componentDidMount() {
        let response = await axios.get(
            `${API_URL}/movie/${this.props.movieObj.id}?api_key=${API_KEY}`
        );
        // console.log(response.data);
        let detailedMovieObj = response.data;
        let posterPath = IMAGE_URL + detailedMovieObj.poster_path;
        this.setState({
            detailedMovieObj: { ...detailedMovieObj, poster_path: posterPath },
            deleted: false,
        });
    }

    componentDidUpdate () {
        console.log('movie component updated 2');
    }
    render() {
        let { title, vote_average, release_date, poster_path } = this.props.movieObj;
        let posterPath = IMAGE_URL + poster_path;
        return (<div className="movie-item">
            <div className="movie-poster">
                <Link to={{ pathname: `/moviepage`, state: this.state.detailedMovieObj }}>
                    <img src={posterPath} alt="" />
                </Link>
            </div>
            <div className="movie-info">
                <div className="movie-title">{title}</div>
                <div className="release-date">{release_date}</div>
                <div className="movie-rating">{vote_average}</div>
            </div>
            <button onClick={() => { this.props.removeFavouriteMovie(this.props.movieObj); this.setState({deleted: true})}}>REMOVE FROM FAVOURITE</button>
        </div>);
    }
}

export default Favourite;