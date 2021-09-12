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
import { firebaseAuth, firebaseDB } from './config';
import SignUp from './components/SignIn/SignUp.jsx';

class App extends Component {
  state = {
    user: null,
    moviesData: [],
    currentMovie: "avengers",
    pages: [],
    currPage: 1,
    favList: [],
  };

  async componentDidMount() {
    this.setMovies(this.state.currentMovie);
  }

  setMovies = async (newMovieName) => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: { api_key: API_KEY, page: 1, query: newMovieName },
    });
    let moviesData = data.data.results.slice(0, 10);
    let pagesCount = data.data.total_pages; 
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

  setFavouriteMovie = async (movieObj, poster_path) => {
    if (this.state.user) {
      let { title, vote_average, release_date, id } = movieObj;
      let updatedList = this.state.favList;
      for (let i = 0; i < updatedList.length; ++i) {
        if (updatedList[i].id == movieObj.id)
          return;
      }
      updatedList.push({
        id: id,
        title: title,
        vote_average: vote_average,
        release_date: release_date,
        poster_path: poster_path
      });
      this.setState({
        favList: updatedList
      });
      console.log({ ...this.state.user, favList: updatedList });
      await firebaseDB.collection('users').doc(this.state.user.uid).set({ ...this.state.user, favList: updatedList });
    }
  }

  removeFavouriteMovie = async (movie) => {
    console.log(this.state.favList);
    let updatedFavMovies = this.state.favList.filter(movie_itr => movie.id !== movie_itr.id);
    console.log('delete movie ', updatedFavMovies);
    this.setState({
      favList: updatedFavMovies,
    });
    await firebaseDB.collection('users').doc(this.state.user.uid).set({ ...this.state.user, favList: updatedFavMovies });
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

  register = async (email, password, username) => {
    try {
      let response = await firebaseAuth.createUserWithEmailAndPassword(email, password);
      let user = response.user;
      this.setState({
        user: {
          uid: user.uid,
          username: username,
          email: user.email,
        },
        favList: []
      });
      console.log({ ...this.state.user, favList: this.state.favList });
      await firebaseDB.collection('users').doc(user.uid).set({ ...this.state.user, favList: [] });
      if (user) {
        this.setState({ user: user });
      }
    } catch (err) {
      console.log('ERROR : ', err.message);
    }
  }

  handleLogout = async () => {
    this.setState({
      user: null,
      currentMovie: "avengers",
      pages: [],
      currPage: 1,
      favList: []
    });

    await firebaseAuth.signOut();
  }

  handleLogin = async (email, password) => {
    console.log(email, password);
    let response = await firebaseAuth.signInWithEmailAndPassword(email, password);
    let ref = await firebaseDB.collection('users').doc(response.user.uid).get();
    let user = ref.data();
    if (user) {
      this.setState({
        currentMovie: "avengers",
        pages: [],
        currPage: 1,
        user: {
          uid: user.uid,
          username: user.username,
          email: user.email,
        },
        favList: user.favList
      });
      console.log('LOGIN : ', this.state);
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header user={this.state.user} setMovies={this.setMovies} favList={this.state.favList} removeFavouriteMovie={this.removeFavouriteMovie} handleLogout={this.handleLogout} />
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
                <Movies user={this.state.user} moviesData={this.state.moviesData} setFavouriteMovie={this.setFavouriteMovie} /> :
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
  return <Route {...props} render={(props) => {
    return user !== null ? <Component {...props} /> : <Redirect to="/login" exact />
  }} />
}

export default App;