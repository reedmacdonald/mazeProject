import React, {Component} from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import '../App.css';
import Maze from './Maze';
import TimerTwo from './TimerTwo'
import * as routes from '../constants/routes'
import { NavLink } from 'react-router-dom';




class WelcomePage extends Component{
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
      pushLoginUp = (e) => {
          e.preventDefault()
        var loginValue = document.getElementById("uniqueIDTwo").value
            this.props.login(loginValue)
      }
      pushSignUpUp = (e) => {
          e.preventDefault()
        var signUpValue = document.getElementById("uniqueIDThree").value
          this.props.signUp(signUpValue)
      }
      render(){
          return(
<div class="divHolderTwo">
<p>COBB:</p>
<p>Before I describe the job, I have
to know you could do it.</p>
<br/>
<p>ARIADNE:</p>
<p>Why?</p>
<br/>
<p>COBB:</p>
<p>It's not, strictly speaking, legal.</p>
<br/>
<p>*Ariadne raises her eyebrows.*</p>
<br/>
<p>COBB:</p>
<b>You have three* minutes to draw a maze
that takes me one minute to solve.</b>
<br/>
<br/>
<p>*Ariadne takes the pad and pen. Cobb looks at his watch.*</p>
<br/>
<p>
COBB:</p>
<b>Go.</b>
<br/>
<br/>
<b>Login to continue</b>
<br/>
    <form className="nameFormTwo" onSubmit={this.pushLoginUp}>
          <input id = "uniqueIDTwo" name = "mazeName" className="giveName" type="text" placeholder=" Username " style={{'display':this.props.loginDisplay}}></input>
          <button type="submit" style={{'display':this.props.loginDisplay}}> Login</button>
      </form>
      <form className="nameFormThree" onSubmit={this.pushSignUpUp}>
          <input id = "uniqueIDThree" name = "mazeName" className="giveName" type="text" placeholder=" Username " style={{'display':this.props.loginDisplay}}></input>
          <button type="submit" style={{'display':this.props.loginDisplay}}> Sign-Up</button>
      </form>
    <button className="welcomeButtons" type="submit" style={{'display':this.props.buttonDisplay}}><NavLink to={routes.INSTRUCTIONS} > Ruleset </NavLink></button>
 
</div>
          )
      }
    }
export default WelcomePage