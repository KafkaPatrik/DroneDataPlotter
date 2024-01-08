import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Accelerometer } from 'expo-sensors';  // Import Accelerometer

const screenWidth = Dimensions.get('window').width;

const Plotter = ({ route }) => {
  const { selectedMAC } = route.params;

  const initialData = {
    labels: ['0.0', '0.2', '0.4', '0.6', '0.8', '1'],
    datasets: [
      {
        data: [],  // Initialize with empty array for accelerometer data
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // line color
        strokeWidth: 6, // line width
      },
      {
        data: [150, 200, 350, 450, 600, 500],
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // line color
        strokeWidth: 6, // line width
      },
    ],
    legend: ['Accelerometer', 'ETH'],
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
              data: [...prevData.datasets[0].data.slice(1), x],  // Use x-axis value for accelerometer data
            },
            {
              ...prevData.datasets[1],
              data: [...prevData.datasets[1].data.slice(1), y],  // Use y-axis value for another line (you can change this)
            },
          ],
        }));
      });

      await Accelerometer.setUpdateInterval(1000); // Set the update interval (adjust as needed)
    };

    subscribeToAccelerometer();

    // Cleanup function
    return () => {
      Accelerometer.removeAllListeners();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Selected MAC: {selectedMAC}</Text>
      <LineChart
        data={data}
        width={Dimensions.get('window').width} // from react-native
        height={Dimensions.get('window').height - 195}
        yAxisLabel="$"
        yAxisSuffix="s"
        xAxisSuffix="s"
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