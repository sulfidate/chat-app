import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  Pressable,
} from 'react-native'

// Import the Background Image
import BackgroundImage from '../img/background-image.png'

// to silence all warnings that contain EventEmitter.removeListener
import { LogBox } from 'react-native'
LogBox.ignoreLogs(['EventEmitter.removeListener'])

// build startscreen as function component
export default class Start extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      bgColor: '',
    }
  }

  // function to change state of bgColor for ChatScreen chosen by user
  setBgColor = (bgColorNew) => {
    this.setState({ bgColor: bgColorNew })
  }

  // Creating constants that contain background colours for the chat screen background
  colors = {
    black: '#090C08',
    purple: '#474056',
    grey: '#8A95A5',
    green: '#B9C6AE',
  }

  // render start-screen
  render() {
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
              onChangeText={(name) => this.setState({ name: name })}
              placeholder='Your Name'
            />
            <View style={styles.colorWrapper}>
              <Text style={styles.colorText}>Choose Background Color:</Text>
              <View style={styles.colorContainer}>
                <Pressable
                  style={[{ backgroundColor: '#090C08' }, styles.colorbutton]}
                  onPress={() => this.setBgColor(this.colors.black)}
                />
                <Pressable
                  style={[{ backgroundColor: '#474056' }, styles.colorbutton]}
                  onPress={() => this.setBgColor(this.colors.purple)}
                />
                <Pressable
                  style={[{ backgroundColor: '#8A95A5' }, styles.colorbutton]}
                  onPress={() => this.setBgColor(this.colors.grey)}
                />
                <Pressable
                  style={[{ backgroundColor: '#B9C6AE' }, styles.colorbutton]}
                  onPress={() => this.setBgColor(this.colors.green)}
                />
              </View>
            </View>
            <Pressable
              onPress={() =>
                this.props.navigation.navigate('Chat', {
                  name: this.state.name,
                  bgColor: this.state.bgColor,
                })
              }
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
}

// Styles for Start-screen

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
