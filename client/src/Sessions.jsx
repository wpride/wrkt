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
  };

  getSessionComponent = (date, id) => {
    const dateFormatted = moment(date).format('MM/DD');
    return (
      <li className="list-group-item" onClick={() => this.handleSessionClick(id)}>
        <b>{dateFormatted}</b>
      </li>
    )
  };

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
  };
  getSessionSetsComponent = (exerciseSets) => {
    if (!exerciseSets.length) {
      return;
    }
    return exerciseSets.map((exerciseSet) => <div>{this.getSessionSetComponent(exerciseSet)}</div>);
  }

  componentWillMount() {
    fetch(`${API_URL}/api/sessions`)
      .then(response => response.text())
      .then(JSON.parse)
      .then(sessions => this.setState({ sessions }));
  }

  handleSessionClick(sessionId) {
    fetch(`${API_URL}/api/Sessions/getSets/?id=${sessionId}`)
      .then(response => response.text())
      .then(JSON.parse)
      .then(response => this.setState({ sessionExerciseSets: response.exerciseSets }));
  }

  render() {
    const { sessions, sessionExerciseSets } = this.state;
    return (
      <>
      <div className="container">
        <div className="row">
          <div className="col-sm">
          <ul className="list-group">
            {sessions.map(({ id, date }) => this.getSessionComponent(date, id))}
          </ul>
          </div>
          <div className="col-sm">
          <ul>
            {this.getSessionSetsComponent(sessionExerciseSets)}
          </ul>
        </div>
        </div>
      </div>
      </>
    );
  }
}

export default Sessions;
