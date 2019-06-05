import React, {Component} from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import '../App.css';
import Maze from './Maze';
import TimerTwo from './TimerTwo'
import * as routes from '../constants/routes'
import firebase from './Firebase'


let testMaze;
let testName



class Test extends Component{
    constructor(props){
        super(); 
        this.state = {
            testing:false,
            hitWall:false,
            outTime:false,
            outBounds:false,
            youWon:false,
            finished:false,
            endTime:null,
            dunzo:false

        }
    }

    bringUpTime = (time) => {
        this.setState({endTime:time,
        finished:false})
    }

    

    getMaze = async (e) => {
        const db = firebase.firestore();
        const here = this

        var docRef = db.collection('room').doc('wd8cJ5QOgRc8v5W0F4wd');
        docRef.get().then(function(doc) {
            if (doc.data().player1==here.props.user){
                let newMaze = doc.data().maze2;
                const bigArray = new Array(6400).fill(0)
                for (let i=0;i<newMaze.length;i++){
                  bigArray[newMaze[i]]=1;
              
                }
                here.setState({
                    name:'idc about this',
                    maze:
                    bigArray.map((element)=>{
                    return <div><Square hit ={here.hit} testing={here.state.testing} className="cell" color={element=="1"?'black':null} style={{'height':'5px','width':'5px','backgroundColor':element==1?'black':'white','margin':0}}></Square></div>
                }
                )
            })
}
              else{
                  let newMaze = doc.data().maze1;
                  const bigArray = new Array(6400).fill(0)
                  for (let i=0;i<newMaze.length;i++){
                    bigArray[newMaze[i]]=1;
                
                  }
                  here.setState({
                      name:'idc about this',
                      maze:
                      bigArray.map((element)=>{
                      return <div><Square hit ={here.hit} testing={here.state.testing} className="cell" color={element=="1"?'black':null} style={{'height':'5px','width':'5px','backgroundColor':element==1?'black':'white','margin':0}}></Square></div>
                  }
                  )
              })
                
                }
              })






        /*const mazeResponse = await fetch(`/maze/test/5cdd9617ef33ce47046561ab`)
        const parsedResponse = await mazeResponse.json();
        testMaze = parsedResponse.data.maze;
        testName = parsedResponse.data.name
        this.setState({
            name:testName,
            maze:
            testMaze.map((element)=>{
            return <div><Square hit ={this.hit} testing={this.state.testing} className="cell" color={element=="1"?'black':null} style={{'height':'5px','width':'5px','backgroundColor':element==1?'black':'white','margin':0}}></Square></div>
        }
        )
    })*/

    }

    youLost = async () => {
        const loser = await fetch(`/maze/test/loser/${this.props.match.params.testId}`, {
            method: 'PUT',
            credentials: 'include',
            headers:{
                "Content-type" : 'application/json'
            }
        })
        const parsedResponse = await loser.json();
        console.log(parsedResponse)
    }

    outOfBounds = async () =>{
        const loser = await fetch(`/maze/test/loser/${this.props.match.params.testId}`, {
            method: 'PUT',
            credentials: 'include',
            headers:{
                "Content-type" : 'application/json'
            }
        })
        const parsedResponse = await loser.json();
        console.log(parsedResponse)
        this.setState({
            outBounds:true
        })
    }

    componentDidMount(){
        this.getMaze()
    }


    attemptMaze = (e) => {
        e.preventDefault()
        this.setState({
            testing:true
        })
        this.getMaze()
    }

    hit = async () => {
        const loser = await fetch(`/maze/test/loser/${this.props.match.params.testId}`, {
            method: 'PUT',
            credentials: 'include',
            headers:{
                "Content-type" : 'application/json'
            }
        })
        const parsedResponse = await loser.json();
        this.setState({
            hitWall:true
        })
    }

    submitMaze = async (e) => {
        e.preventDefault();

        this.setState({
            finished:true
        })
        

        setTimeout(()=>(this.setState({
            dunzo:true
        })),500)

        
    }

    /*componentWillUnmount(){
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
            'maze2done':'no'
          });}

          }*/

    didntStart = (e) => {
        e.preventDefault();
    }
    

  render(){
    if (this.state.hitWall) {
        return <Redirect to={routes.HITWALL}/>;
      }
      if (this.state.youWon) {
        return <Redirect to={routes.YOUWON}/>;
      }
      
      if (this.state.outBounds) {
        return <Redirect to={routes.OUTBOUNDS}/>;
      }
      if (this.state.outTime) {
        return <Redirect to={routes.OUTTIME}/>;
      }
      if (this.state.dunzo) {
        return <Redirect to={routes.LOADINGTHREE}/>;
      }
      const db = firebase.firestore();
      db.collection('room').doc('wd8cJ5QOgRc8v5W0F4wd')
      .onSnapshot(function(doc) {
          console.log("Current data battle room: ", doc.data());
          });



      return (
          <>
        <h1>This is the maze from {this.props.opponent}</h1>
          <div className="holderDiv">
          
        <div onMouseOver={(this.state.testing) ? this.outOfBounds:undefined} className="outOfBounds"></div>
        <div onMouseOver={(this.state.testing) ? this.outOfBounds:undefined} className="outOfBoundsTwo"></div>
        <div onMouseOver={(this.state.testing) ? this.outOfBounds:undefined} className="outOfBoundsThree"></div>
        <form onSubmit={this.state.testing?this.handleSubmit:undefined}>
        <button onClick = {this.state.testing?this.submitMaze:this.didntStart} type="submit" className="finishMaze" style={{'display':this.state.submitShowing}}>Submit Maze</button>
        <div className="grid">
        {this.state.maze}
        </div>
        <button type="submit" onClick={this.attemptMaze} className="startEndButton" style = {{'fontSize':'30px'}}>Attempt Maze</button>
        </form>
        <h1 className="displayName">{this.state.name}</h1>
        <TimerTwo user={this.props.user} bringUpTime={this.bringUpTime} finished={this.state.finished}/>
        </div>
        </>
        
  )}
}

class Square extends Component{
    constructor(props) {
        super(props);
        this.state = {
            scar: this.props.scar,
          color: this.props.color,
          colorToChange:null,
          changeColor: false,
          clicked:this.props.clicked,
        };
      }
    
    hitWall = async () => {
        this.props.hit()
    }

    switchColor = ()=>{
        
        this.state.color=='black' && this.hitWall()
        this.setState({
            color:'red'
        })
    }

    render(){
        return(
            <div className="boxes" onMouseOver = {this.props.testing?this.switchColor:undefined} style={{'height':'5px','width':'5px','backgroundColor':this.state.color,'margin':'0'}}>
            </div>
        )
    }
}



export default withRouter(Test)