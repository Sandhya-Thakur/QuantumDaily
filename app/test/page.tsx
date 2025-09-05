// app/test/page.tsx
'use client';

import { useState } from 'react';

export default function TestPage() {
 const [users, setUsers] = useState([]);
 const [name, setName] = useState('');
 const [age, setAge] = useState('');
 const [email, setEmail] = useState('');

 const addUser = async () => {
   const response = await fetch('/api/test', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ name, age: parseInt(age), email }),
   });
   const data = await response.json();
   if (data.success) {
     setName('');
     setAge('');
     setEmail('');
     fetchUsers();
   }
 };

 const fetchUsers = async () => {
   const response = await fetch('/api/test');
   const data = await response.json();
   setUsers(data.users);
 };

 return (
   <div className="p-8">
     <h1 className="text-2xl mb-4">Database Test</h1>
     
     <div className="mb-4 space-y-2">
       <input
         placeholder="Name"
         value={name}
         onChange={(e) => setName(e.target.value)}
         className="border p-2 rounded"
       />
       <input
         placeholder="Age"
         type="number"
         value={age}
         onChange={(e) => setAge(e.target.value)}
         className="border p-2 rounded"
       />
       <input
         placeholder="Email"
         type="email"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         className="border p-2 rounded"
       />
       <button onClick={addUser} className="bg-blue-500 text-white p-2 rounded">
         Add User
       </button>
     </div>

     <button onClick={fetchUsers} className="bg-green-500 text-white p-2 rounded mb-4">
       Fetch Users
     </button>

     <div>
       {users.map((user: any) => (
         <div key={user.id} className="border p-2 mb-2">
           {user.name} - {user.age} - {user.email}
         </div>
       ))}
     </div>
   </div>
 );
}