import moment from 'moment';
import React, { Component } from 'react';

class Sessions extends Component {
  constructor(props) {
    super(props);
    this.clearState();
    this.state = {
      sessions: [],
      sessionExerciseSets: [],
    };
  }

  clearState = () => {
    this.setState({
      sessions: [],
      sessionExerciseSets: [],
    });
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

export default Sessions;
