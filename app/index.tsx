import { ThemeToggle } from "@/components/ThemeToggle";
import { useRouter } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/(tabs)");
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {console.log("SignInScreen rendered")}
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingVertical: 32,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 items-center justify-center">
            {/* Card */}
            <View className="w-full bg-card rounded-3xl p-6 shadow-soft-3 border border-border">
              {/* Header */}
              <View className="flex-row justify-between items-center mb-8">
                <View className="w-12 h-12 rounded-2xl bg-primary items-center justify-center">
                  <Text className="text-primary-foreground text-xl font-bold">
                    NA
                  </Text>
                </View>
                <ThemeToggle />
              </View>

              <Text className="text-2xl font-bold text-foreground mb-1">
                Nugen Atria
              </Text>
              <Text className="text-sm text-muted-foreground mb-8">
                Hotel Management System
              </Text>

              {/* Email */}
              <View className="mb-4">
                <Text className="text-xs font-medium text-muted-foreground mb-2">
                  Email Address
                </Text>
                <View className="flex-row items-center bg-background border border-border rounded-2xl px-4 py-3">
                  <TextInput
                    placeholder="Enter your email"
                    placeholderTextColor="#a1a1aa"
                    keyboardType="email-address"
                    className="flex-1 text-foreground"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Password */}
              <View className="mb-2">
                <Text className="text-xs font-medium text-muted-foreground mb-2">
                  Password
                </Text>
                <View className="flex-row items-center bg-background border border-border rounded-2xl px-4 py-3">
                  <TextInput
                    placeholder="Enter your password"
                    placeholderTextColor="#a1a1aa"
                    secureTextEntry
                    className="flex-1 text-foreground"
                  />
                </View>
              </View>

              <TouchableOpacity className="self-end mb-6">
                <Text className="text-xs font-semibold text-primary">
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              {/* Sign In Button */}
              <TouchableOpacity
                className="bg-primary rounded-2xl py-3.5 items-center mb-4"
                onPress={handleSignIn}
              >
                <Text className="text-primary-foreground font-semibold text-base">
                  Sign In
                </Text>
              </TouchableOpacity>

              {/* Divider */}
              <View className="flex-row items-center my-3">
                <View className="flex-1 h-px bg-border" />
                <Text className="mx-3 text-xs text-muted-foreground">OR</Text>
                <View className="flex-1 h-px bg-border" />
              </View>

              <View className="flex-row justify-center mt-1">
                <Text className="text-xs text-muted-foreground">
                  Don&apos;t have an account?{" "}
                </Text>
                <TouchableOpacity>
                  <Text className="text-xs font-semibold text-primary">
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Footer */}
            <View className="mt-8">
              <Text className="text-[11px] text-muted-foreground text-center">
                © 2024 Nugen Atria. All rights reserved.
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

