import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'


import NavBar from './components/NavBar'
import Login from './components/Login'
import ShowUser from './components/ShowUser'
import WelcomePage from './components/welcomePage'
import TopMazes from './components/bestOf'
import Test from './components/Test'
import YouWon from './components/YouWon'
import OutBounds from './components/OutBounds'
import OutTime from './components/OutTime'
import HitWall from './components/HitWall'
import AllMazes from './components/AllMazes'
import Yours from './components/Yours'
import Instructions from './components/Instructions'
import Submit from './components/Submit'
import Pokemon from './components/Pokemon'
import DumbNavBar from './components/DumbNavBar'
import Contact from './components/Contact'
import firebase from './components/Firebase'



import * as routes from './constants/routes'
import './App.css';
import Maze from './components/Maze';

class App extends Component {
  state = {
    currentUser: null,
    loginDisplay: 'inline',
    buttonDisplay: 'none',
  }

  login = (userName) => {
    
    this.setState({
      currentUser:userName,
      loginDisplay:'none',
      buttonDisplay: 'inline'
    })
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    const userRef = db.collection('users').add({
      username: 'Hello, Firebase!',
      
    }); 
  }

  signUp = (userName) => {
    this.setState({
      currentUser:userName,
      loginDisplay:'none',
      buttonDisplay: 'inline'
    })
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="greatBackground">
      <img style={{marginLeft:'25%',marginRight:'25%',float:''}} src="https://fontmeme.com/permalink/190604/b8dbec12cddbb4f54e36db974df1e811.png" alt="mr-robot-tv-show-font" border="0"/>
      
        <NavBar currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path={routes.WELCOME} render={() => <WelcomePage buttonDisplay={this.state.buttonDisplay} login={this.login} signUp={this.signUp} loginDisplay={this.state.loginDisplay}/>} />
          <Route exact path={routes.BEST} render={() => <TopMazes/>} />
          <Route exact path={routes.MAZES} render={() => <Maze userName={this.state.currentUser}/>} />
          <Route exact path={routes.WELCOME} render={() => <WelcomePage buttonDisplay={this.state.buttonDisplay} login={this.login} signUp={this.signUp} loginDisplay={this.state.loginDisplay}/>} />
          <Route exact path={`${routes.USERS}/:id`} render={() => <ShowUser />} />
          <Route exact path={routes.LOGIN} render={() => <Login currentUser={this.state.currentUser} doSetCurrentUser={this.doSetCurrentUser}/>} />
          <Route exact path={`${routes.TEST}/:testId`} render={() => <Test userName={this.state.currentUser}/>} />
          <Route exact path={routes.YOUWON} render={() => <YouWon/>} />
          <Route exact path={routes.OUTBOUNDS} render={() => <OutBounds/>} />
          <Route exact path={routes.OUTTIME} render={() => <OutTime/>} />
          <Route exact path={routes.HITWALL} render={() => <HitWall/>} />
          <Route exact path={routes.ALL} render={() => <AllMazes/>} />
          <Route exact path={routes.SUBMIT} render={() => <Submit/>} />
          <Route exact path={routes.INSTRUCTIONS} render={() => <Instructions/>} />
          <Route exact path={routes.POKEMON} render={() => <Pokemon/>} />
          <Route exact path={routes.CONTACT} render={() => <Contact/>} />
          <Route exact path={routes.YOURS} render={() => <Yours userName={this.state.currentUser}/>} />
          <Route render={() => <WelcomePage buttonDisplay={this.state.buttonDisplay} login={this.login} signUp={this.signUp} loginDisplay={this.state.loginDisplay}/>} />
        </Switch>
        
      </div>
      
    );
  }
}



export default App;


