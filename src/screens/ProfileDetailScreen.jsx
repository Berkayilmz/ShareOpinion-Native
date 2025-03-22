import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebaseConfig'
import { signOut, updateProfile, updateEmail, sendPasswordResetEmail } from 'firebase/auth'
import { useNavigation } from "@react-navigation/native";

import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';

const ProfileDetailScreen = () => {

  const navigation = useNavigation();
  const user = auth.currentUser;
  const [newFirstName, setNewFirstName] = useState(null);
  const [newLastName, setNewLastName] = useState(null);
  const [newEmail, setNewEmail] = useState(null);

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
      
      await sendPasswordResetEmail(auth, user.email)
      .then(()=>{
        Alert.alert("Şifre sıfırlama talebi epostanıza gönderilmiştir.")
      })

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
      <View style={styles.inputWrapper}>
        <CustomTextInput
          placeholder={newFirstName}
          onChangeText={setNewFirstName}
        />
        <CustomTextInput
          placeholder={newLastName}
          onChangeText={setNewLastName}
        />
        <CustomTextInput
          placeholder={newEmail}
          onChangeText={setNewEmail}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <CustomButton
          title="Profil Bilgilerini Güncelle"
          backgroundColor="darkblue"
          borderColor="black"
          textColor="white"
          onPress={handleUpdateUser}
        />
        <CustomButton
          title="Şifre Güncelleme Talebi"
          backgroundColor="darkblue"
          borderColor="black"
          textColor="white"
          onPress={handleUpdatePassword}
        />
        <CustomButton
          title="Çıkış Yap"
          backgroundColor="darkred"
          borderColor="black"
          textColor="white"
          onPress={handleLogout}
        />
      </View>
    </View>

  )
}

export default ProfileDetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between", // input ortada, butonlar altta
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  inputWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1, // inputları ortala
    gap: 20
  },
  buttonWrapper: {
    paddingBottom: 20,
    gap: 10,
    alignItems: "center"
  },
});
