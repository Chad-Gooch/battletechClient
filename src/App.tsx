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


function App() {

  const [sessionToken, setSessionToken] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [mechHolder, setMechHolder] = useState([]);
  const [wpnHolder, setWpnHolder] = useState([]);

  let anItem:any = localStorage.getItem('token');
  let anAdmin:any = localStorage.getItem('admin');
  
  useEffect(() => {
    getMechs();
    getWpns();
    if (anItem){
      setSessionToken(anItem);
      setIsAdmin(anAdmin);
    };
  }, [])

  const getMechs = () => {
    fetch(`http://localhost:5000/mech/`,{
           method: 'GET',
           headers: new Headers ({
               'Content-Type':'application/json'
           })
        }).then(
           (response) => response.json()
        ).then((data) => {setMechHolder(data)})
  };

  const getWpns = () => {
    fetch(`http://localhost:5000/wpn/`,{
           method: 'GET',
           headers: new Headers ({
               'Content-Type':'application/json'
           })
        }).then(
           (response) => response.json()
        ).then((data) => {setWpnHolder(data)})
  };
  
  const updateToken = (newToken:string, admin:any) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('admin', admin)
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

  return (
    <div className="App">
      <BrowserRouter>
        <Banner updateToken={updateToken} sessionToken={sessionToken} clearToken={clearToken} toggle={toggleTwo}/>
        {(settingTwo)?<Sitenav isAdmin={isAdmin}/>:<div></div>}
      <Routes>
        <Route path='/'>
          <Route path='/' />
          <Route path='/MechView' element={<MechView mechHolder={mechHolder}/>} />
          <Route path='/WpnView' element={<WpnView wpnHolder={wpnHolder}/>} />
          <Route path='/MechAdmin' element={<MechAdmin token={sessionToken} mechHolder={mechHolder}/>} />
          <Route path='/WpnAdmin' element={<WpnAdmin token={sessionToken} wpnHolder={wpnHolder}/>} />
          <Route path='/Collection' element={<Collector token={sessionToken} mechHolder={mechHolder}/>} />
          <Route path='/TeamBuilder' element={<TeamBuilder token={sessionToken} mechHolder={mechHolder} wpnHolder={wpnHolder}/>} />
          <Route path='/SignIn' element={<SignIn updateToken={updateToken} />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
