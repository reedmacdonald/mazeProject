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
                  'full':false

              
              
              
              })
                
            }
            }
            )
            this.setState({theyLeft:true})
            console.log('heeeeeeelllllllllooooooo from LOADING PAGE 3')
        },60000)



        db.collection('room').doc(here.props.location)
            .onSnapshot(function(doc) {
                if (doc.data().time1 != 0 && doc.data().time2 != 0){
                    here.setState({accepted:true})
                }
                
                
                
                
                
                
                });
      }

      render(){
        if (this.state.accepted) {
            return <Redirect to={routes.CHECKWIN}/>;
          }
          if (this.state.theyLeft) {
            console.log('hes not coming')
          return <Redirect to={routes.HELEFT}/>;
        }
          return(
<div className="divHolderTwo">

<h1>Waiting for the other person to finish</h1>
<br/>
<h3>This probably means you won but you never really know I guess</h3>
<ul className="instructionList">

    <li>.</li>
</ul>
<br/>
<h3>Waiting for them still</h3>
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