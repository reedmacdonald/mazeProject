import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes'




const WelcomePage = () =>  
<div>
<p>COBB</p>
<p>Before I describe the job, I have
to know you could do it.</p>
<br/>
<p>ARIADNE</p>
<p>Why?</p>
<br/>
<p>COBB</p>
<p>It's not, strictly speaking, legal.
Ariadne raises her eyebrows.</p>
<br/>
<p>COBB</p>
<p>You have two minutes to draw a maze
that takes me one minute to solve.
Ariadne takes the pad and pen. Cobb looks at his watch.</p>
<br/>
<p>
COBB</p>
<p className="bold">Go.</p>
    <button type="submit">Make Mazes</button>
    <button type="submit">Test Mazes</button>
</div>

export default WelcomePage