import { useRouter } from "expo-router";
import {
    ArrowLeft,
    Building2,
    Filter,
    Mail,
    MapPin,
    MoreVertical,
    Phone,
    Search,
    Star,
    Users,
} from "lucide-react-native";
import React, { useState } from "react";
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Hotel = {
  id: string;
  name: string;
  location: string;
  address: string;
  rating: number;
  totalRooms: number;
  occupiedRooms: number;
  phone: string;
  email: string;
  manager: string;
  image: string;
  status: "active" | "inactive";
};

const hotels: Hotel[] = [
  {
    id: "1",
    name: "Nugen Atria Grand Plaza",
    location: "New York, NY",
    address: "123 Fifth Avenue, Manhattan",
    rating: 4.8,
    totalRooms: 245,
    occupiedRooms: 186,
    phone: "+1 (555) 123-4567",
    email: "info@nugenatria.com",
    manager: "John Anderson",
    image:
      "https://images.unsplash.com/photo-1593195150503-8e2a51338ff2?w=900&auto=format&fit=crop&q=60",
    status: "active",
  },
  {
    id: "2",
    name: "Nugen Atria Oceanview Resort",
    location: "Miami, FL",
    address: "456 Beach Boulevard",
    rating: 4.9,
    totalRooms: 180,
    occupiedRooms: 165,
    phone: "+1 (555) 234-5678",
    email: "contact@nugenatria.com",
    manager: "Sarah Mitchell",
    image:
      "https://images.unsplash.com/photo-1643684460412-76908d8e5a25?w=900&auto=format&fit=crop&q=60",
    status: "active",
  },
  {
    id: "3",
    name: "Nugen Atria Metropolitan",
    location: "Chicago, IL",
    address: "789 Corporate Drive",
    rating: 4.6,
    totalRooms: 320,
    occupiedRooms: 245,
    phone: "+1 (555) 345-6789",
    email: "reservations@nugenatria.com",
    manager: "Michael Chen",
    image:
      "https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?w=900&auto=format&fit=crop&q=60",
    status: "active",
  },
  {
    id: "4",
    name: "Nugen Atria Sunset Valley",
    location: "San Francisco, CA",
    address: "321 Golden Gate Street",
    rating: 4.7,
    totalRooms: 150,
    occupiedRooms: 98,
    phone: "+1 (555) 456-7890",
    email: "hello@nugenatria.com",
    manager: "Emily Rodriguez",
    image:
      "https://images.unsplash.com/photo-1600249324369-cf81f82f441b?w=900&auto=format&fit=crop&q=60",
    status: "active",
  },
];

type HotelCardProps = {
  hotel: Hotel;
};

const HotelCard = ({ hotel }: HotelCardProps) => {
  const occupancyRate = Math.round(
    (hotel.occupiedRooms / hotel.totalRooms) * 100,
  );

  return (
    <TouchableOpacity className="bg-card rounded-2xl border border-border overflow-hidden mb-4">
      {/* Hotel Image */}
      <Image
        source={{ uri: hotel.image }}
        className="w-full h-48"
        resizeMode="cover"
      />

      {/* Status Badge */}
      <View className="absolute top-3 right-3">
        <View
          className={`${hotel.status === "active" ? "bg-green-500" : "bg-red-500"} px-3 py-1 rounded-full`}
        >
          <Text className="text-white text-xs font-bold">
            {hotel.status.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Hotel Details */}
      <View className="p-4">
        {/* Header */}
        <View className="flex-row justify-between items-start mb-3">
          <View className="flex-1">
            <Text className="text-foreground text-lg font-bold mb-1">
              {hotel.name}
            </Text>
            <View className="flex-row items-center">
              <MapPin className="text-muted-foreground" size={14} />
              <Text className="text-muted-foreground text-sm ml-1">
                {hotel.location}
              </Text>
            </View>
          </View>
          <TouchableOpacity className="p-2">
            <MoreVertical className="text-muted-foreground" size={20} />
          </TouchableOpacity>
        </View>

        {/* Rating & Rooms Info */}
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center bg-primary/10 px-3 py-1 rounded-lg">
            <Star className="text-primary" size={14} />
            <Text className="text-primary font-bold text-sm ml-1">
              {hotel.rating}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Building2 className="text-muted-foreground" size={16} />
            <Text className="text-foreground font-semibold text-sm ml-2">
              {hotel.occupiedRooms}/{hotel.totalRooms} Rooms
            </Text>
          </View>
        </View>

        {/* Occupancy Bar */}
        <View className="mb-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-muted-foreground text-xs">
              Occupancy Rate
            </Text>
            <Text className="text-foreground font-bold text-sm">
              {occupancyRate}%
            </Text>
          </View>
          <View className="h-2 bg-muted rounded-full overflow-hidden">
            <View
              className="h-full bg-primary rounded-full"
              style={{ width: `${occupancyRate}%` }}
            />
          </View>
        </View>

        {/* Manager Info */}
        <View className="flex-row items-center mb-3 pb-3 border-b border-border">
          <View className="bg-primary/10 w-10 h-10 rounded-full items-center justify-center mr-3">
            <Users className="text-primary" size={18} />
          </View>
          <View className="flex-1">
            <Text className="text-muted-foreground text-xs">Manager</Text>
            <Text className="text-foreground font-semibold">
              {hotel.manager}
            </Text>
          </View>
        </View>

        {/* Contact Info */}
        <View className="gap-2">
          <View className="flex-row items-center">
            <Phone className="text-muted-foreground" size={14} />
            <Text className="text-muted-foreground text-sm ml-2">
              {hotel.phone}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Mail className="text-muted-foreground" size={14} />
            <Text className="text-muted-foreground text-sm ml-2">
              {hotel.email}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row gap-2 mt-4">
          <TouchableOpacity className="flex-1 bg-primary py-3 rounded-xl">
            <Text className="text-primary-foreground text-center font-semibold">
              View Details
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-secondary py-3 rounded-xl">
            <Text className="text-secondary-foreground text-center font-semibold">
              Manage
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function HotelsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 py-4 border-b border-border">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <ArrowLeft className="text-foreground" size={24} />
          </TouchableOpacity>
          <Text className="text-foreground text-2xl font-bold flex-1">
            Hotels
          </Text>
          <TouchableOpacity className="bg-primary px-4 py-2 rounded-xl">
            <Text className="text-primary-foreground font-semibold">
              + Add Hotel
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="flex-row gap-3">
          <View className="flex-1 bg-card border border-border rounded-xl flex-row items-center px-4 py-3">
            <Search className="text-muted-foreground" size={20} />
            <TextInput
              className="flex-1 ml-3 text-foreground"
              placeholder="Search hotels..."
              placeholderTextColor="#a1a1aa"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity
            className={`${showFilters ? "bg-primary" : "bg-card border border-border"} w-12 h-12 rounded-xl items-center justify-center`}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Filter
              className={
                showFilters ? "text-primary-foreground" : "text-foreground"
              }
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filters (if shown) */}
      {showFilters && (
        <View className="px-6 py-4 bg-card border-b border-border">
          <Text className="text-foreground font-semibold mb-3">Filter by</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
          >
            <TouchableOpacity className="bg-primary px-4 py-2 rounded-lg">
              <Text className="text-primary-foreground font-medium">
                All Hotels
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-secondary px-4 py-2 rounded-lg">
              <Text className="text-secondary-foreground font-medium">
                Active
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-secondary px-4 py-2 rounded-lg">
              <Text className="text-secondary-foreground font-medium">
                High Occupancy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-secondary px-4 py-2 rounded-lg">
              <Text className="text-secondary-foreground font-medium">
                Top Rated
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {/* Stats Summary */}
      <View className="px-6 py-4 bg-card border-b border-border">
        <View className="flex-row justify-between">
          <View className="items-center">
            <Text className="text-foreground text-2xl font-bold">
              {hotels.length}
            </Text>
            <Text className="text-muted-foreground text-xs">Total Hotels</Text>
          </View>
          <View className="items-center">
            <Text className="text-foreground text-2xl font-bold">
              {hotels.reduce((sum, h) => sum + h.totalRooms, 0)}
            </Text>
            <Text className="text-muted-foreground text-xs">Total Rooms</Text>
          </View>
          <View className="items-center">
            <Text className="text-foreground text-2xl font-bold">
              {hotels.reduce((sum, h) => sum + h.occupiedRooms, 0)}
            </Text>
            <Text className="text-muted-foreground text-xs">Occupied</Text>
          </View>
          <View className="items-center">
            <Text className="text-primary text-2xl font-bold">
              {Math.round(
                (hotels.reduce((sum, h) => sum + h.occupiedRooms, 0) /
                  hotels.reduce((sum, h) => sum + h.totalRooms, 0)) *
                  100,
              )}
              %
            </Text>
            <Text className="text-muted-foreground text-xs">
              Avg. Occupancy
            </Text>
          </View>
        </View>
      </View>

      {/* Hotels List */}
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 128 }}>
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
