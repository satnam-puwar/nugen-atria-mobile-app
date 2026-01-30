import { ThemeToggle } from "@/components/ThemeToggle";
import { roomsData, type Room } from "./(tabs)/rooms";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Bed,
  Calendar,
  DollarSign,
  MapPin,
  Star,
  Users,
} from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function getRoomById(id?: string | string[]): Room | undefined {
  if (!id) return undefined;
  const idStr = Array.isArray(id) ? id[0] : id;
  return roomsData.find((room) => room.id === idStr);
}

type BookingState = "not_booked" | "reserved" | "checked_in" | "checked_out";

export default function RoomDetailsScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();

  const room = getRoomById(params.id) ?? roomsData[0];

  const initialBookingState: BookingState = useMemo(() => {
    if (!room) return "not_booked";
    if (room.status === "reserved") return "reserved";
    if (room.status === "occupied") return "checked_in";
    return "not_booked";
  }, [room]);

  const [bookingState, setBookingState] = useState<BookingState>(
    initialBookingState,
  );

  if (!room) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <Text className="text-foreground text-lg font-semibold mb-4">
          Room not found
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="px-4 py-2 rounded-lg bg-primary"
        >
          <Text className="text-primary-foreground font-semibold">
            Go Back
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const isSuite = room.type.includes("Suite");

  const primaryActionLabel =
    bookingState === "not_booked"
      ? "Book Room"
      : bookingState === "reserved"
        ? "Check In"
        : bookingState === "checked_in"
          ? "Check Out"
          : "Checked Out";

  const canPrimaryAction =
    bookingState === "not_booked" ||
    bookingState === "reserved" ||
    bookingState === "checked_in";

  const handlePrimaryAction = () => {
    if (bookingState === "not_booked") {
      setBookingState("reserved");
    } else if (bookingState === "reserved") {
      setBookingState("checked_in");
    } else if (bookingState === "checked_in") {
      setBookingState("checked_out");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 border-b border-border">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-9 h-9 rounded-full bg-muted items-center justify-center"
          >
            <Text className="text-foreground text-lg">←</Text>
          </TouchableOpacity>
          <View>
            <Text className="text-lg font-bold text-foreground">
              Room #{room.roomNumber}
            </Text>
            <Text className="text-xs text-muted-foreground">
              {room.type} • {room.hotel}
            </Text>
          </View>
        </View>
        <ThemeToggle />
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 16,
          paddingBottom: 32,
          gap: 16,
        }}
      >
        {/* Image */}
        <View className="w-full overflow-hidden rounded-2xl border border-border bg-muted">
          <Image
            source={{ uri: room.image }}
            style={{ width: "100%", aspectRatio: 4 / 3 }}
            resizeMode="cover"
          />
        </View>

        <View className="gap-4">
          {/* Title & location */}
          <View>
            <Text className="text-2xl font-bold text-foreground mb-1">
              {room.type}
            </Text>
            <View className="flex-row items-center gap-1">
              <MapPin size={16} className="text-muted-foreground" />
              <Text className="text-sm text-muted-foreground">
                {room.hotel} • {room.location}
              </Text>
            </View>
          </View>

          {/* Rating & basic info */}
          <View className="flex-row items-center justify-between bg-card border border-border rounded-xl px-4 py-3">
            <View className="flex-row items-center gap-2">
              <Star
                size={18}
                className="text-yellow-500"
                fill="#EAB308"
              />
              <Text className="text-base font-semibold text-foreground">
                {room.rating}
              </Text>
              <Text className="text-xs text-muted-foreground">
                Guest Rating
              </Text>
            </View>
            <View className="flex-row items-center gap-3">
              <View className="flex-row items-center gap-1">
                <Users size={16} className="text-primary" />
                <Text className="text-xs text-muted-foreground">
                  Up to {room.maxGuests} guests
                </Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Bed size={16} className="text-primary" />
                <Text className="text-xs text-muted-foreground">
                  {isSuite ? "2+ beds" : "1 bed"}
                </Text>
              </View>
            </View>
          </View>

          {/* Price & actions */}
          <View className="bg-card border border-border rounded-xl p-4 gap-4">
            <View className="gap-1">
              <View className="flex-row items-baseline gap-1">
                <DollarSign size={18} className="text-primary" />
                <Text className="text-2xl font-bold text-foreground">
                  ${room.price}
                </Text>
                <Text className="text-xs text-muted-foreground ml-1">
                  / night
                </Text>
              </View>
              <Text className="text-xs text-muted-foreground">
                Taxes & fees not included
              </Text>
            </View>

            <View className="flex-row gap-3">
              <TouchableOpacity
                className={`flex-1 py-3 rounded-lg ${canPrimaryAction ? "bg-primary" : "bg-muted"}`}
                disabled={!canPrimaryAction}
                onPress={handlePrimaryAction}
              >
                <Text
                  className={`text-center font-semibold ${canPrimaryAction ? "text-primary-foreground" : "text-muted-foreground"}`}
                >
                  {primaryActionLabel}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-secondary py-3 rounded-lg border border-border">
                <Text className="text-secondary-foreground text-center font-semibold">
                  Add to Favorites
                </Text>
              </TouchableOpacity>
            </View>

            {bookingState === "checked_in" && (
              <Text className="text-xs text-green-500 mt-2">
                You&apos;re currently checked in to this room.
              </Text>
            )}
            {bookingState === "checked_out" && (
              <Text className="text-xs text-muted-foreground mt-2">
                You&apos;ve checked out of this room.
              </Text>
            )}
          </View>

          {/* Booking info if applicable */}
          {(room.status === "occupied" || room.status === "reserved") &&
            room.guestName && (
              <View className="bg-muted border border-border rounded-xl p-4 gap-2">
                <Text className="text-xs font-semibold text-muted-foreground">
                  CURRENT BOOKING
                </Text>
                <Text className="text-sm font-semibold text-foreground">
                  Guest: {room.guestName}
                </Text>
                <View className="flex-row items-center gap-4 mt-1">
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
          <View className="mb-4">
            <Text className="text-xs font-semibold text-muted-foreground mb-2">
              AMENITIES
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {room.amenities.map((amenity, index) => (
                <View
                  key={index}
                  className="bg-muted px-3 py-1.5 rounded-full"
                >
                  <Text className="text-xs text-foreground">
                    {amenity}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

