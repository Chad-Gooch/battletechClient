import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import Sitenav from './components/Sitenav';
import MechView from './components/MechView';
import WpnView from './components/WpnView';
import MechAdmin from './components/MechAdmin';
import WpnAdmin from './components/WpnAdmin';
import Collector from './components/Collector'
import TeamBuilder from './components/TeamBuilder';
import SignIn from './components/SignIn';
import Banner from './components/Banner';
import './App.css';
import APIURL from './helpers/environment';


function App() {

  const [sessionToken, setSessionToken] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [mechHolder, setMechHolder] = useState([]);
  const [wpnHolder, setWpnHolder] = useState([]);
  const [userData, setUserData] = useState<any>({collection:[],mech1:[],mech2:[],mech3:[],mech4:[]});
  
  let anItem:any = localStorage.getItem('token');
  let anAdmin:any = localStorage.getItem('admin');
  
  useEffect(() => {
    Promise.all([
      fetch(`${APIURL}/mech/`),
      fetch(`${APIURL}/wpn/`)
    ]).then(function (responses) {
      return Promise.all(responses.map(function (response) {
        return response.json();
      }));
    }).then(function (data) {
      setMechHolder(data[0]);
      setWpnHolder(data[1])
    }).catch(function (error) {
      console.log(error);
    });
    getUser();    
    if (anItem){
      setSessionToken(anItem);
      setIsAdmin(anAdmin);
    };
  }, []);

  useEffect(()=>{getUser()},[sessionToken])
  
  const getUser = () => {
    if (sessionToken !== '') {
    fetch(`${APIURL}/user/`, {
      method: 'GET',
      headers: new Headers ({
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + anItem
      })
    }).then((response) => response.json())
    .then(res=>{
      let col2;
      if (res.collection === null){col2 = []}else{
      col2 = JSON.parse(res.collection)};
      let m12
      if (res.mech1 === null) {m12 = []}else{
      m12= JSON.parse(res.mech1)};
      let m22;
      if (res.mech2 === null) {m22 = []}else{
      m22= JSON.parse(res.mech2)};
      let m32;
      if (res.mech3 === null) {m32 = []}else{
      m32= JSON.parse(res.mech3)};
      let m42;
      if (res.mech3 === null) {m42 = []}else{
      m42= JSON.parse(res.mech4)};
      let total = {collection:col2, mech1:m12, mech2:m22, mech3:m32, mech4:m42}
      console.log(total);
      setUserData(total)
    })
    .catch(err => console.log(err))
  }}

  
  const updateToken = (newToken:string, admin:any) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('admin', admin);
    setSessionToken(newToken);
    setIsAdmin(admin);
  }
  
  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
    setIsAdmin(false);
  }

  const [settingTwo, setSettingTwo] = useState(false);

  const toggleTwo = () => {
        setSettingTwo(!settingTwo)
    }

  const childProps = { 
    token:sessionToken,
    mechHolder:mechHolder,
    setUserData:setUserData,
    wpnHolder:wpnHolder,
    userData:userData,
    }

  return (
    <div className="App">
      <BrowserRouter>
        <Banner updateToken={updateToken} sessionToken={sessionToken} clearToken={clearToken} toggle={toggleTwo}/>
        {(settingTwo)?<Sitenav isAdmin={isAdmin}/>:<div></div>}
      <Routes>
        <Route path='/'>
          <Route path='/' />
          <Route path='/MechView' element={<MechView {...childProps}/>} />
          <Route path='/WpnView' element={<WpnView {...childProps}/>} />
          <Route path='/MechAdmin' element={<MechAdmin {...childProps}/>} />
          <Route path='/WpnAdmin' element={<WpnAdmin {...childProps}/>} />
          <Route path='/Collection' element={<Collector {...childProps}/>} />
          <Route path='/TeamBuilder' element={<TeamBuilder {...childProps}/>} />
          <Route path='/SignIn' element={<SignIn updateToken={updateToken}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
