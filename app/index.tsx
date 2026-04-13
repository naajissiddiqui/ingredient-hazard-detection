import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) setLoggedIn(true);
      setLoading(false);
    };

    checkLogin();
  }, []);

  if (loading) return null;

  return <Redirect href={loggedIn ? "/(tabs)" : "/auth"} />;
}
