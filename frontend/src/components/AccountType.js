import {React,useState,useEffect} from 'react'
import axios from 'axios'

export default function AccountType() {
  const [AccountType,SetAccountType] = useState("")
  const [isLoading, setIsLoading] = useState(true);
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

useEffect (() => {  api.get('/api/account-type', {
  params: {
    name:name
  }
})
  .then(response => {
    // console.log(response.data)
    // setBalance(response.data.balance)
    // localStorage.setItem("balance", JSON.stringify(balance));
    SetAccountType(response.data.accountType)
    setIsLoading(false)
    // console.log("account type is: ",AccountType)
  })
}, []);
const renderContent = () => {
  if (isLoading) {
    return <h2>Hold on while we get your account status...</h2>;
  } else {
    return <h2>Your account type is: {AccountType}</h2>;
  }
};
return (
  <div>
    {renderContent()}
    <p>Back to <a href='/home'> Home</a></p>
  </div>
)
}


