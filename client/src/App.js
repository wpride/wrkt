import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
    };
  }

  componentWillMount() {
    fetch('http://localhost:3000/api/exercises')
      .then(response => response.text())
      .then(JSON.parse)
      .then(notes => this.setState({ notes }));
  }

  render() {
    const { notes } = this.state;
    return (
      <div>
        <header>
          <img src="{logo}" alt="logo" />
          <h1>wrkt</h1>
        </header>
        <p>
          Exercises
        </p>
        <ul>
          {notes.map(({ id, name, text }) => <li><b>{name}</b></li>)}
        </ul>
      </div>
    );
  }
}

export default App;
