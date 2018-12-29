import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { StyleSheet, css } from 'aphrodite';
import moment from 'moment';
import './App.css';

class Sessions extends Component {
  constructor(props) {
    super(props);
    this.clearState();
  }

  clearState = () => {
    this.state = {
      sessions: [],
      sessionExerciseSets: [],
    };
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

  componentWillMount() {
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

  render() {
    const { sessions, sessionExerciseSets } = this.state;
    return (
      <>
      <header>
        <h1>wrkt</h1>
      </header>
      <div>
        <p>Sessions</p>
        <ul>
          {sessions.map(({ id, date }) => this.getSessionComponent(date, id))}
        </ul>
        <p>Session Sets</p>
        <ul>
          {this.getSessionSetsComponent(sessionExerciseSets)}
        </ul>
      </div>
      </>
    );
  }
}

class NewSession extends Component {

  constructor(props) {
    super(props);
    this.state= {
      sets: [0],
      exercises: [],
      exerciseId: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRepsChange = this.handleRepsChange.bind(this);
    this.handleAddSet = this.handleAddSet.bind(this);
    this.handleExerciseChange = this.handleExerciseChange.bind(this);
  }

  getExerciseOption(exercise) {
    const {id, name} = exercise;
    return <option value={id}>{name}</option>;
  }
  handleChange(event) {
    this.setState({weight: event.target.value});
  }
  handleExerciseChange(event) {
    this.setState({exerciseId: event.target.value});
  }

  handleRepsChange(event, index) {
    const sets = [...this.state.sets];
    sets[index] = parseInt(event.target.value);
    this.setState({sets: sets});
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:3000/api/exerciseSets/newExerciseSet', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        exerciseId: this.state.exerciseId,
        weight: this.state.weight,
        sets: this.state.sets,
      })
    })
  }

  handleAddSet() {
    this.setState({sets: this.state.sets.concat(0)});
  }
  componentWillMount() {
    fetch('http://localhost:3000/api/Exercises')
      .then(response => response.text())
      .then(JSON.parse)
      .then(exercises => this.setState({ exercises }));
  }

  getRepsInput(set, index) {
    console.log('Reps:');
    console.log(set);
    return (
      <input
        name="reps"
        type="number"
        index={index}
        value={set}
        onChange={(event) => this.handleRepsChange(event, index)} />
    )
  }

  getWeightInput() {
    return (
      <input
        name="weight"
        type="number"
        value={this.state.weight}
        onChange={this.handleChange} />
    )
  }

  render() {
    const {exercises, sets} = this.state;
    console.log(exercises);
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Exercise:
          <select value={this.state.exerciseId} onChange={this.handleExerciseChange}>
            {exercises.map((exercise) => this.getExerciseOption(exercise))}
          </select>
        </label>
        <label>
          Weight:
          {this.getWeightInput()}
        </label>
        <label>
          Reps:
          {sets.map((set, index) => this.getRepsInput(set, index))}
        </label>
        <Button onClick={() => this.handleAddSet()}>Add Set</Button>
        <input type="submit" value="Submit" />
      </form>
  )};  
}

class Exercises extends Component {
  constructor(props) {
    super(props);
    this.clearState();
  }

  clearState = () => {
    this.state = {
      muscleGroups: [],
      exercises: [],
      exerciseSets: [],
    };
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
