import React, {Component} from 'react';
import '../App.css';
let testMaze

class Test extends Component{
    constructor(props){
        super(); 
        this.state = {

            maze:[],
            
            
        }
    }

    

    getMaze = async (e) => {
        const mazeResponse = await fetch('/maze/test')
        const parsedResponse = await mazeResponse.json();
        testMaze = parsedResponse.data.maze;
        console.log(testMaze)
        this.setState({
            maze:
            testMaze.map((element)=>{
            return <div><div className="cell" style={{'height':'5px','width':'5px','backgroundColor':element==1?'black':'white','margin':0}}></div></div>
        }
        )
    })

    }

    componentDidMount(){
        this.getMaze()
    }
    


        
  render(){

      return (
          <div>
        <div>Test</div>
        <div onMouseOver={(this.state.testing) ? this.outOfBounds:undefined} className="outOfBounds"></div>
        <div onMouseOver={(this.state.testing) ? this.outOfBounds:undefined} className="outOfBoundsTwo"></div>
        <div onMouseOver={(this.state.testing) ? this.outOfBounds:undefined} className="outOfBoundsThree"></div>
        <form onSubmit={this.handleSubmit}>
        <button type="button" onClick={this.changeButtons} className="finishMaze" style={{'display':this.state.finishShowing}}>Finish Maze</button>
        <button type="submit" className="finishMaze" style={{'display':this.state.submitShowing}}>Submit Maze</button>
        <div className="grid">
        {this.state.maze}
        </div>
        </form>

        <button className="startEndButton">Attempt Maze</button>
        </div>
        
  )}
}



export default Test;