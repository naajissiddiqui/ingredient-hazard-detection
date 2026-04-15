import API_BASE_URL from "@/constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
export default function OCRScreen() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permission required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      sendToOCR(uri);
    }
  };

  const sendToOCR = async (uri: string) => {
    setLoading(true);

    const formData = new FormData();

    formData.append("file", {
      uri: uri,
      name: "image.jpg",
      type: "image/jpeg",
    } as any);

    try {
      const response = await fetch(`${API_BASE_URL}/ocr-analyze`, {
        method: "POST",
        body: formData,
      });

      const ocrData = await response.json();

      console.log("OCR DATA:", ocrData);

      const extractedText = ocrData.extracted_text;
      console.log("OCR TEXT:", extractedText);

      // 🔹 STEP 2: GET USER CONDITIONS FROM PROFILE
      const storedConditions = await AsyncStorage.getItem(
        "user_health_conditions",
      );

      const userConditions = storedConditions
        ? JSON.parse(storedConditions)
        : [];

      console.log("USER CONDITIONS:", userConditions);

      const analyzeRes = await fetch(`${API_BASE_URL}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients: extractedText,
          user_conditions: userConditions,
        }),
      });

      const analyzeData = await analyzeRes.json();
      console.log("FINAL ANALYSIS:", analyzeData);

      router.replace({
        pathname: "/scan/results",
        params: {
          analysis: JSON.stringify(analyzeData),
        },
      });
    } catch (error) {
      console.log("OCR ERROR:", error);
      setText("Server error");
    }

    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="Choose Image for OCR" onPress={pickImage} />

      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 250, height: 250, marginTop: 20 }}
        />
      )}

      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}

      {text !== "" && (
        <View style={styles.resultBox}>
          <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Result:</Text>
          <Text>{text}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  resultBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
});
