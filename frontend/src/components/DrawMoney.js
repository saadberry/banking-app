import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DrawMoney() {

  const [balance, setBalance] = useState(() => {
    const val = localStorage.getItem('balance');
    return val;
  });

  const [name,setName] = useState(() => {
    const saved = localStorage.getItem("name");
    const initialValue = (saved);
    return initialValue || "";
  })

  const [amount, setAmount] = useState('');

  // function WithdrawMoney(event) {
  //   // setAmount(event.target.value);
  //   console.log(amount)
  // }

  const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
      'Content-Type': 'application/json'
    }
  });

useEffect (() => {  api.get('/api/balance', {
  params: {
    name:name
  }
})
  .then(response => {
    // console.log(response.data)
    setBalance(response.data.balance)
  })
  .catch(error => {
    console.log(error);
  })})


  function handleSubmit(e) {
    e.preventDefault();
    console.log(amount)

    // Instantiate axios inside the submit handler
    const api = axios.create({
      baseURL: 'http://localhost:8000',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    api
      .put('/api/draw-money', { 
        name: "basit",
        amount: amount
       
    })
      .then(response => {
        setBalance(response.data.balance);
        console.log(balance)
        localStorage.setItem("balance", JSON.stringify(balance));

      })
      .catch(error => {
        console.log(error);
      });
  }

              // //saving to local storage
              // useEffect(() => {
              //   // storing input name
              //   localStorage.setItem("balance", JSON.stringify(balance));
              // }, [balance]);

  return (
    <div>
      <h1>Current Balance: {balance}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='input'>Enter Amount to Withdraw: </label>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} />

        <button type='submit'>Submit</button>
      </form>
      <p>
        Back to <a href='/home'>Home</a>
      </p>
    </div>
  );
}
