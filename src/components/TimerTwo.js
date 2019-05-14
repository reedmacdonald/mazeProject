import React, { Component } from "react";
import { withRouter, Redirect } from 'react-router-dom'
import '../App.css';
import * as routes from '../constants/routes'


class TimerTwo extends Component {
    constructor(props) {
        super(props);
  
        this.timerInterval = null;
        this.state = {
          isPaused: false,
          time: props.startTime || 1,
          outTime: false
        };
      }

    
      componentDidMount() {
        this.startTimer();
      }
    
      startTimer = () => {
        this.timerInterval = setInterval(this.tick, 1000);
      };
    
      stopTimer = async () => {
        clearInterval(this.timerInterval);
          const loser = await fetch(`/maze/test/loser/${this.props.match.params.testId}`, {
            method: 'PUT',
            credentials: 'include',
            headers:{
                "Content-type" : 'application/json'
            }
        })
        const parsedResponse = await loser.json();
        console.log(parsedResponse)
        this.setState({
            outTime:true
        })
          
      }
    
      tick = () => {
          this.state.time==60
          ?this.stopTimer()
          :this.setState(prevState => ({ time: prevState.time + 1 }))
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

              this.startTimer();
            } else {

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
        if (this.state.outTime) {
            return <Redirect to={routes.OUTTIME}/>;
          }
    
        return (
          <div className="timer">
            <div className="timer__label">{time}</div>
          </div>
        );
      }
    }

export default withRouter(TimerTwo);