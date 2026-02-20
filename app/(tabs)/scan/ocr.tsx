/*import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function OCRScreen() {
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
    setText("");

    const formData = new FormData();
    formData.append("file", {
      uri: uri,
      name: "image.jpg",
      type: "image/jpeg",
    } as any);

    try {
      const res = await fetch("http://192.168.1.37:8000/ocr-analyze", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await res.json();
      setText(data.extracted_text || "No text found");
    } catch (err) {
      console.log(err);
      setText("Error connecting to server");
    }

    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="Choose Image for OCR" onPress={pickImage} />

      {image && (
        <Image source={{ uri: image }} style={{ width: 250, height: 250, marginTop: 20 }} />
      )}

      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}

      {text !== "" && (
        <View style={styles.resultBox}>
          <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Extracted Text:</Text>
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
});*/



import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function OCRScreen() {
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
    setText("");

    const formData = new FormData();
    formData.append("file", {
      uri: uri,
      name: "photo.jpg",
      type: "image/jpeg",
    } as any);

    try {
      // 🔹 STEP 1: OCR
      const ocrRes = await fetch("http://192.168.1.37:8000/ocr-analyze", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      const ocrData = await ocrRes.json();
      const extractedText = ocrData.extracted_text;

      if (!extractedText) {
        setText("No text detected");
        setLoading(false);
        return;
      }

      // 🔹 STEP 2: Send OCR text to analyze model
      const analyzeRes = await fetch("http://192.168.1.37:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients: extractedText,
        }),
      });

      const analyzeData = await analyzeRes.json();

      // 🔹 STEP 3: Show result
      if (analyzeData.harmful_ingredients.length === 0) {
        setText("✅ No harmful additives detected");
      } else {
        let resultText = "⚠ Harmful Additives Detected:\n\n";

        analyzeData.harmful_ingredients.forEach((item: any) => {
          resultText += `• ${item.ingredient}\n`;
        });

        setText(resultText);
      }

    } catch (error) {
      console.log(error);
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
          <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
            Result:
          </Text>
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