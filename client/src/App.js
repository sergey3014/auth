/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/

import React,{ Component } from "react";
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { Home } from './Home';
import { Login } from './Login';
import { Secret } from './Secret';

class App extends Component {
  render() {
    <div>
      <Switch>
        <Route exact path = '/' component = { Home } />
        <Route path = '/login' component = { Login } />
        <Route path = '/secret' component = { Secret } />
      </Switch>
    </div>
  }
}

export default App;
