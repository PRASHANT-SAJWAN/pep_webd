import React, { Component } from 'react';
import Header from "./components/header/Header.jsx";
import Movies from "./components/movies/Movies.jsx";
import Pagination from "./components/Pagination/Pagination.jsx";
import Favourite from "./components/Favourite/Favourite.jsx";
import MoviePage from "./components/MoviePage/MoviePage.jsx";
import { API_KEY, API_URL } from './API/sercret.js';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login/Login.jsx';
import { firebaseAuth } from './config';
import SignUp from './components/SignIn/SignUp.jsx';

class App extends Component {
  state = {
    user: null,
    moviesData: [],
    currentMovie: "avengers",
    pages: [],
    currPage: 1,
    favMovies: [],
  };

  async componentDidMount() {
    this.setMovies(this.state.currentMovie);
  }

  componentDidUpdate() {
    console.log("user : ", this.state.user);
  }

  setMovies = async (newMovieName) => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: { api_key: API_KEY, page: 1, query: newMovieName },
    });
    let moviesData = data.data.results.slice(0, 10);
    let pagesCount = data.data.total_pages; //3
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
    this.setState({
      moviesData: moviesData,
      currentMovie: newMovieName,
      pages: pages,
    });
  };

  setFavouriteMovie = (movie) => {
    let updatedFavMovies = this.state.favMovies.filter(favmovie => favmovie.id !== movie.id);
    updatedFavMovies.push(movie);
    this.setState({
      favMovies: updatedFavMovies,
    });
  }

  removeFavouriteMovie = (movie) => {
    let updatedFavMovies = this.state.favMovies.filter(movie_itr => movie.id != movie_itr.id);
    console.log('delete movie ', updatedFavMovies);
    this.setState({
      favMovies: updatedFavMovies,
    });
  }

  nextPage = async () => {
    this.setPage(this.state.currPage + 1);
  };

  setPage = async (pageCount) => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: {
        api_key: API_KEY,
        page: pageCount,
        query: this.state.currentMovie,
      },
    });
    console.log(data);
    let moviesData = data.data.results.slice(0, 10);
    this.setState({
      moviesData: moviesData,
      currPage: pageCount,
    });
  };

  previousPage = async () => {
    this.setPage(this.state.currPage - 1);
  };

  register = async (email, password) => {
    try {
      let response = await firebaseAuth.createUserWithEmailAndPassword(email, password);
      let uid = response.user.uid;
      if (uid) {
        this.setState({ ...this.state, user: response.user });
        console.log(response.user);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  handleLogout = async () => {
    this.setState({ ...this.state, user: null });
    await firebaseAuth.signOut();
  }

  handleLogin = async (email, password) => {
    console.log(email, password);
    let response = await firebaseAuth.signInWithEmailAndPassword(email, password);
    let uid = response.user.uid;
    if (uid) {
      this.setState({ ...this.state, user: response.user })

    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header setMovies={this.setMovies} favMovies={this.state.favMovies} removeFavouriteMovie={this.removeFavouriteMovie} handleLogout={this.handleLogout} />
          <Switch>
            <Route path="/login" exact >
              <Login handleLogin={this.handleLogin} user={this.state.user} />
            </Route>
            <Route path="/signup" exact >
              <SignUp handleSignUp={this.register} />
            </Route>
            <PrivateRoute path="/fav" exact component={Favourite} user={this.state.user} />
            <PrivateRoute path="/moviepage" exact component={MoviePage} user={this.state.user} />
            <Route path="/" exact user={this.state.user}>
              {this.state.moviesData.length ?
                <Movies moviesData={this.state.moviesData} setFavouriteMovie={this.setFavouriteMovie} /> :
                <h1>No movies found</h1>}
              <Pagination
                pages={this.state.pages}
                currPage={this.state.currPage}
                nextPage={this.nextPage}
                previousPage={this.previousPage}
                setPage={this.setPage} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

function PrivateRoute({ component: Component, user: user, ...props }) {
  console.log(props);
  return <Route {...props} render={(props) => {
    return user !== null ? <Component {...props} /> : <Redirect to="/login" exact />
  }} />
}

export default App;