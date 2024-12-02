import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import userSession from './src/singleton/UserSession';
import themeManager from './src/observer/ThemeManager';
import UserFactory from './src/factory/UserFactory';
import { PayPalPayment, CreditCardPayment, PaymentContext } from './src/strategy/PaymentMethods';
import languageStrings from './src/language/LanguageStrings';
import styles from './src/styles/styles';
import PaymentCommand from './src/command/PaymentCommand';
import { UserContext } from './src/state/UserState';

const App = () => {
  const [theme, setTheme] = useState(themeManager.theme); // Temayı başlatma
  const [language, setLanguage] = useState(themeManager.language); // Dili başlatma
  const [paymentContext] = useState(new PaymentContext());
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [payments, setPayments] = useState([]);
  const [userContext] = useState(new UserContext()); // State Pattern'deki user context
  const [user, setUser] = useState(null); // Kullanıcıyı tutmak için (Admin/Guest)

  // Temayı ve dili gözlemlemek için useEffect ile observer'ı ekliyoruz
  useEffect(() => {
    themeManager.addObserver({
      updateSettings: (newTheme, newLanguage) => {
        setTheme(newTheme);  // Temayı güncelle
        setLanguage(newLanguage);  // Dili güncelle
      },
    });
  }, []);

  // Dil metinlerini almak için kullanılan fonksiyon
  const getLocalizedText = (key) => {
    return languageStrings[language][key];
  };

  // Kullanıcı girişi ve çıkışı (Factory ve State Pattern kullanarak)
  const handleLogin = (name, role) => {
    try {
      const newUser = UserFactory.createUser(name, role); // Factory Pattern ile Admin veya Guest yaratılıyor
      userSession.setUser(newUser);
      setUser(newUser); // Kullanıcı set ediliyor
      userContext.login(newUser.getDetails()); // State Pattern ile oturum açılıyor
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleLogout = () => {
    userContext.logout(); // State Pattern ile oturum kapama
    userSession.clearSession();
    setUser(null);
  };

  // Ödeme stratejileri
  const handlePayPal = () => {
    paymentContext.setStrategy(new PayPalPayment());
    setSelectedPaymentMethod('PayPal');
  };

  const handleCreditCard = () => {
    paymentContext.setStrategy(new CreditCardPayment());
    setSelectedPaymentMethod('Credit Card');
  };

  // Yeni Komut ile ödeme yapma
  const handlePaymentCommand = () => {
    if (!selectedPaymentMethod) {
      Alert.alert('Error', 'Please select a payment method before proceeding.');
      return;
    }

    const paymentCommand = new PaymentCommand(paymentContext, 100); // Sabit $100 ödeme
    paymentCommand.execute(); // Ödeme işlemi başlatılır
    setPayments([...payments, { method: selectedPaymentMethod, amount: 100 }]);
  };

  // Komutu geri alma (örneğin ödeme iptali)
  const handleUndoPayment = () => {
    // Eğer son ödeme iptal edilebilir durumdaysa komutu geri alırız
    if (payments.length > 0) {
      const lastPayment = payments[payments.length - 1];
      const paymentCommand = new PaymentCommand(paymentContext, lastPayment.amount);
      paymentCommand.undo(); // Ödeme işlemini geri alırız
      setPayments(payments.slice(0, -1)); // Ödemeyi listeden çıkarırız
    } else {
      Alert.alert('Info', 'No payment to undo.');
    }
  };

  // Tema değiştirme butonu için kullanılan fonksiyon
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';  // Tema durumu kontrolü
    themeManager.setTheme(newTheme);  // Yeni temayı ayarla
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'tr' : 'en';  // Dil durumu kontrolü
    themeManager.setLanguage(newLanguage);  // Yeni dili ayarla
  };

  return (
    <View style={[styles.container, { backgroundColor: theme === 'light' ? '#fff' : '#333' }]}>
      <Text style={[styles.title, { color: theme === 'light' ? '#000' : '#fff' }]}>
        {getLocalizedText('exampleTitle')}
      </Text>

      <View style={styles.buttonContainer}>
        {!user ? (
          <>
            <TouchableOpacity onPress={() => handleLogin('Sena', 'Admin')} style={styles.button}>
              <Text style={styles.buttonText}>{getLocalizedText('loginAsAdmin')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLogin('Erdem', 'Guest')} style={styles.button}>
              <Text style={styles.buttonText}>{getLocalizedText('loginAsGuest')}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.userText}>{user.getDetails()}</Text>
            <TouchableOpacity onPress={handleLogout} style={styles.button}>
              <Text style={styles.buttonText}>{getLocalizedText('logout')}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={toggleTheme} style={styles.button}>
          <Text style={styles.buttonText}>{`${getLocalizedText('themeToggle')} (Current: ${theme})`}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleLanguage} style={styles.button}>
          <Text style={styles.buttonText}>{`${getLocalizedText('languageToggle')} (Current: ${language})`}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handlePayPal} style={styles.button}>
          <Text style={styles.buttonText}>Pay with PayPal</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCreditCard} style={styles.button}>
          <Text style={styles.buttonText}>Pay with Credit Card</Text>
        </TouchableOpacity>
      </View>

      {selectedPaymentMethod && (
        <Text style={styles.selectedMethod}>{`${getLocalizedText('selectedMethod')}: ${selectedPaymentMethod}`}</Text>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handlePaymentCommand} style={styles.button}>
          <Text style={styles.buttonText}>{getLocalizedText('makePayment')}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleUndoPayment} style={styles.button}>
          <Text style={styles.buttonText}>Undo Last Payment</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{getLocalizedText('paymentHistory')}</Text>
      <FlatList
        style={styles.listContainer}
        data={payments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.paymentItem}>
            <Text>{item.method}: ${item.amount}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default App;
