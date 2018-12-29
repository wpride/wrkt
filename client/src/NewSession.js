import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import moment from 'moment';

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

export default NewSession;
