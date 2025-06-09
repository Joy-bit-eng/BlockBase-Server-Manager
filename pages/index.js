import { useState } from 'react';

export default function Home() {
  const [code, setCode] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (code === 'Myboyemulater') {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Invalid code. Try again.');
    }
  };

  if (authenticated) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-green-400">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Welcome to BlockBase VIP Panel</h1>
          <p className="text-white">🛠️ Server management tools coming soon...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-80 space-y-4">
        <h2 className="text-xl text-green-400 font-semibold">Enter VIP Access Code</h2>
        <input
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          type="password"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Access Code"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-green-500 text-black py-2 rounded font-bold hover:bg-green-400"
        >
          Unlock
        </button>
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>
    </div>
  );
        }
