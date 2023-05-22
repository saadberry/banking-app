import {useState} from 'react';

export function Users(){
    const [users, setUsers] = useState([
    {name:'basit',email:'basit@codesync.com',password:'abc',balance:1000},
]);
 return [users, setUsers];
}