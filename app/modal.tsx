import { ThemeToggle } from "@/components/ThemeToggle";
import { useRouter } from "expo-router";
import { Lock, Mail } from "lucide-react-native";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Navigate to dashboard after login
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-6 justify-center">
        {/* Theme Toggle */}
        <View className="absolute top-4 right-6">
          <ThemeToggle />
        </View>

        {/* Logo */}
        <View className="items-center mb-12">
          <View className="w-20 h-20 bg-primary rounded-3xl items-center justify-center mb-4">
            <Text className="text-primary-foreground text-4xl font-bold">
              NA
            </Text>
          </View>
          <Text className="text-2xl font-bold text-foreground">
            Nugen Atria
          </Text>
          <Text className="text-muted-foreground mt-2">
            Hotel Management System
          </Text>
        </View>

        {/* Login Form */}
        <View className="gap-4">
          {/* Email Input */}
          <View>
            <Text className="text-sm font-medium text-foreground mb-2">
              Email Address
            </Text>
            <View className="flex-row items-center bg-card border border-border rounded-xl px-4 py-3">
              <Mail className="text-muted-foreground mr-3" size={20} />
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor="#a1a1aa"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                className="flex-1 text-foreground"
              />
            </View>
          </View>

          {/* Password Input */}
          <View>
            <Text className="text-sm font-medium text-foreground mb-2">
              Password
            </Text>
            <View className="flex-row items-center bg-card border border-border rounded-xl px-4 py-3">
              <Lock className="text-muted-foreground mr-3" size={20} />
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor="#a1a1aa"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                className="flex-1 text-foreground"
              />
            </View>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity className="self-end">
            <Text className="text-primary font-medium">Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            className="bg-primary rounded-xl py-4 items-center mt-4"
          >
            <Text className="text-primary-foreground font-bold text-base">
              Sign In
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center my-6">
            <View className="flex-1 h-px bg-border" />
            <Text className="text-muted-foreground mx-4">OR</Text>
            <View className="flex-1 h-px bg-border" />
          </View>

          {/* Register Link */}
          <View className="flex-row justify-center">
            <Text className="text-muted-foreground">
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity>
              <Text className="text-primary font-bold">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View className="absolute bottom-8 self-center">
          <Text className="text-muted-foreground text-xs">
            © 2024 Nugen Atria. All rights reserved.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
