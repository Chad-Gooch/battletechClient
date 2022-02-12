import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Table} from 'reactstrap';
import APIURL from '../helpers/environment';

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

export default class Collection extends Component<any,any>{
    constructor(props:any) {
        super(props)
        this.state = {
            count:[],
            collection:this.props.userData.collection
        }
    };

    
     saveCollection = () => {
        fetch(`${APIURL}/user/collection`, {
                method: 'PUT',
                body: JSON.stringify({ collection: {
                        collection:`[${this.state.collection}]`
                }}),
                headers: new Headers ({
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer ' + this.props.token
                })
            }).then(
                (response) => response.json()
            ).catch(err => console.log(err))
    }

     addToCollection = (mechId:number) => {
        const Collect = this.state.collection;
        Collect.push(mechId);
        this.setState({collection:Collect});
        this.saveCollection();
        localStorage.setItem('collection',Collect);
        this.setState({count:this.state.count + 1});
    }

     removeCollection = (mechId:number) => {
        let Collect = this.state.collection
        for (let i=0;i<Collect.length;i++) {
            if (Collect[i]===mechId) {Collect.splice(i,1)}
        };
        this.setState(Collect);
        this.saveCollection();
        localStorage.setItem('collection',Collect);
        this.setState({count:this.state.count + 1});
    }

     mechMapperLight = (mechs:MechInterface[]) => {
        return mechs.map((name:MechInterface) => {
            if (name.weight < 36){
            return(
                <tr key={name.id} style={{border:'none'}}>
                    <td>{name.model}</td>
                    <td>
                        {(this.props.token !== '')?((this.state.collection.includes(name.id))?<button style={{color:'red'}}onClick={() => this.removeCollection(name.id)}>X</button>:<button onClick={() => this.addToCollection(name.id)}>_</button>):''}  
                    </td>
                </tr>
            ) 
            }
        })
    }
     mechMapperMed = (mechs:MechInterface[]) => {
        return mechs.map((name:MechInterface) => {
            if ((name.weight > 36)&&(name.weight < 56)){
            return(
                <tr key={name.id} style={{border:'none'}}>
                    <td>{name.model}</td>
                    <td>
                        {(this.props.token !== '')?((this.state.collection.includes(name.id))?<button style={{color:'red'}}onClick={() => this.removeCollection(name.id)}>X</button>:<button onClick={() => this.addToCollection(name.id)}>_</button>):''}
                    </td>
                </tr>
            ) 
            }
        })
    }
     mechMapperHeavy = (mechs:MechInterface[]) => {
        return mechs.map((name:MechInterface) => {
            if ((name.weight > 56)&&(name.weight < 76)){
            return(
                <tr key={name.id} style={{border:'none'}}>
                    <td>{name.model}</td>
                    <td>
                        {(this.props.token !== '')?((this.state.collection.includes(name.id))?<button style={{color:'red'}}onClick={() => this.removeCollection(name.id)}>X</button>:<button onClick={() => this.addToCollection(name.id)}>_</button>):''}    
                    </td>
                </tr>
            ) 
            }
        })
    }
     mechMapperAssault = (mechs:MechInterface[]) => {
        return mechs.map((name:MechInterface) => {
            if (name.weight > 76){
            return(
                <tr key={name.id} style={{border:'none'}}>
                    <td>{name.model}</td>
                    <td>
                    {(this.props.token !== '')?((this.state.collection.includes(name.id))?<button style={{color:'red'}}onClick={() => this.removeCollection(name.id)}>X</button>:<button onClick={() => this.addToCollection(name.id)}>_</button>):''}   
                    </td>
                </tr>
            ) 
            }
        })
    }

    render() {
    return (
        <Container className="collection">
            <Row>
                <Col>
                        <h3 style={{width:'200px', color:'white', background:'black'}}>Light</h3>
                    <Table id='LightCollection' style={{width:'200px', color:'white', background:'black'}}>
                        <tbody>
                            {this.mechMapperLight(this.props.mechHolder)}
                        </tbody>
                    </Table>
                </Col>
                <Col>
                        <h3 style={{width:'200px', color:'white', background:'black'}}>Medium</h3>
                    <Table id='MedCollection' style={{width:'200px', color:'white', background:'black'}} dark>
                        <tbody>
                            {this.mechMapperMed(this.props.mechHolder)}
                        </tbody>
                    </Table>
                </Col>
                <Col>
                        <h3 style={{width:'200px', color:'white', background:'black'}}>Heavy</h3>
                    <Table id='HeavyCollection' style={{width:'200px', color:'white', background:'black'}} dark>
                        <tbody>
                            {this.mechMapperHeavy(this.props.mechHolder)}
                        </tbody>
                    </Table>
                </Col>
                <Col>
                        <h3 style={{width:'200px', color:'white', background:'black'}}>Assault</h3>
                    <Table id='AssaultCollection' style={{width:'200px', color:'white', background:'black'}} dark>
                        <tbody>
                            {this.mechMapperAssault(this.props.mechHolder)}
                        </tbody>
                    </Table>
                </Col>        
            </Row> 
        </Container>
    );
}
}
