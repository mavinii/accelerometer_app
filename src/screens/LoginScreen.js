import { Alert, KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../../firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/core';
import { Text } from 'react-native-paper'

const LoginScreen = () => {

  const [number, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const studentEmail = number + '@student.dorset-college.ie';

  const navigation = useNavigation();

  // This checks if the user is logged in or not
  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('Home');
      }
    });

    return unsubscribed;
  }, [])  

  // This function logs an existent user with the email and password provided
  const handleLogin = () => {
    auth;

    signInWithEmailAndPassword(auth, studentEmail, password)
      .then((userCredential) => {
        // Signed in 
        navigation.replace('Home');
      })

      // it gets the error code and message and displays them in the console
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        Alert.alert('Please, enter a valid email and password. If you don\'t have an account yet, please register first.');
      });
  }

  return (
    
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding">

    {/* Email and Password */}
    <View style={styles.inputContainer}>

      <View>
        <Text style={{fontSize: 19, fontWeight: 'normal'}}>Student Number:</Text>
        <TextInput style={styles.input} placeholder="12345@student.dorset-college.ie" keyboardType='numeric' maxLength={5} value={ number } onChangeText={ text => setEmail(text)} />       
      </View>

      <View>
        <Text style={{fontSize: 19, fontWeight: 'normal', marginTop: 15}}>Password:</Text>
        <TextInput style={styles.input} placeholder="Password" value={ password } onChangeText={ text => setPassword( text )} secureTextEntry />
      </View>
    </View>

    {/* Buttons */}
    <View style={styles.buttonContainer}>

      {/* Login button */}
      <TouchableOpacity
        onPress={handleLogin}
        style={styles.button}
      >
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

      <Text style={{textAlign: 'center', marginTop: 15, fontSize: 16, fontWeight: 'normal'}} >
        Don't have an account yet?
      </Text>

      {/* Register button */}
      <TouchableOpacity
        onPress={ () => navigation.navigate('Register') }
        style={[styles.button, styles.buttonOutline]} >

        <Text style={styles.buttonOutlineText}>REGISTER</Text>
      </TouchableOpacity>

    </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#eee',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputContainer: {
      width: '80%',
    },
    input: {
      backgroundColor: '#fff',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#2e64e5',
      marginTop: 8,

    },
    buttonContainer: {
      width: '80%',
      justifyContent: 'center',
      alignContent: 'center',
      marginTop: 30,
    },
    button: {
      backgroundColor: '#2e64e5',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonOutline: {
      backgroundColor: '#fff',
      borderWidth: 1,
      marginTop: 8,
      borderColor: '#2e64e5',
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16,
    },
    buttonOutlineText: {
      color: '#2e64e5',
      textAlign: 'center',
      fontSize: 16,
    }
})