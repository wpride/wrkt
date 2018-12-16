import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exercises: [],
      exerciseSets: [],
    };
  }

  getExerciseComponent = (name, id) => {
    return <div onClick={() => this.handleExerciseClick(id)}>{name}</div>
  }


  componentWillMount() {
    fetch('http://localhost:3000/api/exercises')
      .then(response => response.text())
      .then(JSON.parse)
      .then(exercises => this.setState({ exercises }));
  }

  handleExerciseClick(exerciseId) {
    fetch(`http://localhost:3000/api/exercises/getSets/?id=${exerciseId}`)
      .then(response => response.text())
      .then(JSON.parse)
      .then(response => this.setState({ exerciseSets: response.exerciseSets }));
  }

  render() {
    const { exercises, exerciseSets } = this.state;
    return (
      <div>
        <header>
          <h1>wrkt</h1>
        </header>
        <p>
          Exercises
        </p>
        <ul>
          {exercises.map(({ id, name, text }) => this.getExerciseComponent(name, id))}
        </ul>
        <p>
          Exercise Sets
        </p>
        <ul>
          {exerciseSets.length ? exerciseSets.map(({ id }) => <div>{id}</div>) : <div>None Selected</div>}
        </ul>
      </div>
    );
  }
}

export default App;
