import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import React from 'react'
import MyBookingCard, { Booking } from '@/components/MyBookingCard'

export default async function MyBookingsPage() {
    const session = await auth.api.getSession({
        headers: await headers()  
    })
    const user = session?.user
    console.log(user)
    
    const res = await fetch(`http://localhost:5000/my-bookings/${user?.email}`, {
        cache: 'no-store'
    })
    const bookings: Booking[] = await res.json()

    return (
        <div className="max-w-6xl mx-auto px-4 py-10 text-gray-800">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Bookings</h1>
                <p className="text-sm text-gray-500 mt-1">Manage and view your upcoming travel plans</p>
            </div>

            {/* Bookings List */}
            <div className="space-y-6">
                {bookings && bookings.length > 0 ? (
                    bookings.map((booking) => (
                        <MyBookingCard key={booking._id} booking={booking} />
                    ))
                ) : (
                    <div className="text-center py-16 bg-white rounded-2xl border border-gray-200/80">
                        <p className="text-gray-500 text-sm">No bookings found!</p>
                    </div>
                )}
            </div>
        </div>
    )
}