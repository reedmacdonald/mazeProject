import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import * as routes from '../constants/routes';
let allMazes

class AllMazes extends Component{
    constructor(props){
        super(); 
        this.state = {
            bestMazes:[]
            
        }
    }
    
    
    getBestOf = async (e) => {
        const bestofResponse = await fetch('https://mazebackendreed.herokuapp.com/maze/all')
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
              if(allMazes[i].name != ""){
            finalMaze[i]=allMazes[i]
        }
          }
        console.log(finalMaze)
        this.setState({
            bestMazes:finalMaze.map((element)=>
    
            <div><li style={{  fontFamily: "Helvetica Neue, Arial, sans-serif",
            fontStyle: 'italic', listStyleType:'none'}}><b><NavLink to={`${routes.TEST}/${element._id}`}> {element.name} </NavLink> successes: {element.successes} attempts: {element.attempts}</b></li><br/></div>)

        })
        return finalMaze
    }

    componentDidMount(){
        this.getBestOf()
    }
    render(){

        return(
            <div className="divHolderTwo">
            <h1>All Mazes</h1>
            <br/>
            <ul>
                {this.state.bestMazes}
            </ul>
            </div>
        )
    }
}

export default AllMazes