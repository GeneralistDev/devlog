import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Feed from './components/feed';
import { Grid, Row, Button } from 'react-bootstrap';

class App extends Component {
  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="App">
        <Grid className="App-header" fluid={true}>
          <Row>
            <img src={logo} className="App-logo" alt="logo" />
          </Row>
          <Row>
            <h2>CodyMcCodeFace's DevLog</h2>
          </Row>
          <Row>
              {
                !isAuthenticated() && (
                  <Button bsStyle="default" onClick={this.login.bind(this)}>Login</Button>
                )
              }  
              {
                isAuthenticated() && (
                  <Button bsStyle="default" onClick={this.logout.bind(this)}>Logout</Button>
                )
              }
          </Row>
        </Grid>
        <Grid className="App-body">
              <Feed/>
        </Grid>
      </div>
    );
  }
}

export default App;
