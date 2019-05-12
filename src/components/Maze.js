import React, {Component} from 'react';
import '../App.css';

class Maze extends Component{
    constructor(props){
        super(); 
        this.state = {
            buttonClicked:'',
            buildShowing: 'inline',
            testShowing: 'none',
            testing: false,
            clicked: true,
            finishShowing:'inline',
            submitShowing:'none',
            maze:[],
            name:''
            
        }
    }

    timeUp = () => {
        alert('ok, so, it has been 2 minutes! How\'d you do? Now its time to test your maze to make sure it works!')
        this.changeButtons();
    }
    changeToRed = () => {
        this.setState({
            submitShowing:'inline',
            finishShowing: 'none',
            buttonClicked:'red',
            testing: true})
        }
    timer = () => {
        setTimeout(this.timeUp,120000)
    }
    changeToBlack = ()=>{
        this.setState({
            buttonClicked:'black'})
        this.timer()
        }
    changeButtons = ()=>{
        clearTimeout(this.timer);
        this.setState({
            buildShowing:'none',
            testShowing:'inline',
        })
    }
    outOfBounds = () => {
        alert('you are out of bounds')
    }    
    changeToClicked = () => {
        this.setState({
            clicked:!this.state.clicked
        })
    }
    nameThisMaze = (e) => {
        e.preventDefault()
        var nameValue = document.getElementById("uniqueID").value
        this.setState({
            name: nameValue
        })
        alert(`name is now ${this.state.name}`)
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const mazeResponse = await fetch('/maze', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(this.state),
            headers:{
                "Content-type" : 'application/json'
            }
        })
        const parsedResponse = await mazeResponse.json();
        console.log(parsedResponse)
    }
    
    pushValueUp = (brick) => {
        this.state.maze.push(brick)
        this.setState({
            maze:this.state.maze
        })
    }


        
  render(){
      const arrayOne= new Array(6400).fill('hello')
      
    const theMaze = arrayOne.map((movie, i) => {
        return (
            <Square pushValueUp = {this.pushValueUp} scar={i} clicked = {this.state.clicked} key={i} name="brick" button={this.state.buttonClicked} color={this.state.colorToChangeMaze} className= 'cell'/>
          )
      })
      return (
      <div onDoubleClick={this.changeToClicked}> 
        <div onMouseOver={(this.state.testing) ? this.outOfBounds:undefined} className="outOfBounds"></div>
        <div onMouseOver={(this.state.testing) ? this.outOfBounds:undefined} className="outOfBoundsTwo"></div>
        <div onMouseOver={(this.state.testing) ? this.outOfBounds:undefined} className="outOfBoundsThree"></div>
        <form onSubmit={this.handleSubmit}>
        <button type="button" onClick={this.changeButtons} className="finishMaze" style={{'display':this.state.finishShowing}}>Finish Maze</button>
        <button type="submit" className="finishMaze" style={{'display':this.state.submitShowing}}>Submit Maze</button>
      
      <div className="grid">  
        {theMaze}
      </div>
      </form>

      <button className="startEndButton" onClick={this.changeToRed} style={{'display':this.state.testShowing}}>Test Maze</button>
      <button className="startEndButton" onClick={this.changeToBlack} style={{'display':this.state.buildShowing}}>Build Maze</button>
      
      <form className="nameForm" onSubmit={this.nameThisMaze}>
          <input id = "uniqueID" name = "mazeName" className="giveName" type="text" placeholder=" Name of Your maze"></input>
          <button type="submit"> Give name</button>
      </form>
      </div>
  )}
}

class Square extends Component{
    constructor(props) {
        super(props);
        this.state = {
            scar: this.props.scar,
          color: 'white',
          colorToChange:null,
          changeColor: false,
          clicked:this.props.clicked
        };
      }
    
    hitWall = () => {
        alert('you hit a wall')
    }
    fuckThis = () =>{
        this.props.pushValueUp(this.state.scar)
    }
    switchColor =()=>{
        (this.state.colorToChange==='black' && this.props.button=== 'red')&& this.hitWall()
        this.fuckThis()
        this.setState({
            changeColor:true,
            colorToChange:this.props.button})
}
    render(){
        return(
            <div className="boxes" onMouseOver = {this.switchColor} style={{'height':'5px','width':'5px','backgroundColor':this.state.changeColor ? this.state.colorToChange : this.state.color,'margin':'0'}}>
            </div>
        )
    }
}

export default Maze;