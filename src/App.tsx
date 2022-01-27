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
import TeamBuilder from './components/TeamBuilder';
import SignIn from './components/SignIn';
import './App.css';


function App() {

  const [sessionToken, setSessionToken] = useState('');

  let anItem:any = localStorage.getItem('token');
  useEffect(() => {
    if (anItem){
      setSessionToken(anItem);
    };
  }, [])
  
  const updateToken = (newToken:string) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
  }
  
  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  }

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Sitenav updateToken={updateToken} sessionToken={sessionToken} clearToken={clearToken}/>}>
          <Route path='/' element={<MechView />} />
          <Route path='/MechView' element={<MechView />} />
          <Route path='/WpnView' element={<WpnView token={sessionToken}/>} />
          <Route path='/TeamBuilder' element={<TeamBuilder token={sessionToken}/>} />
          <Route path='/SignIn' element={<SignIn updateToken={updateToken} />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
