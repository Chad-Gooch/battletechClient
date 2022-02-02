import React, {useState} from "react";
import {Table, Button} from 'reactstrap';
 
const MechPopup = (props:any) => {

    const {model:mymodel,
    DLC:myDLC,
    weight:myweight,
    freeTon:myfreeTon,
    walk:mywalk,
    maxJet:mymaxJet,
    head:myhead,
    rightArm:myrightArm,
    rightTorso:myrightTorso,
    center:mycenter,
    leftTorso:myleftTorso,
    leftArm:myleftArm} = props.mech

    const [model, setModel] = useState<any>(mymodel);
    const [DLC, setDLC] = useState<any>(myDLC);
    const [weight, setWeight] = useState<any>(myweight);
    const [freeTon, setFreeTon] = useState<any>(myfreeTon);
    const [walk, setWalk] = useState<any>(mywalk);
    const [maxJet, setMaxJet] = useState<any>(mymaxJet);
    const [head, setHead] = useState<any>(myhead);
    const [rightArm, setRightArm] = useState<any>(myrightArm);
    const [rightTorso, setRightTorso] = useState<any>(myrightTorso);
    const [center, setCenter] = useState<any>(mycenter);
    const [leftTorso, setLeftTorso] = useState<any>(myleftTorso);
    const [leftArm, setLeftArm] = useState<any>(myleftArm);

    let mechUpdate = () => {
        fetch(`http://localhost:5000/mech/update/${props.mech.id}`, {
                method: 'PUT',
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

    let mechDelete = () => {
        fetch(`http://localhost:5000/mech/delete/${props.mech.id}`, {
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
    <div style={{margin:'auto'}}>
      <form>
        <Table style={{width:'80%', margin:'auto'}} dark>
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
                <td><Button style={{width:'100px', color:'white'}} onClick={() => mechUpdate()}>Update</Button></td>
                <td><Button style={{width:'100px', color:'white'}} onClick={() => mechDelete()}>Delete</Button></td>
            </tr>
        </Table>
      </form>
    </div>
  );
};
 
export default MechPopup;