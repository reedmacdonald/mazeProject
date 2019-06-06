import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import * as routes from '../constants/routes';
import firebase from './Firebase'
let allMazes

class WaitingRoom extends Component{
    constructor(props){
        super(); 
        this.state = {
            bestMazes:[]
            
        }
    }
    clearRoom=(element)=>{
        console.log(element)
        const db = firebase.firestore();
        const here = this


        
        
        var docRef = db.collection('room').doc(`gameRoom${element}`);
        docRef.get().then(function(doc) {

              db.collection('room').doc(`gameRoom${element}`).update({
                'player1':'nobody is here',
                'player2':'nobody is here',
                'maze1':[0],
                'maze2':[0],
                'maze1done':'no',
                'maze2done':'no',
                'player1lost':false,
                'player2lost':false,
                'full':false 
              });

              })
    }
    
    
    getBestOf = async (e) => {

 
        
        this.setState({
            bestMazes:[1,2].map((element, index)=>
    
            <div><li><NavLink onClick={()=>{this.props.sendLocation(`gameRoom${element}`)}} to={`${routes.LOADING}`}> GameRoom {element}</NavLink> </li><br/><button onClick={()=>{this.clearRoom(element)}}>clear room</button></div>)

        })
        
    }

    componentDidMount(){
        this.getBestOf()
    }
    render(){

        return(
            <div>
            <h1>Waiting Room</h1>
            <br/>
            <ol>
                {this.state.bestMazes}
            </ol>
            </div>
        )
    }
}

export default WaitingRoom