import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { getDatabase, ref, onValue, push } from "firebase/database";


const HomeScreen = ({ navigation }) => {
  const [droneMAC, setDroneMAC] = useState('');
  const [droneMACList, setDroneMACList] = useState([]);

  useEffect(() => {
    const database = getDatabase();
    const dbRef = ref(database, 'droneMACList');

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setDroneMACList(data);
      }
    });
  }, []);

  const handleAddDrone = () => {
    if (droneMAC.trim() !== '') {
      // Add the drone's MAC to the database
      const database = getDatabase();
      const dbRef = ref(database, 'droneMACList');
      push(dbRef, droneMAC.trim());

      // Clear the input field after adding the drone
      setDroneMAC('');
    }
  };

  const handleGoToLogin = () => {
    console.log("Navigating to Login");
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Drone Plot</Text>
      <Text style={styles.subtitle}>Real-Time Drone Insights</Text>

      <TextInput
        style={styles.input}
        placeholder="Drone MAC"
        onChangeText={(text) => setDroneMAC(text)}
        value={droneMAC}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddDrone}>
        <Text style={styles.buttonText}>Add Drone</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleGoToLogin}>
        <Text style={styles.buttonText}>Go to Login</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
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
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
