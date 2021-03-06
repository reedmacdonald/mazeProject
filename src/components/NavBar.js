import React from 'react'
import { NavLink } from 'react-router-dom'

import * as routes from '../constants/routes'
import './NavBar.css'

const NavBar = ({currentUser}) =>
  <div className="navBar">
    <NavLink to={routes.INSTRUCTIONS} className="link" activeClassName="selected">RULE SET </NavLink>
    <NavLink to={routes.WELCOME} className="link" activeClassName="selected">LOGIN </NavLink>
    <NavLink to={routes.BEST} className="link" activeClassName="selected">POPULAR </NavLink>
    <NavLink to={routes.ALL} className="link" activeClassName="selected">ALL </NavLink>
    <NavLink to={routes.MAZES} className="link" activeClassName="selected">CREATE </NavLink>
    <NavLink to={routes.CONTACT} className="link" activeClassName="selected">CONTACT </NavLink>
    <NavLink to={routes.YOURS} className="link" activeClassName="selected">YOURS </NavLink>
    <NavLink to={routes.WAITINGROOM} className="link" activeClassName="selected">One v One </NavLink>
        
        
    
  </div>

export default NavBar