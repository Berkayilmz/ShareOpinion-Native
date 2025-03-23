# 📱 React Native Firebase Basic App

This project was created to learn the fundamental concepts of mobile app development using **React Native (Expo)** and **Firebase** services.

## 🎯 Purpose

The goal of this application is to practice the basic functionalities of Firebase and to build a solid foundation for user management in future projects. It is created **solely for learning and development purposes**.

## 🔧 Technologies Used

- ⚛️ React Native (Expo)
- 🔥 Firebase Authentication
- 🔐 Firebase Email Verification
- 📬 Password Reset via Email
- 🗃️ Firestore (User-specific notes)
- 📦 React Navigation

## ✨ Features

- ✅ User registration
- 🔐 Login with email and password
- 📩 Email verification support
- 🔄 Password reset via registered email
- 🔒 Secure session management with Firebase Authentication
- 📝 Create, update, and delete personal notes using Firestore collections
- 📌 Notes cannot be created without logging in
- 🔒 Only email-verified users can add notes

## 🧠 What I Learned

- Firebase Auth operations (`createUserWithEmailAndPassword`, `signInWithEmailAndPassword`, `sendEmailVerification`, `sendPasswordResetEmail`, `signOut`)
- Creating and reading user-specific data with Firestore
- Updating user profile data (`updateProfile`, `updateEmail`)
- Designing forms and custom components with React Native (`CustomButton`, `CustomTextInput`, `CustomIcon`)
- Handling email verification logic

## 📁 Project Structure
src/

    ├── components/        # Custom UI components

    ├── screens/           # Screen components (Login, Signup, Profile, Home, Note)

    ├── firebaseConfig.js  # Firebase configuration file

## 🔒 Security Notice

This app is **not compliant with GDPR or similar data privacy regulations** and **should not be used for storing sensitive data**. It is only intended for learning and development.

## 🚀 Future Plans

This foundational app will serve as a base for more advanced applications that require **user registration and session management** features.