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
    return <li className="list-group-item" onClick={() => this.handleMuscleGroupClick(id)}>{name}</li>
  }

  getExerciseComponent = (name, id) => {
    return <li className="list-group-item" onClick={() => this.handleExerciseClick(id)}>{name}</li>
  }

  getSetComponent = (exerciseSet) => {
    const {sets} = exerciseSet;
    const date = exerciseSet.session.date;
    const dateFormatted = moment(date).format('MM/DD');
    return (
      <li className="list-group-item">
        <b>{dateFormatted}: </b>
        <>{sets[0].weight}</>
        {sets.map((set) =><> {set.reps} </>)}
      </li>
    )
  }

  getSetsComponent = (exerciseSets) => {
    if (!exerciseSets.length) {
      return;
    }
    return exerciseSets.map((exerciseSet) => <div>{this.getSetComponent(exerciseSet)}</div>);
  }

  componentWillMount() {
    fetch(`${API_URL}/api/muscleGroups`)
      .then(response => response.text())
      .then(JSON.parse)
      .then(muscleGroups => this.setState({ muscleGroups }));
  }
  handleMuscleGroupClick(muscleGroupId) {
    this.setState({exerciseSets: []});
    fetch(`${API_URL}/api/muscleGroups/${muscleGroupId}/exercises`)
      .then(response => response.text())
      .then(JSON.parse)
      .then(response => this.setState({ exercises: response }));
  }
  handleExerciseClick(exerciseId) {
    fetch(`${API_URL}/api/exercises/getSets/?id=${exerciseId}`)
      .then(response => response.text())
      .then(JSON.parse)
      .then(response => this.setState({ exerciseSets: response.exerciseSets }));
  }

  render() {
    const { muscleGroups, exercises, exerciseSets } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm">
          <ul className="list-group">
            {muscleGroups.map(({ id, name, text }) => this.getMuscleGroupComponent(name, id))}
          </ul>
          </div>
          <div className="col-sm">
          <ul className="list-group">
            {exercises.map(({ id, name, text }) => this.getExerciseComponent(name, id))}
          </ul>
          </div>
          <div className="col-sm">
          <ul className="list-group">
            {this.getSetsComponent(exerciseSets)}
          </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Exercises;
