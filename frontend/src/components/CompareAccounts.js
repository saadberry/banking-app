import {React,useState} from 'react'
import axios from 'axios'

export default function CompareAccounts() {
  const [account2,setAccount2] = useState('')
  const [isLoading, setIsLoading] = useState(true);
  const [result,setResult] = useState('')
  const [name,setName] = useState(() => {
    const saved = localStorage.getItem("name");
    const initialValue = (saved);
    return initialValue || "";
  })
  
  async function handleSubmit(e) {
    e.preventDefault()
    console.log(account2)
    // Instantiate axios inside the submit handler
    const api = axios.create({
      baseURL: 'http://localhost:8000',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    
    api
      .get('/api/compare-accounts', {
        params: {
          acc1: name,
          acc2: account2,
          // billType: bill
        }
      })
      .then(response => {
        setIsLoading(false);
        setResult(response.data)
      })
      .catch(error => {
        console.log(error);
      });
    
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="account2"> What Account do you want to compare with? </label>
        <input type="text" onChange={(e) => setAccount2(e.target.value)}/> 
        <button type="submit">Submit</button>
      </form>
      {isLoading ? (
       <p></p> 
      ) : (
        <h2>{result}</h2>
      )}
      <p>Back to <a href='/home'> Home</a></p>
    </div>
  )
}
