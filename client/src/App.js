import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      sessions: [],
    };
  }

  componentWillMount() {
    fetch('http://localhost:3000/api/exercises')
      .then(response => response.text())
      .then(JSON.parse)
      .then(notes => this.setState({ notes }));
    fetch('http://localhost:3000/api/sessions')
      .then(response => response.text())
      .then(JSON.parse)
      .then(sessions => this.setState({ sessions }));
  }

  render() {
    const { notes, sessions } = this.state;
    return (
      <div>
        <header>
          <h1>wrkt</h1>
        </header>
        <p>
          Exercises
        </p>
        <ul>
          {notes.map(({ id, name, text }) => <li><b>{name}</b></li>)}
        </ul>
        <p>
          Sessions
        </p>
        <ul>
          {sessions.map(({ date, name, id }) => <li>{id} - <b>{new Date(date).toLocaleDateString("en-US")}</b></li>)}
        </ul>
      </div>
    );
  }
}

export default App;
