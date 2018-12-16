import React, { Component } from 'react';
import moment from 'moment';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      muscleGroups: [],
      exercises: [],
      exerciseSets: [],
    };
  }

  getExerciseComponent = (name, id) => {
    return <div onClick={() => this.handleExerciseClick(id)}>{name}</div>
  }

  getSetComponent = (exerciseSet) => {
    const {sets} = exerciseSet;
    const date = exerciseSet.session.date;
    const dateFormatted = moment(date).format('MM/DD');
    return (
      <div>
        <b>{dateFormatted}: </b>
        <>{sets[0].weight}</>
        {sets.map((set) =><> {set.reps} </>)}
      </div>
    )
  }

  getSetsComponent = (exerciseSets) => {
    if (!exerciseSets.length) {
      return <div>None Selected</div>
    }
    return exerciseSets.map((exerciseSet) => <div>{this.getSetComponent(exerciseSet)}</div>);
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
          {this.getSetsComponent(exerciseSets)}
        </ul>
      </div>
    );
  }
}

export default App;
