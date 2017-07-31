import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Feed from './components/feed';

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
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>CodyMcCodeFace's DevLog</h2>
          <nav>
            {
              !isAuthenticated() && (
                <button onClick={this.login.bind(this)}>Login</button>
              )
            }  
            {
              isAuthenticated() && (
                <button onClick={this.logout.bind(this)}>Logout</button>
              )
            }      
          </nav>
        </div>
        <p className="App-intro">
          Scroll down for thoughts and feelings. Opinions are my own.
        </p>
        <div>
            <Feed/>
        </div>
      </div>
    );
  }
}

export default App;
