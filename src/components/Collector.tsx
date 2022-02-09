import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Table} from 'reactstrap';

const Collection = (props:any) => {

    const [count, setCount] = useState(1);
    const [collection, setCollection] = useState<any>([]);

    useEffect(()=>{setCollection(props.userData.collection)},[props.userData])

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
    
    const saveCollection = () => {
        fetch(`http://localhost:5000/user/collection`, {
                method: 'PUT',
                body: JSON.stringify({ collection: {
                        collection:`[${collection}]`
                }}),
                headers: new Headers ({
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer ' + props.token
                })
            }).then(
                (response) => response.json()
            ).catch(err => console.log(err))
    }

    const addToCollection = (mechId:number) => {
        const Collect = collection;
        Collect.push(mechId);
        setCollection(Collect);
        saveCollection();
        localStorage.setItem('collection',Collect);
        setCount(count + 1);
    }

    const removeCollection = (mechId:number) => {
        let Collect = collection
        for (let i=0;i<Collect.length;i++) {
            if (Collect[i]===mechId) {Collect.splice(i,1)}
        };
        setCollection(Collect);
        saveCollection();
        localStorage.setItem('collection',Collect);
        setCount(count + 1);
    }

    const mechMapperLight = (mechs:MechInterface[]) => {
        return mechs.map((name:MechInterface) => {
            if (name.weight < 36){
            return(
                <tr key={name.id} style={{border:'none'}}>
                    <td>{name.model}</td>
                    <td>{(collection.includes(name.id))?<button style={{color:'red'}}onClick={() => removeCollection(name.id)}>X</button>:<button onClick={() => addToCollection(name.id)}>_</button>}</td>
                </tr>
            ) 
            }
        })
    }
    const mechMapperMed = (mechs:MechInterface[]) => {
        return mechs.map((name:MechInterface) => {
            if ((name.weight > 36)&&(name.weight < 56)){
            return(
                <tr key={name.id} style={{border:'none'}}>
                    <td>{name.model}</td>
                    <td>{(collection.includes(name.id))?<button style={{color:'red'}}onClick={() => removeCollection(name.id)}>X</button>:<button onClick={() => addToCollection(name.id)}>_</button>}</td>
                </tr>
            ) 
            }
        })
    }
    const mechMapperHeavy = (mechs:MechInterface[]) => {
        return mechs.map((name:MechInterface) => {
            if ((name.weight > 56)&&(name.weight < 76)){
            return(
                <tr key={name.id} style={{border:'none'}}>
                    <td>{name.model}</td>
                    <td>{(collection.includes(name.id))?<button style={{color:'red'}}onClick={() => removeCollection(name.id)}>X</button>:<button onClick={() => addToCollection(name.id)}>_</button>}</td>
                </tr>
            ) 
            }
        })
    }
    const mechMapperAssault = (mechs:MechInterface[]) => {
        return mechs.map((name:MechInterface) => {
            if (name.weight > 76){
            return(
                <tr key={name.id} style={{border:'none'}}>
                    <td>{name.model}</td>
                    <td>{(collection.includes(name.id))?<button style={{color:'red'}}onClick={() => removeCollection(name.id)}>X</button>:<button onClick={() => addToCollection(name.id)}>_</button>}</td>
                </tr>
            ) 
            }
        })
    }

    return (
        <Container className="collection">
            <Row>
                <Col>
                        <h3 style={{width:'200px', color:'white', background:'black'}}>Light</h3>
                    <Table id='LightCollection' style={{width:'200px', color:'white', background:'black'}}>
                        <tbody>
                            {mechMapperLight(props.mechHolder)}
                        </tbody>
                    </Table>
                </Col>
                <Col>
                        <h3 style={{width:'200px', color:'white', background:'black'}}>Medium</h3>
                    <Table id='MedCollection' style={{width:'200px', color:'white', background:'black'}} dark>
                        <tbody>
                            {mechMapperMed(props.mechHolder)}
                        </tbody>
                    </Table>
                </Col>
                <Col>
                        <h3 style={{width:'200px', color:'white', background:'black'}}>Heavy</h3>
                    <Table id='HeavyCollection' style={{width:'200px', color:'white', background:'black'}} dark>
                        <tbody>
                            {mechMapperHeavy(props.mechHolder)}
                        </tbody>
                    </Table>
                </Col>
                <Col>
                        <h3 style={{width:'200px', color:'white', background:'black'}}>Assault</h3>
                    <Table id='AssaultCollection' style={{width:'200px', color:'white', background:'black'}} dark>
                        <tbody>
                            {mechMapperAssault(props.mechHolder)}
                        </tbody>
                    </Table>
                </Col>        
            </Row> 
        </Container>
    );
}

export default Collection;