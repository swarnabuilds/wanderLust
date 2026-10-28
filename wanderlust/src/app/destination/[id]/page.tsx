import React from 'react';
import { MapPin, Calendar, Star, ArrowLeft, Edit, Check} from 'lucide-react';
import Link from 'next/link';
import { UpdateDestinationDialog } from '@/components/UpdateDestinationDialog';
import DeleteDestinationDialog from '@/components/DeleteDestinationDialog';
import BookingCard from '@/components/BookingCard';
 

// 1. TypeScript Interface
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

interface PageProps {
  params: Promise<{ id: string }>;
}

// 2. Main Page Component
export default async function DestinationDetailPage({ params }: PageProps): Promise<React.JSX.Element> {
    const { id } = await params;
    const res = await fetch(`http://localhost:5000/destination/${id}`, { cache: 'no-store' });
    const destination: Destination = await res.json();

    const {
      name = "Destination Name",
      country = "Country",
      price = "0",
      duration = "7",
      departureDate = "2026-10-20",
      imageUrl = "",
      description = "Explore the beauty and wonder of this amazing destination with pristine beaches and vibrant culture."
    } = destination;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 text-gray-800">
            {/* Top Navigation & Action Buttons */}
            <div className="flex items-center justify-between mb-6">
                <Link 
                    href="/destination" 
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Destinations
                </Link>
                <div className="flex items-center gap-3">
                   

                         <UpdateDestinationDialog destination={destination}></UpdateDestinationDialog>

                        <DeleteDestinationDialog destination={destination}></DeleteDestinationDialog>
                </div>
            </div>

            {/* Hero Image Banner */}
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden bg-gray-200 mb-8 shadow-sm">
                {imageUrl ? (
                    <img 
                        src={imageUrl} 
                        alt={name} 
                        className="w-full h-full object-cover" 
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">
                        No Image Available
                    </div>
                )}
            </div>

            {/* Main Content Layout (Grid) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                {/* Left Column: Details & Highlights */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Header Title & Meta */}
                    <div>
                        <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-2 uppercase tracking-wide">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span>{country}</span>
                        </div>
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4 capitalize">
                            {name}
                        </h1>
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                            <div className="flex items-center gap-1.5 font-semibold text-gray-900">
                                <Star className="w-4 h-4 fill-black text-black" />
                                <span>4.9</span>
                                <span className="text-gray-400 font-normal">(234 reviews)</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span>{duration} Days / {Number(duration) > 1 ? Number(duration) - 1 : 0} Nights</span>
                            </div>
                        </div>
                    </div>

                    {/* Overview Section */}
                    <div className="space-y-3 border-t border-gray-100 pt-6">
                        <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
                        <p className="text-gray-600 leading-relaxed text-base">
                            {description}
                        </p>
                    </div>

                    {/* Highlights Section */}
                    <div className="space-y-4 border-t border-gray-100 pt-6">
                        <h2 className="text-2xl font-bold text-gray-900">Highlights</h2>
                        <p className="text-gray-600 leading-relaxed text-base">
                            Discover the magic of this location with pristine landscapes, ancient wonders, and unforgettable experiences tailored for you.
                        </p>
                        
                        {/* Highlights Grid with Check icons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            {[
                                "Luxury beachfront accommodation",
                                "Traditional guided cultural tours",
                                "Exclusive spa & wellness treatment",
                                "Scenic sunrise trek & adventures",
                                "Private beach dining experience"
                            ].map((highlight, index) => (
                                <div key={index} className="flex items-center gap-3 text-gray-700 text-sm">
                                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                    </div>
                                    <span>{highlight}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Booking Sidebar Card */}
                <div>
                    <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm  space-y-6">
                        <div>
                            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Starting from</span>
                            <div className="flex items-baseline gap-1 mt-1">
                                <span className="text-3xl font-extrabold text-sky-500">${price}</span>
                                <span className="text-sm text-gray-500">per person</span>
                            </div>
                        </div>

                        

                        {/* CTA Booking Button */}
                      <BookingCard destination={destination}></BookingCard>

                        {/* Perks list */}
                        <div className="space-y-3 pt-4 border-t border-gray-100 text-xs text-gray-600">
                            <div className="flex items-center gap-2.5">
                                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                                <span>Free cancellation up to 7 days</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                                <span>Travel insurance included</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                                <span>24/7 customer support</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}