'use client';

import { useEffect, useState } from 'react';

export default function TestAPIs() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const runTests = async () => {
    setLoading(true);
    const newResults: any[] = [];

    const endpoints = [
      { url: '/api/users', method: 'GET', name: 'Get Users' },
      { url: '/api/services', method: 'GET', name: 'Get Services' },
      { url: '/api/roles', method: 'GET', name: 'Get Roles' },
      { url: '/api/permissions', method: 'GET', name: 'Get Permissions' },
      { url: '/api/appointments', method: 'GET', name: 'Get Appointments' },
      { url: '/api/payments', method: 'GET', name: 'Get Payments' },
      { url: '/api/attendance', method: 'GET', name: 'Get Attendance' },
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint.url, { method: endpoint.method });
        const data = await response.json();
        newResults.push({
          name: endpoint.name,
          status: response.status,
          success: response.ok,
          records: data.data?.length || 0,
        });
      } catch (error) {
        newResults.push({
          name: endpoint.name,
          status: 'Error',
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    setResults(newResults);
    setLoading(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">API Test Dashboard</h1>
      
      <button
        onClick={runTests}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded mb-6 hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Run All Tests'}
      </button>

      <div className="grid gap-4">
        {results.map((result, idx) => (
          <div
            key={idx}
            className={`p-4 rounded border-l-4 ${
              result.success
                ? 'bg-green-50 border-green-500'
                : 'bg-red-50 border-red-500'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{result.name}</h3>
                <p className="text-sm">
                  Status: {result.status} | Records: {result.records}
                </p>
                {result.error && <p className="text-red-600 text-sm">{result.error}</p>}
              </div>
              <span className={result.success ? 'text-green-600 text-2xl' : 'text-red-600 text-2xl'}>
                {result.success ? '✅' : '❌'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
