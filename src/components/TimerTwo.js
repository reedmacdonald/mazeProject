import React, { Component } from "react";


class Timer extends Component {
  constructor(props) {
    super(props);

    this.timerInterval = null;
    this.state = {
      isPaused: false,
      time: props.startTime || 1
    };
  }


  componentDidMount() {
    this.startTimer();
  }

  startTimer = () => {
    this.timerInterval = setInterval(this.tick, 1000);
  };

  // update time prop by one
  tick = () => {
    this.setState(prevState => ({ time: prevState.time + 1 }));
  };

  handleTimerToggle1(newPausedStatus) {
    return function() {
      this.setState({
        isPaused: newPausedStatus
      });
    };
  }

  handleTimerToggle = newPausedStatus => () => {
    // change isPause status
    this.setState(
      {
        isPaused: newPausedStatus
      },
      () => {
        // handle some actions after component rerendered with new state
        const { isPaused } = this.state;

        if (!isPaused) {
          // we are on
          // start timer, repeat func tick every second
          this.startTimer();
        } else {
          // we are on pause
          // stop timer
          clearInterval(this.timerInterval);
        }
      }
    );
  };

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  render() {
    // must have
    const { isPaused, time } = this.state;
    // const {} = this.props;

    return (
      <div className="timer">
        <div className="timer__label">{time}</div>
      </div>
    );
  }
}

export default Timer;