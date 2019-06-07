import React, {Component} from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import '../App.css';
import Maze from './Maze';
import TimerTwo from './TimerTwo'
import * as routes from '../constants/routes'
import { NavLink } from 'react-router-dom';
import firebase from './Firebase'

let timer




class LoadingTwo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            scar: this.props.scar,
          color: 'white',
          colorToChange:null,
          changeColor: false,
          clicked:this.props.clicked,
          accepted:false,
          theyLeft:false
        };
      }
      componentWillUnmount(){
        clearTimeout(timer)
      }
      componentDidMount(){
        const here = this
        const db = firebase.firestore();
        
        const me= this.props.user
        timer = setTimeout(()=>{
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
            console.log('heeeeeellllllloooooo from the second loading page')
            this.setState({theyLeft:true})
        },60000)



        db.collection('room').doc(here.props.location)
            .onSnapshot(function(doc) {
                if (doc.data().maze1done =='yes' && doc.data().maze2done == 'yes'){
                    here.setState({accepted:true})
                }
                
                
                
                
                
                
                });
      }

      render(){
        if (this.state.accepted) {
            return <Redirect to={routes.BATTLEROOM}/>;
          }
          if (this.state.theyLeft) {
            console.log('hes not coming')
          return <Redirect to={routes.HELEFT}/>;
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