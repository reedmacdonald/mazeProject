import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import { NavLink } from 'react-router-dom';




const WelcomePage = () =>  
<div>
<p>COBB:</p>
<p>Before I describe the job, I have
to know you could do it.</p>
<br/>
<p>ARIADNE:</p>
<p>Why?</p>
<br/>
<p>COBB:</p>
<p>It's not, strictly speaking, legal.</p>
<p>Ariadne raises her eyebrows.</p>
<br/>
<p>COBB:</p>
<b>You have two minutes to draw a maze
that takes me one minute to solve.</b>
<br/>
<br/>
<p>*Ariadne takes the pad and pen. Cobb looks at his watch.*</p>
<br/>
<p>
COBB</p>
<b>Go.</b>
<br/>
<br/>
<br/>
    <button type="submit"><NavLink to={routes.MAZES} activeClassName="selected"> Make Mazes </NavLink></button>
    <button type="submit">Test Mazes</button>
</div>

export default WelcomePage