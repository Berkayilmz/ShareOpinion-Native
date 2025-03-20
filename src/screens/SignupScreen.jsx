import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; // 📌 Firebase auth'u içe aktar

import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import CustomIcon from "../components/CustomIcon";

const SignupScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                Alert.alert("Başarılı", "Kayıt işlemi başarılı!");
                navigation.navigate("HomeScreen")
            })
            .catch((error) => {
                Alert.alert("Hata", error.message);
                console.error("Kayıt Hatası: ", error);
            });
    };

    return (
        <View style={styles.container}>
            {/* Üstteki İkon */}
            <View style={styles.iconContainer}>
                <CustomIcon source={require('../../assets/person.png')} height={100} width={100} />
            </View>

            {/* Input ve Buton Alanı */}
            <View style={styles.inputContainer}>
                <CustomTextInput
                    backgroundColor="lightgrey"
                    borderColor="grey"
                    placeholder="E-Mail"
                    height={40}
                    onChangeText={setEmail}
                    isPassword={false}
                />
                <CustomTextInput
                    backgroundColor="lightgrey"
                    borderColor="grey"
                    placeholder="password"
                    height={40}
                    onChangeText={setPassword}
                    isPassword={true}
                />
                <CustomButton
                    title="Kayıt Ol"
                    backgroundColor="lightgrey"
                    borderColor="grey"
                    textColor="black"
                    height={40}
                    onPress={handleSignup} // 📌 Firebase Kayıt Fonksiyonu
                />
            </View>

            {/* Alt Boşluk */}
            <View style={styles.bottomSpace} />
        </View>
    );
};

export default SignupScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    iconContainer: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    inputContainer: {
        flex: 3,
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
    },
    bottomSpace: {
        flex: 1,
    }
});