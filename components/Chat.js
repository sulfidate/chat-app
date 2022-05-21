import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native'
import { Bubble, GiftedChat } from 'react-native-gifted-chat'

// import Firebase and Cloud Firestore
const firebase = require('firebase')
require('firebase/firestore')

export default class Chat extends React.Component {
  constructor() {
    super()
    this.state = {
      messages: [],
      uid: 0,
      loggedInText: 'Please wait, you are getting logged in',
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
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
  }

  componentDidMount() {
    // get prop username from start-screen
    let name = this.props.route.params.name
    // check if props empty
    if (name === '') name = 'anonymous user'
    // set title to username
    this.props.navigation.setOptions({ title: name })

    // reference the database
    this.referenceChatMessages = firebase.firestore().collection('messages')

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

      // listens for updates in the collection
      this.unsubscribe = this.referenceChatMessages
        .orderBy('createdAt', 'desc')
        .onSnapshot(this.onCollectionUpdate)
    })
  }

  componentWillUnmount() {
    // stop listening for changes
    this.unsubscribe()
    // stop listening to authentication
    this.authUnsubscribe()
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
      })
    })
    this.setState({
      messages,
    })
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
    })
  }

  // User send a message
  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessage()
      }
    )
  }

  // to render colored Bubbles -> maybe should be adjustable?
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: 'lightpink',
          },
          left: {
            backgroundColor: 'lightyellow',
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
      <View style={[{ flex: 1, backgroundColor: bgColor }]}>
        {/* rendering the chat inerface */}
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: this.state.user._id,
            name: this.state.name,
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
