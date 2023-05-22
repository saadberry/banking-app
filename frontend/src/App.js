//react dependencies
import {BrowserRouter as Router, Routes, Route,} from 'react-router-dom'
import {useState} from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { UserContext } from './UserContext';

//components
import Navbar from './components/Navbar';
import Image from './components/Image';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import CheckBalance from './components/CheckBalance'
import DrawMoney from './components/DrawMoney'
import DepositBills from './components/DepositBills'
import TransferMoney from './components/TransferMoney'
import AccountType from './components/AccountType'
import CompareAccounts from './components/CompareAccounts'
import UserException from './components/UserException';



function App() {
  const [user,setUser] = useState('')
  return (
    <div className="App">

      {/* Navbar Component */}
      <Navbar/> 
      

        <Router>
        <UserContext.Provider value={{user, setUser}}>
        <Routes>
        

        <Route path="/" element={<Image/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/user-not-found' element={<UserException/>}/>

        {/* routes for different functionalities */}
        <Route path='/check-balance' element={<CheckBalance/>}/>
        <Route path='/draw-money' element={<DrawMoney/>}/>
        <Route path='/deposit-bills' element={<DepositBills/>}/>
        <Route path='/transfer-money' element={<TransferMoney/>}/>
        <Route path='/account-type' element={<AccountType/>}/>
        <Route path='/compare-accounts' element={<CompareAccounts/>}/>

        
        </Routes>
        </UserContext.Provider>
        </Router>
     
      
    </div>
  );
}

export default App;
