import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import * as routes from '../constants/routes';
let allMazes

class TopMazes extends Component{
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
        console.log(allMazes)
        this.setState({
            bestMazes:allMazes.map((element)=>
    
            <div><li>Name: <NavLink to={`${routes.TEST}/${element._id}`}> {element.name} </NavLink> successes: {element.successes} attempts: {element.attempts}</li><br/></div>)

        })
        return allMazes
    }

    componentDidMount(){
        this.getBestOf()
    }
    render(){

        return(
            <div>
            <h1>Top Mazes</h1>
            <br/>
            <ol>
                {this.state.bestMazes}
            </ol>
            </div>
        )
    }
}

export default TopMazes