import React from 'react';
import {Outlet, Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sitenav.css';

const Sitenav = (props:any) => {

    return (
        <div id='navigation'>
            <br />
            <div><Link className='div' to='/MechView'>View Mechs</Link></div>
            <div><Link className='div' to='/WpnView'>View Weapons</Link></div>
            <div><Link className='div' to='/Collection'>Collection</Link></div>
            <div><Link className='div' to='/TeamBuilder'>TeamBuilder</Link></div>
            {(props.isAdmin==='true')?<div><Link className='div' to='/MechAdmin'>Mech Admin</Link></div>:<div></div>}
            {(props.isAdmin==='true')?<div><Link className='div' to='/WpnAdmin'>Wpn Admin</Link></div>:<div></div>}
            <br />
            <Outlet />
        </div>
    );
}

export default Sitenav;