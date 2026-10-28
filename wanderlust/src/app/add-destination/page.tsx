"use client";

import { useState } from "react";
import {
  PlusIcon,
  Trash2Icon,
  CalendarDaysIcon,
  MapPinIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

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

const EMPTY_FORM = {
  name: "",
  country: "",
  category: DEFAULT_CATEGORY,
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

export default function AddDestinationPage() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof typeof EMPTY_FORM, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim() || !form.country.trim()) return;

    const res = await fetch('http://localhost:5000/add-destination',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(form),

    })
    const afterSubmitData = await res.json();
    console.log(afterSubmitData)
    
  

    // TODO: replace with API call / server action once the backend exists
    console.log("New travel package:", form);
    setSubmitted(true);
    setForm(EMPTY_FORM);
    window.setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">
        Add New Travel Package
      </h1>

      <div className="flex justify-center">
        <Card className="w-full max-w-xl shadow-sm">
          <CardContent>
            <form id="add-destination-form" onSubmit={handleSubmit}>
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
                    value={form.category}
                    onValueChange={(value) =>
                      handleChange("category", value ?? DEFAULT_CATEGORY)
                    }
                  >
                    <SelectTrigger id="category" className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="w-(--anchor-width)">
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
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
                    value={form.duration}
                    onChange={(e) => handleChange("duration", e.target.value)}
                  />
                </div>

                {/* Departure Date */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="departure-date">Departure Date</Label>
                  <Input
                    id="departure-date"
                    type="date"
                    value={form.departureDate}
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
                    value={form.imageUrl}
                    onChange={(e) => handleChange("imageUrl", e.target.value)}
                  />
                </div>

                {/* Description */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the travel experience..."
                    rows={5}
                    className="min-h-24"
                    value={form.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                  />
                </div>
              </div>

              {submitted && (
                <p className="mt-4 flex items-center gap-2 text-sm text-emerald-600">
                  <MapPinIcon className="size-4" />
                  Travel package added successfully!
                </p>
              )}
            </form>
          </CardContent>

          <CardFooter className="justify-end gap-2">
            <Button
              type="button"
              variant="destructive"
              size="lg"
              onClick={() => {
                setForm(EMPTY_FORM);
                setSubmitted(false);
              }}
            >
              <Trash2Icon data-icon="inline-start" />
              Cancel
            </Button>
            <Button
              type="submit"
              form="add-destination-form"
              size="lg"
              className="bg-cyan-600 text-white hover:bg-cyan-700"
            >
              <PlusIcon data-icon="inline-start" />
              Add Travel Package
            </Button>
          </CardFooter>
        </Card>
      </div>

      <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <CalendarDaysIcon className="size-3.5" />
        Destination name and country are required before submission.
      </p>
    </div>
  );
}
