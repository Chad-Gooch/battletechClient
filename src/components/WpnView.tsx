import React, {useState, useEffect} from 'react';
import {Table} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const WpnView = (props:any) => {

    const [settingOne, setSettingOne] = useState(true);

    useEffect(()=>{
    },[props.wpnHolder]);

    interface WpnInterface {
        id: number;
        model: string;
        type: string;
        weight: number;
        shots: number;
        damage: number;
        stability: number;
        heat: number;
        minRange: number;
        maxRange: number;
        DLC: string|null;
      }

    const wpnMapper = (weapons:WpnInterface[]) => {
        return weapons.map((name:WpnInterface) => {
            return(
                <tr key={name.id}>
                    <td>{name.model}</td>
                    <td>{name.type}</td>
                    <td>{name.weight}</td>
                    <td>{name.shots}</td>
                    <td>{name.damage}</td>
                    <td>{name.stability}</td>
                    <td>{name.heat}</td>
                    <td>{name.minRange}</td>
                    <td>{name.maxRange}</td>
                    <td>{name.DLC}</td>
                </tr>
            )
        })
    }

    return (
        <Table id="WpnView" style={{width:'80%', margin:'auto', background:'rgba(169, 169, 169, 0.3)'}} dark>
            <thead>
                <tr>
                    <th>model</th>
                    <th>type</th>
                    <th>weight</th>
                    <th>shots</th>
                    <th>damage</th>
                    <th>stability</th>
                    <th>heat</th>
                    <th>minRange</th>
                    <th>maxRange</th>
                    <th>DLC</th>
                </tr>
            </thead>
            <tbody>
                {wpnMapper(props.wpnHolder)}
            </tbody>
        </Table> 
    );
}

export default WpnView;