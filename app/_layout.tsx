import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import useFontsLoader from "src/hooks/use-fonts-loader";

export const unstable_settings = {
  initialRouteName: "",
};

SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const loaded = useFontsLoader();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default RootLayout;
