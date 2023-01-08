import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { getAuth } from 'firebase/auth';
import { firebaseApp, firestore } from '../../firebaseConfig';
import { collection, getDoc, doc, setDoc, getFirestore, updateDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const bd = getFirestore(firebaseApp);

const accelerometer_data_array = [];

// It creates a document with student email in the database with the accelerometer data
const uploadAccelerometerData = async () => {
  try {

    // FIXME: updateDoc is not working, it is not updating the data in the database
    await setDoc(doc(bd, "users", auth.currentUser?.email, "accelerometer", "data"), {
      accelerometer_data: accelerometer_data_array,
    });
    console.log("Document successfully written!");
  }
  catch (error) {
    console.error("Error writing document: ", error);
  }
}

export default function HomeScreen() {

  // Accelerometer Data
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  // const [accelSpeed, setAccelSpeed] = useState(0);
  const [subscription, setSubscription] = useState(null);

  const _fast = () => Accelerometer.setUpdateInterval(16);
  const _slow = () => Accelerometer.setUpdateInterval(1000);

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener((accelerometerData) => {

        setData(accelerometerData);

        accelerometer_data_array.push({
          x: accelerometerData.x,
          y: accelerometerData.y,
          z: accelerometerData.z,
        });
        
        console.log(accelerometer_data_array.length);
        
        // TODO: increase the number of data points to 1000
        if (accelerometer_data_array.length == 200) {
          console.log("Data has been uploaded");
          uploadAccelerometerData();
          
          Alert.alert("Data has been uploaded! Check out the Leaderboard to see your ranking.")

          accelerometer_data_array.length = 0;

          Accelerometer.removeAllListeners();
        }
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return (

<View style={styles.container}>
      <Text style={styles.text}>in gs where 1g = 9.81 m/s^2</Text>
      <Text style={styles.homeScreenTitle}>Accelerometer Data</Text>

    <View>
      <Text style={styles.homeScreenSubTitle}>X axis: </Text>
      <Text>{x}</Text>
      
      <Text style={styles.homeScreenSubTitle}>Y axis: </Text>
      <Text>{y}</Text>
      
      <Text style={styles.homeScreenSubTitle}>Z axis: </Text>
      <Text>{z}</Text>
    </View>

    <View style={styles.buttonContainer}>

        <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
            <Text style={styles.buttonText}>{subscription ? 'On' : 'Off'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
            <Text style={styles.buttonText}>Slow</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={_fast} style={styles.button}>
            <Text style={styles.buttonText}>Fast</Text>
        </TouchableOpacity>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: '#000',
      fontSize: 11,
    },
    homeScreenTitle: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#000000",
      textAlign: "center",
    },
    homeScreenSubTitle: {
      textAlign: "center",
      marginTop: 20,
      fontSize: 18,
      fontWeight: "bold",
      color: "#000000",
    },
    speedTitle: {
      marginTop: 30,
      fontSize: 30,
      fontWeight: "bold",
      color: "#000000",
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'stretch',
      marginTop: 15,
    },
    button: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2e64e5',
      borderRadius: 10,
      height: 40,
      marginHorizontal: 10,
    },
    middleButton: {
      marginHorizontal: 0,
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'normal',
      fontSize: 16,
    },
});