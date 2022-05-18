import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  Pressable,
} from 'react-native'
import BackgroundImage from '../img/background-image.png'

// Creating constants that contain background colours for the chat screen
const colors = {
  black: '#090C08',
  purple: '#474056',
  grey: '#8A95A5',
  green: '#B9C6AE',
}

export default function Start(props) {
  const [name, setName] = useState()
  const [color, setColor] = useState()

  const onStartChatting = () => {
    props.navigation.navigate('Chat', { name: name, color: color })
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={BackgroundImage}
        resizeMode='cover'
        style={styles.image}
      >
        <View style={styles.header}>
          <Text style={styles.title}>myChat</Text>
        </View>
        <View style={styles.wrapper}>
          <TextInput
            style={styles.inputName}
            onChangeText={(name) => setName(name)}
            placeholder='Your Name'
          />
          <View style={styles.colorWrapper}>
            <Text style={styles.colorText}>Choose Background Color:</Text>
            <View style={styles.colorContainer}>
              <Pressable
                style={[{ backgroundColor: colors.black }, styles.colorbutton]}
                onPress={(color) => setColor(colors.black)}
              />
              <Pressable
                style={[{ backgroundColor: colors.purple }, styles.colorbutton]}
                onPress={(color) => setColor(colors.purple)}
              />
              <Pressable
                style={[{ backgroundColor: colors.grey }, styles.colorbutton]}
                onPress={(color) => setColor(colors.grey)}
              />
              <Pressable
                style={[{ backgroundColor: colors.green }, styles.colorbutton]}
                onPress={(color) => setColor(colors.green)}
              />
            </View>
          </View>
          <Pressable
            onPress={onStartChatting}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#585563' : '#757083',
              },
              styles.chatButton,
            ]}
          >
            <Text style={styles.chatText}>Start Chatting</Text>
          </Pressable>
        </View>
        <View style={styles.footer} />
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  header: {
    flex: '53%',
  },

  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: '25%',
  },

  wrapper: {
    width: '88%',
    backgroundColor: 'white',
    alignItems: 'center',
    height: '44%',
    justifyContent: 'space-evenly',
  },

  inputName: {
    height: 50,
    width: '88%',
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 40,
  },

  colorWrapper: {},

  colorText: {
    color: '#757083',
    fontSize: 16,
    fontWeight: '300',
    marginBottom: 10,
  },

  colorContainer: {
    width: '88%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  colorbutton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  chatButton: {
    height: 50,
    width: '88%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  chatText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  footer: {
    flex: '3%',
  },
})
