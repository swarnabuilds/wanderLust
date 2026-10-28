import React from 'react';
import { MapPin, Calendar, ArrowUpRight, Star } from 'lucide-react';
import Link from 'next/link';

export interface Destination {
  _id: string;
  name: string;
  country: string;
  category?: string;
  price: string | number;
  duration?: string | number;
  departureDate?: string;
  imageUrl?: string;
  description?: string;
}

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  const {_id , name, country, price, duration, imageUrl } = destination;

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      
      {/* Image Container with Overlay Badge */}
      <div className="relative h-56 w-full bg-gray-200">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
            No Image Available
          </div>
        )}
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-md flex items-center gap-1 text-sm font-semibold text-gray-800">
          <span>4.5</span>
          <Star className="w-3.5 h-3.5 fill-black text-black" />
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5">
        {/* Location */}
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-1 capitalize">
          <MapPin className="w-4 h-4" />
          <span>{country || 'Bangladesh'}</span>
        </div>

        {/* Title & Price */}
        <div className="flex items-baseline justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 capitalize">
            {name}
          </h3>
          <div className="text-right">
            <span className="text-lg font-bold text-gray-900">${price}</span>
            <span className="text-xs text-gray-500">/Person</span>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-5">
          <Calendar className="w-4 h-4" />
          <span>{duration ? `${duration} Days` : '7 Days/6 Nights'}</span>
        </div>

        {/* Action Link */}
        <div className="pt-2">
          <Link href={`/destination/${_id}`} className="inline-flex items-center gap-1 text-sky-500 font-semibold text-sm hover:text-sky-600 transition-colors uppercase tracking-wider">
            Book Now
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}