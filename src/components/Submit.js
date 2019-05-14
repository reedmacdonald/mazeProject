import * as routes from '../constants/routes';
import { NavLink } from 'react-router-dom';

const Submit = () =>  
<div class="divHolderTwo">
<h1>You've submitted the maze!</h1>
<br/>

<h4>Check your totem, then decide if you want to make another or test others out</h4>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>


<p>Cobb: Listen, there's something you should know about me... about inception. An idea is like a virus, resilient, highly contagious. The smallest seed of an idea can grow. It can grow to define or destroy you.</p>
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

export default Submit