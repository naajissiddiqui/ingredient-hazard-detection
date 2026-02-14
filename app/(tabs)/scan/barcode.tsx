import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function BarcodeScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const router = useRouter();
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>We need camera permission</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  const handleBarCodeScanned = async ({ data }: any) => {
    setScanned(true);

    console.log("Barcode:", data);

    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${data}.json`,
      );

      const json = await response.json();

      if (json.status === 1) {
        const ingredients = json.product.ingredients_text;

        console.log("Ingredients:", ingredients);

        console.log("Calling backend...");

        const backendResponse = await fetch(
          "http://192.168.1.104:8000/analyze",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ingredients: ingredients,
            }),
          },
        );

        console.log("Backend status:", backendResponse.status);

        const result = await backendResponse.json();

        console.log("Backend result:", result);

        console.log("Navigating now...");

        router.replace({
          pathname: "/scan/results",
          params: {
            analysis: JSON.stringify(result),
          },
        });
      } else {
        console.log("Product not found");
      }
    } catch (error) {
      console.log("BACKEND ERROR:", error);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e"],
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
