import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const WpnView = (props:any) => {

    const [settingOne, setSettingOne] = useState(true);

    useEffect(()=>{
    },[]);

    return (
        <div className="WpnView">   
            <h3>WpnView</h3>         
        </div>
    );
}

export default WpnView;