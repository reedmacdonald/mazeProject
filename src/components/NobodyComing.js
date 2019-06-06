import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import { NavLink } from 'react-router-dom';




const NobodyComing = () =>  
<div class="divHolderTwo">
<h1>Well, it looks like nobody is coming</h1>
<br/>

<h4>We dont want to waste your time so we cleared the romm</h4>
<br/>
<br/>
<br/>
<br/>
<br/>
<p>Bummer, that would have been fun</p>
<br/>
<br/>


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

export default NobodyComing