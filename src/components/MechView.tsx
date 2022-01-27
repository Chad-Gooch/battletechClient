import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MechView = (props:any) => {

    const [settingOne, setSettingOne] = useState(true);

    useEffect(()=>{
    },[]);

    return (
        <div className="MechView">   
            <h3>MechView</h3>         
        </div>
    );
}

export default MechView;