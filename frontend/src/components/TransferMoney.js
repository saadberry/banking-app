import {React,useState} from 'react'
import axios from 'axios'
import CheckBalance from './CheckBalance'

export default function TransferMoney() {
  const [reciever,setReciever] = useState("")
  const [amount,setAmount] = useState("")
  const [successMessage, setSuccessMessage] = useState("");
  const [name,setName] = useState(() => {
    const saved = localStorage.getItem("name");
    const initialValue = (saved);
    return initialValue || "";
  })
    const [balance,setBalanced] = useState(() => {
    const saved = localStorage.getItem("balance");
    const initialValue = (saved);
    return initialValue || "";
  })
  
  
  async function handleSubmit (e) {
    e.preventDefault();
    console.log(reciever,amount)
    console.log(balance)
    // const response = await axios.post("http:localhost:8000/transfer-money",{sender_name:"basit",reciever_name:reciever,amount})
    // console.log(response)
    const api = axios.create({
      baseURL: 'http://localhost:8000',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    api
      .put('/api/transfer-money', { 
        sender: name,
        amount: amount,
        reciever: reciever
       
    })
      .then(response => {
        // setBalance(response.data.balance);
        console.log(response)
        setSuccessMessage("Transfer successful!")
        // localStorage.setItem("balance", JSON.stringify(balance));

      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    
    <div>
      <CheckBalance showBackLink={false}/>
      <form onSubmit={handleSubmit}>

        {/* Input Reciever Name */}
        <label htmlFor='reciever'> Reciever Name: </label>
        <input type="text" onChange={(e) => setReciever(e.target.value)}></input>

        {/* Amount to Send */}
        <label htmlFor='amount'> Amount to Send: </label>
        <input type="text" onChange={(e) => setAmount(e.target.value)}></input>

        {/* Submit Button */}
        <button type='submit'>Submit</button>
      </form>
      {successMessage && <h3>{successMessage}</h3>}
      <p>Back to <a href='/home'> Home</a></p>
    </div>
  )
}
