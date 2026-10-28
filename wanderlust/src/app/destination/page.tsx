import React from 'react';
import DestinationCard, { Destination } from '@/components/DestinationCard';

export default async function AllDestinationPage(): Promise<React.JSX.Element> {
    const res = await fetch('http://localhost:5000/destination', { cache: 'no-store' });
    const data: Destination[] = await res.json();

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                All Destinations ({data.length})
            </h2>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((destination: Destination) => (
                    <DestinationCard 
                        key={destination._id} 
                        destination={destination} 
                    />
                ))}
            </div>
        </div>
    );
}