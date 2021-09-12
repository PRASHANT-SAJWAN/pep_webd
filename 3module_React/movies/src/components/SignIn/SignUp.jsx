import { Button, Container, TextField } from '@material-ui/core';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class SignUp extends Component {
    state = {
        email: "ken@gmail.com",
        password: "123456",
        username: "ken",
    };

    setUsername = (username) => {
        this.setState({ ...this.state, username: username });
    }

    setEmail = (email) => {
        this.setState({ ...this.state, email: email });
    }

    setPassword = (password) => {
        this.setState({ ...this.state, password: password });
    }

    render() {
        return (<Container maxWidth="sm">
            <TextField id="sign-in-username"
                label="Username"
                value={this.state.username}
                onChange={(e) => this.setUsername(e.target.value)} />
            <br />
            <TextField id="sign-in-email"
                label="Email"
                value={this.state.email}
                onChange={(e) => this.setEmail(e.target.value)} />
            <br />
            <TextField id="sign-in-password"
                label="Password"
                value={this.state.password}
                onChange={(e) => this.setPassword(e.target.value)} />
            <br />
            <br />
            <Button
                variant="contained" size="small" color="primary"
                onClick={() => this.props.handleSignUp(this.state.email, this.state.password, this.state.username)}>
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>Sign Up </Link>
            </Button>
            <br />
            <br />
            <Button variant="outlined" size="small" color="primary">
                <Link to='/login' style={{ textDecoration: "none", color: "black" }}>Login</Link>
            </Button>
        </Container>);
    };
}

export default SignUp;