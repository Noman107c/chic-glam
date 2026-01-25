"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Scissors,
  Dumbbell,
  Clock,
  DollarSign,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // minutes
  type: "salon" | "gym";
  category: string;
  isActive: boolean;
  image?: string; // Image URL or base64
}

const mockServices: ServiceItem[] = [
  {
    id: "1",
    name: "Classic Haircut",
    description: "Wash, cut and style by senior stylist",
    price: 1500,
    duration: 60,
    type: "salon",
    category: "Hair",
    isActive: true,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400",
  },
  {
    id: "2",
    name: "Personal Training Session",
    description: "1-on-1 session with certified trainer",
    price: 2500,
    duration: 60,
    type: "gym",
    category: "Training",
    isActive: true,
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400",
  },
  {
    id: "3",
    name: "HydraFacial Deluxe",
    description: "Deep cleansing and hydration treatment",
    price: 3500,
    duration: 90,
    type: "salon",
    category: "Facial",
    isActive: true,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400",
  },
  {
    id: "4",
    name: "Yoga Class Drop-in",
    description: "Single session group yoga class",
    price: 800,
    duration: 60,
    type: "gym",
    category: "Classes",
    isActive: true,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
  },
  {
    id: "5",
    name: "Manicure & Pedicure Spa",
    description: "Relaxing hand and foot care with massage",
    price: 2000,
    duration: 75,
    type: "salon",
    category: "Nails",
    isActive: true,
    image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400",
  },
  {
    id: "6",
    name: "HIIT Group Class",
    description: "High Intensity Interval Training for maximum burn",
    price: 1000,
    duration: 45,
    type: "gym",
    category: "Classes",
    isActive: true,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400",
  },
  {
    id: "7",
    name: "Keratin Hair Treatment",
    description: "Smooth and shine treatment for frizzy hair",
    price: 8000,
    duration: 120,
    type: "salon",
    category: "Hair",
    isActive: true,
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400",
  },
  {
    id: "8",
    name: "Monthly Gym Membership",
    description: "Unlimited access to gym floor and equipment",
    price: 5000,
    duration: 0,
    type: "gym",
    category: "Membership",
    isActive: true,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400",
  },
  {
    id: "9",
    name: "Bridal Makeup Package",
    description: "Complete bridal look with trial session",
    price: 25000,
    duration: 240,
    type: "salon",
    category: "Makeup",
    isActive: true,
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
  },
  {
    id: "10",
    name: "CrossFit Session",
    description: "Functional fitness training for strength",
    price: 1200,
    duration: 60,
    type: "gym",
    category: "Training",
    isActive: false,
    image: "https://images.unsplash.com/photo-1517963879466-e9b5ce388d28?w=400",
  },
  {
    id: "11",
    name: "Hot Stone Massage",
    description: "Therapeutic massage using smooth, heated stones",
    price: 4500,
    duration: 90,
    type: "salon",
    category: "Massage",
    isActive: true,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400",
  },
  {
    id: "12",
    name: "Zumba Dance Class",
    description: "Fun and energetic dance workout party",
    price: 800,
    duration: 60,
    type: "gym",
    category: "Classes",
    isActive: true,
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=400",
  },
  {
    id: "13",
    name: "Beard Trim & Shape",
    description: "Expert grooming for beard and mustache",
    price: 800,
    duration: 30,
    type: "salon",
    category: "Men",
    isActive: true,
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400",
  },
  {
    id: "14",
    name: "Spin Class",
    description: "High-energy indoor cycling workout",
    price: 900,
    duration: 45,
    type: "gym",
    category: "Classes",
    isActive: true,
    image: "https://images.unsplash.com/photo-1534258936925-c48947387e3b?w=400",
  },
  {
    id: "15",
    name: "Hair Coloring (Full)",
    description: "Professional full head hair coloring service",
    price: 6000,
    duration: 150,
    type: "salon",
    category: "Hair",
    isActive: true,
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400",
  },
  {
    id: "16",
    name: "Pilates Session",
    description: "Core strengthening and flexibility training",
    price: 1500,
    duration: 60,
    type: "gym",
    category: "Classes",
    isActive: true,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400",
  },
  {
    id: "17",
    name: "Threading & Waxing",
    description: "Full face threading and waxing service",
    price: 1200,
    duration: 45,
    type: "salon",
    category: "Facial",
    isActive: true,
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400",
  },
  {
    id: "18",
    name: "Nutrition Consultation",
    description: "Diet plan and nutrition advice from experts",
    price: 2000,
    duration: 45,
    type: "gym",
    category: "Wellness",
    isActive: true,
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400",
  },
];

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>(mockServices);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "salon" | "gym">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<ServiceItem>>({
    name: "",
    description: "",
    price: 0,
    duration: 30,
    type: "salon",
    category: "",
    isActive: true,
    image: "",
  });
  const [imagePreview, setImagePreview] = useState<string>("");

  // Filter Services
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab = activeTab === "all" ? true : service.type === activeTab;

    return matchesSearch && matchesTab;
  });

  const handleOpenModal = (service?: ServiceItem) => {
    if (service) {
      setFormData(service);
      setEditingId(service.id);
    } else {
      setFormData({
        name: "",
        description: "",
        price: 0,
        duration: 30,
        type: "salon",
        category: "",
        isActive: true,
        image: "",
      });
      setImagePreview("");
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.price) return;

    if (editingId) {
      setServices(
        services.map((s) =>
          s.id === editingId ? ({ ...s, ...formData } as ServiceItem) : s,
        ),
      );
    } else {
      const newService: ServiceItem = {
        ...(formData as ServiceItem),
        id: Math.random().toString(36).substr(2, 9),
      };
      setServices([...services, newService]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <span>Dashboard</span>
              <span>/</span>
              <span className="text-gray-900 font-medium">Service Catalog</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              Service Catalog
            </h1>
            <p className="text-sm text-gray-600">
              Manage your salon and gym service offerings
            </p>
          </div>
          <Button
            onClick={() => handleOpenModal()}
            style={{
              backgroundColor: "#392d22",
              color: "white",
            }}
            className="hover:opacity-90 transition-opacity font-medium px-5 py-2.5 shadow-md whitespace-nowrap"
          >
            <Plus size={18} className="inline mr-2" />
            Add New Service
          </Button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex p-1 bg-gray-100 rounded-lg overflow-x-auto scrollbar-hide max-w-full">
          {(["all", "salon", "gym"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-4 py-2 rounded-md text-sm font-medium transition-all capitalize flex items-center gap-2
                ${
                  activeTab === tab
                    ? "bg-white text-[#392d22] shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }
              `}
            >
              {tab === "salon" && <Scissors size={14} />}
              {tab === "gym" && <Dumbbell size={14} />}
              {tab === "all" ? "All Services" : tab}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#392d22] focus:border-transparent"
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card
            key={service.id}
            className="group hover:shadow-xl transition-all duration-300 border-gray-200 overflow-hidden bg-white flex flex-col h-full"
          >
            {/* Service Image */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
              {service.image ? (
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  {service.type === "salon" ? (
                    <Scissors size={48} className="text-gray-300" />
                  ) : (
                    <Dumbbell size={48} className="text-gray-300" />
                  )}
                </div>
              )}

              {/* Type Badge */}
              <div
                className={`absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-bold text-white backdrop-blur-sm ${
                  service.type === "salon" ? "bg-pink-500/90" : "bg-blue-500/90"
                }`}
              >
                {service.type === "salon" ? "Salon" : "Gym"}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleOpenModal(service)}
                  className="p-2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-lg text-gray-700 hover:text-[#392d22] transition-all shadow-lg"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="p-2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-lg text-gray-700 hover:text-red-600 transition-all shadow-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
              <div className="mb-3">
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">
                  {service.name}
                </h3>
                <p className="text-sm text-[#2d2d2d] line-clamp-2 leading-relaxed font-medium">
                  {service.description}
                </p>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Badge
                  label={service.category}
                  variant="default"
                  className="bg-gray-200 text-[#1a1a1a] border-0 font-bold text-xs"
                />
                <Badge
                  label={service.isActive ? "Active" : "Inactive"}
                  variant={service.isActive ? "success" : "danger"}
                  className="font-bold text-xs"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-auto">
                <div className="flex items-center gap-2 text-[#1a1a1a]">
                  <Clock size={18} className="text-[#2d2d2d]" />
                  <span className="text-sm font-bold">
                    {service.duration} min
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[#392d22] font-bold text-xl">
                  <span className="text-lg font-bold">Rs</span>
                  <span>{service.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {filteredServices.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-lg font-medium">No services found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Edit Service" : "Add Service"}
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Service Type
              </label>
              <div className="flex gap-4">
                <label
                  className={`
                   flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all
                   ${formData.type === "salon" ? "border-pink-500 bg-pink-50 text-pink-700" : "border-gray-200 hover:border-pink-200"}
                 `}
                >
                  <input
                    type="radio"
                    name="type"
                    className="hidden"
                    checked={formData.type === "salon"}
                    onChange={() => setFormData({ ...formData, type: "salon" })}
                  />
                  <Scissors size={18} />
                  <span className="font-medium">Salon</span>
                </label>
                <label
                  className={`
                   flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all
                   ${formData.type === "gym" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-blue-200"}
                 `}
                >
                  <input
                    type="radio"
                    name="type"
                    className="hidden"
                    checked={formData.type === "gym"}
                    onChange={() => setFormData({ ...formData, type: "gym" })}
                  />
                  <Dumbbell size={18} />
                  <span className="font-medium">Gym</span>
                </label>
              </div>
            </div>

            <Input
              label="Service Name"
              placeholder="e.g. Haircut, Personal Training"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Service Image
            </label>
            <div className="flex gap-4">
              {imagePreview || formData.image ? (
                <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                  <img
                    src={imagePreview || formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => {
                      setImagePreview("");
                      setFormData({ ...formData, image: "" });
                    }}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <XCircle size={16} />
                  </button>
                </div>
              ) : (
                <div className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                  <Scissors className="text-gray-300" size={32} />
                </div>
              )}
              <div className="flex-1">
                <Input
                  label="Image URL"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image || ""}
                  onChange={(e) => {
                    setFormData({ ...formData, image: e.target.value });
                    setImagePreview(e.target.value);
                  }}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter an image URL or leave blank for default icon
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#392d22] focus:border-transparent min-h-[100px]"
              placeholder="Describe the service details..."
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Price (PKR)"
              type="number"
              placeholder="0.00"
              value={formData.price || ""}
              onChange={(e) =>
                setFormData({ ...formData, price: parseFloat(e.target.value) })
              }
            />
            <Input
              label="Duration (min)"
              type="number"
              placeholder="30"
              value={formData.duration || ""}
              onChange={(e) =>
                setFormData({ ...formData, duration: parseInt(e.target.value) })
              }
            />
            <Input
              label="Category"
              placeholder="e.g. Hair, Cardio"
              value={formData.category || ""}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
                className="w-4 h-4 text-[#392d22] rounded border-gray-300 focus:ring-[#392d22]"
              />
              <span className="text-sm font-medium text-gray-700">
                Mark as Active Service
              </span>
            </label>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-[#392d22] text-white hover:bg-[#2a2119]"
              onClick={handleSave}
            >
              {editingId ? "Update Service" : "Create Service"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
