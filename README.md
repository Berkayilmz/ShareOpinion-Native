# 📱 React Native Firebase Temel Uygulama

Bu proje, **React Native (Expo)** ile **Firebase** servislerini kullanarak mobil uygulama geliştirme konusundaki temel kavramları öğrenmek amacıyla hazırlanmıştır.

## 🎯 Amaç

Bu uygulama, Firebase'in temel işlevlerini pratikte deneyimlemek ve ileride geliştirilecek projelerde kullanıcı yönetimi için sağlam bir temel oluşturmaktır. Uygulama yalnızca **öğrenme ve geliştirme amaçlı** hazırlanmıştır.

## 🔧 Kullanılan Teknolojiler

- ⚛️ React Native (Expo)
- 🔥 Firebase Authentication
- 🔐 Firebase Email Doğrulama
- 📬 Şifre Sıfırlama
- 🗃️ Firestore (Kullanıcıya özel notlar için)
- 📦 React Navigation

## ✨ Özellikler

- ✅ Yeni kullanıcı kaydı
- 🔐 E-posta ve şifre ile kullanıcı girişi
- 📩 E-posta doğrulama desteği
- 🔄 Kayıtlı e-posta ile şifre sıfırlama
- 🔒 Firebase Authentication ile güvenli oturum yönetimi
- 📝 Her kullanıcıya özel Firestore koleksiyonu üzerinden not ekleme, güncelleme ve silme
- 📌 Kullanıcı giriş yapmadan not eklenememesi
- 🔒 Sadece e-postası doğrulanmış kullanıcıların not ekleyebilmesi

## 🧠 Öğrenilenler

- Firebase Auth işlemleri (`createUserWithEmailAndPassword`, `signInWithEmailAndPassword`, `sendEmailVerification`, `sendPasswordResetEmail`, `signOut`)
- Firestore ile kullanıcıya özel veri oluşturma ve okuma
- Kullanıcı profil bilgilerini güncelleme (`updateProfile`, `updateEmail`)
- React Native ile form tasarımı, özel bileşenler (`CustomButton`, `CustomTextInput`, `CustomIcon`)
- Kullanıcı email doğrulama kontrolleri

## 📁 Proje Yapısı

src/
├── components/        # Özel UI bileşenleri
├── screens/           # Sayfa bileşenleri (Login, Signup, Profile, Home, Note)
├── firebaseConfig.js  # Firebase yapılandırma dosyası


## 🔒 Güvenlik Notu

Bu uygulama **KVKK ve diğer kullanıcı verisi politikalarına uygun değildir** ve **veri saklama amacıyla kullanılmamalıdır**. Sadece öğrenme ve geliştirme sürecinde kullanılmak içindir.

## 🚀 Gelecek Planlar

Bu temel uygulama, ileride geliştireceğim gerçek projeler için **kullanıcı kayıt ve oturum yönetimi işlemleri** açısından sağlam bir temel oluşturacaktır.

