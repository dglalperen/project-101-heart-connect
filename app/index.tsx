import { Redirect } from "expo-router";
import React from "react";

function RootScreen() {
  return <Redirect href={"/login"} />;
}

export default RootScreen;
