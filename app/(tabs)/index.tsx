import { ThemeToggle } from "@/components/ThemeToggle";
import { useRouter } from "expo-router";
import {
  Bell,
  Building2,
  Calendar,
  TrendingDown,
  TrendingUp,
  Users,
  UtensilsCrossed,
} from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type StatCardProps = {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
};

const StatCard = ({
  title,
  value,
  change,
  isPositive,
  icon,
}: StatCardProps) => (
  <View className="bg-card rounded-2xl p-4 border border-border">
    <View className="flex-row justify-between items-start mb-3">
      <View className="bg-primary/10 p-2 rounded-xl">{icon}</View>
      <View
        className={`flex-row items-center ${isPositive ? "bg-green-500/10" : "bg-red-500/10"} px-2 py-1 rounded-lg`}
      >
        {isPositive ? (
          <TrendingUp size={12} color="#22c55e" />
        ) : (
          <TrendingDown size={12} color="#ef4444" />
        )}
        <Text
          className={`text-xs font-bold ml-1 ${isPositive ? "text-green-500" : "text-red-500"}`}
        >
          {change}
        </Text>
      </View>
    </View>
    <Text className="text-muted-foreground text-xs mb-1">{title}</Text>
    <Text className="text-foreground text-2xl font-bold">{value}</Text>
  </View>
);

type QuickActionProps = {
  title: string;
  icon: React.ReactNode;
  color: string;
};

const QuickAction = ({ title, icon, color }: QuickActionProps) => (
  <TouchableOpacity className="items-center">
    <View
      className={`${color} w-14 h-14 rounded-2xl items-center justify-center mb-2`}
    >
      {icon}
    </View>
    <Text className="text-foreground text-xs font-medium text-center">
      {title}
    </Text>
  </TouchableOpacity>
);

type RecentActivityProps = {
  title: string;
  subtitle: string;
  time: string;
  icon: React.ReactNode;
};

const RecentActivity = ({
  title,
  subtitle,
  time,
  icon,
}: RecentActivityProps) => (
  <View className="bg-card rounded-xl p-4 border border-border flex-row items-center">
    <View className="bg-primary/10 p-2 rounded-xl mr-3">{icon}</View>
    <View className="flex-1">
      <Text className="text-foreground font-semibold">{title}</Text>
      <Text className="text-muted-foreground text-xs mt-1">{subtitle}</Text>
    </View>
    <Text className="text-muted-foreground text-xs">{time}</Text>
  </View>
);

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <View>
          <Text className="text-primary text-3xl font-bold">Nugen Atria</Text>
          <Text className="text-muted-foreground text-sm">
            Hotel Management System
          </Text>
        </View>
        <View className="flex-row items-center gap-4">
          <ThemeToggle />
          <TouchableOpacity className="relative">
            <Bell className="text-foreground" size={24} />
            <View className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 rounded-full items-center justify-center">
              <Text className="text-white text-[10px] font-bold">3</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: 128,
          gap: 24,
        }}
      >
        {/* Stats Grid */}
        <View className="gap-4">
          <View className="flex-row gap-4">
            <View className="flex-1">
              <StatCard
                title="Total Rooms"
                value="245"
                change="+12%"
                isPositive={true}
                icon={<Building2 className="text-primary" size={20} />}
              />
            </View>
            <View className="flex-1">
              <StatCard
                title="Occupied"
                value="186"
                change="+8%"
                isPositive={true}
                icon={<Users className="text-primary" size={20} />}
              />
            </View>
          </View>
          <View className="flex-row gap-4">
            <View className="flex-1">
              <StatCard
                title="Available"
                value="59"
                change="-5%"
                isPositive={false}
                icon={<Calendar className="text-primary" size={20} />}
              />
            </View>
            <View className="flex-1">
              <StatCard
                title="Food Orders"
                value="42"
                change="+15%"
                isPositive={true}
                icon={<UtensilsCrossed className="text-primary" size={20} />}
              />
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View>
          <Text className="text-foreground text-lg font-bold mb-4">
            Quick Actions
          </Text>
          <View className="flex-row justify-between">
            <TouchableOpacity
              onPress={() => router.push("/hotels")}
              className="items-center"
            >
              <View className="bg-primary w-14 h-14 rounded-2xl items-center justify-center mb-2">
                <Building2 className="text-white" size={24} />
              </View>
              <Text className="text-foreground text-xs font-medium text-center">
                Hotels
              </Text>
            </TouchableOpacity>
            <QuickAction
              title="Check-In"
              icon={<Users className="text-white" size={24} />}
              color="bg-green-500"
            />
            <QuickAction
              title="Food Order"
              icon={<UtensilsCrossed className="text-white" size={24} />}
              color="bg-orange-500"
            />
            <QuickAction
              title="Reports"
              icon={<TrendingUp className="text-white" size={24} />}
              color="bg-purple-500"
            />
          </View>
        </View>

        {/* Recent Activity */}
        <View>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-foreground text-lg font-bold">
              Recent Activity
            </Text>
            <TouchableOpacity>
              <Text className="text-primary font-semibold">View All</Text>
            </TouchableOpacity>
          </View>
          <View className="gap-3">
            <RecentActivity
              title="Room 204 - Check-In"
              subtitle="John Smith • Deluxe Suite"
              time="2m ago"
              icon={<Building2 className="text-primary" size={20} />}
            />
            <RecentActivity
              title="Food Order #1284"
              subtitle="Room 315 • $45.00"
              time="15m ago"
              icon={<UtensilsCrossed className="text-orange-500" size={20} />}
            />
            <RecentActivity
              title="Room 108 - Check-Out"
              subtitle="Sarah Johnson • Standard Room"
              time="1h ago"
              icon={<Users className="text-green-500" size={20} />}
            />
          </View>
        </View>

        {/* Occupancy Chart Placeholder */}
        <View className="bg-card rounded-2xl p-4 border border-border">
          <Text className="text-foreground text-lg font-bold mb-4">
            Occupancy Rate
          </Text>
          <View className="items-center justify-center h-40">
            <View className="w-32 h-32 rounded-full border-8 border-primary items-center justify-center">
              <Text className="text-foreground text-3xl font-bold">76%</Text>
              <Text className="text-muted-foreground text-xs">Occupied</Text>
            </View>
          </View>
          <View className="flex-row justify-around mt-4">
            <View className="items-center">
              <View className="w-3 h-3 bg-primary rounded-full mb-1" />
              <Text className="text-muted-foreground text-xs">Occupied</Text>
              <Text className="text-foreground font-bold">186</Text>
            </View>
            <View className="items-center">
              <View className="w-3 h-3 bg-muted rounded-full mb-1" />
              <Text className="text-muted-foreground text-xs">Available</Text>
              <Text className="text-foreground font-bold">59</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
