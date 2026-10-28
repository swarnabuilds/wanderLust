'use client'
import { Calendar, MapPin, Trash2, Eye, CheckCircle2 } from 'lucide-react';
import { redirect } from 'next/navigation';

export interface Booking {
    _id: string;
    name: string;
    country: string;
    price: string | number;
    departureDate?: string;
    imageUrl?: string;
    status?: string;
}

interface MyBookingCardProps {
    booking: Booking;
}

export default function MyBookingCard({ booking }: MyBookingCardProps) {
    const handelCancleBooking = async() =>{
        const res = await fetch(`http://localhost:5000/my-bookings/${booking._id}`,{
            method:'DELETE',

        })
        const data = await res.json()
        console.log(data)
        redirect('/my-bookings')
    }
    return (
        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left Side: Image & Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 w-full md:w-auto">
                {/* Destination Image */}
                <div className="relative w-full sm:w-64 h-40 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                    {booking.imageUrl ? (
                        <img 
                            src={booking.imageUrl} 
                            alt={booking.name} 
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                            No Image
                        </div>
                    )}
                </div>

                {/* Details */}
                <div className="space-y-2">
                    {/* Status Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Confirmed</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 capitalize">
                        {booking.name}
                    </h2>

                    {/* Meta Info */}
                    <div className="space-y-1 text-xs text-gray-500">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            <span>Departure: {booking.departureDate || "N/A"}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-gray-400" />
                            <span>Booking ID: {booking._id}</span>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="text-2xl font-extrabold text-sky-500 pt-1">
                        ${booking.price}
                    </div>
                </div>
            </div>

            {/* Right Side: Action Buttons */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                <button 
                onClick={handelCancleBooking}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-rose-600 bg-rose-50/50 hover:bg-rose-100/60 border border-rose-200 rounded-lg transition-colors"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Cancel</span>
                </button>

                <a 
                    href={`/destination/${booking._id}`}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-sky-500 hover:bg-sky-600 rounded-lg shadow-sm transition-colors"
                >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                </a>
            </div>
        </div>
    );
}