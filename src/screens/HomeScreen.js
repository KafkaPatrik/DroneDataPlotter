import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native'; // Import TextInput from 'react-native'
import { getDatabase, ref, push, onValue } from 'firebase/database';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const HomeScreen = ({ navigation }) => {
  const [droneMAC, setDroneMAC] = useState('');
  const [droneMACList, setDroneMACList] = useState([]);

  useEffect(() => {
    const database = getDatabase();
    const dbRef = ref(database, 'droneMACList');

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setDroneMACList(Object.values(data));
      }
    });
  }, []);

  const handleAddDrone = () => {
    if (droneMAC.trim() !== '') {
      const database = getDatabase();
      const dbRef = ref(database, 'droneMACList');
      push(dbRef, droneMAC.trim());
      setDroneMAC('');
    }
  };

  const handleSelectMAC = (selectedMAC) => {
    navigation.navigate('Plotter', { selectedMAC });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Drone Plot</Text>
      <Text style={styles.subtitle}>Real-Time Drone Insights</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Drone MAC"
          onChangeText={(text) => setDroneMAC(text)}
          value={droneMAC}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddDrone}>
          <Text style={styles.buttonText}>Add Drone</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.readingText}>Drone MAC List:</Text>
        <FlatList
          data={droneMACList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectMAC(item)}>
              <Text style={styles.macText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
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
    marginTop: 300,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 18,
    borderWidth: 3,
    borderColor: '#3498db',
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 15,
    marginLeft: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContainer: {
    borderWidth: 1,
    borderColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  readingText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  macText: {
    fontSize: 18,
    marginVertical: 5,
  },
  loginButton: {
    backgroundColor: '#3498db',
    padding: 15,
    marginTop: 10,
    borderRadius: 5,
  },
});

export default HomeScreen;
