import React, {Component} from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import '../App.css';
import Maze from './Maze';
import TimerTwo from './TimerTwo'
import * as routes from '../constants/routes'
import { NavLink } from 'react-router-dom';




class Instructions extends Component{
    constructor(props) {
        super(props);
        this.state = {
            scar: this.props.scar,
          color: 'white',
          colorToChange:null,
          changeColor: false,
          clicked:this.props.clicked
        };
      }

      render(){
          return(
<div className="divHolderTwo">

<h1>Rule Set</h1>
<br/>
<h3>Creating Mazes</h3>
<ul className="instructionList">
    <li>The timer will start as soon as the page is loaded</li>
    <li>You are given three minutes. This isn't canon, but two minutes just seemed too hard</li>
    <li>Click on "Build Maze" to begin building the maze</li>
    <li>You are allowed to go out of bounds when building the game</li>
    <li><b>Double click to lift the "pen" up. Double click again to put it back down.</b></li>
    <li>If you don't name your maze before submitting it will just be called "random" + 4 random digits</li>
    <li>You test the maze to prove that it works. You cannot lift up your pen, go out of bounds, or touch the walls while doing this</li>
    <li>If you'd like to delete a maze, login and then click the delete button in the "yours" tab</li>
</ul>
<br/>
<h3>Testing Other Mazes</h3>
<ul className="instructionList">
    <li>Click "Test Maze" to start testing</li>
    <li>The timer will start as soon as you enter the page</li>
    <li>You have one minute to complete the maze</li>
    <li>There are some ways to cheat. But in the end you'd just be cheating yourself</li>
    <li>You cannot touch the walls or go out of bounds while testing</li>
</ul>
</div>
          )
      }
    }
export default Instructions