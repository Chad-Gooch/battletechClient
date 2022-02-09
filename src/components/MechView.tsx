import React, {useState, useEffect} from 'react';
import {Table, Col, Button, Row} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { isPropertySignature } from 'typescript';

const MechView = (props:any) => {

    const [sortMech, setSortMech] = useState([]);

    useEffect(()=>{
        sortAll()
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

    

    const sortLight = () => {
        let holder = props.mechHolder.filter((item:MechInterface) => item.weight < 37);
        setSortMech(holder.sort(function (a:MechInterface,b:MechInterface){return a.weight - b.weight}));
    }

    const sortMedium = () => {
        let holder = props.mechHolder.filter((item:MechInterface) => ((item.weight > 36)&&(item.weight < 56)));
        setSortMech(holder.sort(function (a:MechInterface,b:MechInterface){return a.weight - b.weight}));
    }

    const sortHeavy = () => {
        let holder = props.mechHolder.filter((item:MechInterface) => ((item.weight > 56)&&(item.weight < 76)));
        setSortMech(holder.sort(function (a:MechInterface,b:MechInterface){return a.weight - b.weight}));
    }

    const sortAssault = () => {
        let holder = props.mechHolder.filter((item:MechInterface) => item.weight > 77);
        setSortMech(holder.sort(function (a:MechInterface,b:MechInterface){return a.weight - b.weight}));
    }

    const sortAll = () => {
        let holder = props.mechHolder
        setSortMech(holder.sort(function (a:MechInterface,b:MechInterface){return a.weight - b.weight}))
    }

    return (
        <div>
            <Row style={{width:'80%', margin:'auto'}}>
                <Col><Button onClick={()=>sortAll()}>All</Button></Col>
                <Col><Button onClick={()=>sortLight()}>Light</Button></Col>
                <Col><Button onClick={()=>sortMedium()}>Medium</Button></Col>
                <Col><Button onClick={()=>sortHeavy()}>Heavy</Button></Col>
                <Col><Button onClick={()=>sortAssault()}>Assault</Button></Col>
            </Row>
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
                {mechMapper(sortMech)}
            </tbody>
        </Table>
        </div>         
    );
}

export default MechView;