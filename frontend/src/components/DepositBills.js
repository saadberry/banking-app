import {React,useState} from 'react'
import CheckBalance from './CheckBalance';
import axios from 'axios';

export default function DepositBills() {
  // variables
  const [amount,setAmount] = useState(null)
  // const [selectedBill, setSelectedBill] = useState('');
  const [bill,setBill] = useState("")
  const [balance,setBalance] = useState(null)
  // CheckBalance()
  const [name,setName] = useState(() => {
    const saved = localStorage.getItem("name");
    const initialValue = (saved);
    return initialValue || "";
  })


  // function onSubmit
  function handleSubmit(e){
    e.preventDefault();
    // console.log(amount)
    // console.log(bill)

    // Instantiate axios inside the submit handler
    const api = axios.create({
      baseURL: 'http://localhost:8000',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    api
      .put('/api/pay-bill', { 
        name: name,
        amount: amount,
        billType: bill
       
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


  return (
    <div>
      {/* {CheckBalance.balance ? `Your balance is ${CheckBalance.balance}` : 'Loading...'} */}
      <CheckBalance showBackLink={false}/>
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group">
        <label htmlFor="billType">Select Bill Type:</label>
        
      <select id="billType" value={bill} onChange={(e) => setBill(e.target.value)}>
        <option value="">Select Bill</option>
        <option value="electricity">Electricity Bill</option>
        <option value="water">Water Bill</option>
        <option value="gas">Gas Bill</option>
        <option value="internet">Internet Bill</option>
      </select>
        </div>
      <div className="form-group">
      <label htmlFor="input" >Amount</label>
      <input type='text' placeholder='20,000' onChange={(e) => setAmount(e.target.value)}></input>
      </div>


      <button>Deposit Bill</button>
      </form>
      <p>Back to <a href='/home'> Home</a></p>
    </div>
  )
}
