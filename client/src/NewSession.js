import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import moment from 'moment';

class AddExerciseComponent extends Component {
  constructor(props) {
    super(props);
    this.state= {
      sets: [0],
      exerciseId: null,
    };
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleRepsChange = this.handleRepsChange.bind(this);
    this.handleAddSet = this.handleAddSet.bind(this);
    this.handleExerciseChange = this.handleExerciseChange.bind(this);
  }

  getExerciseOption(exercise) {
    const {id, name} = exercise;
    return <option value={id}>{name}</option>;
  }
  handleWeightChange(event) {
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

  handleAddSet() {
    this.setState({sets: this.state.sets.concat(0)});
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
    const {sets} = this.state;
    const {exercises} = this.props;
    return (
    <>
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
    </>
    )
  };  

}

class NewSession extends Component {
  constructor(props) {
    super(props);
    this.state= {
      date: new Date(),
      exercises: [],
      exerciseSetCount: 1,
    };
    this.handleAddExerciseSet = this.handleAddExerciseSet.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        date: this.state.date,
        exerciseId: this.state.exerciseId,
        weight: this.state.weight,
        sets: this.state.sets,
      })
    })
  }
  handleDateChange(event) {
    this.setState({date: event.target.value});
  }
  handleAddExerciseSet() {
    this.setState({exerciseSetCount: this.state.exerciseSetCount + 1});
  }
  componentWillMount() {
    fetch('http://localhost:3000/api/Exercises')
      .then(response => response.text())
      .then(JSON.parse)
      .then(exercises => this.setState({ exercises }));
  }

  render() {
    const {date, exercises, exerciseSetCount} = this.state;
    const exerciseComponents = [];
    for (var i=0; i<exerciseSetCount; i++) {
      exerciseComponents.push(
        <>
        <AddExerciseComponent exercises={exercises} />
        <br/>
        </>
      )
    }
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input 
            type="date" 
            id="date" 
            name="date"
            onChange={(event) => this.handleDateChange(event)}
            value={date} />
          <br/><br/>
          {exerciseComponents}
          <br/>
          <Button onClick={() => this.handleAddExerciseSet()}>Add Exercise</Button>
          <br/>
          <input type="submit" value="Submit" />
        </form>
      </>
    )
  };
}

export default NewSession;
