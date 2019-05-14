import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import { NavLink } from 'react-router-dom';

const OutTime = () =>  
<div class="divHolderTwo">
<p>Out of Time</p>
<button className="welcomeButtons" type="submit"><NavLink to={routes.MAZES} > Make Mazes </NavLink></button>
    <button className="welcomeButtons" type="submit"><NavLink to={routes.BEST} > Test Mazes </NavLink></button>
</div>

export default OutTime