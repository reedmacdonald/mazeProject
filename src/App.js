import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import NavBar from './components/NavBar'
import Login from './components/Login'
import ShowUser from './components/ShowUser'
import WelcomePage from './components/welcomePage'
import TopMazes from './components/bestOf'
import Test from './components/Test'


import * as routes from './constants/routes'
import './App.css';
import Maze from './components/Maze';

class App extends Component {
  state = {
    currentUser: null
  }

  doSetCurrentUser = user =>
    this.setState({
      currentUser: user
    })

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <NavBar currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path={routes.BEST} render={() => <TopMazes/>} />
          <Route exact path={routes.MAZES} render={() => <Maze/>} />
          <Route exact path={routes.WELCOME} render={() => <WelcomePage/>} />
          <Route exact path={`${routes.USERS}/:id`} render={() => <ShowUser />} />
          <Route exact path={routes.LOGIN} render={() => <Login currentUser={this.state.currentUser} doSetCurrentUser={this.doSetCurrentUser}/>} />
          <Route exact path={`${routes.TEST}/:testId`} render={() => <Test/>} />
          <Route render={() => <div>NOT FOUND</div>} />
          <Route exact path={routes.TEST} render={() => <Test/>} />
        </Switch>
      </div>
    );
  }
}



export default App;


