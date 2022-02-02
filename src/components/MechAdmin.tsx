import React, {useState, useEffect} from 'react';
import {Table, Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MechPopup from './MechPopup';

const MechAdmin = (props:any) => {

    const [model, setModel] = useState<any>('');
    const [DLC, setDLC] = useState<any>('Base');
    const [weight, setWeight] = useState<any>('');
    const [freeTon, setFreeTon] = useState<any>('');
    const [walk, setWalk] = useState<any>();
    const [maxJet, setMaxJet] = useState<any>();
    const [head, setHead] = useState<any>();
    const [rightArm, setRightArm] = useState<any>();
    const [rightTorso, setRightTorso] = useState<any>();
    const [center, setCenter] = useState<any>();
    const [leftTorso, setLeftTorso] = useState<any>();
    const [leftArm, setLeftArm] = useState<any>();

    useEffect(()=>{
    },[props.mechHolder]);

    let addMech = (event:any) => {
        event.preventDefault();
            fetch(`http://localhost:5000/mech/add`, {
                method: 'POST',
                body: JSON.stringify({ mech: {
                        model:model,
                        DLC:DLC,
                        weight:weight,
                        freeTon:freeTon,
                        walk:walk,
                        maxJet:maxJet,
                        head:head,
                        rightArm:rightArm,
                        rightTorso:rightTorso,
                        center:center,
                        leftTorso:leftTorso,
                        leftArm:leftArm
                }}),
                headers: new Headers ({
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer ' + props.token
                })
            }).then(
                (response) => response.json()
            ).catch(err => console.log(err))
    }
    

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
                    <MechPopup mech={name} token={props.token}/>
            )
        })
    }

    return (
        <div >
            <br />
            <br />
            <form onSubmit = {addMech}>
                <Table style={{width:'80%', margin:'auto'}} dark>
                    <tr>
                        <th style={{width:'100px', color:'white'}}>model</th>
                        <th style={{width:'100px', color:'white'}}>weight</th>
                        <th style={{width:'100px', color:'white'}}>freeTon</th>
                        <th style={{width:'100px', color:'white'}}>walk</th>
                        <th style={{width:'100px', color:'white'}}>maxJet</th>
                        <th style={{width:'100px', color:'white'}}>head</th>
                        <th style={{width:'100px', color:'white'}}>rightArm</th>
                        <th style={{width:'100px', color:'white'}}>rightTorso</th>
                        <th style={{width:'100px', color:'white'}}>Core</th>
                        <th style={{width:'100px', color:'white'}}>leftTorso</th>
                        <th style={{width:'100px', color:'white'}}>leftArm</th>
                        <th style={{width:'100px', color:'white'}}>DLC</th>
                        <th style={{width:'100px', color:'black'}}>____</th>
                        <th style={{width:'100px', color:'black'}}>____</th>

                    </tr>
                    <tr>
                        <td><input  style={{width:'100px', color:'white'}} onChange={(e) => setModel(e.target.value)} type='text' name='model' value={model} required/></td>
                        <td><input  style={{width:'100px', color:'white'}}onChange={(e) => setWeight(e.target.value)} type='number' name='weight' value={weight} required/></td>
                        <td><input  style={{width:'100px', color:'white'}}onChange={(e) => setFreeTon(e.target.value)} type='text' name='freeTon' value={freeTon} required/></td>
                        <td><input  style={{width:'100px', color:'white'}}onChange={(e) => setWalk(e.target.value)} type='number' name='walk' value={walk} required/></td>
                        <td><input  style={{width:'100px', color:'white'}}onChange={(e) => setMaxJet(e.target.value)} type='number' name='maxJet' value={maxJet} required/></td>
                        <td><input  style={{width:'100px', color:'white'}}onChange={(e) => setHead(e.target.value)} type='number' name='head' value={head} required/></td>
                        <td><input  style={{width:'100px', color:'white'}}onChange={(e) => setRightArm(e.target.value)} type='rightArm' name='rightArm' value={rightArm} required/></td>
                        <td><input  style={{width:'100px', color:'white'}}onChange={(e) => setRightTorso(e.target.value)} type='number' name='rightTorso' value={rightTorso} required/></td>
                        <td><input  style={{width:'100px', color:'white'}}onChange={(e) => setCenter(e.target.value)} type='number' name='center' value={center} required/></td>
                        <td><input  style={{width:'100px', color:'white'}}onChange={(e) => setLeftTorso(e.target.value)} type='number' name='leftTorso' value={leftTorso} required/></td>
                        <td><input  style={{width:'100px', color:'white'}}onChange={(e) => setLeftArm(e.target.value)} type='number' name='leftArm' value={leftArm} required/></td>
                        <td><input  style={{width:'100px', color:'white'}}onChange={(e) => setDLC(e.target.value)} type='text' name='DLC' value={DLC} required/></td>
                        <td><Button  style={{width:'100px', color:'white'}}type='submit'>Add Mech</Button></td>
                        <td style={{width:'100px', color:'white'}}></td>
                    </tr>
                </Table>
            </form>
            <br />
            {mechMapper(props.mechHolder)}
        </div> 
    );
}

export default MechAdmin;