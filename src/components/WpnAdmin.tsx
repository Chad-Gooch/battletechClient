import React, {useState, useEffect} from 'react';
import {Table, Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import WpnPopup from './WpnPopup';

const WpnAdmin = (props:any) => {

    const [model, setModel] = useState<any>('');
    const [type, setType] = useState<any>('');
    const [weight, setWeight] = useState<any>();
    const [shots, setShots] = useState<any>();
    const [damage, setDamage] = useState<any>();
    const [stability, setStability] = useState<any>();
    const [heat, setHeat] = useState<any>();
    const [minRange, setMinRange] = useState<any>();
    const [maxRange, setMaxRange] = useState<any>();
    const [DLC, setDLC] = useState<any>('Base');

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

      let addWpn = (event:any) => {
            fetch(`http://localhost:5000/wpn/add`, {
                method: 'POST',
                body: JSON.stringify({ Wpn: {
                    model:model,
                    type:type,
                    weight:weight,
                    shots:shots,
                    damage:damage,
                    stability:stability,
                    heat:heat,
                    minRange:minRange,
                    maxRange:maxRange,
                    DLC:DLC
                }}),
                headers: new Headers ({
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer ' + props.token
                })
            }).then(
                (response) => response.json()
            ).catch(err => console.log(err))
    }

    const wpnMapper = (weapons:WpnInterface[]) => {
        return weapons.map((name:WpnInterface) => {
            return(
                    <WpnPopup wpn={name} token={props.token} />
            )
        })
    }

    return (
        <div>
            <br />
            <br />
            <form onSubmit = {addWpn}>
                <Table style={{width:'80%', margin:'auto'}} dark>
                    <tr>
                        <th style={{width:'100px', color:'white'}}>model</th>
                        <th style={{width:'100px', color:'white'}}>type</th>
                        <th style={{width:'100px', color:'white'}}>weight</th>
                        <th style={{width:'100px', color:'white'}}>shots</th>
                        <th style={{width:'100px', color:'white'}}>damage</th>
                        <th style={{width:'100px', color:'white'}}>stability</th>
                        <th style={{width:'100px', color:'white'}}>heat</th>
                        <th style={{width:'100px', color:'white'}}>minRange</th>
                        <th style={{width:'100px', color:'white'}}>maxRange</th>
                        <th style={{width:'100px', color:'white'}}>DLC</th>
                        <th style={{width: '100px', color:'black'}}>____</th>
                        <th style={{width: '100px',color:'black'}}>____</th>
                    </tr>
                    <tr>
                        <td><input  style={{width:'100px', color:'white'}} onChange={(e) => setModel(e.target.value)} type='text' name='model' value={model} required/></td>
                        <td><input  style={{width:'100px', color:'white'}}onChange={(e) => setType(e.target.value)} type='text' name='type' value={type} required/></td>
                        <td><input  style={{width:'100px', color:'white'}}onChange={(e) => setWeight(e.target.value)} type='number' name='weight' value={weight} required/></td>
                        <td><input  style={{width:'100px', color:'white'}}onChange={(e) => setShots(e.target.value)} type='number' name='shots' value={shots} required/></td>
                        <td><input  style={{width:'100px', color:'white'}}onChange={(e) => setDamage(e.target.value)} type='number' name='damage' value={damage} required/></td>
                        <td><input  style={{width:'100px', color:'white'}}onChange={(e) => setStability(e.target.value)} type='number' name='stability' value={stability} required/></td>
                        <td><input  style={{width:'100px', color:'white'}}onChange={(e) => setHeat(e.target.value)} type='number' name='heat' value={heat} required/></td>
                        <td><input  style={{width:'100px', color:'white'}}onChange={(e) => setMinRange(e.target.value)} type='number' name='minRange' value={minRange} required/></td>
                        <td><input  style={{width:'100px', color:'white'}}onChange={(e) => setMaxRange(e.target.value)} type='number' name='maxRange' value={maxRange} required/></td>
                        <td><input  style={{width:'100px', color:'white'}}onChange={(e) => setDLC(e.target.value)} type='text' name='DLC' value={DLC} required/></td>
                        <td><Button  style={{width:'100px', color:'white'}}type='submit'>Add Wpn</Button></td>
                        <td style={{width:'100px', color:'white'}}></td>
                    </tr>
                </Table>
            </form>
            <br />
                {wpnMapper(props.wpnHolder)}
        </div>
    );
}

export default WpnAdmin;