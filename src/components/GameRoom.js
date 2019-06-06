import React, {Component} from 'react';
import TimerOne from './TimerOne'
import { withRouter, Redirect } from 'react-router-dom'
import '../App.css';
import * as routes from '../constants/routes'
import firebase from './Firebase'


const arrayOne = new Array(6400).fill(0);

class GameRoom extends Component{
    constructor(props){
        super(); 
        this.state = {
            buttonClicked:'',
            buildShowing: 'inline',
            testShowing: 'none',
            testing: false,
            clicked: false,
            finishShowing:'inline',
            submitShowing:'none',
            name:'',
            hitWall:false,
            outTime:false,
            outBounds:false,
            youWon:false,
            userName:null,
            youSubmitted:false,
            playerNumber:null,
            opponent:'some Rando'
        }
        this.maze=[]
    }

    /*componentWillUnmount(){
        const db = firebase.firestore();
        if(this.state.playerNumber=='One'){
        const userRef = db.collection('room').doc(here.props.location).update({
            'player1': 'Nobody is here',
               
          });}
          else{
            const userRef = db.collection('room').doc(here.props.location).update({
                'player2': 'Nobody is here'    
              });}
          }*/
    

    componentDidMount(){
        console.log(this.props.user,'<-----this.props.user')
        const me= this.props.user
        console.log(me,'<---me') 
        const db = firebase.firestore();
        const here = this
        var docRef = db.collection('room').doc(here.props.location);
        docRef.get().then(function(doc) {
            if (doc.data().player1==me) {
            
            here.setState({opponent:doc.data().player2})
        } else {
            
            here.setState({opponent:doc.data().player1})
        }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });  
        db.collection('room').doc(here.props.location)
            .onSnapshot(function(doc) {
                console.log("Current data game room: ", doc.data());
                });
    }

    timeUp = () => {
        alert('ok, so, it has been 3 minutes! How\'d you do? Now its time to test your maze to make sure it works!')
        this.changeButtons();
        this.setState({
            outTime:true
        })
    }
    changeToRed = () => {
        this.setState({
            submitShowing:'inline',
            finishShowing: 'none',
            buttonClicked:'red',
            testing: true,
            clicked: false})
        }

    changeToBlack = ()=>{

        this.setState({
            buttonClicked:'black'})
        }

    changeButtons = ()=>{
  
        clearTimeout(this.timer);
        this.setState({
            buildShowing:'none',
            testShowing:'inline',
            buttonClicked:''
        })
    }
    outOfBounds = () => {
        this.setState({
            outBounds:true
        })
    }    
    changeToClicked = () => {

        if(this.state.buttonClicked=='black'){
            this.setState({
                buttonClicked:'',
                clicked:true
            })}
        else if(this.state.buttonClicked=='' && !this.state.testing){
            this.setState({
                buttonClicked:'black',
                clicked:false
            })
        }
        }
    
    nameThisMaze = (e) => {
        e.preventDefault()
        var nameValue = document.getElementById("uniqueID").value
        this.setState({
            name: nameValue
        })
        
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const db = firebase.firestore();
        const here = this

        this.setState({
            youSubmitted:true
        })
        let playaOne
        
        
        var docRef = db.collection('room').doc(here.props.location);
        docRef.get().then(function(doc) {
            if (doc.data().player1==here.props.user){
              db.collection('room').doc(here.props.location).update({
                'maze1': here.maze,
                'maze1done':'yes'  
              });}
              else{
                db.collection('room').doc(here.props.location).update({
                    'maze2': here.maze,
                    'maze2done':'yes'   
                  });
                }
              })
        
        /*const userRef = db.collection('room').doc(here.props.location).update({
            'maze1': this.maze,
            'maze1done':'yes'
               
          });}
          else{
            const userRef = db.collection('room').doc(here.props.location).update({
                'maze2': this.maze,
                'maze2done':'yes' 
              });}*/
    }

    hit = async () => {
        this.setState({
            hitWall:true
        })
    }
    
    pushValueUp = (brick) => {
        
            if(this.state.testing == false && this.state.buttonClicked == 'black'){
                 this.maze.push(brick)
            }
        }
    


        
  render(){
      if (this.state.youSubmitted){
        return <Redirect to={routes.LOADINGTWO}/>;
      }

      if (this.state.hitWall) {
        const db = firebase.firestore();
        const here = this


        var docRef = db.collection('room').doc(here.props.location);
        docRef.get().then(function(doc) {
            if (doc.data().player1==here.props.user){
                db.collection('room').doc(here.props.location).update({
                    'player1lost':true
                })
            }
              else{
                db.collection('room').doc(here.props.location).update({
                    'player2lost':true
                })
                }
              })
        
      }
      if (this.state.youWon) {
        return <Redirect to={routes.SUBMIT}/>;
      }
      
      if (this.state.outBounds) {
        const db = firebase.firestore();
        const here = this


        var docRef = db.collection('room').doc(here.props.location);
        docRef.get().then(function(doc) {
            if (doc.data().player1==here.props.user){
                db.collection('room').doc(here.props.location).update({
                    'player1lost':true
                })
            }
              else{
                db.collection('room').doc(here.props.location).update({
                    'player2lost':true
                })
                }
              })
        //return <Redirect to={routes.OUTBOUNDS}/>;
      }
      if (this.state.outTime) {
        const db = firebase.firestore();
        const here = this
        var docRef = db.collection('room').doc(here.props.location);
        docRef.get().then(function(doc) {
            if (doc.data().player1==here.props.user){
                db.collection('room').doc(here.props.location).update({
                    'player1lost':true
                })
            }
              else{
                db.collection('room').doc(here.props.location).update({
                    'player2lost':true
                })
                }
              })
        //return <Redirect to={routes.OUTTIME}/>;
      }

  
      
    const theMaze = arrayOne.map((movie, i) => {
        return (
            <Square hit = {this.hit} pushValueUp = {this.pushValueUp} scar={i} clicked = {this.state.clicked} key={i} name="brick" button={this.state.buttonClicked} color={this.state.colorToChangeMaze} className= 'cell'/>
          )
      })
      return (
          <div>
              <h1 style={{marginLeft:'30%'}}>You are making a maze for {this.state.opponent}</h1>
      <div className="holderDiv" onDoubleClick={this.changeToClicked}> 
        <div onMouseOver={(this.state.testing) ? this.outOfBounds:undefined} className="outOfBounds"></div>
        <div onMouseOver={(this.state.testing) ? this.outOfBounds:undefined} className="outOfBoundsTwo"></div>
        <div onMouseOver={(this.state.testing) ? this.outOfBounds:undefined} className="outOfBoundsThree"></div>
        <form onSubmit={this.handleSubmit}>
        <button type="button" onClick={this.changeButtons} className="finishMaze" style={{'display':this.state.finishShowing}}>Finish Maze</button>
        <button onClick={this.handleSubmit} type="submit" className="finishMaze" style={{'display':this.state.submitShowing}}>Submit Maze</button>
      
      <div className="grid">  
        {theMaze}
      </div>
      </form>

      <button className="startEndButton" onClick={this.changeToRed} style={{'display':this.state.testShowing,'fontSize':'30px'}}>Test Maze</button>
      <button className="startEndButton" onClick={this.changeToBlack} style={{'display':this.state.buildShowing,'fontSize':'30px'}}>Build Maze</button>
      
      <form className="nameForm" onSubmit={this.nameThisMaze}>
          <input id = "uniqueID" name = "mazeName" className="giveName" type="text" placeholder=" Name of Your maze"></input>
          <button type="submit"> Give name</button>
      </form>
      <TimerOne test={this.state.testShowing}/>
      </div>
      </div>
  )}
}

class Square extends Component{
    constructor(props) {
        super(props);
        this.state = {
          scar: this.props.scar,
          color: null,
          colorToChange:null,
          changeColor: false,
        };
      }
    

    hitWall = async () => {
    this.props.hit()
    }
    

    darnThis = () =>{
        this.props.pushValueUp(this.props.scar)
    }

    switchColor =()=>{
        (this.state.colorToChange==='black' && this.props.button=== 'red')&& this.hitWall()
        this.darnThis()
        this.setState({
            changeColor:true,
            colorToChange:this.props.button})
    }


    render(){
        return(
            <div className="boxes" onMouseOver={this.props.clicked==false?this.switchColor:undefined} style={{'height':'5px','width':'5px','backgroundColor':this.state.changeColor ? this.state.colorToChange : this.state.color,'margin':'0'}}>
            </div>
        )
    }
}

export default GameRoom;