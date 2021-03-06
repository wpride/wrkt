import React, { Component } from 'react';
import moment from 'moment';

class Exercises extends Component {
  constructor(props) {
    super(props);
    this.state = {
      muscleGroups: [],
      exercises: [],
      exerciseSets: [],
    }
  }

  clearState = () => {
    this.setState({
      muscleGroups: [],
      exercises: [],
      exerciseSets: [],
    });
  }
  
  getMuscleGroupComponent = (name, id) => {
    return <div onClick={() => this.handleMuscleGroupClick(id)}>{name}</div>
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
      return;
    }
    return exerciseSets.map((exerciseSet) => <div>{this.getSetComponent(exerciseSet)}</div>);
  }

  componentWillMount() {
    fetch('http://localhost:3000/api/muscleGroups')
      .then(response => response.text())
      .then(JSON.parse)
      .then(muscleGroups => this.setState({ muscleGroups }));
  }
  handleMuscleGroupClick(muscleGroupId) {
    this.setState({exerciseSets: []});
    fetch(`http://localhost:3000/api/muscleGroups/${muscleGroupId}/exercises`)
      .then(response => response.text())
      .then(JSON.parse)
      .then(response => this.setState({ exercises: response }));
  }
  handleExerciseClick(exerciseId) {
    fetch(`http://localhost:3000/api/exercises/getSets/?id=${exerciseId}`)
      .then(response => response.text())
      .then(JSON.parse)
      .then(response => this.setState({ exerciseSets: response.exerciseSets }));
  }

  render() {
    const { muscleGroups, exercises, exerciseSets } = this.state;
    return (
      <>
      <header>
        <h1>wrkt</h1>
      </header>
      <div>
        <p>
          Muscle Group
        </p>
        <ul>
          {muscleGroups.map(({ id, name, text }) => this.getMuscleGroupComponent(name, id))}
        </ul>
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
      </>
    );
  }
}

export default Exercises;
