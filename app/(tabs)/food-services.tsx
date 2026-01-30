import { ThemeToggle } from "@/components/ThemeToggle";
import {
  CheckCircle,
  Clock,
  DollarSign,
  MoreVertical,
  Package,
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

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  orderNumber: string;
  roomNumber: string;
  guestName: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "preparing" | "delivered";
  orderTime: string;
  specialInstructions?: string;
  image: string;
};

const ordersData: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    roomNumber: "305",
    guestName: "Emma Wilson",
    items: [
      { name: "Grilled Salmon", quantity: 1, price: 32.0 },
      { name: "Caesar Salad", quantity: 1, price: 12.0 },
      { name: "Red Wine", quantity: 1, price: 18.0 },
    ],
    totalAmount: 62.0,
    status: "preparing",
    orderTime: "12:45 PM",
    image:
      "https://images.unsplash.com/photo-1648580852350-3098af89f110?w=900&auto=format&fit=crop&q=60",
  },
  {
    id: "2",
    orderNumber: "ORD-2024-002",
    roomNumber: "512",
    guestName: "James Martinez",
    items: [
      { name: "Club Sandwich", quantity: 2, price: 15.0 },
      { name: "French Fries", quantity: 2, price: 8.0 },
      { name: "Coca Cola", quantity: 2, price: 5.0 },
    ],
    totalAmount: 56.0,
    status: "delivered",
    orderTime: "1:15 PM",
    deliveryTime: "1:45 PM",
    image:
      "https://images.unsplash.com/photo-1670899460364-ebc917bac09a?w=900&auto=format&fit=crop&q=60",
  },
  {
    id: "3",
    orderNumber: "ORD-2024-003",
    roomNumber: "208",
    guestName: "Sophia Chen",
    items: [
      { name: "Breakfast Platter", quantity: 1, price: 22.0 },
      { name: "Pancakes", quantity: 1, price: 14.0 },
      { name: "Orange Juice", quantity: 2, price: 6.0 },
    ],
    totalAmount: 42.0,
    status: "pending",
    orderTime: "8:30 AM",
    specialInstructions: "Extra syrup, no butter",
    image:
      "https://images.unsplash.com/photo-1660836579059-533e7a1839b7?w=900&auto=format&fit=crop&q=60",
  },
];

const statusConfig = {
  pending: {
    label: "Pending",
    color: "bg-yellow-500",
    textColor: "text-yellow-700",
    bgColor: "bg-yellow-50",
    icon: Clock,
  },
  preparing: {
    label: "Preparing",
    color: "bg-blue-500",
    textColor: "text-blue-700",
    bgColor: "bg-blue-50",
    icon: Package,
  },
  ready: {
    label: "Ready",
    color: "bg-green-500",
    textColor: "text-green-700",
    bgColor: "bg-green-50",
    icon: CheckCircle,
  },
};

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "Breakfast" | "Mains" | "Snacks" | "Drinks";
};

const menu: MenuItem[] = [
  {
    id: "m1",
    name: "Grilled Salmon",
    description: "Served with roasted vegetables and lemon butter.",
    price: 32,
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=900&auto=format&fit=crop&q=60",
    category: "Mains",
  },
  {
    id: "m2",
    name: "Caesar Salad",
    description: "Crisp romaine, parmesan, croutons, house dressing.",
    price: 12,
    image:
      "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=900&auto=format&fit=crop&q=60",
    category: "Snacks",
  },
  {
    id: "m3",
    name: "Margherita Pizza",
    description: "Tomato, mozzarella, basil, stone baked.",
    price: 18,
    image:
      "https://images.unsplash.com/photo-1548365328-9c1e4732e1b4?w=900&auto=format&fit=crop&q=60",
    category: "Mains",
  },
  {
    id: "m4",
    name: "Breakfast Platter",
    description: "Eggs, bacon, toast, roasted tomatoes.",
    price: 22,
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=900&auto=format&fit=crop&q=60",
    category: "Breakfast",
  },
  {
    id: "m5",
    name: "Fresh Orange Juice",
    description: "Cold-pressed, no added sugar.",
    price: 6,
    image:
      "https://images.unsplash.com/photo-1504274066651-8d31a536b11a?w=900&auto=format&fit=crop&q=60",
    category: "Drinks",
  },
];

export default function FoodServicesScreen() {
  const [cart, setCart] = useState<Record<string, number>>({});

  const activeOrder = useMemo(
    () => ordersData.find((o) => o.status !== "delivered"),
    [],
  );

  const StatusIcon = ({ status }: { status: keyof typeof statusConfig }) => {
    const Icon = statusConfig[status].icon;
    return <Icon size={16} className={statusConfig[status].textColor} />;
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 py-4 flex-row items-center justify-between">
        <View>
          <Text className="text-2xl font-bold text-foreground">
            Room Service
          </Text>
          <Text className="text-sm text-muted-foreground mt-1">
            Order food & drinks to your room
          </Text>
        </View>
        <View className="flex-row items-center gap-3">
          <ThemeToggle />
        </View>
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: 128,
          gap: 16,
        }}
      >
        {/* Active order for this guest */}
        {activeOrder && (
          <View className="bg-card border border-border rounded-xl overflow-hidden">
            <View className="flex-row">
              <Image
                source={{ uri: activeOrder.image }}
                className="w-28 h-28"
                resizeMode="cover"
              />
              <View className="flex-1 p-4">
                <View className="flex-row items-start justify-between mb-2">
                  <View className="flex-1">
                    <Text className="text-base font-bold text-foreground">
                      Your current order
                    </Text>
                    <View className="flex-row items-center gap-2 mt-1">
                      <View className="bg-primary/10 px-2 py-1 rounded">
                        <Text className="text-xs font-semibold text-primary">
                          Room {activeOrder.roomNumber}
                        </Text>
                      </View>
                      <View
                        className={`${statusConfig[activeOrder.status].bgColor} px-2 py-1 rounded flex-row items-center gap-1`}
                      >
                        <StatusIcon status={activeOrder.status} />
                        <Text
                          className={`text-xs font-semibold ${statusConfig[activeOrder.status].textColor}`}
                        >
                          {statusConfig[activeOrder.status].label}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <MoreVertical
                    size={20}
                    className="text-muted-foreground mt-1"
                  />
                </View>

                <View className="flex-row items-center justify-between mt-1">
                  <View className="flex-row items-center gap-2">
                    <Clock size={16} className="text-muted-foreground" />
                    <Text className="text-sm text-muted-foreground">
                      Ordered at {activeOrder.orderTime}
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-1">
                    <DollarSign size={16} className="text-primary" />
                    <Text className="text-base font-bold text-foreground">
                      ${activeOrder.totalAmount.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View className="px-4 py-3 border-t border-border bg-muted/30">
              <Text className="text-xs font-semibold text-foreground mb-2">
                Items
              </Text>
              {activeOrder.items.map((item, index) => (
                <View
                  key={index}
                  className="flex-row justify-between items-center mb-1"
                >
                  <Text className="text-sm text-muted-foreground">
                    {item.quantity}x {item.name}
                  </Text>
                  <Text className="text-sm font-medium text-foreground">
                    ${(item.quantity * item.price).toFixed(2)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Menu */}
        <View className="mt-2">
          <Text className="text-lg font-bold text-foreground mb-2">
            Menu
          </Text>
          <Text className="text-xs text-muted-foreground mb-4">
            Tap + to add items to your order.
          </Text>

          <View className="gap-3">
            {menu.map((item) => {
              const quantity = cart[item.id] ?? 0;
              return (
                <View
                  key={item.id}
                  className="flex-row bg-card border border-border rounded-xl overflow-hidden"
                >
                  <Image
                    source={{ uri: item.image }}
                    className="w-24 h-24"
                    resizeMode="cover"
                  />
                  <View className="flex-1 p-3 justify-between">
                    <View>
                      <Text className="text-sm font-semibold text-foreground">
                        {item.name}
                      </Text>
                      <Text className="text-[11px] text-muted-foreground mt-1">
                        {item.description}
                      </Text>
                    </View>
                    <View className="flex-row items-center justify-between mt-2">
                      <View className="flex-row items-center gap-1">
                        <DollarSign size={14} className="text-primary" />
                        <Text className="text-sm font-bold text-foreground">
                          ${item.price.toFixed(2)}
                        </Text>
                      </View>
                      <View className="flex-row items-center gap-2">
                        {quantity > 0 && (
                          <TouchableOpacity
                            onPress={() =>
                              setCart((prev) => {
                                const next = { ...prev };
                                if (next[item.id] <= 1) delete next[item.id];
                                else next[item.id] = next[item.id] - 1;
                                return next;
                              })
                            }
                            className="w-7 h-7 rounded-full border border-border items-center justify-center"
                          >
                            <Text className="text-sm text-foreground">-</Text>
                          </TouchableOpacity>
                        )}
                        <TouchableOpacity
                          onPress={() =>
                            setCart((prev) => ({
                              ...prev,
                              [item.id]: (prev[item.id] ?? 0) + 1,
                            }))
                          }
                          className="w-8 h-8 rounded-full bg-primary items-center justify-center"
                        >
                          <Text className="text-primary-foreground text-sm">
                            +
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Cart summary */}
        <View className="mt-4 mb-4 bg-card border border-border rounded-xl p-4">
          <Text className="text-sm font-semibold text-foreground mb-2">
            Your selection
          </Text>
          {Object.keys(cart).length === 0 ? (
            <Text className="text-xs text-muted-foreground">
              You haven&apos;t added anything yet.
            </Text>
          ) : (
            <>
              {Object.entries(cart).map(([id, qty]) => {
                const item = menu.find((m) => m.id === id);
                if (!item) return null;
                return (
                  <View
                    key={id}
                    className="flex-row justify-between items-center mb-1"
                  >
                    <Text className="text-xs text-foreground">
                      {qty}x {item.name}
                    </Text>
                    <Text className="text-xs text-foreground font-semibold">
                      ${(qty * item.price).toFixed(2)}
                    </Text>
                  </View>
                );
              })}
              <View className="h-px bg-border my-2" />
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-xs text-muted-foreground">
                  Estimated total
                </Text>
                <Text className="text-base font-bold text-foreground">
                  $
                  {Object.entries(cart)
                    .reduce((sum, [id, qty]) => {
                      const item = menu.find((m) => m.id === id);
                      return item ? sum + qty * item.price : sum;
                    }, 0)
                    .toFixed(2)}
                </Text>
              </View>
              <TouchableOpacity className="bg-primary py-3 rounded-lg items-center">
                <Text className="text-primary-foreground font-semibold text-sm">
                  Place Order
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {!activeOrder && Object.keys(cart).length === 0 && (
          <View className="items-center justify-center py-12">
            <Package size={48} className="text-muted-foreground mb-4" />
            <Text className="text-lg font-semibold text-foreground">
              No active orders
            </Text>
            <Text className="text-sm text-muted-foreground text-center mt-2">
              Add items from the menu above to place your first order.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
