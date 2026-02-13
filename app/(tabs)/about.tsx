import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

export default function AboutScreen() {
  const { width } = useWindowDimensions();
  const isDesktop = width > 900;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const animatedStyle = {
    opacity: fadeAnim,
    transform: [
      {
        translateY: fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [40, 0],
        }),
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Animated.View style={animatedStyle}>
        {/* IMAGE CARD */}
        <View style={[styles.imageCard, { width: isDesktop ? "70%" : "92%" }]}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e",
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        {/* CONTENT */}
        <View
          style={[styles.wrapper, { paddingHorizontal: isDesktop ? 80 : 24 }]}
        >
          <Text style={[styles.title, { fontSize: isDesktop ? 60 : 34 }]}>
            Empowering your choices{"\n"}
            <Text style={styles.titleBlue}>with science</Text>
          </Text>

          <Text style={[styles.subtitle, { fontSize: isDesktop ? 22 : 16 }]}>
            We believe everyone has the right to know exactly what they are
            putting on their skin and in their bodies. Our mission is to turn
            complex chemical jargon into clear, actionable insights.
          </Text>

          <Text style={[styles.subtitle, { fontSize: isDesktop ? 22 : 16 }]}>
            By bridging scientific research and everyday shopping decisions, we
            provide the safety layer modern living demands.
          </Text>

          {/* AI CARD */}
          <View style={styles.card}>
            <Ionicons name="sparkles" size={32} color="#6B9AC4" />
            <Text style={styles.cardTitle}>AI-Driven Safety Engine</Text>

            <Text style={styles.cardText}>
              Our AI continuously scans global regulatory databases and
              scientific literature to provide accurate ingredient risk scores.
            </Text>
          </View>

          {/* FEATURES */}
          <View
            style={[
              styles.featureRow,
              { flexDirection: isDesktop ? "row" : "column" },
            ]}
          >
            <Feature
              icon="shield-checkmark"
              title="Unbiased Ratings"
              text="Independent and based on verified research."
            />
            <Feature
              icon="flash"
              title="Real-Time Results"
              text="Instant AI safety assessments."
            />
            <Feature
              icon="leaf"
              title="Eco-Conscious"
              text="Highlights harmful environmental ingredients."
            />
          </View>

          {/* FOOTER */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>DEVELOPED FOR PUBLIC HEALTH</Text>

            <View style={styles.footerIcons}>
              <Ionicons name="globe-outline" size={26} color="#9CA3AF" />
              <Ionicons name="mail-outline" size={26} color="#9CA3AF" />
              <Ionicons name="share-social-outline" size={26} color="#9CA3AF" />
            </View>

            <Text style={styles.version}>Version 1.0.0 (2025)</Text>
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

function Feature({ icon, title, text }: any) {
  return (
    <View style={styles.featureCard}>
      <Ionicons name={icon} size={30} color="#6B9AC4" />
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  imageCard: {
    marginTop: 40,
    marginBottom: 30,
    alignSelf: "center",
    borderRadius: 24,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },

  image: {
    width: "100%",
    height: 240,
  },

  wrapper: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 1100,
  },

  title: {
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    color: "#1F2A33",
    marginBottom: 20,
  },

  titleBlue: {
    color: "#6B9AC4",
  },

  subtitle: {
    fontFamily: "Poppins",
    textAlign: "center",
    color: "#4B5B66",
    lineHeight: 26,
    marginBottom: 16,
  },

  card: {
    backgroundColor: "#EEF3F7",
    padding: 30,
    borderRadius: 22,
    marginTop: 40,
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },

  cardTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 24,
    marginTop: 10,
    color: "#1F2A33",
  },

  cardText: {
    fontFamily: "Poppins",
    textAlign: "center",
    color: "#4B5B66",
    marginTop: 10,
    fontSize: 16,
  },

  featureRow: {
    gap: 28,
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  featureCard: {
    backgroundColor: "#F5F7FA",
    padding: 28,
    borderRadius: 22,
    width: 280,
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  featureTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    marginTop: 10,
    color: "#1F2A33",
  },

  featureText: {
    fontFamily: "Poppins",
    fontSize: 14,
    textAlign: "center",
    color: "#4B5B66",
    marginTop: 6,
  },

  footer: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 60,
  },

  footerText: {
    fontFamily: "Poppins-SemiBold",
    color: "#9CA3AF",
    marginBottom: 14,
    fontSize: 14,
  },

  footerIcons: {
    flexDirection: "row",
    gap: 30,
    marginBottom: 14,
  },

  version: {
    fontFamily: "Poppins",
    color: "#9CA3AF",
    fontSize: 12,
  },
});
