import React, {Component} from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import '../App.css';
import Maze from './Maze';
import TimerTwo from './TimerTwo'
import * as routes from '../constants/routes'
import { NavLink } from 'react-router-dom';
import firebase from './Firebase'




class Loading extends Component{
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
          const here = this
        const db = firebase.firestore();
        const me= this.props.user

        var docRef = db.collection('room').doc('wd8cJ5QOgRc8v5W0F4wd');
        docRef.get().then(function(doc) {
            if (doc.data().player1=='nobody is here') {
            docRef.update({'player1':me})
            here.setState({playerNumber:'One'})
        } else if (doc.data().player2=='nobody is here') {
            docRef.update({'player2':me})
            here.setState({playerNumber:'Two'})
        }
        }
        )

        db.collection('room').doc('wd8cJ5QOgRc8v5W0F4wd')
            .onSnapshot(function(doc) {
                if (doc.data().player1 != 'nobody is here' && doc.data().player2 != 'nobody is here'){
                    here.setState({accepted:true})
                }
                
                
                
                
                
                ;
                });
      }

      render(){
        if (this.state.accepted) {
            return <Redirect to={routes.GAMEROOM}/>;
          }
          return(
<div className="divHolderTwo">

<h1>One on One</h1>
<br/>
<h3>Waiting for {this.props.opponent} to accept challenge</h3>
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
export default Loading