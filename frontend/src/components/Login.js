import React, { useState, useEffect, useContext } from 'react';
import { Users } from './userStateVariables';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

export default function Login() {
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = Users('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');

  const nav = useNavigate();

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const foundUser = users.find((u) => u.email === email && u.password === password);

    if (foundUser) {
      setUser(foundUser.name);
      setUsers(foundUser.name);
      setBalance(foundUser.balance);
      localStorage.setItem('name', foundUser.name);
      localStorage.setItem('balance', foundUser.balance);
      nav('/home');
    } else {
      console.log('User does not exist');
      nav('/user-not-found');
    }
  }

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedBalance = localStorage.getItem('balance');
    if (storedName && storedBalance) {
      setName(storedName);
      setBalance(storedBalance);
    }
  }, []);

  return (
    <div>
      <div className="centered">
        <form className="form-horizontal" action="/login" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="inputEmail3" className="col-sm-2 control-label">
              Email
            </label>
            <div className="col-sm-9">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="form-control"
                id="inputEmail3"
                placeholder="John.Doe@xyz.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-sm-3 control-label">
              Password
            </label>
            <div className="col-sm-9">
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="form-control"
                id="inputPassword3"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-default">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
