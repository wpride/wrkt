import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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

export default App;
