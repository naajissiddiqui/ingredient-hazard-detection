import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";


interface ScanItem {
  id: number;
  product: string;
  date: string;
}

export default function ProfileScreen() {
  const [user, setUser] = useState({
    name: "Munira",
    email: "munira@email.com",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    totalScans: 125,
    memberSince: "January 2024",
  });

  const [scanHistory] = useState<ScanItem[]>([
    { id: 1, product: "Product A", date: "March 20, 2024" },
    { id: 2, product: "Product B", date: "March 15, 2024" },
    { id: 3, product: "Product C", date: "March 10, 2024" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [editedEmail, setEditedEmail] = useState(user.email);

  const handleSave = () => {
    setUser({
      ...user,
      name: editedName,
      email: editedEmail,
    });
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Image source={{ uri: user.image }} style={styles.avatar} />

        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statTitle}>Total Scans</Text>
            <Text style={styles.statValue}>{scanHistory.length}</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statTitle}>Member Since</Text>
            <Text style={styles.statValue}>{user.memberSince}</Text>
          </View>
        </View>

        {/* Buttons */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

        {/* Scan History */}
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Scan History</Text>

          {scanHistory.map((item) => (
            <View key={item.id} style={styles.historyItem}>
              <Text style={styles.productName}>{item.product}</Text>
              <Text style={styles.scanDate}>
                Scanned on: {item.date}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* EDIT MODAL */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            <TextInput
              style={styles.input}
              value={editedName}
              onChangeText={setEditedName}
              placeholder="Name"
            />

            <TextInput
              style={styles.input}
              value={editedEmail}
              onChangeText={setEditedEmail}
              placeholder="Email"
              keyboardType="email-address"
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },
  content: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 40,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
  },
  email: {
    fontSize: 16,
    color: "#777",
    marginBottom: 25,
  },

  statsContainer: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: "#fff",
    width: "48%",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },
  statTitle: {
    fontSize: 14,
    color: "#777",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "600",
  },

  editButton: {
    width: "85%",
    backgroundColor: "#2F80ED",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  logoutButton: {
    width: "85%",
    backgroundColor: "#EB5757",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  historyContainer: {
    width: "90%",
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  historyItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  productName: {
    fontSize: 16,
    fontWeight: "500",
  },
  scanDate: {
    fontSize: 13,
    color: "#777",
  },

  /* Modal */
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: "#2F80ED",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "#999",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
});
