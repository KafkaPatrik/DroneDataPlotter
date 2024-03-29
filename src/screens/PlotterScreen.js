import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { getDatabase, ref, push } from 'firebase/database';

const screenWidth = Dimensions.get('window').width;

const Plotter = ({ route }) => {
  const { selectedMAC } = route.params;
  const database = getDatabase();
  const selectedMACRef = ref(database, `accelerometerReadings/${selectedMAC}`);
  console.log('Received MAC:', selectedMAC);
  const initialData = {
    datasets: [
      {
        data: [100,200,300,400],
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        strokeWidth: 6,
      },
      {
        data: [200,300,400,500],
        color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
        strokeWidth: 6,
      },
      {
        data: [150,250,350,450],
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        strokeWidth: 6,
      },
    ],
    legend: ['X', 'Y', 'Z'],
  };

  const [data, setData] = useState(initialData);

  useEffect(() => {
    const subscribeToAccelerometer = async () => {
      Accelerometer.addListener(({ x, y, z }) => {
        // Update the state with the new accelerometer data
        setData((prevData) => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: [...prevData.datasets[0].data.slice(1), x],
            },
            {
              ...prevData.datasets[1],
              data: [...prevData.datasets[1].data.slice(1), y],
            },
            {
              ...prevData.datasets[2],
              data: [...prevData.datasets[2].data.slice(1), z],
            },
          ],
        }));

        // Update the database with the latest accelerometer data
        push(selectedMACRef, { x, y, z });
      });

      await Accelerometer.setUpdateInterval(500); // Set the update interval
    };

    subscribeToAccelerometer();

    // Cleanup function
    return () => {
      Accelerometer.removeAllListeners();
    };
  }, [selectedMACRef]);

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Selected MAC: {selectedMAC}</Text>
      <LineChart
        data={data}
        width={Dimensions.get('window').width}
        height={Dimensions.get('window').height - 230}
        yAxisInterval={1}
        chartConfig={{
          fillShadowGradientTo: null,
          fillShadowGradient: 0,
          fillShadowGradientOpacity: 0,
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '2',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
      />
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
  subtitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Plotter;