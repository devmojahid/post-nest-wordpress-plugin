import React from 'react';

export default function ChartCard({ title, children }) {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                {children}
            </div>
        </div>
    );
} 