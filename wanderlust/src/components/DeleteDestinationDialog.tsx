"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from 'lucide-react';

interface Destination {
  _id?: string;
  name?: string;
  [key: string]: any;
}

interface DeleteDestinationDialogProps {
  destination: Destination;
}

export default function DeleteDestinationDialog({ destination }: DeleteDestinationDialogProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDeleteDestination = async () => {
    if (!destination?._id) return;

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/destination/${destination._id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      console.log("Deleted successfully:", data);

      // ডিলিট হওয়ার পর ডেস্টিনেশন লিস্ট পেজে রিডাইরেক্ট করে রিফ্রেশ করবে
      router.push('/destination');
      router.refresh();
    } catch (error) {
      console.error("Failed to delete destination:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger 
        render={
          <button className="inline-flex items-center gap-1.5 px-4 py-2 border border-red-200 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        } 
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this destination package from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDeleteDestination}
            className="bg-red-600 hover:bg-red-700 text-white"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}