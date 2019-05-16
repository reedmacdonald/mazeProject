import React, {Component} from 'react';
import TimerOne from './TimerOne'
import { withRouter, Redirect } from 'react-router-dom'
import '../App.css';
import * as routes from '../constants/routes'


const arrayOne = new Array(6400).fill(0);

class Maze extends Component{
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
            userName:null
        }
        this.maze=[]
    }

    componentDidMount(){
        
        console.log(this.props.userName)
        this.setState({
            userName:this.props.userName
        })
        
    }

    timeUp = () => {
        alert('ok, so, it has been 3 minutes! How\'d you do? Now its time to test your maze to make sure it works!')
        this.changeButtons();
        this.setState({
            outTime:true
        })
    }
    changeToRed = () => {
        console.log(this.state.testing,'<------this.state.testing')
        this.setState({
            submitShowing:'inline',
            finishShowing: 'none',
            buttonClicked:'red',
            testing: true,
            clicked: false})
        }

    changeToBlack = ()=>{
        console.log(this.state.testing,'<------this.state.testing')
        this.setState({
            buttonClicked:'black'})
        }

    changeButtons = ()=>{
        console.log(this.state.testing,'<------this.state.testing')
        clearTimeout(this.timer);
        this.setState({
            buildShowing:'none',
            testShowing:'inline',
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
        }, () => {
            alert(`name is now ${this.state.name}`)
        })
        
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const thingToSend={
            name:this.state.name,
            maze:this.maze,
            userName:this.state.userName
        }
        const mazeResponse = await fetch('/maze', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(thingToSend),
            headers:{
                "Content-type" : 'application/json'
            }
        })
        const parsedResponse = await mazeResponse.json();
        console.log(parsedResponse)
        this.setState({
            youWon:true
        })
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

    if (this.state.hitWall) {
        return <Redirect to={routes.HITWALL}/>;
      }
      if (this.state.youWon) {
        return <Redirect to={routes.SUBMIT}/>;
      }
      
      if (this.state.outBounds) {
        return <Redirect to={routes.OUTBOUNDS}/>;
      }
      if (this.state.outTime) {
        return <Redirect to={routes.OUTTIME}/>;
      }

  
      
    const theMaze = arrayOne.map((movie, i) => {
        return (
            <Square hit = {this.hit} pushValueUp = {this.pushValueUp} scar={i} clicked = {this.state.clicked} key={i} name="brick" button={this.state.buttonClicked} color={this.state.colorToChangeMaze} className= 'cell'/>
          )
      })
      return (
          <div>
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
      <TimerOne test={this.state.testing}/>
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

export default Maze;