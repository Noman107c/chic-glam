'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  unit?: string;
  growth?: number;
  growthPositive?: boolean;
  trend?: 'up' | 'down' | 'stable';
  onClick?: () => void;
  color?: 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'cyan';
}

const colorClasses = {
  blue: 'from-blue-50 to-blue-100',
  purple: 'from-purple-50 to-purple-100',
  green: 'from-green-50 to-green-100',
  orange: 'from-orange-50 to-orange-100',
  red: 'from-red-50 to-red-100',
  cyan: 'from-cyan-50 to-cyan-100',
};

const iconColorClasses = {
  blue: 'text-[#392d22]',
  purple: 'text-[#392d22]',
  green: 'text-[#392d22]',
  orange: 'text-[#392d22]',
  red: 'text-[#392d22]',
  cyan: 'text-[#392d22]',
};

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  unit,
  growth,
  growthPositive = true,
  trend,
  onClick,
  color = 'blue',
}) => {
  return (
    <Card hover onClick={onClick} className={`bg-gradient-to-br ${colorClasses[color]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600   mb-2">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900  ">{value}</span>
            {unit && <span className="text-sm text-gray-600  ">{unit}</span>}
          </div>

          {growth !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {trend === 'up' && <span className="text-green-600  ">↑</span>}
              {trend === 'down' && <span className="text-red-600  ">↓</span>}
              <span
                className={`text-sm font-medium ${
                  growthPositive
                    ? 'text-green-600  '
                    : 'text-red-600  '
                }`}
              >
                {growthPositive ? '+' : ''}{growth.toFixed(1)}%
              </span>
            </div>
          )}
        </div>

        <div
          className={`text-3xl ${iconColorClasses[color]} opacity-70`}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
};
