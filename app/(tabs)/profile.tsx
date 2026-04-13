import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import API_BASE_URL from "../../constants/api";

// ─── Storage keys ─────────────────────────────
const KEYS = {
  conditions: "user_health_conditions",
  profile: "user_profile_info",
};

// ─── Conditions ───────────────────────────────
const ALL_CONDITIONS = [
  { key: "diabetes", label: "Diabetes", icon: "🩸", desc: "Type 1, Type 2" },
  { key: "hypertension", label: "Hypertension", icon: "❤️", desc: "High BP" },
  {
    key: "sensitive_skin",
    label: "Sensitive Skin",
    icon: "🌿",
    desc: "Skin issues",
  },
  {
    key: "hormonal_issues",
    label: "Hormonal Issues",
    icon: "⚗️",
    desc: "PCOS, thyroid",
  },
  {
    key: "food_intolerance",
    label: "Food Intolerance",
    icon: "🌾",
    desc: "Lactose, gluten",
  },
  {
    key: "pregnancy",
    label: "Pregnancy",
    icon: "🤱",
    desc: "Currently pregnant",
  },
  { key: "kidney_disease", label: "Kidney Disease", icon: "🫘", desc: "CKD" },
  {
    key: "liver_disease",
    label: "Liver Disease",
    icon: "🟤",
    desc: "Hepatitis",
  },
  {
    key: "heart_disease",
    label: "Heart Disease",
    icon: "💊",
    desc: "Cardiac issues",
  },
];

// ─── Storage helpers ─────────────────────────
const persistConditions = async (conditions: string[]) => {
  await AsyncStorage.setItem(KEYS.conditions, JSON.stringify(conditions));
};

const readConditions = async () => {
  const val = await AsyncStorage.getItem(KEYS.conditions);
  return val ? JSON.parse(val) : [];
};

const persistProfile = async (profile: any) => {
  await AsyncStorage.setItem(KEYS.profile, JSON.stringify(profile));
};

const readProfile = async () => {
  const val = await AsyncStorage.getItem(KEYS.profile);
  return val ? JSON.parse(val) : null;
};

// ─── MAIN COMPONENT ──────────────────────────
export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    memberSince: "",
  });

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [profileSaved, setProfileSaved] = useState(false);

  const [editModal, setEditModal] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);

  // Load saved data
  useEffect(() => {
    (async () => {
      const conds = await readConditions();
      if (conds.length > 0) setSelected(new Set(conds));

      const prof = await readProfile();
      if (prof) {
        setUser((p) => ({ ...p, ...prof }));
        setEditName(prof.name);
        setEditEmail(prof.email);
      }
      const storedUser = await AsyncStorage.getItem("user");

      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setEditName(parsed.name);
        setEditEmail(parsed.email);
      }
      // 🔥 FETCH conditions from backend
      const token = await AsyncStorage.getItem("token");

      if (token) {
        try {
          const res = await axios.get(`${API_BASE_URL}/get-profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.data.conditions) {
            setSelected(new Set(res.data.conditions));
          }
        } catch (err) {
          console.log("Error fetching profile:", err);
        }
      }
    })();
  }, []);

  // Toggle condition
  const toggle = (key: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      persistConditions(Array.from(next));
      return next;
    });
    setProfileSaved(false);
  };

  // Save health profile
  const saveHealthProfile = async () => {
    const token = await AsyncStorage.getItem("token");

    await axios.post(`${API_BASE_URL}/save-profile`, Array.from(selected), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setProfileSaved(true);

    Alert.alert("Saved", "Health profile updated!");
  };

  // Save profile
  const handleSaveProfile = async () => {
    const updated = { ...user, name: editName, email: editEmail };
    setUser(updated);
    await persistProfile(updated);
    setEditModal(false);
  };

  return (
    <ScrollView style={S.container}>
      <View style={S.content}>
        <Text style={S.name}>{user.name}</Text>
        <Text style={S.email}>{user.email}</Text>

        {/* Stats */}
        <View style={S.statsRow}>
          <View style={S.statCard}>
            <Text style={S.statLabel}>Member Since</Text>
            <Text style={S.statVal}>{user.memberSince}</Text>
          </View>
        </View>

        {/* Buttons */}

        <TouchableOpacity
          style={[S.btn, { backgroundColor: "#EB5757" }]}
          onPress={async () => {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("user");
            router.replace("/auth");
          }}
        >
          <Text style={S.btnText}>Logout</Text>
        </TouchableOpacity>

        {/* Conditions */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>My Health Conditions</Text>

          {ALL_CONDITIONS.map((c) => {
            const on = selected.has(c.key);

            return (
              <TouchableOpacity
                key={c.key}
                style={[S.condRow, on && S.condRowOn]}
                onPress={() => toggle(c.key)}
              >
                <View style={S.condLeft}>
                  <Text style={S.condIcon}>{c.icon}</Text>
                  <View>
                    <Text style={S.condLabel}>{c.label}</Text>
                    <Text style={S.condDesc}>{c.desc}</Text>
                  </View>
                </View>

                <Switch value={on} onValueChange={() => toggle(c.key)} />
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            style={[S.saveHealthBtn, profileSaved && S.saveHealthBtnDone]}
            onPress={saveHealthProfile}
          >
            <Text style={S.btnText}>
              {profileSaved ? "✓ Saved" : "Save Health Profile"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Edit Modal */}
      <Modal visible={editModal} transparent animationType="slide">
        <View style={S.overlay}>
          <View style={S.modal}>
            <Text style={S.modalTitle}>Edit Profile</Text>

            <TextInput
              style={S.input}
              value={editName}
              onChangeText={setEditName}
            />

            <TextInput
              style={S.input}
              value={editEmail}
              onChangeText={setEditEmail}
            />

            <TouchableOpacity
              style={[S.btn, { backgroundColor: "#2F80ED" }]}
              onPress={handleSaveProfile}
            >
              <Text style={S.btnText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[S.btn, { backgroundColor: "#999" }]}
              onPress={() => setEditModal(false)}
            >
              <Text style={S.btnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

// ─── STYLES ─────────────────────────
const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6FA" },
  content: { alignItems: "center", paddingTop: 60 },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  name: { fontSize: 22, fontWeight: "600" },
  email: { color: "#777", marginBottom: 20 },

  statsRow: { flexDirection: "row", width: "50%", gap: 10 },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  statLabel: { fontSize: 12, color: "#888" },
  statVal: { fontWeight: "700" },

  btn: {
    width: "85%",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  btnText: { color: "#fff", fontWeight: "600" },

  section: { width: "90%", marginTop: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },

  condRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  condRowOn: { borderColor: "#27AE60", borderWidth: 2 },

  condLeft: { flexDirection: "row", alignItems: "center" },
  condIcon: { marginRight: 10 },
  condLabel: { fontWeight: "600" },
  condDesc: { fontSize: 12, color: "#777" },

  saveHealthBtn: {
    backgroundColor: "#1A1A2E",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  saveHealthBtnDone: { backgroundColor: "#27AE60" },

  overlay: { flex: 1, justifyContent: "center", backgroundColor: "#00000088" },
  modal: { backgroundColor: "#fff", margin: 20, padding: 20, borderRadius: 10 },
  modalTitle: { fontWeight: "700", marginBottom: 10 },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
});
