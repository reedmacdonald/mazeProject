import React, {Component} from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import '../App.css';
import Maze from './Maze';
import TimerTwo from './TimerTwo'
import * as routes from '../constants/routes'
import { NavLink } from 'react-router-dom';




class LoadingTwo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            scar: this.props.scar,
          color: 'white',
          colorToChange:null,
          changeColor: false,
          clicked:this.props.clicked,
          accepted:false
        };
      }
      componentDidMount(){
          setTimeout(()=>{
              this.setState({accepted:true})
          },10000)
      }

      render(){
        if (this.state.accepted) {
            return <Redirect to={routes.BATTLEROOM}/>;
          }
          return(
<div className="divHolderTwo">

<h1>You've sent {this.props.opponent} your maze</h1>
<br/>
<h3>Waiting for {this.props.opponent} to finish mazing</h3>
<ul className="instructionList">
    <li>You will have three minutes to make the maze again</li>
    <li>Take all the time if you'd like</li>
    <li>Then you will switch mazes and try to complete the others maze</li>
    <li>But this time...</li>
    <li><b>Speed matters</b></li>
    <li>the person who completes the others persons maze first wins</li>
    <li>cool?</li>
    <li>.</li>
</ul>
<br/>
<h3>Waiting for {this.props.opponent} still</h3>
<ul className="instructionList">
    <li>.</li>
    <li>.</li>
    <li>.</li>
    <li>.</li>
    <li>.</li>
</ul>
</div>
          )
      }
    }
export default LoadingTwo