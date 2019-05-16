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
          time: props.startTime || 60,
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
          this.state.time==0
          ?this.stopTimer()
          :this.setState(prevState => ({ time: prevState.time - 1 }))
      };
    
  
    

    
      componentWillUnmount() {
        clearInterval(this.timerInterval);
      }
    
      render() {
        const { time } = this.state;
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