import { Alert, KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/core';
import { Text } from 'react-native-paper'
import { collection, addDoc } from "firebase/firestore";

const RegisterScreen = () => {

  // Student Info
  const [student_name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [student_id, setStudentID] = useState('')
  const [student_course, setCourse] = useState('')
  const student_email = student_id + '@student.dorset-college.ie';
  
  const navigation = useNavigation();

    // This function creates a new user with the email and password provided
    const handleSignUp = () => {
      auth;

      try {
        createUserWithEmailAndPassword(auth, student_email, password)
        .then(async (userCredential) => {

          // Signed in
          const user = userCredential.user;
          
          // Add student info in a document in collection "users"
          const docRef = await addDoc(collection(db, "users"), {
            student_name: student_name,
            student_id: student_id,
            student_course: student_course,
            student_email: student_email,
          });
          console.log("Document written with ID: ", docRef.id);

          navigation.navigate('Home');
          
          // welcome user name with message
          Alert.alert(`Hi ${student_name}, Welcome. Please wait while we upload your in the database.`);                    
                    
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("Error while trying to create a student: ",errorCode ,errorMessage);
        });
      } catch(e) {
        Alert.alert("Please, all information must be filled in correctly.");
        console.log("Error while trying to create a student: ",e);
      }      
    }

  return (

    <KeyboardAvoidingView
    style={styles.container}
    behavior="padding">

    {/* Student Info */}
    <View style={styles.inputContainer}>

      <View>
        <Text style={{fontSize: 18, fontWeight: 'normal'}}>Student Name:</Text>
        <TextInput style={styles.input} placeholder="John Smith" value={ student_name } onChangeText={ text => setName(text)} />       
      </View>

      <View>
        <Text style={{fontSize: 18, fontWeight: 'normal', marginTop: 10}}>Student ID:</Text>
        <TextInput style={styles.input} placeholder="12345" keyboardType='numeric' maxLength={5} value={ student_id } onChangeText={ number => setStudentID( number )} />
      </View>

      <View>
        <Text style={{fontSize: 18, fontWeight: 'normal', marginTop: 10}}>Course:</Text>
        <TextInput style={styles.input} placeholder="BSC12345" value={ student_course } onChangeText={ text => setCourse( text )} />
      </View>

      <View>
        <Text style={{fontSize: 18, fontWeight: 'normal', marginTop: 10}}>Password:</Text>
        <TextInput style={styles.input} placeholder="*@:arG1b%235`=S$%" value={ password } onChangeText={ text => setPassword( text )} secureTextEntry />
      </View>
    </View>

    {/* Register button */}
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={handleSignUp} style={[styles.button, styles.buttonOutline]} >
        <Text style={styles.buttonOutlineText}>REGISTER</Text>
      </TouchableOpacity>
    </View>

    </KeyboardAvoidingView>
  )
}

export default RegisterScreen;

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
