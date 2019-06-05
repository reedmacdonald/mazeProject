import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import * as routes from '../constants/routes';
let allMazes

class WaitingRoom extends Component{
    constructor(props){
        super(); 
        this.state = {
            bestMazes:[]
            
        }
    }
    
    
    getBestOf = async (e) => {
        const bestofResponse = await fetch('/maze/all')
        const parsedResponse = await bestofResponse.json();
        allMazes = parsedResponse.data
        function compare( a, b ) {
            if ( a.name < b.name ){
              return -1;
            }
            if ( a.name > b.name ){
              return 1;
            }
            return 0;
          }
          allMazes.sort(compare)
          let finalMaze=[]
          for(let i=0;i<allMazes.length;i++){
              if(allMazes[i].name != "" && allMazes[i].owner != ""){
            finalMaze[i]=allMazes[i]
        }
          }
        console.log(finalMaze)
        this.setState({
            bestMazes:finalMaze.map((element)=>
    
            <div><li><NavLink onClick={()=>{this.props.setOpponent(element.owner)}} to={`${routes.LOADING}`}> GameRoom </NavLink> </li><br/></div>)

        })
        return finalMaze
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