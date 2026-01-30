import { ThemeToggle } from "@/components/ThemeToggle";
import { useRouter } from "expo-router";
import {
  Bed,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Filter,
  MapPin,
  MoreVertical,
  Plus,
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

type RoomStatus = "occupied" | "available" | "maintenance" | "reserved";

export type Room = {
  id: string;
  roomNumber: string;
  type: string;
  image: string;
  status: RoomStatus;
  hotel: string;
  location: string;
  price: number;
  maxGuests: number;
  checkIn?: string;
  checkOut?: string;
  guestName?: string;
  amenities: string[];
  floor: number;
  rating: number;
};

export const roomsData: Room[] = [
  {
    id: "1",
    roomNumber: "101",
    type: "Deluxe Suite",
    image:
      "https://images.unsplash.com/photo-1593195150503-8e2a51338ff2?w=900&auto=format&fit=crop&q=60",
    status: "occupied",
    hotel: "Nugen Atria Grand Plaza",
    location: "New York",
    price: 299,
    maxGuests: 2,
    checkIn: "2024-01-15",
    checkOut: "2024-01-18",
    guestName: "John Smith",
    amenities: ["WiFi", "TV", "Mini Bar", "Ocean View"],
    floor: 1,
    rating: 4.8,
  },
  {
    id: "2",
    roomNumber: "205",
    type: "Standard Room",
    image:
      "https://images.unsplash.com/photo-1541085929911-dea736e9287b?w=900&auto=format&fit=crop&q=60",
    status: "available",
    hotel: "Nugen Atria Grand Plaza",
    location: "New York",
    price: 159,
    maxGuests: 2,
    amenities: ["WiFi", "TV", "Air Conditioning"],
    floor: 2,
    rating: 4.5,
  },
  {
    id: "3",
    roomNumber: "312",
    type: "Executive Suite",
    image:
      "https://images.unsplash.com/photo-1593195150503-8e2a51338ff2?w=900&auto=format&fit=crop&q=60",
    status: "reserved",
    hotel: "Nugen Atria Oceanview",
    location: "Miami",
    price: 449,
    maxGuests: 4,
    checkIn: "2024-01-20",
    checkOut: "2024-01-25",
    guestName: "Sarah Johnson",
    amenities: ["WiFi", "TV", "Mini Bar", "Balcony", "Jacuzzi"],
    floor: 3,
    rating: 4.9,
  },
  {
    id: "4",
    roomNumber: "108",
    type: "Standard Room",
    image:
      "https://images.unsplash.com/photo-1541085929911-dea736e9287b?w=900&auto=format&fit=crop&q=60",
    status: "maintenance",
    hotel: "Metropolitan Hotel",
    location: "Chicago",
    price: 139,
    maxGuests: 2,
    amenities: ["WiFi", "TV"],
    floor: 1,
    rating: 4.3,
  },
  {
    id: "5",
    roomNumber: "420",
    type: "Presidential Suite",
    image:
      "https://images.unsplash.com/photo-1593195150503-8e2a51338ff2?w=900&auto=format&fit=crop&q=60",
    status: "available",
    hotel: "Nugen Atria Oceanview",
    location: "Miami",
    price: 799,
    maxGuests: 6,
    amenities: [
      "WiFi",
      "TV",
      "Mini Bar",
      "Kitchen",
      "Terrace",
      "Jacuzzi",
      "Butler Service",
    ],
    floor: 4,
    rating: 5.0,
  },
  {
    id: "6",
    roomNumber: "215",
    type: "Deluxe Room",
    image:
      "https://images.unsplash.com/photo-1541085929911-dea736e9287b?w=900&auto=format&fit=crop&q=60",
    status: "occupied",
    hotel: "Nugen Atria Sunset Valley",
    location: "San Francisco",
    price: 219,
    maxGuests: 3,
    checkIn: "2024-01-14",
    checkOut: "2024-01-17",
    guestName: "Michael Chen",
    amenities: ["WiFi", "TV", "Mini Bar", "City View"],
    floor: 2,
    rating: 4.7,
  },
];

export default function RoomsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<"all" | RoomStatus>(
    "all",
  );
  const [showFilters, setShowFilters] = useState(false);

  const statusConfig = {
    occupied: {
      label: "Occupied",
      color: "bg-red-500",
      textColor: "text-red-500",
      icon: CheckCircle,
    },
    available: {
      label: "Available",
      color: "bg-green-500",
      textColor: "text-green-500",
      icon: CheckCircle,
    },
    maintenance: {
      label: "Maintenance",
      color: "bg-orange-500",
      textColor: "text-orange-500",
      icon: Clock,
    },
    reserved: {
      label: "Reserved",
      color: "bg-blue-500",
      textColor: "text-blue-500",
      icon: Calendar,
    },
  };

  const filteredRooms = roomsData.filter((room) => {
    const matchesSearch =
      room.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.hotel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || room.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: roomsData.length,
    occupied: roomsData.filter((r) => r.status === "occupied").length,
    available: roomsData.filter((r) => r.status === "available").length,
    reserved: roomsData.filter((r) => r.status === "reserved").length,
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 py-4">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-2xl font-bold text-foreground">Rooms</Text>
          <View className="flex-row items-center gap-3">
            {/* Guest app – no Add Room button */}
            <ThemeToggle />
          </View>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center gap-3 mb-4">
          <View className="flex-1 bg-card border border-border rounded-lg px-4 py-3 flex-row items-center">
            <Search className="text-muted-foreground mr-2" size={20} />
            <TextInput
              placeholder="Search rooms, types, hotels..."
              placeholderTextColor="#9CA3AF"
              className="flex-1 text-foreground"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity
            onPress={() => setShowFilters(!showFilters)}
            className={`p-3 rounded-lg border ${showFilters ? "bg-primary border-primary" : "bg-card border-border"}`}
          >
            <Filter
              className={
                showFilters ? "text-primary-foreground" : "text-foreground"
              }
              size={20}
            />
          </TouchableOpacity>
        </View>

        {/* Filter Chips */}
        {showFilters && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8, paddingBottom: 8 }}
          >
            <TouchableOpacity
              onPress={() => setSelectedStatus("all")}
              className={`px-4 py-2 rounded-full border ${
                selectedStatus === "all"
                  ? "bg-primary border-primary"
                  : "bg-card border-border"
              }`}
            >
              <Text
                className={
                  selectedStatus === "all"
                    ? "text-primary-foreground font-semibold"
                    : "text-foreground"
                }
              >
                All Rooms
              </Text>
            </TouchableOpacity>
            {Object.entries(statusConfig).map(([status, config]) => (
              <TouchableOpacity
                key={status}
                onPress={() => setSelectedStatus(status as RoomStatus)}
                className={`px-4 py-2 rounded-full border ${
                  selectedStatus === status
                    ? "bg-primary border-primary"
                    : "bg-card border-border"
                }`}
              >
                <Text
                  className={
                    selectedStatus === status
                      ? "text-primary-foreground font-semibold"
                      : "text-foreground"
                  }
                >
                  {config.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      {/* Stats Bar */}
      {/* <View className="px-6 mb-4">
        <View className="bg-card rounded-xl p-4 border border-border flex-row justify-between">
          <View className="items-center">
            <Text className="text-2xl font-bold text-foreground">
              {stats.total}
            </Text>
            <Text className="text-xs text-muted-foreground mt-1">Total</Text>
          </View>
          <View className="w-px bg-border" />
          <View className="items-center">
            <Text className="text-2xl font-bold text-red-500">
              {stats.occupied}
            </Text>
            <Text className="text-xs text-muted-foreground mt-1">Occupied</Text>
          </View>
          <View className="w-px bg-border" />
          <View className="items-center">
            <Text className="text-2xl font-bold text-green-500">
              {stats.available}
            </Text>
            <Text className="text-xs text-muted-foreground mt-1">
              Available
            </Text>
          </View>
          <View className="w-px bg-border" />
          <View className="items-center">
            <Text className="text-2xl font-bold text-blue-500">
              {stats.reserved}
            </Text>
            <Text className="text-xs text-muted-foreground mt-1">Reserved</Text>
          </View>
        </View>
      </View> */}

      {/* Room List */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: 128,
          gap: 16,
        }}
      >
        {filteredRooms.map((room) => {
          const StatusIcon = statusConfig[room.status].icon;
          return (
            <View
              key={room.id}
              className="bg-card rounded-xl border border-border overflow-hidden"
            >
              {/* Room Image */}
              <View className="relative">
                <Image
                  source={{ uri: room.image }}
                  className="w-full h-48"
                  resizeMode="cover"
                />
                {/* Status Badge */}
                <View
                  className={`absolute top-3 right-3 ${statusConfig[room.status].color} px-3 py-1.5 rounded-full flex-row items-center gap-1`}
                >
                  <StatusIcon size={14} color="white" />
                  <Text className="text-white text-xs font-semibold">
                    {statusConfig[room.status].label}
                  </Text>
                </View>
                {/* Room Number Badge */}
                <View className="absolute top-3 left-3 bg-black/70 px-3 py-1.5 rounded-full">
                  <Text className="text-white text-sm font-bold">
                    #{room.roomNumber}
                  </Text>
                </View>
              </View>

              {/* Room Details */}
              <View className="p-4">
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-1">
                    <Text className="text-lg font-bold text-foreground mb-1">
                      {room.type}
                    </Text>
                    <View className="flex-row items-center gap-1 mb-2">
                      <MapPin size={14} className="text-muted-foreground" />
                      <Text className="text-sm text-muted-foreground">
                        {room.hotel} • {room.location}
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                      <Star
                        size={14}
                        className="text-yellow-500"
                        fill="#EAB308"
                      />
                      <Text className="text-sm font-semibold text-foreground">
                        {room.rating}
                      </Text>
                      <Text className="text-sm text-muted-foreground ml-2">
                        Floor {room.floor}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity className="p-2">
                    <MoreVertical size={20} className="text-muted-foreground" />
                  </TouchableOpacity>
                </View>

                {/* Room Info Grid */}
                <View className="flex-row gap-4 mb-3">
                  <View className="flex-row items-center gap-2">
                    <DollarSign size={16} className="text-primary" />
                    <Text className="text-sm font-bold text-foreground">
                      ${room.price}/night
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <Users size={16} className="text-primary" />
                    <Text className="text-sm text-muted-foreground">
                      Up to {room.maxGuests}
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <Bed size={16} className="text-primary" />
                    <Text className="text-sm text-muted-foreground">
                      {room.type.includes("Suite") ? "2+" : "1"} Bed
                    </Text>
                  </View>
                </View>

                {/* Booking Info (if occupied/reserved) */}
                {(room.status === "occupied" || room.status === "reserved") &&
                  room.guestName && (
                    <View className="bg-muted rounded-lg p-3 mb-3">
                      <View className="flex-row items-center justify-between mb-2">
                        <Text className="text-sm font-semibold text-foreground">
                          Guest: {room.guestName}
                        </Text>
                        <View
                          className={`px-2 py-1 rounded ${statusConfig[room.status].color}`}
                        >
                          <Text className="text-white text-xs font-semibold">
                            {room.status === "occupied"
                              ? "Checked In"
                              : "Upcoming"}
                          </Text>
                        </View>
                      </View>
                      <View className="flex-row items-center gap-4">
                        <View className="flex-row items-center gap-1">
                          <Calendar
                            size={14}
                            className="text-muted-foreground"
                          />
                          <Text className="text-xs text-muted-foreground">
                            Check-in: {room.checkIn}
                          </Text>
                        </View>
                        <View className="flex-row items-center gap-1">
                          <Calendar
                            size={14}
                            className="text-muted-foreground"
                          />
                          <Text className="text-xs text-muted-foreground">
                            Check-out: {room.checkOut}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}

                {/* Amenities */}
                <View className="mb-3">
                  <Text className="text-xs font-semibold text-muted-foreground mb-2">
                    AMENITIES
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {room.amenities.slice(0, 4).map((amenity, index) => (
                      <View key={index} className="bg-muted px-2 py-1 rounded">
                        <Text className="text-xs text-foreground">
                          {amenity}
                        </Text>
                      </View>
                    ))}
                    {room.amenities.length > 4 && (
                      <View className="bg-muted px-2 py-1 rounded">
                        <Text className="text-xs text-primary font-semibold">
                          +{room.amenities.length - 4} more
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                {/* Action Buttons */}
                <View className="flex-row gap-3">
                  <TouchableOpacity
                    className="flex-1 bg-primary py-3 rounded-lg"
                    onPress={() =>
                      router.push({
                        pathname: "/room-details",
                        params: { id: room.id },
                      })
                    }
                  >
                    <Text className="text-primary-foreground text-center font-semibold">
                      View Details
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}

        {filteredRooms.length === 0 && (
          <View className="items-center justify-center py-12">
            <Bed className="text-muted-foreground mb-4" size={48} />
            <Text className="text-xl font-bold text-foreground text-center">
              No Rooms Found
            </Text>
            <Text className="text-muted-foreground text-center mt-2">
              Try adjusting your filters or search query
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
