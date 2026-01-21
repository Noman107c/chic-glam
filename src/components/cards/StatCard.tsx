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
  blue: 'from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800',
  purple: 'from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800',
  green: 'from-green-50 to-green-100 dark:from-green-900 dark:to-green-800',
  orange: 'from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800',
  red: 'from-red-50 to-red-100 dark:from-red-900 dark:to-red-800',
  cyan: 'from-cyan-50 to-cyan-100 dark:from-cyan-900 dark:to-cyan-800',
};

const iconColorClasses = {
  blue: 'text-blue-600 dark:text-blue-400',
  purple: 'text-purple-600 dark:text-purple-400',
  green: 'text-green-600 dark:text-green-400',
  orange: 'text-orange-600 dark:text-orange-400',
  red: 'text-red-600 dark:text-red-400',
  cyan: 'text-cyan-600 dark:text-cyan-400',
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
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">{value}</span>
            {unit && <span className="text-sm text-gray-600 dark:text-gray-400">{unit}</span>}
          </div>

          {growth !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {trend === 'up' && <span className="text-green-600 dark:text-green-400">↑</span>}
              {trend === 'down' && <span className="text-red-600 dark:text-red-400">↓</span>}
              <span
                className={`text-sm font-medium ${
                  growthPositive
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
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
