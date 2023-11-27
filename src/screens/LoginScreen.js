import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from '../../Firebase/Firebase';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH; // or getAuth();

  const signIn = async () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
        const user = userCredential.user;
        navigation.navigate('Home');
      })
      .catch((error) => {
        console.log(error);
        alert('Sign in failed: ' + error.message);
        setLoading(false);
      });
  }

  const signUp = async () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
        alert('Check your mails!');
        const user = userCredential.user;
        navigation.navigate('Home');
      })
      .catch((error) => {
        console.log(error);
        alert('Registration failed: ' + error.message);
        setLoading(false);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Drone Plot</Text>
        <Text style={styles.subtitle}>Real-Time Drone Insights</Text>
      </View>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="quadcopter" size={160} color="black" />
      </View>
      <View>
        <Text style={styles.titleLogin}>Login</Text>
      </View>
  
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      {loading ? (<ActivityIndicator size="large" color="#0000ff" />
      ) : (<>
        <TouchableOpacity style={styles.button} onPress={signIn}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={signUp}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </>)
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titleContainer: {
    width: '80%',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 44,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  titleLogin: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 5,
    alignItems: 'left',
    justifyContent: 'left',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    padding: 15,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#3498db',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#3498db',
    width: '80%',
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconContainer:{
    marginBottom: 20,
  }
});

export default LoginScreen;