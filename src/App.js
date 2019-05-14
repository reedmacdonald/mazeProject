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
  }

  signUp = (userName) => {
    //Create user and whatnot
    
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
        <NavBar currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path={routes.BEST} render={() => <TopMazes/>} />
          <Route exact path={routes.MAZES} render={() => <Maze userName={this.state.currentUser}/>} />
          <Route exact path={routes.WELCOME} render={() => <WelcomePage buttonDisplay={this.state.buttonDisplay} login={this.login} signUp={this.signUp} loginDisplay={this.state.loginDisplay}/>} />
          <Route exact path={`${routes.USERS}/:id`} render={() => <ShowUser />} />
          <Route exact path={routes.LOGIN} render={() => <Login currentUser={this.state.currentUser} doSetCurrentUser={this.doSetCurrentUser}/>} />
          <Route exact path={`${routes.TEST}/:testId`} render={() => <Test userName={this.state.currentUser}/>} />
          
          <Route exact path={routes.TEST} render={() => <Test/>} />
          <Route exact path={routes.YOUWON} render={() => <YouWon/>} />
          <Route exact path={routes.OUTBOUNDS} render={() => <OutBounds/>} />
          <Route exact path={routes.OUTTIME} render={() => <OutTime/>} />
          <Route exact path={routes.HITWALL} render={() => <HitWall/>} />
          <Route render={() => <div>NOT FOUND</div>} />
        </Switch>
      </div>
    );
  }
}



export default App;


