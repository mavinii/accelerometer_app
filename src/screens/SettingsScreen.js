import { useNavigation } from "@react-navigation/core";
import React, { useId, useState, useEffect } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../../firebaseConfig";
import { getFirestore, doc, getDocs, collection } from "firebase/firestore";

export default function SettingsScreen() {

  const navigation = useNavigation();
  const user = auth.currentUser;

  // TODO: A function that gets the user document from the database


  // TODO: A function that allows the user to update their details

  // function that signs out the user and takes them to the login screen
  const handleSignOut = () => {
    auth

      .signOut()
      .then(() => {
        navigation.navigate("Login");
        Alert.alert("You have logged out successfully");
      })

      // it gets the error code and message and displays them in the console
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <View style={styles.container}>

        {/* This displays the user details from database */}
        <View>
            <Text style={{fontSize: 22, fontWeight: '800', paddingBottom: 10}}>Student Details</Text>
            <Text style={{fontSize: 15, fontWeight: 'normal', paddingBottom: 5}}>Name: </Text>
            <Text style={{fontSize: 15, fontWeight: 'normal', paddingBottom: 5}}>Student ID: </Text>
            <Text style={{fontSize: 15, fontWeight: 'normal', paddingBottom: 5}}>Course: </Text>
            <Text style={{fontSize: 15, fontWeight: 'normal', paddingBottom: 5}}>Email: { auth.currentUser?.email }</Text>
        </View>

      {/* function that gets userDocument */}
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#2e64e5",
    marginTop: 30,
    width: "70%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
