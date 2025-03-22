import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native'
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebaseConfig"; 

import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import CustomIcon from "../components/CustomIcon";

const SignupScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    // const handleSignup = () => {
    //     createUserWithEmailAndPassword(auth, email, password)
    //         .then((userCredential) => {
    //             Alert.alert("Başarılı", "Kayıt işlemi başarılı!");
    //             navigation.navigate("HomeScreen")
    //         })
    //         .catch((error) => {
    //             Alert.alert("Hata", error.message);
    //             console.error("Kayıt Hatası: ", error);
    //         });

    //     const user = auth.currentUser;
    //     console.log(user);
    // };

    const handleSignup = async () => {
        try {
            if (password === confirmPassword) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                await updateProfile(user, {
                    displayName: `${firstName} ${lastName}`,
                })

                sendEmailVerification(user)

                Alert.alert("✅ Kayıt başarılı! Lütfen E-Postanıza gönderilen linkten E-Postanızı onaylayınız.")
            }else{
                Alert.alert("✅ Kayıt başarılı!", `Hoşgeldin ${firstName} ${lastName}`);
            }
            navigation.navigate("HomeScreen")
        } catch (error) {
            console.error("❌ Kayıt sırasında hata oluştu:", error.message);
            alert("Hata: " + error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <CustomIcon source={require('../../assets/person.png')} height={100} width={100} />
            </View>

            <View style={styles.inputContainer}>
                <CustomTextInput
                    backgroundColor="lightgrey"
                    borderColor="grey"
                    placeholder="İsim"
                    height={40}
                    onChangeText={setFirstName}
                    isPassword={false}
                />
                <CustomTextInput
                    backgroundColor="lightgrey"
                    borderColor="grey"
                    placeholder="Soyisim"
                    height={40}
                    onChangeText={setLastName}
                    isPassword={false}
                />
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
                    placeholder="Password"
                    height={40}
                    onChangeText={setPassword}
                    isPassword={true}
                />
                <CustomTextInput
                    backgroundColor="lightgrey"
                    borderColor="grey"
                    placeholder="Confirm Password"
                    height={40}
                    onChangeText={setConfirmPassword}
                    isPassword={true}
                />
                <CustomButton
                    title="Kayıt Ol"
                    backgroundColor="lightgrey"
                    borderColor="grey"
                    textColor="black"
                    height={40}
                    onPress={handleSignup} 
                />
            </View>

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