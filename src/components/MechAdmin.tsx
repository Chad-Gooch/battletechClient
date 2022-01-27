import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MechAdmin = (props:any) => {

    const [settingOne, setSettingOne] = useState(true);

    useEffect(()=>{
    },[]);

    return (
        <div className="MechAdmin">   
            <h3>MechAdmin</h3>         
        </div>
    );
}

export default MechAdmin;