import React, {Component} from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import '../App.css';
import Maze from './Maze';
import TimerTwo from './TimerTwo'
import * as routes from '../constants/routes'
import { NavLink } from 'react-router-dom';
import firebase from './Firebase'




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
        const here = this
        const db = firebase.firestore();
        const me= this.props.user



        db.collection('room').doc('wd8cJ5QOgRc8v5W0F4wd')
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