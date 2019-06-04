import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import { NavLink } from 'react-router-dom';

const CheckWin = () =>  
<div class="divHolderTwo">
<h1>Did you win</h1>
<br/>

<h4>You finished your opponents maze in FIREBASE</h4>
<br/>
<br/>
<br/>
<br/>
<br/>
<p>You finished your maze in FIREBase</p>
<br/>
<br/>


<p>Eames: No, it's perfectly possible. <b>It's just bloody difficult.</b></p>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<button className="welcomeButtons" type="submit"><NavLink to={routes.MAZES} > Make Mazes </NavLink></button>
    <button className="welcomeButtons" type="submit"><NavLink to={routes.BEST} > Test Mazes </NavLink></button>
</div>

export default CheckWin