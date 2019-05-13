import React, { Component } from 'react';
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
            <li>Name: {element.name} id: {element._id} successes: {element.successes} attempts: {element.attempts}</li>)
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
            <ol>
                <li>{this.state.bestMazes}</li>
            </ol>
            </div>
        )
    }
}

export default TopMazes