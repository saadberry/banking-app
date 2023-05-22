import {React,useState, useContext} from 'react'
import { UserContext } from '../UserContext';

export default function Home() {

  const {user} = useContext(UserContext) 
  // console.log(msg)
  const [name,setName]= useState(() => {
    // getting stored value
    const saved = localStorage.getItem("name");
    const initialValue = (saved);
    return initialValue || "";
  });

  //removing inverted commas
  let newName = name.split('"').join('');
  
  return (
    <>
    <div>
    {/* {user}  */}
    </div>
    <div className='welcome'>
        <h1>Welcome, {name} </h1>
        <h2>What would you like to do today?</h2>
    </div>
        <div className="container">
      <div className="row">
        <div className="col-sm-4">
          <button type="button" className="btn btn-primary btn-lg btn-block">
            <a href="/check-balance">
            Check Balance
            </a>
            
          </button>
        </div>
        <div className="col-sm-4">
          <button type="button" className="btn btn-primary btn-lg btn-block">
            <a href='/draw-money'>
            Draw Money
            </a>
          </button>
        </div>
        <div className="col-sm-4">
          <button type="button" className="btn btn-primary btn-lg btn-block">
            <a href='/deposit-bills'>
            Deposit Bills
            </a> 
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-4">
          <button type="button" className="btn btn-primary btn-lg btn-block">
            <a href='/transfer-money'>
            Transfer Money
            </a>
          </button>
        </div>
        <div className="col-sm-4">
          <button type="button" className="btn btn-primary btn-lg btn-block">
            <a href='/account-type'>
            Account Type
            </a>
          </button>
        </div>
        <div className="col-sm-4">
          <button type="button" className="btn btn-primary btn-lg btn-block">
            <a href='/compare-accounts'>
            Compare Accounts
            </a>
          </button>
        </div>
      </div>
    </div>

    

    </>
  )
}
