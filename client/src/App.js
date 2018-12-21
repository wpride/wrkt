import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import moment from 'moment';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.clearState();
  }

  clearState = () => {
    this.state = {
      muscleGroups: [],
      exercises: [],
      exerciseSets: [],
      sessions: [],
      sessionExerciseSets: [],
    };
  }
  
  getMuscleGroupComponent = (name, id) => {
    return <div onClick={() => this.handleMuscleGroupClick(id)}>{name}</div>
  }

  getExerciseComponent = (name, id) => {
    return <div onClick={() => this.handleExerciseClick(id)}>{name}</div>
  }

  getSessionComponent = (date, id) => {
    const dateFormatted = moment(date).format('MM/DD');
    return (
      <div onClick={() => this.handleSessionClick(id)}>
        <b>{dateFormatted}</b>
      </div>
    )
  }

  getSessionSetComponent = (exerciseSet) => {
    const {sets} = exerciseSet;
    const name = exerciseSet.exercise.name;
    return (
      <div>
        <b>{name}: </b>
        <>{sets[0].weight}</>
        {sets.map((set) =><> {set.reps} </>)}
      </div>
    )
  }
  getSessionSetsComponent = (exerciseSets) => {
    if (!exerciseSets.length) {
      return;
    }
    return exerciseSets.map((exerciseSet) => <div>{this.getSessionSetComponent(exerciseSet)}</div>);
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
    fetch('http://localhost:3000/api/sessions')
      .then(response => response.text())
      .then(JSON.parse)
      .then(sessions => this.setState({ sessions }));
  }

  handleSessionClick(sessionId) {
    fetch(`http://localhost:3000/api/Sessions/getSets/?id=${sessionId}`)
      .then(response => response.text())
      .then(JSON.parse)
      .then(response => this.setState({ sessionExerciseSets: response.exerciseSets }));
  }
  handleMuscleGroupClick(muscleGroupId) {
    this.state.exerciseSets = [];
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
    const { muscleGroups, exercises, exerciseSets, sessions, sessionExerciseSets } = this.state;
    return (
      <>
      <header>
        <h1>wrkt</h1>
      </header>
      <div className={css(styles.row)}>
        <div className={css(styles.column)}>
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
        <div className={css(styles.column)}>
          <p>Sessions</p>
          <ul>
            {sessions.map(({ id, date }) => this.getSessionComponent(date, id))}
          </ul>
          <p>Session Sets</p>
          <ul>
            {this.getSessionSetsComponent(sessionExerciseSets)}
          </ul>
        </div>
      </div>
      </>
    );
  }
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
