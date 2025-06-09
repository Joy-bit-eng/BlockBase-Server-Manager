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

  import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

const sampleServers = [
  { id: 1, name: 'Survival Base', status: 'Online' },
  { id: 2, name: 'Creative Lab', status: 'Offline' },
];

export default function Home() {
  const [code, setCode] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const [servers, setServers] = useState(sampleServers);

  const handleLogin = () => {
    if (code === 'Myboyemulater') {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Invalid code. Try again.');
    }
  };

  const toggleStatus = (id) => {
    setServers(
      servers.map(server =>
        server.id === id
          ? { ...server, status: server.status === 'Online' ? 'Offline' : 'Online' }
          : server
      )
    );
  };

  const createBackup = (id) => {
    alert(`Backup created for server ${id}`);
  };

  const restoreBackup = (id) => {
    alert(`Backup restored for server ${id}`);
  };

  const addServer = () => {
    const newServer = {
      id: Date.now(),
      name: `New Server ${servers.length + 1}`,
      status: 'Offline',
    };
    setServers([...servers, newServer]);
  };

  if (!authenticated) {
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

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6">BlockBase VIP Control Panel</h1>
      <Button onClick={addServer} className="mb-6 bg-green-700">
        Add New Server
      </Button>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {servers.map((server) => (
          <Card key={server.id} className="bg-gray-900 text-white">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Image src="/server-icon.png" alt="Server Icon" width={32} height={32} />
                <h2 className="text-xl font-semibold">{server.name}</h2>
              </div>
              <p>
                Status:{' '}
                <span className={server.status === 'Online' ? 'text-green-400' : 'text-red-400'}>
                  {server.status}
                </span>
              </p>
              <div className="flex gap-2">
                <Button onClick={() => toggleStatus(server.id)} className="bg-blue-700">
                  {server.status === 'Online' ? 'Stop' : 'Start'}
                </Button>
                <Button onClick={() => createBackup(server.id)} className="bg-yellow-600">
                  Backup
                </Button>
                <Button onClick={() => restoreBackup(server.id)} className="bg-purple-700">
                  Restore
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
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
