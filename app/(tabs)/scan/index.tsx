import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ScanCategoryScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace("/")}
        >
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Scan Category</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>What are you scanning?</Text>
          <Text style={styles.subtitle}>
            Select a category to get the most accurate ingredient analysis for
            your product.
          </Text>
        </View>

        {/* Food */}
        <View style={styles.categoryCard}>
          <View style={styles.categoryHeader}>
            <View style={styles.iconCircle}>
              <Ionicons name="fast-food" size={28} color="#007AFF" />
            </View>
            <View style={styles.categoryTextContainer}>
              <Text style={styles.categoryTitle}>Scan Food Products</Text>
              <Text style={styles.categoryDescription}>
                Check for additives, sugars, and allergens.
              </Text>
            </View>
          </View>

          <View style={styles.imageContainer}>
            <View style={styles.foodImagePlaceholder}>
              <Ionicons name="nutrition" size={60} color="#FFFFFF" />
            </View>
          </View>

          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => router.push("/scan/food")}
          >
            <Text style={styles.selectButtonText}>Select Food</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Personal Care */}
        <View style={styles.categoryCard}>
          <View style={styles.categoryHeader}>
            <View style={styles.iconCircle}>
              <Ionicons name="water" size={28} color="#007AFF" />
            </View>
            <View style={styles.categoryTextContainer}>
              <Text style={styles.categoryTitle}>Scan Personal Care</Text>
              <Text style={styles.categoryDescription}>
                Analyze toxins and irritants in skincare.
              </Text>
            </View>
          </View>

          <View style={styles.imageContainer}>
            <View style={styles.personalCareImagePlaceholder}>
              <Ionicons name="sparkles" size={50} color="#FFFFFF" />
            </View>
          </View>

          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => router.push("/scan/cosmetic")}
          >
            <Text style={styles.selectButtonText}>
              Select Personal Care
            </Text>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Info */}
        <View style={styles.bottomInfo}>
          <Ionicons
            name="information-circle"
            size={20}
            color="#007AFF"
            style={{ marginRight: 12, marginTop: 2 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.infoText}>
              Point your camera at the barcode for instant analysis.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  placeholder: {
    width: 36,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titleSection: {
    marginBottom: 30,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  categoryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  categoryHeader: {
    flexDirection: "row",
    marginBottom: 16,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  categoryTextContainer: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 15,
    color: "#666",
  },
  imageContainer: {
    marginBottom: 16,
  },
  foodImagePlaceholder: {
    height: 140,
    backgroundColor: "#4A7C59",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  personalCareImagePlaceholder: {
    height: 140,
    backgroundColor: "#D4A484",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  selectButton: {
    backgroundColor: "#007AFF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 14,
    gap: 8,
  },
  selectButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
  },
  bottomInfo: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginTop: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
  },
});
