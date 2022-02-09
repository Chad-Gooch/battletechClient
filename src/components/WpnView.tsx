import React, {useState, useEffect} from 'react';
import {Table, Col, Row, Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const WpnView = (props:any) => {

    const [sortWpn, setSortWpn] = useState([]);

    useEffect(()=>{
        sortAll()
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

    const sortSupport = () => {
        let holder = props.wpnHolder.filter((item:WpnInterface) => item.type.toLowerCase() === 'support');
        setSortWpn(holder);
    }

    const sortEnergy = () => {
        let holder = props.wpnHolder.filter((item:WpnInterface) => item.type.toLowerCase() === 'energy');
        setSortWpn(holder.sort(function (a:WpnInterface,b:WpnInterface){return a.weight - b.weight}));
    }

    const sortBallistic = () => {
        let holder = props.wpnHolder.filter((item:WpnInterface) => item.type.toLowerCase() === 'ballistic');
        setSortWpn(holder.sort(function (a:WpnInterface,b:WpnInterface){return a.weight - b.weight}));
    }

    const sortMissile = () => {
        let holder = props.wpnHolder.filter((item:WpnInterface) => item.type.toLowerCase() === 'missile');
        setSortWpn(holder.sort(function (a:WpnInterface,b:WpnInterface){return a.weight - b.weight}));
    }

    const sortAll = () => {
        let holder = props.wpnHolder
        setSortWpn(holder.sort(function (a:WpnInterface,b:WpnInterface)
            {var nameA = a.type.toLowerCase();
            var nameB = b.type.toLowerCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
          
            return 0;}))
    }

    return (
        <div>
            <Row style={{width:'80%', margin:'auto'}}>
                <Col><Button onClick={()=>sortAll()}>All</Button></Col>
                <Col><Button onClick={()=>sortSupport()}>Support</Button></Col>
                <Col><Button onClick={()=>sortEnergy()}>Energy</Button></Col>
                <Col><Button onClick={()=>sortBallistic()}>Ballistic</Button></Col>
                <Col><Button onClick={()=>sortMissile()}>Missile</Button></Col>
            </Row>
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
                {wpnMapper(sortWpn)}
            </tbody>
        </Table> 
        </div>
    );
}

export default WpnView;