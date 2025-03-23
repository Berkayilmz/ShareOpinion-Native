import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebaseConfig'
import { signOut, updateProfile, updateEmail, sendPasswordResetEmail } from 'firebase/auth'
import { useNavigation } from "@react-navigation/native";

import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';

const ProfileDetailScreen = () => {
  const navigation = useNavigation();
  const user = auth.currentUser;
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate("HomeScreen");
    } catch (error) {
      Alert.alert("Çıkış Yapılamadı!");
      console.log(error);
    }
  }

  const handleUpdateUser = async () => {
    try {
      await updateProfile(user, {
        displayName: `${newFirstName} ${newLastName}`
      });

      await updateEmail(user, newEmail);

      Alert.alert("Profil bilgileri başarıyla güncellendi.");
      navigation.navigate("HomeScreen");

    } catch (error) {
      console.error("❌ Güncelleme sırasında hata oluştu:", error.message);
      Alert.alert("Hata", error.message);
    }
  }

  const handleUpdatePassword = async () => {
    try {
      await sendPasswordResetEmail(auth, user.email);
      Alert.alert("📧 Şifre sıfırlama epostası gönderildi.");
    } catch (error) {
      console.error("❌ Güncelleme sırasında hata oluştu:", error.message);
      Alert.alert("Hata", error.message);
    }
  }

  useEffect(() => {
    if (user?.displayName) {
      const parts = user.displayName.trim().split(" ");
      setNewLastName(parts.pop());
      setNewFirstName(parts.join(" "));
    }
    if (user?.email) {
      setNewEmail(user.email)
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profil Bilgileri</Text>

      <View style={styles.inputWrapper}>
        <CustomTextInput
          placeholder={newFirstName}
          onChangeText={setNewFirstName}
          value={newFirstName}
        />
        <CustomTextInput
          placeholder={newLastName}
          onChangeText={setNewLastName}
          value={newLastName}
        />
        <CustomTextInput
          placeholder={newEmail}
          onChangeText={setNewEmail}
          value={newEmail}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <CustomButton
          title="Bilgileri Güncelle"
          backgroundColor="#1E88E5"
          borderColor="#1565C0"
          textColor="white"
          onPress={handleUpdateUser}
        />
        <CustomButton
          title="Şifre Sıfırla"
          backgroundColor="#6A1B9A"
          borderColor="#4A148C"
          textColor="white"
          onPress={handleUpdatePassword}
        />
        <CustomButton
          title="Çıkış Yap"
          backgroundColor="#C62828"
          borderColor="#B71C1C"
          textColor="white"
          onPress={handleLogout}
        />
      </View>
    </View>
  )
}

export default ProfileDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#FAFAFA",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  inputWrapper: {
    flex: 1,
    justifyContent: "center",
    gap: 16,
    alignItems: "center"
  },
  buttonWrapper: {
    gap: 12,
    paddingBottom: 30,
    alignItems: "center"
  },
});