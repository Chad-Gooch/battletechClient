import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TeamBuilder = (props:any) => {

    const [settingOne, setSettingOne] = useState(true);

    useEffect(()=>{
    },[]);

    return (
        <div className="TeamBuilder">   
            <h3>TeamBuilder</h3>         
        </div>
    );
}

export default TeamBuilder;