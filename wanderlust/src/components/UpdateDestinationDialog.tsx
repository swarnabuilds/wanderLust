"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';  
import { Edit } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CATEGORIES = [
  "Beach",
  "Mountain",
  "Adventure",
  "Cultural",
  "Historical",
  "Island",
  "City",
  "Wildlife",
] as const;

const DEFAULT_CATEGORY = "Beach";

interface Destination {
  _id?: string;
  name: string;
  country: string;
  category?: string;
  price: string | number;
  duration?: string | number;
  departureDate?: string;
  imageUrl?: string;
  description?: string;
}

interface UpdateDestinationDialogProps {
  destination: Destination;
}

export function UpdateDestinationDialog({ destination }: UpdateDestinationDialogProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter(); 

  const [form, setForm] = useState<Destination>({
    name: destination?.name || "",
    country: destination?.country || "",
    category: destination?.category || DEFAULT_CATEGORY,
    price: destination?.price || "",
    duration: destination?.duration || "",
    departureDate: destination?.departureDate || "",
    imageUrl: destination?.imageUrl || "",
    description: destination?.description || "",
  });

  const handleChange = (field: keyof Destination, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim() || !form.country.trim()) return;

    try {
      const res = await fetch(`http://localhost:5000/destination/${destination._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const updatedData = await res.json();
      console.log("Successfully updated:", updatedData);

      setOpen(false);
      router.refresh(); 
    } catch (error) {
      console.error("Failed to update destination:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger 
        render={
          <Button variant="outline" className="gap-1.5 font-medium">
            <Edit className="w-4 h-4" />
            Edit
          </Button>
        } 
      />

      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Destination Package</DialogTitle>
          <DialogDescription>
            Make changes to your travel package details below. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4 mt-2" onSubmit={handleUpdate}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            
            {/* Destination Name */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="destination-name">Destination Name</Label>
              <Input
                id="destination-name"
                placeholder="Bali Paradise"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>

            {/* Country */}
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                placeholder="Indonesia"
                value={form.country}
                onChange={(e) => handleChange("country", e.target.value)}
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={form.category || DEFAULT_CATEGORY}
                onValueChange={(value) =>
                  handleChange("category", value ?? DEFAULT_CATEGORY)
                }
              >
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price">Price (USD)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                placeholder="e.g., 1299"
                value={form.price}
                onChange={(e) => handleChange("price", e.target.value)}
              />
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                placeholder="e.g., 7 Days/6 Nights"
                value={form.duration || ""}
                onChange={(e) => handleChange("duration", e.target.value)}
              />
            </div>

            {/* Departure Date */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="departure-date">Departure Date</Label>
              <Input
                id="departure-date"
                type="date"
                value={form.departureDate || ""}
                onChange={(e) =>
                  handleChange("departureDate", e.target.value)
                }
              />
            </div>

            {/* Image URL */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="image-url">Image URL</Label>
              <Input
                id="image-url"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={form.imageUrl || ""}
                onChange={(e) => handleChange("imageUrl", e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the travel experience..."
                rows={4}
                className="min-h-24"
                value={form.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="mt-4 gap-2">
            <DialogClose 
              render={
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              } 
            />
            <Button type="submit" className="bg-cyan-600 text-white hover:bg-cyan-700">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}