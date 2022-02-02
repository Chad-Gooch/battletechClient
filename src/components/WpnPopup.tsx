import React, {useState} from "react";
import {Table, Button} from 'reactstrap';
 
const WpnPopup = (props:any) => {

    const {model:mymodel,
        type:mytype,
        weight:myweight,
        shots:myshots,
        damage:mydamage,
        stability:mystability,
        heat:myheat,
        minRange:myminRange,
        maxRange:mymaxRange,
        DLC:myDLC} = props.wpn

        const [model, setModel] = useState<any>(mymodel);
        const [type, setType] = useState<any>(mytype);
        const [weight, setWeight] = useState<any>(myweight);
        const [shots, setShots] = useState<any>(myshots);
        const [damage, setDamage] = useState<any>(mydamage);
        const [stability, setStability] = useState<any>(mystability);
        const [heat, setHeat] = useState<any>(myheat);
        const [minRange, setMinRange] = useState<any>(myminRange);
        const [maxRange, setMaxRange] = useState<any>(mymaxRange);
        const [DLC, setDLC] = useState<any>(myDLC);

        let wpnUpdate = () => {
                fetch(`http://localhost:5000/wpn/update/${props.wpn.id}`, {
                    method: 'PUT',
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

    let wpnDelete = () => {
        fetch(`http://localhost:5000/wpn/delete/${props.wpn.id}`, {
            method: 'DELETE',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + props.token
            })
        }).then(
            (response) => response.json()
        ).catch(err => console.log(err))
    }

  return (
      <form>
        <Table style={{width:'80%', margin:'auto'}} dark>
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
                <td><Button style={{width:'100px', color:'white'}} className="deleteFromGarden" onClick={() => wpnUpdate()}>Update</Button></td>
                <td><Button style={{width:'100px', color:'white'}} className="deleteFromGarden" onClick={() => wpnDelete()}>Delete</Button></td>
            </tr>
        </Table>
      </form>
  );
};
 
export default WpnPopup;