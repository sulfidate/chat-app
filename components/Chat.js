import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native'
import { Bubble, GiftedChat } from 'react-native-gifted-chat'

// build Chat-screen as class component
export default class Chat extends React.Component {
  // state initialization within the constructor
  constructor() {
    super()
    this.state = {
      messages: [],
    }
  }

  // function to initialize props and set message to the state right after Chat component mounts
  componentDidMount() {
    let name = this.props.route.params.name
    this.props.navigation.setOptions({ title: name })

    this.setState({
      messages: [
        {
          _id: 1,
          text: `Hi ${name}, welcome to the chat!`,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: 'This is a system message',
          createdAt: new Date(),
          system: true,
        },
      ],
    })
  }

  // User send a message
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  // to render colored Bubbles -> maybe should be adjustable?
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: 'gray',
          },
        }}
      />
    )
  }

  // render Chat-screen
  render() {
    // init BackgroundColor prop from Start-Screen
    const { bgColor } = this.props.route.params
    return (
      // container with backgroundcolor chosen by user in start screen
      <View style={[{ backgroundColor: bgColor }, styles.container]}>
        {/* rendering the chat inerface */}
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {/* fixing android keyboard issue on older mobile models with less screen real estate */}
        {Platform.OS === 'android' ? (
          <KeyboardAvoidingView behavior='height' />
        ) : null}
      </View>
    )
  }
}
// Styles for Chat-screen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
