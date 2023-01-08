import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'

export default function TextInput() {
    return (
      <View style={styles.container}>
        <Input
          style={styles.input}
          underlineColor="transparent"
          mode="outlined"
        />
      </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      marginVertical: 12,
    },
    input: {
      backgroundColor: '#eee',
    },
    description: {
      fontSize: 13,
      color: '#0c0c0c',
      paddingTop: 8,
    },
    error: {
      fontSize: 13,
      color: '#e9446a',
      paddingTop: 8,
    },
  })