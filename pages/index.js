import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

const sampleServers = [
  { id: 1, name: 'Survival Base', status: 'Online', ip: '192.168.1.1', port: '25565' },
  { id: 2, name: 'Creative Lab', status: 'Offline', ip: '192.168.1.2', port: '25566' },
];

export default function Home() {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    const savedServers = JSON.parse(localStorage.getItem('servers'));
    if (savedServers) {
      setServers(savedServers);
    } else {
      setServers(sampleServers);
    }
  }, []);

  const saveServers = (updatedServers) => {
    localStorage.setItem('servers', JSON.stringify(updatedServers));
  };

  const toggleStatus = (id) => {
    const server = servers.find(s => s.id === id);
    if (!server.ip || !server.port) {
      alert("Please enter a valid IP and Port before starting the server.");
      return;
    }

    const updatedServers = servers.map(server =>
      server.id === id
        ? { ...server, status: server.status === 'Online' ? 'Offline' : 'Online' }
        : server
    );
    setServers(updatedServers);
    saveServers(updatedServers);
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
      ip: '',
      port: '',
    };
    const updatedServers = [...servers, newServer];
    setServers(updatedServers);
    saveServers(updatedServers);
  };

  const deleteServer = (id) => {
    const updatedServers = servers.filter(server => server.id !== id);
    setServers(updatedServers);
    saveServers(updatedServers);
  };

  const handleInputChange = (id, field, value) => {
    const updatedServers = servers.map(server =>
      server.id === id ? { ...server, [field]: value } : server
    );
    setServers(updatedServers);
    saveServers(updatedServers);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6">BlockBase Control Panel</h1>
      <Button onClick={addServer} className="mb-6 bg-green-700">Add New Server</Button>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {servers.map(server => (
          <Card key={server.id} className="bg-gray-900 text-white">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Image src="/server-icon.png" alt="Server Icon" width={32} height={32} />
                <input
                  type="text"
                  value={server.name}
                  onChange={(e) => handleInputChange(server.id, 'name', e.target.value)}
                  className="bg-gray-800 text-white rounded p-1 w-full"
                />
              </div>
              <p>Status: <span className={server.status === 'Online' ? 'text-green-400' : 'text-red-400'}>{server.status}</span></p>
              <div>
                <label className="block text-sm">IP Address:</label>
                <input
                  type="text"
                  value={server.ip}
                  onChange={(e) => handleInputChange(server.id, 'ip', e.target.value)}
                  className="w-full p-2 bg-gray-800 text-white rounded"
                  placeholder="Enter IP"
                />
              </div>
              <div>
                <label className="block text-sm">Port:</label>
                <input
                  type="text"
                  value={server.port}
                  onChange={(e) => handleInputChange(server.id, 'port', e.target.value)}
                  className="w-full p-2 bg-gray-800 text-white rounded"
                  placeholder="Enter Port"
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <Button onClick={() => toggleStatus(server.id)} className="bg-blue-700">
                  {server.status === 'Online' ? 'Stop' : 'Start'}
                </Button>
                <Button onClick={() => createBackup(server.id)} className="bg-yellow-600">Backup</Button>
                <Button onClick={() => restoreBackup(server.id)} className="bg-purple-700">Restore</Button>
                <Button onClick={() => deleteServer(server.id)} className="bg-red-700">Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
  }
