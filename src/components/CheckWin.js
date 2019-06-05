import React, {Component} from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import '../App.css';
import Maze from './Maze';
import TimerTwo from './TimerTwo'
import * as routes from '../constants/routes'
import { NavLink } from 'react-router-dom';

import firebase from './Firebase'




class CheckWin extends Component{
    constructor(props) {
        super(props);
        this.state = {
            scar: this.props.scar,
          color: 'white',
          colorToChange:null,
          changeColor: false,
          clicked:this.props.clicked,
          player1Score:0,
          player2Score:0,
          player1Name:'idk',
          player2Name:'idk'
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

      componentWillUnmount(){
        const db = firebase.firestore();
        if(2>1){
        const userRef = db.collection('room').doc('wd8cJ5QOgRc8v5W0F4wd').update({
            'player1': 'nobody is here',
            'player2': 'nobody is here',
            'time1':0,
            'time2':0,
            'maze1':[0],
            'maze2':[0],
            'maze1done':'no',
            'maze2done':'no',
            'player1lose':false,
            'player2lose':false
          });}

          }
          

      render(){
        const db = firebase.firestore();
        const here = this


        var docRef = db.collection('room').doc('wd8cJ5QOgRc8v5W0F4wd');
        docRef.get().then(function(doc) {
            if (doc.data().player1==here.props.user){
                    here.setState({player1Score:doc.data().time1,
                        player2Score:doc.data().time2,
                    player1Name:doc.data().player1,
                player2Name:doc.data().player2});}
              else{
                here.setState({player2Score:doc.data().time2,
                    player1Score:doc.data().time1,
                    player1Name:doc.data().player1,
                    player2Name:doc.data().player2});

                }
              })
        /*db.collection('room').doc('wd8cJ5QOgRc8v5W0F4wd')
            .onSnapshot(function(doc) {
                
                    here.setState({accepted:true})*/
                
        
          return(
<div class="divHolderTwo">
<h1>{this.state.player1Name} time: {60-this.state.player1Score}</h1>
<h1>{this.state.player2Name} time: {60-this.state.player2Score}</h1>
{this.state.player1Score>this.state.player2Score?<h1>{this.state.player1Name} Wins!</h1>:<h1>{this.state.player2Name} Wins!</h1>}
<br/>
<br/>
 
</div>
          )
      }
    }
export default CheckWin