'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Loader } from '@/components/ui/Loader';
import { Button } from '@/components/ui/Button';

interface Service {
  id: string;
  name: string;
  price: number;
  duration_minutes: number;
  created_at: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    duration_minutes: '',
  });

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/services');
      if (!response.ok) throw new Error('Failed to fetch services');
      const data = await response.json();
      setServices(data.data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching services');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          price: parseFloat(formData.price),
          duration_minutes: parseInt(formData.duration_minutes),
        }),
      });
      if (!response.ok) throw new Error('Failed to create service');
      await fetchServices();
      setFormData({ name: '', price: '', duration_minutes: '' });
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating service');
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Services Management</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Service'}
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
          {error}
        </div>
      )}

      {showForm && (
        <Card>
          <form onSubmit={handleCreateService} className="space-y-4">
            <input
              type="text"
              placeholder="Service Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Price"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Duration (minutes)"
              value={formData.duration_minutes}
              onChange={(e) => setFormData({ ...formData, duration_minutes: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <Button type="submit">Create Service</Button>
          </form>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id}>
            <h3 className="font-bold text-lg mb-2">{service.name}</h3>
            <div className="space-y-2 text-sm">
              <p className="flex justify-between">
                <span className="text-gray-600">Price:</span>
                <span className="font-semibold">${service.price.toFixed(2)}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-semibold">{service.duration_minutes} min</span>
              </p>
              <p className="text-gray-500 text-xs">
                Created: {new Date(service.created_at).toLocaleDateString()}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {services.length === 0 && !loading && (
        <Card className="text-center py-8 text-gray-500">
          No services found
        </Card>
      )}
    </div>
  );
}
