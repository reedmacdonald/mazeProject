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
        const mazeResponse = await fetch(`/maze/test/5cdd9617ef33ce47046561ab`)
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
    })

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
        return <Redirect to={routes.CHECKWIN}/>;
      }



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
        <TimerTwo bringUpTime={this.bringUpTime} finished={this.state.finished}/>
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