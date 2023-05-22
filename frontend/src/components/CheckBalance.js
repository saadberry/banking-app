import React, {useState,useEffect, useContext} from 'react'
import axios from 'axios'
import { UserContext } from '../UserContext'

// import users from './userStateVariables'

export default function CheckBalance({ showBackLink = true, updateBalance }) {
  const {user} = useContext(UserContext)
  const [balance,setBalance] = useState('null')
  const [name,setName] = useState(() => {
    const saved = localStorage.getItem("name");
    const initialValue = (saved);
    return initialValue || "";
  })
  const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  // const user_name = {user}

useEffect (() => {  api.get('/api/balance', {
  params: {
    name:name
  }
})
  .then(response => {
    // console.log(response.data)
    setBalance(response.data.balance)
    localStorage.setItem("balance", JSON.stringify(balance));
  })
  .catch(error => {
    console.log(error);
  })},[user])




  return (
    <div>
      {/* {msg} */}
      <h2> 
      {balance ? `Your balance is ${balance}` : 'Loading...'}
      </h2>
      {showBackLink && (
        <p>Back to <a href="/home">Home</a></p>
      )}
    </div>
  )
}
