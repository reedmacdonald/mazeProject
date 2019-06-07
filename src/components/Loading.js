import React, {Component} from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import '../App.css';
import Maze from './Maze';
import TimerTwo from './TimerTwo'
import * as routes from '../constants/routes'
import { NavLink } from 'react-router-dom';
import firebase from './Firebase'

let timer




class Loading extends Component{
    constructor(props) {
        super(props);
        this.state = {
            scar: this.props.scar,
          color: 'white',
          colorToChange:null,
          changeColor: false,
          clicked:this.props.clicked,
          accepted:false,
          theyLeft:false,
          full:false
        };
      }
      componentWillUnmount(){
          clearTimeout(timer)
      }
      componentDidMount(){
        const here = this
        const db = firebase.firestore();
        const me= this.props.user
        timer=setTimeout(()=>{
            var docRef = db.collection('room').doc(here.props.location);
            docRef.get().then(function(doc) {
                if (2>1) {
                docRef.update({                  
                'player1':'nobody is here',
                'player2':'nobody is here',
                'maze1':[0],
                'maze2':[0],
                'maze1done':'no',
                'maze2done':'no',
                'player1lost':false,
                'player2lost':false,
                'full':false})
                
            }
            }
            )
            console.log('heeeeeeeelllllllloooooooo from the first loading page')
            this.setState({theyLeft:true})
        },30000)
 
        //
        console.log(this,'<----this')
        console.log(here,'<----here')

        var docRef2 = db.collection('room').doc(here.props.location);
        docRef2.get().then(function(doc) {
            if (doc.data().full) {
            
            here.setState({full:true})}})

        console.log(here.props.location,'<---here.props.location')
        var docRef = db.collection('room').doc(here.props.location);
        docRef.get().then(function(doc) {
            if (doc.data().player1=='nobody is here') {
            docRef.update({'player1':me})
            here.setState({playerNumber:'One'})
        } else if (doc.data().player2=='nobody is here') {
            docRef.update({'player2':me,
                            'full':true})
            here.setState({playerNumber:'Two'})
        }
            else {
                console.log('all taken in this room')
                here.setState({full:true})
            }
        }
        )

        db.collection('room').doc(here.props.location)
            .onSnapshot(function(doc) {
                if (doc.data().player1 != 'nobody is here' && doc.data().player2 != 'nobody is here' ){
                    here.setState({accepted:true})
                }
                
                
                
                
                
                ;
                });
      }

      render(){

        if (this.state.accepted) {
            return <Redirect to={routes.GAMEROOM}/>;
          }
          if (this.state.theyLeft) {
              console.log('hes not coming')
            return <Redirect to={routes.NOBODYCOMING}/>;
          }
          if (this.state.full) {
            alert('this room is full')
          return <Redirect to={routes.WAITINGROOM}/>;
        }

          return(
<div className="divHolderTwo">

<h1>One on One</h1>
<br/>
<h3>Waiting for another player</h3>
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
<h3>Waiting for another player still</h3>
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