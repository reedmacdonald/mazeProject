import React, { Component } from "react";
import { withRouter, Redirect } from 'react-router-dom'
import '../App.css';
import * as routes from '../constants/routes'


class TimerOne extends Component {
  constructor(props) {
    super(props);
    this.timerInterval = null;
    this.state = {
      time: props.startTime || 180,
      outTime: false,
      testing: this.props.testing
    };
  }


  componentDidMount() {
    this.startTimer();
  }

  startTimer = () => {
    this.timerInterval = setInterval(this.tick, 1000);
  };

  stopTimer = () => {
      
      clearInterval(this.timerInterval);
      this.setState({
          outTime:true
      })
  }

  theyTesting = () => {
    clearInterval(this.timerInterval);
  }

  tick = () => {
      this.state.time==0
      ?this.stopTimer()
      :this.setState(prevState => ({ time: prevState.time - 1 }))
  };


  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  render() {
    if (this.state.outTime) {
        return <Redirect to={routes.OUTTIME}/>;
      }
      if (this.props.test){
          this.theyTesting()
      }
    
    const { isPaused, time } = this.state;
    

    return (
      <div className="timer">
        <div className="timer__label">{time}</div>
      </div>
    );
  }
}

export default TimerOne;