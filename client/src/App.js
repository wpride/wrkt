import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { StyleSheet, css } from 'aphrodite';
import Sessions from './Sessions.js';
import NewSession from './NewSession.js';
import Exercises from './Exercises.js';

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Exercises</Link>
          </li>
          <li>
            <Link to="/sessions">Sessions</Link>
          </li>
          <li>
            <Link to="/new">New Session</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={Exercises} />
        <Route path="/sessions" component={Sessions} />
        <Route path="/new" component={NewSession} />
      </div>
    </Router>
  );
}


const styles = StyleSheet.create({
  row: {
    display: 'flex'
  },
  column: {
    flex: '50%'
  }
});

export default App;
