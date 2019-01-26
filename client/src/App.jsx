import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Sessions from './Sessions.jsx';
import NewSession from './NewSession.jsx';
import Exercises from './Exercises.jsx';

function App() {
  return (
    <Router>
    <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <Link class="nav-item nav-link" to="/">Exercises</Link>
          <Link class="nav-item nav-link" to="/sessions">Sessions</Link>
          <Link to="/new" class="nav-item nav-link">New Session</Link>
        </div>
      </div>
    </nav>
        <Route exact path="/" component={Exercises} />
        <Route path="/sessions" component={Sessions} />
        <Route path="/new" component={NewSession} />
      </div>
    </Router>
  );
}

export default App;
