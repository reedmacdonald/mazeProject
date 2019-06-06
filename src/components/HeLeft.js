import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import { NavLink } from 'react-router-dom';




const HeLeft = () =>  
<div class="divHolderTwo">
<h1>Well, it looks like the other person left</h1>
<br/>

<h4>Sorry, thats annoying</h4>
<br/>
<br/>
<br/>
<br/>
<br/>
<p>You would've beaten him anyway, his maze was super weak</p>
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

export default HeLeft