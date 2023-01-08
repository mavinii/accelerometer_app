import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'

export default function LeaderboardScreen(){
    return (
      <View style={styles.container}>
        {/* TODO: Display the leaderboard from database */}
        <Text>Leaderboard screen not implemented yet.</Text>
      </View>
    )  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})