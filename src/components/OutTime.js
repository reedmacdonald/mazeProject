import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import { NavLink } from 'react-router-dom';

const OutTime = () =>  
<div class="divHolderTwo">
<h1>It looks like you ran out of time</h1>
<p>Cobb: Now, before you bother telling me it's impossible...</p>
<br/>
<br/>


<p>Eames: No, it's perfectly possible. <b>It's just bloody difficult.</b></p>
<br/>
<br/>
<br/>
<button className="welcomeButtons" type="submit"><NavLink to={routes.MAZES} > Make Mazes </NavLink></button>
    <button className="welcomeButtons" type="submit"><NavLink to={routes.BEST} > Test Mazes </NavLink></button>
</div>

export default OutTime