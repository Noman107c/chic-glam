'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Loader } from '@/components/ui/Loader';

interface Appointment {
  id: string;
  customer_name: string;
  service_id: string;
  status: string;
  appointment_time: string;
  created_at: string;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/appointments');
      if (!response.ok) throw new Error('Failed to fetch appointments');
      const data = await response.json();
      setAppointments(data.data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching appointments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) return <Loader />;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Appointments</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
          {error}
        </div>
      )}

      <div className="grid gap-4">
        {appointments.map((appointment) => (
          <Card key={appointment.id}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-bold text-lg">{appointment.customer_name}</h3>
                <p className="text-gray-600 text-sm">
                  Time: {new Date(appointment.appointment_time).toLocaleString()}
                </p>
                <p className="text-gray-500 text-xs mt-2">
                  Created: {new Date(appointment.created_at).toLocaleDateString()}
                </p>
              </div>
              <span className={`px-3 py-1 rounded text-sm font-semibold ${getStatusColor(
                appointment.status
              )}`}>
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {appointments.length === 0 && !loading && (
        <Card className="text-center py-8 text-gray-500">
          No appointments found
        </Card>
      )}

      <div className="bg-blue-50 border border-blue-200 p-4 rounded">
        <p className="text-blue-800">
          Total Appointments: <strong>{appointments.length}</strong>
        </p>
      </div>
    </div>
  );
}
