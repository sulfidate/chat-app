import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native'
import {
  Bubble,
  GiftedChat,
  MessageText,
  Time,
  InputToolbar,
} from 'react-native-gifted-chat'

import CustomActions from './CustomActions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as firebase from 'firebase'
import 'firebase/firestore'
import NetInfo from '@react-native-community/netinfo'
import MapView from 'react-native-maps'

export default class Chat extends React.Component {
  constructor() {
    super()
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
        avatar: '',
        image: null,
        location: null,
      },
      isConnected: false,
      image: null,
      location: null,
    }

    // web app's Firebase configuration
    const firebaseConfig = {
      apiKey: 'AIzaSyCp58islWpLZhnU67jr3M5UWW7cAW1KyjY',
      authDomain: 'chat-app-1d933.firebaseapp.com',
      projectId: 'chat-app-1d933',
      storageBucket: 'chat-app-1d933.appspot.com',
      messagingSenderId: '709335646971',
      appId: '1:709335646971:web:3589ebbbd013efb22a665e',
    }

    //  initialize database with config-data
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }

    // reference the database
    this.referenceChatMessages = firebase.firestore().collection('messages')
    this.refMsgsUser = null
  }

  // sets the messages state to the current data if updated
  onCollectionUpdate = (querySnapshot) => {
    const messages = []
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data()
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
        image: data.image || null,
        location: data.location || null,
      })
    })
    this.setState({
      messages: messages,
    })
    this.saveMessages()
    // this.deleteMessages()
  }

  // retrieves the chat messages from async storage
  async getMessages() {
    let messages = ''
    try {
      messages = (await AsyncStorage.getItem('messages')) || []
      this.setState({
        messages: JSON.parse(messages),
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  // save message to AsyncStorage
  async saveMessages() {
    try {
      await AsyncStorage.setItem(
        'messages',
        JSON.stringify(this.state.messages)
      )
    } catch (error) {
      console.log(error.message)
    }
  }

  // delete messages from AsyncStorage - only for development purposes
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages')
      this.setState({
        messages: [],
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  componentDidMount() {
    // get prop username from start-screen
    let name = this.props.route.params.name
    // check if props empty
    if (name === '') name = 'anonymous user'
    // set title to username
    this.props.navigation.setOptions({ title: name })

    // checks if the user is online
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        // if user is online
        this.setState({ isConnected: true })
        console.log('online')

        // listens for updates in the collection
        this.unsubscribe = this.referenceChatMessages
          .orderBy('createdAt', 'desc')
          .onSnapshot(this.onCollectionUpdate)

        //listen to authentication events
        this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
            firebase.auth().signInAnonymously()
          }
          // update user state with currently active user data
          this.setState({
            uid: user.uid,
            messages: [],
            user: {
              _id: user.uid,
              name: name,
              avatar: 'https://placeimg.com/140/140/any',
            },
          })
          //referencing messages of current user
          this.refMsgsUser = firebase
            .firestore()
            .collection('messages')
            .where('uid', '==', this.state.uid)
        })
        // save messages if user is online
        this.saveMessages()
      } else {
        // if the user is offline
        this.setState({ isConnected: false })
        console.log('offline')
        // retrieve messages from AsyncStorage
        this.getMessages()
      }
    })
  }

  componentWillUnmount() {
    if (this.state.isConnected) {
      // stop listening to authentication
      this.authUnsubscribe()
      // stop listening for changes
      this.unsubscribe()
    }
  }

  //adding message to the database
  addMessage() {
    const message = this.state.messages[0]
    // add a new message to the firebase collection
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: this.state.user,
      image: message.image || null,
      location: message.location || null,
    })
  }

  // to render colored Bubbles
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: 'lightpink',
          },
          left: {
            backgroundColor: 'lightblue',
          },
        }}
        renderMessageText={(props) => {
          return (
            <MessageText
              {...props}
              textStyle={{
                right: { color: 'white' },
                left: { color: 'white' },
              }}
            />
          )
        }}
        renderTime={(props) => {
          return (
            <Time
              {...props}
              timeTextStyle={{
                right: { color: 'red' },
                left: { color: 'blue' },
              }}
            />
          )
        }}
      />
    )
  }

  // renders the chat input field toolbar if user is online
  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return <InputToolbar {...props} />
    }
  }

  renderCustomActions = (props) => {
    return <CustomActions {...props} />
  }

  // renders map if location is available
  renderCustomView(props) {
    const { currentMessage } = props
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3,
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      )
    }
    return null
  }

  // function to send message
  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessage()
        this.saveMessages()
      }
    )
  }

  // render Chat-screen
  render() {
    // init BackgroundColor prop from Start-Screen
    const { bgColor } = this.props.route.params
    return (
      // container with backgroundcolor chosen by user in start screen
      <View style={[{ flex: 1, backgroundColor: bgColor }, styles.container]}>
        {/* rendering the chat inerface */}
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          renderActions={this.renderCustomActions}
          renderCustomView={this.renderCustomView}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: this.state.user._id,
            name: this.state.name,
            avatar: this.state.user.avatar,
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
