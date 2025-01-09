import React from 'react';

export default function StatCard({ title, value, icon, trend }) {
    return (
        <div className="bg-white rounded-lg shadow p-6 flex items-center justify-between">
            <div>
                <h3 className="text-sm font-medium text-gray-500">{title}</h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
                {trend && (
                    <p className={`mt-2 ${trend.type === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {trend.value}
                    </p>
                )}
            </div>
            <div className="text-gray-400">{icon}</div>
        </div>
    );
} 