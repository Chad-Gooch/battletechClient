import React, {useState, useEffect} from 'react';
import {Table} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const MechAdmin = (props:any) => {

    const [settingOne, setSettingOne] = useState(true);

    useEffect(()=>{
    },[props.mechHolder]);

    interface MechInterface {
        id: number;
        model: string;
        DLC: string;
        weight: number;
        freeTon: number;
        walk: number;
        maxJet: number;
        head: string;
        rightArm: string;
        rightTorso: string;
        center: string;
        leftTorso: string;
        leftArm: string;
      }

    const mechMapper = (mechs:MechInterface[]) => {
        return mechs.map((name:MechInterface) => {
            return(
                <tr key={name.id}>
                    <td>{name.model}</td>
                    <td>{name.weight}</td>
                    <td>{name.freeTon}</td>
                    <td>{name.walk}</td>
                    <td>{name.maxJet}</td>
                    <td>{name.head}</td>
                    <td>{name.rightArm}</td>
                    <td>{name.rightTorso}</td>
                    <td>{name.center}</td>
                    <td>{name.leftTorso}</td>
                    <td>{name.leftArm}</td>
                    <td>{name.DLC}</td>
                </tr>
            )
        })
    }

    return (
        <Table id="MechView" style={{width:'90%', margin:'auto', background:'rgba(169, 169, 169, 0.3)'}} dark>
            <thead>
                <tr>
                    <td>model</td>
                    <td>weight</td>
                    <td>freeTon</td>
                    <td>walk</td>
                    <td>maxJet</td>
                    <td>head</td>
                    <td>Right Arm</td>
                    <td>Right Torso</td>
                    <td>Core</td>
                    <td>Left Torso</td>
                    <td>Left Arm</td>
                    <td>DLC</td>
                </tr>
            </thead>
            <tbody>
                {mechMapper(props.mechHolder)}
            </tbody>
        </Table>         
    );
}

export default MechAdmin;