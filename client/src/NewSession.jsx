import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class AddExerciseComponent extends Component {
  constructor(props) {
    super(props);
    this.state= {
      sets: [0],
      exerciseId: this.props.exercises[0].id,
      weight: 0,
    };
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleRepsChange = this.handleRepsChange.bind(this);
    this.handleAddSet = this.handleAddSet.bind(this);
    this.handleExerciseChange = this.handleExerciseChange.bind(this);
  }

  getOutputData() {
    const {sets, weight, exerciseId} = this.state;
    return {
      sets: sets,
      weight: weight,
      exerciseId: exerciseId,
    }
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
        onChange={this.handleWeightChange} />
    )
  }

  render() {
    const {sets} = this.state;
    const {exercises} = this.props;
    return (
    <>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text" id="">Exercise</span>
        </div>
        <select class="form-control" value={this.state.exerciseId} onChange={this.handleExerciseChange}>
          {exercises.map((exercise) => this.getExerciseOption(exercise))}
        </select>
      </div>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text" id="">Weight</span>
        </div>
        {this.getWeightInput()}
      </div>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text" id="">Reps</span>
        </div>
        {sets.map((set, index) => this.getRepsInput(set, index))}
      </div>
      <Button className="btn btn-secondary" onClick={() => this.handleAddSet()}>Add Set</Button>
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
      exerciseComponents: [],
      exerciseComponentRefs: [],
    };
    this.handleAddExerciseSet = this.handleAddExerciseSet.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNewExerciseSet() {
    fetch(`${API_URL}/api/exerciseSets/newExerciseSet`, {
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

  handleNewSession() {
    const exerciseSets = [];
    this.state.exerciseComponentRefs.forEach(function(ref) {
      exerciseSets.push(ref.current.getOutputData());
    });
    fetch(`${API_URL}/api/sessions/newSession`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: this.state.date,
        sets: exerciseSets,
      })
    })
  }

  handleSubmit(event) {
    this.handleNewSession();
  }
  handleDateChange(event) {
    this.setState({date: event.target.value});
  }
  handleAddExerciseSet() {
    const exerciseComponents = [...this.state.exerciseComponents];
    exerciseComponents.push(this.getAddExerciseComponent())
    this.setState({exerciseComponents: exerciseComponents});
  }
  componentWillMount() {
    fetch(`${API_URL}/api/Exercises`)
      .then(response => response.text())
      .then(JSON.parse)
      .then(exercises => this.setState({ exercises }))
      .then(this.forceUpdate());
  }
  getAddExerciseComponent() {
    const {exercises} = this.state;
    const ref = React.createRef();
    const exerciseComponentRefs = [...this.state.exerciseComponentRefs];
    exerciseComponentRefs.push(ref);
    this.setState({exerciseComponentRefs: exerciseComponentRefs});
    return (
      <>
        <AddExerciseComponent
          exercises={exercises}
          ref={ref}/>
        <br/>
      </>
    )
  }

  render() {
    const {date, exercises, exerciseComponents} = this.state;
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
          <Button className="btn btn-primary" onClick={() => this.handleAddExerciseSet()}>Add Exercise</Button>
          <Button type="submit" value="Submit" className="btn btn-success">Submit</Button>
        </form>
      </>
    )
  };
}

export default NewSession;
