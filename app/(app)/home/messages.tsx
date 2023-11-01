import React from "react";
import { StyleSheet, Text, View } from "react-native";

function MessagesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages Screen</Text>
    </View>
  );
}

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
