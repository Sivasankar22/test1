import React, { useState } from 'react';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <form className="max-w-xs mx-auto mt-20 bg-white p-6 rounded shadow">
      <input type="email" onChange={e => setEmail(e.target.value)} placeholder="Email" className="block w-full mb-4 border p-2" />
      <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" className="block w-full mb-4 border p-2" />
      <button className="bg-blue-600 text-white p-2 w-full rounded">Login</button>
    </form>
  );
}
export default Login;
