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
            bestMazes:[1,2,3,4].map((element, index)=>
    
            <div><li><NavLink onClick={()=>{this.props.sendLocation(`gameRoom${element}`)}} to={`${routes.LOADING}`}><b style={{color:'black',marginLeft:'0'}}> GameRoom {element}</b></NavLink> </li><button onClick={()=>{this.clearRoom(element)}}><b style={{marginLeft:'0'}}>clear room</b></button></div>)

        })
        
    }

    componentDidMount(){
        this.getBestOf()
    }
    render(){

        return(
            <div className="divHolderTwo">
            <h1>Waiting Room</h1>
            <p style={{width:'80%'}}>This is the one on one version of the game. You make a maze for someone else while they make a maze for you. When both players submit, they switch mazes. The person who can get through the other person's maze faster wins!</p>
            <br/>
            <br/>
            <p style={{width:'80%'}}>I am still testing this feature out, and while I like it, I would still <b style={{marginLeft:'0'}}>highly</b> recommend playing the version where you just test other people's mazes. That one has fewer bugs and is less susceptable to cheaters. But if you have two people and want to run some Maze Page this is a fine way of doing it, just tell them what room to meet in.</p>
            <br/>
            <ol>
                {this.state.bestMazes}
            </ol>
            </div>
        )
    }
}

export default WaitingRoom