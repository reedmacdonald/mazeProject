import React from 'react'
import { NavLink } from 'react-router-dom'

import * as routes from '../constants/routes'
import './NavBar.css'

const NavBar = ({currentUser}) =>
  <div>
    <h5>NAVBAR</h5>
    <NavLink to={routes.BEST} activeClassName="selected">BEST </NavLink>
    <NavLink to={routes.MAZES} activeClassName="selected">CREATE </NavLink>
    <NavLink to={routes.WELCOME} activeClassName="selected">WELCOME </NavLink>
    {
      currentUser
        ? <span>hello {currentUser}</span>
        :  <NavLink to={'/login'} activeClassName="selected">LOGIN </NavLink>
    }
  </div>

export default NavBar