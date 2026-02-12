import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ScanCategoryScreen() {
  const router = useRouter();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // Fade animation
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const AnimatedCard = ({ children }: any) => (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [
          {
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [30, 0],
            }),
          },
        ],
      }}
    >
      {children}
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace("/")}>
          <Ionicons name="chevron-back" size={28} color="#1F2A33" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Scan Category</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>What are you scanning?</Text>
          <Text style={styles.subtitle}>
            Select a category to get the most accurate ingredient analysis.
          </Text>
        </View>

        {/* FOOD CARD */}
        <AnimatedCard>
          <View style={styles.categoryCard}>
            <View style={styles.categoryHeader}>
              <View style={styles.iconCircle}>
                <Ionicons name="fast-food" size={28} color="#6B9AC4" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.categoryTitle}>Scan Food Products</Text>
                <Text style={styles.categoryDescription}>
                  Check for additives, sugars, and allergens.
                </Text>
              </View>
            </View>

            <View style={styles.imagePlaceholderFood}>
              <Ionicons name="nutrition" size={60} color="#fff" />
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.selectButton}
              onPress={() => router.push("/scan/food")}
            >
              <Text style={styles.selectButtonText}>Select Food</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </AnimatedCard>

        {/* COSMETIC CARD */}
        <AnimatedCard>
          <View style={styles.categoryCard}>
            <View style={styles.categoryHeader}>
              <View style={styles.iconCircle}>
                <Ionicons name="water" size={28} color="#6B9AC4" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.categoryTitle}>Scan Personal Care</Text>
                <Text style={styles.categoryDescription}>
                  Analyze toxins and irritants in skincare.
                </Text>
              </View>
            </View>

            <View style={styles.imagePlaceholderCare}>
              <Ionicons name="sparkles" size={50} color="#fff" />
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.selectButton}
              onPress={() => router.push("/scan/cosmetic")}
            >
              <Text style={styles.selectButtonText}>Select Personal Care</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </AnimatedCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5EDF1",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },

  headerTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#1F2A33",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  titleSection: {
    marginBottom: 30,
  },

  mainTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 28,
    color: "#1F2A33",
    marginBottom: 10,
  },

  subtitle: {
    fontFamily: "Poppins",
    fontSize: 15,
    color: "#4B5B66",
  },

  categoryCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  categoryHeader: {
    flexDirection: "row",
    marginBottom: 16,
  },

  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E5EDF1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  categoryTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#1F2A33",
  },

  categoryDescription: {
    fontFamily: "Poppins",
    fontSize: 14,
    color: "#4B5B66",
  },

  imagePlaceholderFood: {
    height: 140,
    backgroundColor: "#6B9AC4",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  imagePlaceholderCare: {
    height: 140,
    backgroundColor: "#96C2DB",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  selectButton: {
    backgroundColor: "#6B9AC4",
    paddingVertical: 16,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  selectButtonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#fff",
  },
});
