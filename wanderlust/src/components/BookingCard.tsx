'use client'
import { authClient } from "@/lib/auth-client";
import { ArrowRight } from "lucide-react";
import React from "react";

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

interface BookingCardProps {
    destination: Destination;
}

export default function BookingCard({ destination }: BookingCardProps) {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const { departureDate = "2026-10-20" } = destination || {};

    const handelBooking = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const form = e.currentTarget;
        const departureDate = (form.elements.namedItem("departureDate") as HTMLInputElement).value; 
        
       const data = {
            username: user?.name,
            email: user?.email,
            image: user?.image,
            ...destination,
            departureDate: departureDate,
            bookingDate: new Date()
        };

        try {
            const res = await fetch('http://localhost:5000/booking', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            console.log(result)
            
            if (res.ok) {
               
                alert(`Booking Successful! Your trip to ${destination.name} has been booked.`);
            } else {
                alert(result.message || "Booking Failed! Something went wrong.");
            }
        } catch (error) {
            console.error("Error submitting booking:", error);
            alert("Network Error: Could not connect to the server.");
        }
    }

    return (
        <div>
            <form onSubmit={handelBooking}>
                {/* Date Picker Input */}
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">Departure Date</label>
                    <div className="relative">
                        <input 
                            type="date" 
                            name="departureDate"
                            defaultValue={departureDate}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                        />
                    </div>
                </div>
                <button type="submit" className="w-full mt-4 py-3 px-4 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 text-sm">
                    <span>Book Now</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </form>
        </div>
    );
}