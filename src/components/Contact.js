import React, {Component} from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import '../App.css';
import Maze from './Maze';
import TimerTwo from './TimerTwo'
import * as routes from '../constants/routes'
import { NavLink } from 'react-router-dom';




class Contact extends Component{
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

<h1></h1>
<br/>
<h3>Contact</h3>
<ul className="instructionList">
<br/>
    <li><a href = "http://www.linkedin.com/in/reed-macdonald">www.linkedin.com/in/reed-macdonald</a></li>
    <br/>
    <li><a href = "https://github.com/reedmacdonald">https://github.com/reedmacdonald</a></li>
    <br/>
    <li><a href = "https://reedmacdonald.com">https://reedmacdonald.com</a></li>
    <br/>
    <li>reedpmacdonald@gmail.com</li>
    <br/>
    <li>General Assembly, Software Engineering Immersive - Spring 2019 Cohort</li>
    <br/>
    <li>University of California, Los Angeles c/o 2018</li>
    <br/>
    <li>Open for opportunities in front-end/full stack development</li>
    <br/>
    <li>Based in Los Angeles</li>
</ul>

</div>
          )
      }
    }
export default Contact