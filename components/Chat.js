import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

export default function Chat(props) {
  let { name, color } = props.route.params
  console.log('color:', { color })
  console.log('name:', { name })

  useEffect(() => {
    // Set the screen title to the user name entered in the start screen
    props.navigation.setOptions({ title: name })
    props.navigation.setOptions({ backgroundColor: color })
  })

  return (
    <View style={[{ backgroundColor: color }, styles.container]}>
      <Text>Hello {name}, welcome on the Chat!</Text>
      <Text>Your backgroundColor is {color}</Text>

      <Button
        title='<<< Go back'
        onPress={() => props.navigation.navigate('Start')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
