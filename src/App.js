import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { AnimatedSwitch } from 'react-router-transition';

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
    //Create user
    
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
        <AnimatedSwitch
      atEnter={{ opacity: 0, marginLeft:600 }}
      atLeave={{ opacity: 0, marginLeft:600 }}
      atActive={{ opacity: 1, marginLeft:0}}
      className="switch-wrapper"
    >
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
          <Route exact path={routes.YOURS} render={() => <Yours userName={this.state.currentUser}/>} />
          <Route render={() => <div>NOT FOUND</div>} />
          </AnimatedSwitch>
        </Switch>
      </div>
    );
  }
}



export default App;


