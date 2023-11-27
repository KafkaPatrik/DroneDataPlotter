import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Plotter = ({ route }) => {
  // Extracting the selectedMAC parameter from the route
  const { selectedMAC } = route.params;

  // Add your plotting or data visualization logic here

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Drone Plotter</Text>
      <Text style={styles.subtitle}>Selected MAC: {selectedMAC}</Text>
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
});

export default Plotter;