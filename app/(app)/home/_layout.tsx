import { Stack, Tabs } from "expo-router";
import React from "react";

function HomeLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="matches" options={{ tabBarLabel: "Matches" }} />
      <Tabs.Screen name="messages" options={{ tabBarLabel: "Messages" }} />
      <Tabs.Screen name="account" options={{ tabBarLabel: "Account" }} />
    </Tabs>
  );
}

export default HomeLayout;