import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import * as routes from '../constants/routes';
let allMazes

class Yours extends Component{
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
              if((allMazes[i].owner == this.state.userName) && allMazes[i].name !=""){
            finalMaze[i]=allMazes[i]
        }
          }
        console.log(finalMaze)
        this.setState({
            bestMazes:finalMaze.map((element)=>
    
            <div><li><NavLink to={`${routes.TEST}/${element._id}`}> {element.name} </NavLink> successes: {element.successes} attempts: {element.attempts}</li><button onClick={        
                async ()=>{
                const loser = await fetch(`/maze/delete/${element._id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers:{
                    "Content-type" : 'application/json'
                }
            }
            )
            const parsedResponse = await loser.json();
            console.log(parsedResponse,'<----parsed Response')
            this.getBestOf()
        }}>Delete</button><br/></div>)

        })
        return finalMaze
    }
    componentDidMount(){
        
        console.log(this.props.userName)
        this.setState({
            userName:this.props.userName
        })
    }

    componentDidMount(){
        console.log(this.props.userName)
        this.setState({
            userName:this.props.userName
        })
        this.getBestOf()

    }
    render(){

        return(
            <div>
            <h1>Your Mazes</h1>
            <br/>
            <ol>
                {this.state.bestMazes}
            </ol>
            </div>
        )
    }
}

export default Yours