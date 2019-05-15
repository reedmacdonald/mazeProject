import React from 'react'
import { NavLink } from 'react-router-dom'

import * as routes from '../constants/routes'
import './NavBar.css'

const DumbNavBar = ({currentUser}) =>
  <div className="navBar">
      <NavLink to={routes.INSTRUCTIONS} className="link" activeClassName="selected">     </NavLink>

    
 

  </div>

export default DumbNavBar