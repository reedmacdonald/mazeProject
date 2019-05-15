import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import { NavLink } from 'react-router-dom';



class Pokemon extends Component {
    state = {
      crimes: [],
      loading:true,
      type:''
    }
  
    componentDidMount(){
      this.getCrimes().then(data=>
        this.setState({crimes:data}))
    }
  
    deleteItems = i =>
      this.setState({
        crimes: this.state.crimes.filter((crime,index)=>
        index !== i)
      })
  
    getCrimes = async () => {
      try{
        const crimes = await fetch('https://data.cityofchicago.org/resource/crimes.json');
        if (!crimes.ok) {
           throw Error(crimes.response.statusText);
        }
       const crimesJson = await crimes.json();
       console.log(crimesJson[0].primary_type)
       this.setState({
           type:crimesJson[10].primary_type
       })
       return crimesJson;
       this.setState({crimes: crimesJson,});
       console.log(crimesJson)
       console.log(this.state.crimes)
  
      } catch(err){
        console.log(err, 'err in the catch box')
        return err
      }
    }
  
    render(){
    return (
      <div className="divHolder">
      <h1>The Last Crime in Chicago v</h1>
      <h2>{this.state.type}</h2>

      </div>
    );
    }
  }


    export default Pokemon;
      

